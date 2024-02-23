import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BoardIcon from "@/icons/BoardIcon.svg";
import BoardForm from "./BoardForm";

function CreateBoard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0">
          <span className="mr-3">
            <BoardIcon />
          </span>
          <span className="text-lg">+ Add New Board</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
        <BoardForm />
      </DialogContent>
    </Dialog>
  );
}

export default CreateBoard;
