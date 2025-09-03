import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { SignupForm } from "@/components/auth/signup/SignupForm";

function SignupPage() {
  return (
    <>
      <Card className="border-0">
        <CardHeader className="space-y-2 text-center">
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Let&apos;s get you started organising your tasks!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
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
      </Card>
    </>
  );
}

export default SignupPage;
