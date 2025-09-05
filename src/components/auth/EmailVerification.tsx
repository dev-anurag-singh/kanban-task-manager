"use client";

import { useEffect, useRef } from "react";
import { validate } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/components/auth/hooks/useVerifyEmail";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const EmailVerification = () => {
  const hasExecuted = useRef(false);
  const token = useSearchParams().get("token");
  const { verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (hasExecuted.current) return;
    if (token && validate(token)) {
      verifyEmail(token);
      hasExecuted.current = true;
    }
  }, [token, verifyEmail]);

  if (!token || !validate(token)) {
    return (
      <Card className="border-0 py-4">
        <CardHeader className="space-y-4 text-center">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Invalid or empty token
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              You don&apos;t have a valid token to verify your email. Request a
              new one by from the login page.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full">
            <Link href={"/login"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to login page
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 py-4">
      <CardHeader className="space-y-4 text-center">
        <div className="flex w-full items-center justify-center">
          <BeatLoader />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold">
            Verifying your email
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please wait while we verify your email address. This should only
            take a moment.
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};
