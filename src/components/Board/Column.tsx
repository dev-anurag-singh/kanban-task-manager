import type { ColumnWithTasksId } from "@/lib/types";
import Task from "./Task";

interface ColumnProps {
  column: ColumnWithTasksId
}

function Column({ column }: ColumnProps) {
  const tasksCount = column.tasks.length;

  return (
    <div key={column.id} className="space-y-6">
      <div className="space-x-2 text-md uppercase text-muted-foreground">
        <span>{column.title}</span>
        <span>({tasksCount})</span>
      </div>
      <div className="flex flex-col gap-5">
        {column.tasks.map((task) => (
          <Task key={task.id} taskId={task.id} />
        ))}
      </div>
    </div>
  );
}

export default Column;
