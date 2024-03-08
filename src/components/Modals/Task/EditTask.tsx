"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TaskForm from "./TaskForm";
import { BoardWithColumns, Task } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

interface EditTaskProps {
  board: BoardWithColumns;
  isEditTaskOpen: boolean;
  setIsEditTaskOpen: Dispatch<SetStateAction<boolean>>;
  task: Task;
  subtasks: Task[];
}

function EditTask({
  board,
  task,
  isEditTaskOpen,
  subtasks,
  setIsEditTaskOpen,
}: EditTaskProps) {
  function closeModal() {
    setIsEditTaskOpen(false);
  }

  return (
    <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          task={task}
          edit
          subtasks={subtasks}
          board={board}
          closeModal={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
