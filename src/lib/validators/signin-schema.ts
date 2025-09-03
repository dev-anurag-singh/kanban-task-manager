import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty" })
    .email({ message: "Invalid email" }),
  password: z.string().min(8, {
    message: "Must be 8 characters",
  }),
});

export type TSignInSchema = z.infer<typeof SignInSchema>;
