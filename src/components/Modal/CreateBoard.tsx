import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import BoardIcon from "@/icons/BoardIcon.svg";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
        <div>
          <div className="space-x-2">
            <Label htmlFor="board-name">Board Name</Label>
            <Input id="board-name" placeholder="e.g. web design" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBoard;
