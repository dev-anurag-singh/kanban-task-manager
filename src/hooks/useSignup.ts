import { signupApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSignup() {
  const router = useRouter();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      toast("Verification email has been send.");
      router.push('/login')
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isPending };
}
