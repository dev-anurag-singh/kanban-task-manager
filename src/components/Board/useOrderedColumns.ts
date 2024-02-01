import { ColumnWithTasks, ColumnWithTasksAndSubtasks } from "@/lib/types";
import { useState } from "react";

export const useOrderedColumns = (columns: ColumnWithTasks[]) => {
  const [orderedColumns, setOrderedColumns] = useState<
    ColumnWithTasksAndSubtasks[]
  >(() => {
    return columns.map((col) => {
      const columnTasks = col.tasks.filter((task) => !task.parent_task_id);

      const tasks = columnTasks.map((t) => {
        const subtasks = col.tasks.filter(
          (task) => t.id === task.parent_task_id,
        );

        return { ...t, subtasks };
      });

      return { ...col, tasks };
    });
  });

  return { orderedColumns, setOrderedColumns };
};
