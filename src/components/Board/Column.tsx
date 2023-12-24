import type { ColumnWithTasks } from "@/lib/types";
import Task from "./Task";

interface ColumnProps {
  column: ColumnWithTasks;
}

async function Column({ column: { id, title, tasks } }: ColumnProps) {
  // Tasks which are direct child of a column
  const columnTasks = tasks.filter((task) => !task.parent_task_id);

  const tasksCount = columnTasks.length;

  return (
    <div key={id} className="w-72 shrink-0 space-y-6">
      <div className="space-x-2 text-md uppercase text-muted-foreground">
        <span>{title}</span>
        <span>({tasksCount})</span>
      </div>
      <div className="flex flex-col gap-5">
        {columnTasks.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} />
        ))}
      </div>
    </div>
  );
}

export default Column;
