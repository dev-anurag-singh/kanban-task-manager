import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/lib/types";
import { useState } from "react";
import Subtask from "./Subtask";

interface ViewTaskProps {
  children: React.ReactNode;
  task: Task;
  subtasks?: Task[];
}

function ViewTask({ children, task, subtasks }: ViewTaskProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>{task.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm">Subtasks ({subtasks?.length})</h4>
          </div>
          <div className="space-y-2">
            {subtasks?.map((t) => <Subtask key={t.id} t={t} />)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewTask;
