import { updateTask as updateTaskApi } from "@/services/apiTasks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useUpdateTask() {
  const router = useRouter();

  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationFn: updateTaskApi,
    onSuccess: (data) => {
      toast.success("Task updated successfully");
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateTask, isUpdating };
}
