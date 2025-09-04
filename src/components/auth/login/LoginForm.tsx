"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema, TSignInSchema } from "@/lib/validators/signin-schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/accessControl";

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "alex@example.com",
      password: "Tg@ry745",
    },
  });

  async function onSubmit({ email, password }: TSignInSchema) {
    setIsPending(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res.error) {
      toast.success("Logged in successfully");
      router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    } else {
      if (res.error === "AccessDenied") {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        toast.error("Invalid Credentials");
      }
    }
    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            id="email"
            disabled={isPending}
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
            disabled={isPending}
            placeholder="At least 8 characters"
          />
        </div>
        <Button disabled={isPending} className="w-full" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};
