import { deleteTask as deleteTaskApi } from "@/services/apiTasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      toast.success("Task deleted successfully");
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteTask, isPending };
}
