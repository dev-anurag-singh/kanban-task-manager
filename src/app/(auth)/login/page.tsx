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
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { Separator } from "@/components/ui/separator";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignInValidator>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: "alex@example.com",
      password: "pass1234",
    },
  });

  async function onSubmit({ email, password }: TSignInValidator) {
    console.log(email, password);
  }

  return (
    <>
      <Card className="border-0">
        <CardHeader className="space-y-2 text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Enter your credentails to get back!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col">
          <div className="relative mb-8 w-full">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-muted-foreground">
              or
            </span>
          </div>
          <GoogleLoginButton />
          <div className="mt-4 text-center text-base">
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
      </Card>
    </>
  );
}

export default SignupPage;
