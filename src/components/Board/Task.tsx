import { Task as TTask } from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: TTask;
  subtasks: TTask[];
}

function Task({ task, subtasks }: TaskProps) {
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

  const subtasksCount = subtasks?.length;

  const completedSubtasks = subtasks?.filter(
    ({ completed }) => completed === true,
  );

  const completedSubtasksCount = completedSubtasks?.length;

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-[4.25rem] rounded-lg border bg-muted opacity-50"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="group space-y-2 rounded-lg bg-muted px-4 py-6"
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
  );
}

export default Task;
