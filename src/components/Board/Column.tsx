"use client";
import type { ColumnWithTasks } from "@/lib/types";
import Task from "./Task";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnProps {
  column: ColumnWithTasks;
}

function Column({ column: { id, title, tasks, order } }: ColumnProps) {
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
      id,
      title,
    },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  // Tasks which are direct child of a column
  const columnTasks = tasks.filter((task) => !task.parent_task_id);

  const tasksCount = columnTasks.length;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex max-h-full w-72 shrink-0 flex-col gap-6 bg-background px-2 py-3",
        isDragging &&
          "before:absolute before:inset-0 before:z-10 before:rounded-sm before:bg-muted",
      )}
    >
      <div
        {...listeners}
        {...attributes}
        className="list-border cursor-grab space-x-2 text-md uppercase text-muted-foreground hover:before:border-border active:before:border-border aria-pressed:cursor-grabbing"
      >
        <span>{title}</span>
        <span>({tasksCount})</span>
      </div>
      <ScrollArea className="flex h-full flex-col">
        <div className="space-y-5 pb-1">
          {columnTasks.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Column;
