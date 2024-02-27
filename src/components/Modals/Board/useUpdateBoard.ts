import { updateBoard } from "@/services/apiBoards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useUpdateBoard() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: editBoard, isPending } = useMutation({
    mutationFn: updateBoard,
    onSuccess: (data) => {
      toast.success("Board updated successfully");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message);
      router.refresh();
    },
  });

  return { editBoard, isPending };
}
