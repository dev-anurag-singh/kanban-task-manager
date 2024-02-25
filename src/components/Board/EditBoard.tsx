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
import { useRef } from "react";

function EditBoard() {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  function closeModal() {
    closeRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger ref={closeRef} asChild>
        <Button variant="link" className="text-muted-foreground">
          Edit Board
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <BoardForm closeModal={closeModal} edit={true} />
      </DialogContent>
    </Dialog>
  );
}

export default EditBoard;
