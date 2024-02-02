"use client";
import type { ColumnWithTasksAndSubtasks } from "@/lib/types";
import Task from "./Task";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnProps {
  column: ColumnWithTasksAndSubtasks;
}

function Column({ column }: ColumnProps) {
  const { id, title, tasks } = column;
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "Column",
      column,
    },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const tasksCount = tasks.length;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex h-full w-72 shrink-0 flex-col gap-6 bg-background px-2 py-3",
        isDragging &&
          "before:absolute before:inset-0 before:z-10 before:rounded-sm before:bg-muted",
      )}
    >
      <div
        {...listeners}
        {...attributes}
        className="list-border space-x-2 text-md uppercase text-muted-foreground hover:cursor-grab hover:before:border-border active:before:border-border"
      >
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
