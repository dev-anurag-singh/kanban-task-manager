import type { Column } from "@/lib/types";
import Task from "./Task";
import { getTasksByColumnId } from "@/actions/get-tasks-by-column-id";

interface ColumnProps {
  column: Column;
}

async function Column({ column }: ColumnProps) {
  const tasks = await getTasksByColumnId(column.id);
  const tasksCount = tasks?.length;

  return (
    <div key={column.id} className="space-y-6">
      <div className="space-x-2 text-md uppercase text-muted-foreground">
        <span>{column.title}</span>
        <span>({tasksCount})</span>
      </div>
      <div className="flex flex-col gap-5">
        {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
      </div>
    </div>
  );
}

export default Column;
