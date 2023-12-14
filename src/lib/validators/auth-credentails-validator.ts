import { z } from "zod";

export const SignUpValidator = z
  .object({
    email: z
      .string()
      .min(1, { message: "Can't be empty" })
      .email({ message: "Invalid email" }),
    password: z.string().min(8, {
      message: "Must be 8 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Check again",
    path: ["confirmPassword"],
  });

export const SignInValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty" })
    .email({ message: "Invalid email" }),
  password: z.string().min(8, {
    message: "Must be 8 characters",
  }),
});

export type TSignUpValidator = z.infer<typeof SignUpValidator>;
export type TSignInValidator = z.infer<typeof SignInValidator>;
