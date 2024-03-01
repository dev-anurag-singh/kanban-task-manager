import { reorderTasks } from "@/services/apiTasks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useReorderTasks() {
  const router = useRouter();

  const { mutate: reorder, isPending } = useMutation({
    mutationFn: reorderTasks,
    onSuccess: (data) => {
      toast.success("Task reordered");
    },
    onError: (err) => {
      toast.error(err.message);
      router.refresh();
    },
  });

  return { reorder, isPending };
}
