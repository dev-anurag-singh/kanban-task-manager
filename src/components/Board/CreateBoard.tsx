"use client";

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
import { useRef } from "react";

function CreateBoard() {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  function closeModal() {
    closeRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger ref={closeRef} asChild>
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
        <BoardForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateBoard;
