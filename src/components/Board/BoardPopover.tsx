"use client";

import { Button } from "../ui/button";
import EllipsisVertical from "@/icons/EllipsisVertical.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import EditBoard from "./EditBoard";
import { useRef } from "react";

function BoardPopover() {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  function closePopover() {
    closeRef.current?.click();
  }
  return (
    <Popover>
      <PopoverTrigger ref={closeRef} asChild>
        <Button size="icon" variant="ghost" className="ml-1">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={12}
        align="end"
        className="w-48 dark:bg-background"
      >
        <EditBoard />
        <Button variant="link" className="text-destructive">
          Delete Board
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default BoardPopover;
