import { updateTaskStatus as updateTaskStatusApi } from "@/services/apiTasks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useUpdateTaskStatus() {
  const router = useRouter();

  const { mutate: updateTaskStatus, isPending } = useMutation({
    mutationFn: updateTaskStatusApi,
    onSuccess: () => {
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateTaskStatus, isPending };
}
