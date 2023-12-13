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

function SignupPage() {
  return (
    <>
      <Card className="border-0">
        <CardHeader className="space-y-2">
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Let&apos;s get you started organising your tasks!
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="e.g. alex@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="At least 8 characters" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            <Button>Create Account</Button>
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
