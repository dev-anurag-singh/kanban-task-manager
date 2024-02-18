"use client";
import stc from "string-to-color";
import type { Column, Tasks } from "@/lib/types";
import Task from "./Task";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ColumnProps {
  column: Column;
  tasks: Tasks;
}

function Column({ column: { title, id }, tasks }: ColumnProps) {
  const { setNodeRef } = useSortable({
    id: id,
    data: {
      type: "Column",
    },
  });

  const tasksCount = tasks.length;
  const columnColor = stc(id || "");

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative flex h-full w-72 shrink-0 flex-col gap-6 bg-background px-2 py-3",
      )}
    >
      <div className="flex items-center gap-2 text-md uppercase text-muted-foreground">
        <span
          style={{ backgroundColor: columnColor }}
          className="h-4 w-4 rounded-full"
        />
        <span>{title}</span>
        <span>({tasksCount})</span>
      </div>
      <ScrollArea className="flex h-full flex-col">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-5 pb-2">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </ScrollArea>
    </div>
  );
}

export default Column;
