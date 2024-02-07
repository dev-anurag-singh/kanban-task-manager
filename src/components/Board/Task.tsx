import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: Task;
}

function Task({ task }: TaskProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={cn(
        "group space-y-2 rounded-lg bg-muted px-4 py-6",
        isDragging && "opacity-25",
      )}
    >
      <h4 className="text-lg text-foreground group-hover:text-primary">
        {task.title}
      </h4>
    </div>
  );
}

export default Task;
