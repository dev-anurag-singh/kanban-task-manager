"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/accessControl";

export const GoogleLoginButton = () => {
  const callbackUrl = useSearchParams().get("callbackUrl");
  const onClick = () => {
    signIn("google", {
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <Button onClick={onClick} variant="outline" className="w-full">
      <FcGoogle size={20} />
      Google
    </Button>
  );
};
