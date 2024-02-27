import { createNewBoard } from "@/services/apiBoards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCreateBoard() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: addBoard, isPending } = useMutation({
    mutationFn: createNewBoard,
    onSuccess: (data) => {
      toast.success("Board created successfully");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      router.push(`/app/${data.id}`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { addBoard, isPending };
}
