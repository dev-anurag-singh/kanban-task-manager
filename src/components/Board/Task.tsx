import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ViewTask from "@/components/Modals/Task/ViewTask";

interface TaskProps {
  task: Task;
  subtasks?: Task[];
}

function Task({ task, subtasks = [] }: TaskProps) {
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
      subtasks,
    },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const subtasksCount = subtasks.length;

  const completedSubtasks = subtasks.filter(
    ({ completed }) => completed === true,
  );

  const completedSubtasksCount = completedSubtasks.length;

  return (
    <ViewTask task={task} subtasks={subtasks}>
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
      {!subtasksCount ? null : (
        <p className=" text-sm text-muted-foreground">
          {completedSubtasksCount} of {subtasksCount} subtasks
        </p>
      )}
    </div>
    </ViewTask>
  );
}

export default Task;
