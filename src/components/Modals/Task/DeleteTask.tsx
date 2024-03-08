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
import { Task } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import { useDeleteTask } from "./useDeleteTask";

interface DeleteTaskProps {
  data: Task;
  isDeleteTaskOpen: boolean;
  setIsDeleteTaskOpen: Dispatch<SetStateAction<boolean>>;
}

function DeleteTask({
  data,
  isDeleteTaskOpen,
  setIsDeleteTaskOpen,
}: DeleteTaskProps) {
  const { deleteTask, isPending } = useDeleteTask();

  function onDelete() {
    deleteTask(data.id, {
      onSettled: () => setIsDeleteTaskOpen(false),
    });
  }

  return (
    <AlertDialog open={isDeleteTaskOpen} onOpenChange={setIsDeleteTaskOpen}>
      <AlertDialogContent className="gap-6">
        <AlertDialogHeader className="space-y-5 text-left">
          <AlertDialogTitle className="text-xl text-destructive">
            Delete this Task?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Are you sure you want to delete the task {data.title}. This action
            will remove all subtasks and cannot be reversed.
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

export default DeleteTask;
