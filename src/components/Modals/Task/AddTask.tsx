"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IconPlus from "@/icons/IconPlus.svg";
import TaskForm from "./TaskForm";
import { BoardWithColumns } from "@/lib/types";
import { useState } from "react";

function AddTask({
  triggerDisabled,
  board,
}: {
  triggerDisabled: boolean;
  board: BoardWithColumns;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="hidden md:block">
        <DialogTrigger asChild>
          <Button disabled={triggerDisabled} size="lg">
            + Add New Task
          </Button>
        </DialogTrigger>
      </div>
      <div className="rounded-3xl shadow-lg md:hidden">
        <DialogTrigger asChild>
          <Button disabled={triggerDisabled} size="icon">
            <IconPlus />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <TaskForm board={board} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
