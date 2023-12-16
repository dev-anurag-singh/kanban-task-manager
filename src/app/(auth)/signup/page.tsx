"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {Mail} from 'lucide-react'
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
  SignUpValidator,
  TSignUpValidator,
} from "@/lib/validators/auth-credentails-validator";
import toast from "react-hot-toast";
import { supabaseBrowserClient } from "@/lib/supabase/browserClient";
import { useSignup } from "@/hooks/useSignup";

function SignupPage() {
  const { signup, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignUpValidator>({
    resolver: zodResolver(SignUpValidator),
  });

  async function onSubmit({
    email,
    password,
    confirmPassword,
  }: TSignUpValidator) {
    signup(
      { email, password, confirmPassword },
      {
        onSettled: () => reset(),
        onSuccess: () => {
          toast('Conformation email has been send.',{
            icon:<Mail />
          });
        },
      },
    );
  }

  return (
    <>
      <Card className="border-0">
        <CardHeader className="space-y-2">
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Let&apos;s get you started organising your tasks!
          </CardDescription>
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  {...register("confirmPassword")}
                  error={errors?.confirmPassword?.message}
                  id="confirm-password"
                  type="password"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            <Button type="submit" disabled={isPending}>
              Create Account
            </Button>
            <div className="mt-3 text-center text-base">
              <span>Already have an account?</span>
              <Button
                asChild
                variant="link"
                size="sm"
                className="h-auto px-2 text-lg"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

export default SignupPage;
