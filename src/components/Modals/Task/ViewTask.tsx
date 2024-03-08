import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import Subtask from "./Subtask";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ViewTaskProps {
  children: React.ReactNode;
  task: Task;
  subtasks?: Task[];
  setIsEditTaskOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteTaskOpen: Dispatch<SetStateAction<boolean>>;
}

function ViewTask({
  children,
  task,
  subtasks,
  setIsEditTaskOpen,
  setIsDeleteTaskOpen,
}: ViewTaskProps) {
  const [isOpen, setIsOpen] = useState(false);

  function onEditClick() {
    setIsOpen(false);
    setIsEditTaskOpen(true);
  }

  function onDeleteClick() {
    setIsOpen(false);
    setIsDeleteTaskOpen(true);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <DialogTitle>{task.title}</DialogTitle>
            <Popover>
              <PopoverTrigger asChild>
                <button className="rounded-full p-2 hover:bg-background">
                  <MoreVertical />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 dark:bg-background">
                <Button
                  onClick={onEditClick}
                  variant={"link"}
                  className="text-muted-foreground"
                >
                  Edit Task
                </Button>
                <Button
                  onClick={onDeleteClick}
                  variant={"link"}
                  className="text-destructive"
                >
                  Delete Task
                </Button>
              </PopoverContent>
            </Popover>
          </div>
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
