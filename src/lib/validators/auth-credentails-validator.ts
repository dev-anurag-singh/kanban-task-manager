import { z } from "zod";

export const SignInValidator = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty" })
    .email({ message: "Invalid email" }),
  password: z.string().min(8, {
    message: "Must be 8 characters",
  }),
});

export type TSignInValidator = z.infer<typeof SignInValidator>;
