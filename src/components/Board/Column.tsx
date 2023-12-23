import type { ColumnWithTasks } from "@/lib/types";
import Task from "./Task";

interface ColumnProps {
  column: ColumnWithTasks;
}

async function Column({ column: { id, title, tasks } }: ColumnProps) {
  const tasksCount = tasks.length;

  return (
    <div key={id} className="w-72 shrink-0 space-y-6">
      <div className="space-x-2 text-md uppercase text-muted-foreground">
        <span>{title}</span>
        <span>({tasksCount})</span>
      </div>
      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
