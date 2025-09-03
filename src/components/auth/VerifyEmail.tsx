"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  const handleResendEmail = async () => {
    setIsResending(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast(`We've sent a new verification email to your inbox.`);

    setIsResending(false);
  };

  const handleBackToLogin = () => {
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-balance text-2xl font-semibold">
              Verify your email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We&#39;ve sent a verification link to your email address. Please
              check your inbox and click the link to verify your account.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg bg-background/100 p-4">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div className="text-base leading-tight text-muted-foreground">
              <p className="mb-1 font-medium text-foreground">
                Check your spam folder
              </p>
              <p>
                If you don&#39;t see the email in your inbox, please check your
                spam or junk folder.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full"
            >
              {isResending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend verification email
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleBackToLogin}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
