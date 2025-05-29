import { Router, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/emailJob.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// login routes
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const payload = loginSchema.parse(body);

    // * check email existance
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user || user === null) {
      return res.status(422).json({
        errors: {
          email: "No user found with this email.",
        },
      });
    }

    // * check password
    const compare = await bcrypt.compare(payload.password, user.password);
    if (!compare) {
      return res.status(422).json({
        errors: {
          email: "Invalid credentials",
        },
      });
    }

    // * JWT Payload
    let JWTPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(JWTPayload, process.env.SECRET_KEY!, {
      expiresIn: "365d",
    });

    res.status(200).json({
      message: "Logged in successfully",
      data: {
        ...JWTPayload,
        token: `Bearer ${token}`,
      },
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
});

// login check routes
router.post("/check/credentials", async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const payload = loginSchema.parse(body);

    // * check email existance
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user || user === null) {
      return res.status(422).json({
        errors: {
          email: "No user found with this email.",
        },
      });
    }

    // * check password
    const compare = await bcrypt.compare(payload.password, user.password);
    if (!compare) {
      return res.status(422).json({
        errors: {
          email: "Invalid credentials",
        },
      });
    }

    res.status(200).json({
      message: "Logged in successfully",
      data: {},
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
});

// register routes
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (user) {
      return res.status(422).json({
        errors: {
          email: "Email already taken. Use another one.",
        },
      });
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    // Token Generation
    const token = await bcrypt.hash(uuid4(), salt);
    const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
    const emailBody = await renderEmailEjs("email-verify", {
      name: payload.name,
      url: url,
    });

    // Send Email
    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "User email verification.",
      body: emailBody,
    });

    // Save to DB
    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        email_verify_token: token,
      },
    });

    return res.json({
      message: "Please check your email. We have sent a verification email.",
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
});

// get routes
router.get("/user",authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const user = req.user;
  return res.json({ data: user });
});

export default router;
