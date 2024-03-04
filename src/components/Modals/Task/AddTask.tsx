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

function AddTask({ triggerDisabled }: { triggerDisabled: boolean }) {
  return (
    <Dialog>
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
        <TaskForm />
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
