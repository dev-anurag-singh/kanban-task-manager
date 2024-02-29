"use client";

import { Button } from "../ui/button";
import EllipsisVertical from "@/icons/EllipsisVertical.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EditBoard from "@/components/Modals/Board/EditBoard";
import { useState } from "react";
import { BoardWithColumns } from "@/lib/types";
import DeleteBoard from "../Modals/Board/DeleteBoard";

function BoardPopover({ board }: { board: BoardWithColumns }) {
  const [isOpen, setIsOpen] = useState(false);

  function closePopover() {
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="ml-1">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={12}
        align="end"
        className="w-48 dark:bg-background"
      >
        <EditBoard data={board} closePopover={closePopover} />
        <DeleteBoard data={board} closePopover={closePopover} />
      </PopoverContent>
    </Popover>
  );
}

export default BoardPopover;
