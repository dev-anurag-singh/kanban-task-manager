import { TaskWithSubtasks } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: TaskWithSubtasks;
}

function Task({ task }: TaskProps) {
  const subtasks = task.subtasks;
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

  const subtasksCount = subtasks?.length;

  const completedSubtasks = subtasks?.filter(
    ({ completed }) => completed === true,
  );

  const completedSubtasksCount = completedSubtasks?.length;

  // if (isDragging) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       className="h-[4.25rem] rounded-lg border bg-muted opacity-50"
  //     ></div>
  //   );
  // }

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
      {!subtasksCount ? null : (
        <p className=" text-sm text-muted-foreground">
          {completedSubtasksCount} of {subtasksCount} subtasks
        </p>
      )}
    </div>
  );
}

export default Task;
