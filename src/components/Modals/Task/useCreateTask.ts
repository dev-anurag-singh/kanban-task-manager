import { createTask } from "@/services/apiTasks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCreateTask() {
  const router = useRouter();

  const { mutate: addTask, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      toast.success("Task created successfully");
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  return { addTask, isPending };
}
