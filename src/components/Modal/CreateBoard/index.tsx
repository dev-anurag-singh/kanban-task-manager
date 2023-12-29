import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BoardIcon from "@/icons/BoardIcon.svg";
import CreateBoardForm from "./CreateBoardForm";

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
        <CreateBoardForm />
      </DialogContent>
    </Dialog>
  );
}

export default CreateBoard;
