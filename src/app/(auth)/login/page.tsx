"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  SignInValidator,
  TSignInValidator,
} from "@/lib/validators/auth-credentails-validator";
import { useLogin } from "@/hooks/useLogin";

function SignupPage() {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignInValidator>({
    resolver: zodResolver(SignInValidator),
  });

  async function onSubmit({ email, password }: TSignInValidator) {
    login(
      { email, password },
      {
        onSettled: () => reset(),
      },
    );
  }

  return (
    <>
      <Card className="border-0">
        <CardHeader className="space-y-2">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Enter your credentails to get back!</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
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
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            <Button type="submit" disabled={isPending}>
              Login
            </Button>
            <div className="mt-3 text-center text-base">
              <span>Don&apos; have an account?</span>
              <Button
                asChild
                variant="link"
                size="sm"
                className="h-auto px-2 text-lg"
              >
                <Link href="/signup">Signup</Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

export default SignupPage;
