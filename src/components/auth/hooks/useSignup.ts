import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSignup() {
  const router = useRouter();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success(`We've sent a verification link to your email.`);
      router.push("/verify-email");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isPending };
}
