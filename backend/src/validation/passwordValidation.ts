import z from "zod";

export const forgetPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Email must be a correct email." }),
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string({ message: "Email is required." })
      .email({ message: "Must be a correct email." }),
    token: z.string({ message: "Token is required." }),
    password: z
      .string({ message: "Password is required." })
      .min(6, { message: "At least 6 characters long." }),
    confirm_password: z
      .string({ message: "Confirm Password is required." })
      .min(6, { message: "At least 6 characters long." }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password and Confirm Password doesn't match.",
    path: ["confirm_password"],
  });
