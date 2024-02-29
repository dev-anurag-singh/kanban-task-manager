import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BoardWithColumns } from "@/lib/types";
import { useState } from "react";
import { useDeleteBoard } from "./useDeleteBoard";

function DeleteBoard({
  data,
  closePopover,
}: {
  data: BoardWithColumns;
  closePopover?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { deleteBoard, isPending } = useDeleteBoard();

  function onDelete() {
    deleteBoard(data.id, {
      onSettled: closePopover,
    });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="text-destructive">
          Delete Board
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-6">
        <AlertDialogHeader className="space-y-5 text-left">
          <AlertDialogTitle className="text-xl text-destructive">
            Delete this board?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Are you sure you want to delete the {data.title} board? This action
            will remove all columns and tasks and cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid-cols-2 gap-4 sm:grid">
          <Button onClick={onDelete} disabled={isPending} variant="destructive">
            Delete
          </Button>
          <AlertDialogCancel asChild>
            <Button disabled={isPending} variant="secondary">
              Cancel
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBoard;
