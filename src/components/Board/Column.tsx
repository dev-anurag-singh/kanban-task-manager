"use client";
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

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative flex h-full w-72 shrink-0 flex-col gap-6 bg-background px-2 py-3",
      )}
    >
      <div className="list-border space-x-2 text-md uppercase text-muted-foreground hover:cursor-grab hover:before:border-border active:before:border-border">
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
