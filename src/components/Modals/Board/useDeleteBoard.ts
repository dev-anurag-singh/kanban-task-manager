import { deleteBoard as deleteBoardApi } from "@/services/apiBoards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteBoard, isPending } = useMutation({
    mutationFn: deleteBoardApi,
    onSuccess: () => {
      toast.success("Board deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      router.push("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteBoard, isPending };
}
