"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useVerifyEmail() {
  const router = useRouter();
  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: async (token: string) => {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success(`Your email has been verified`);
      router.push("/login");
    },
    onError: (err) => {
      toast.error(`${err.message} Request a new one below!`);
      router.push("/verify-email");
    },
  });

  return { verifyEmail, isPending };
}
