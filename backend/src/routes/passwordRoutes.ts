import { Router, Request, Response } from "express";
import { authLimiter } from "../config/rateLimit.js";
import { ZodError } from "zod";
import { checkDateHourDiff, formatError, renderEmailEjs } from "../helper.js";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
} from "../validation/passwordValidation.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/emailJob.js";

const router = Router();

router.post(
  "/forget-password",
  authLimiter,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const body = req.body;
      const payload = forgetPasswordSchema.parse(body);

      // * Check user
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user || user === null) {
        res.status(422).json({
          message: "Invalid data.",
          errors: {
            email: "No user found with this email.",
          },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const token = await bcrypt.hash(uuid4(), salt);

      await prisma.user.update({
        data: {
          password_reset_token: token,
          token_send_at: new Date().toISOString(),
        },
        where: {
          email: payload.email,
        },
      });

      //* Send email
      const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`;
      const html = await renderEmailEjs("forget-password", { url: url });
      await emailQueue.add(emailQueueName, {
        to: payload.email,
        subject: "Rest your password.",
        body: html,
      });

      return res.json({
        message:
          "Password reset link sent successfully! Please check your email.",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatError(error);
        return res.status(422).json({ message: "Invalid data", errors });
      }
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
);

router.post(
  "/reset-password",
  authLimiter,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const body = req.body;
      const payload = resetPasswordSchema.parse(body);

      // * Check user
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user || user === null) {
        return res.status(422).json({
          message: "Invalid data.",
          errors: {
            email: "Link is not correct, make sure you copied correct link..",
          },
        });
      }

      //* Check token
      if (user?.password_reset_token !== payload.token) {
        return res.status(422).json({
          message: "Invalid data.",
          errors: {
            email: "Link is not correct, make sure you copied correct link..",
          },
        });
      }

      //* Check 2 hours timeframe
      const hoursDiff = checkDateHourDiff(user.token_send_at!);
      if (hoursDiff > 2) {
        return res.status(422).json({
          message: "Invalid data.",
          errors: {
            email: "Password reset token got expired. Please send new token.",
          },
        });
      }

      // * Update Password
      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(payload.password, salt);

      await prisma.user.update({
        data: {
          password: newPass,
          password_reset_token: null,
          token_send_at: null,
        },
        where: {
          email: payload.email,
        },
      });

      return res.json({
        message: "Password reset successfully. Please try to login now!",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatError(error);
        return res.status(422).json({ message: "Invalid data", errors });
      }
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
);

export default router;
