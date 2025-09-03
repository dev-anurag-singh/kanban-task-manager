"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/components/auth/hooks/useSignup";
import toast from "react-hot-toast";

const SignupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().min(8, {
    message: "Your password must contain 8 or more characters.",
  }),
});

export type TSignupSchema = z.infer<typeof SignupSchema>;

export const SignupForm = () => {
  const { signup, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  async function onSubmit({ email, password }: TSignupSchema) {
    signup({ email, password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            id="email"
            error={errors?.email?.message}
            placeholder="e.g. alex@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            error={errors?.password?.message}
            id="password"
            type="password"
            placeholder="At least 8 characters"
          />
        </div>
        <Button type="submit" className="mt-2 w-full">
          Create Account
        </Button>
      </div>
    </form>
  );
};
