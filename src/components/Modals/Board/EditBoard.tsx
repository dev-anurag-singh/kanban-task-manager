"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BoardForm from "./BoardForm";
import { useState } from "react";
import { BoardWithColumns } from "@/lib/types";

interface EditBoardProps {
  closePopover?: () => void;
  data: BoardWithColumns;
  children?: React.ReactNode;
}

function EditBoard({ closePopover, data, children }: EditBoardProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    if (closePopover) {
      closePopover();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="link" className="text-muted-foreground">
            Edit Board
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <BoardForm data={data} closeModal={closeModal} edit={true} />
      </DialogContent>
    </Dialog>
  );
}

export default EditBoard;
