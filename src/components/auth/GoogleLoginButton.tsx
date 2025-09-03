"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export const GoogleLoginButton = () => {
  return (
    <Button onClick={() => {}} variant="outline" className="w-full">
      <FcGoogle size={20} />
      Google
    </Button>
  );
};
