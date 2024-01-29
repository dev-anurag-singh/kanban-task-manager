import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { reorderColumns as reorderColumnsApi } from "@/services/apiColumns";

export function useReorderColumns() {
  const router = useRouter();

  const { mutate: reorderColumns, isPending } = useMutation({
    mutationFn: reorderColumnsApi,
    onSuccess: (data) => {
      toast.success("Columns reordered");
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  return { reorderColumns, isPending };
}
