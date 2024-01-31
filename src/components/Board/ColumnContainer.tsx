"use client";
import Column from "./Column";
import { ColumnWithTasks, Task as TTask } from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useReorderColumns } from "./useReorderColumns";
import Task from "./Task";

interface ColumnContainerProps {
  columns: ColumnWithTasks[];
}

function ColumnContainer({ columns }: ColumnContainerProps) {
  const [orderedColumns, setOrderedColumns] = useState(columns);
  const [mounted, setMounted] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<null | string>(null);
  const [activeTask, setActiveTask] = useState<{
    task: TTask;
    subtasks: TTask[];
  } | null>(null);
  const { reorderColumns, isPending } = useReorderColumns();

  const activeColumn = useMemo(() => {
    return (
      orderedColumns.find((column) => column.id === activeColumnId) || null
    );
  }, [activeColumnId, orderedColumns]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DndContext
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-start gap-6">
        <SortableContext items={orderedColumns}>
          {orderedColumns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </SortableContext>
      </div>

      {createPortal(
        <DragOverlay>
          {activeColumn && <Column column={activeColumn} />}
          {activeTask && (
            <Task task={activeTask.task} subtasks={activeTask.subtasks} />
          )}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    setActiveColumnId(null);
    setActiveTask(null);
    // When Columns are Dragged
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    if (active.data.current?.type === "Column") {
      const reorderedColumns = arrayMove(
        orderedColumns,
        active.data.current?.sortable.index,
        over.data.current?.sortable.index,
      ).map((item, index) => ({ ...item, order: index }));

      setOrderedColumns(reorderedColumns);

      // updating data into the database

      reorderColumns(reorderedColumns);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumnId(event.active.data.current.id);
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask({
        task: event.active.data.current.task,
        subtasks: event.active.data.current.subtasks,
      });
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    console.log(active, over);

    if (!over) return;

    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveATask) return;

    let newOrderedData = [...orderedColumns];

    const sourceList = newOrderedData.find(
      (col) => col.id === active.data.current?.task.column_id,
    );
    const destList = newOrderedData.find((col) => col.id === over.id);

    if (!sourceList || !destList) {
      return;
    }

    if (!sourceList.columnTasks) {
      sourceList.columnTasks = [];
    }
    if (!destList.columnTasks) {
      destList.columnTasks = [];
    }

    if (isActiveATask && isOverATask) {
      const reorderedTasks = arrayMove(
        sourceList.columnTasks,
        active.data.current?.sortable.index,
        over.data.current?.sortable.index,
      );
      console.log(reorderedTasks);

      reorderedTasks.forEach((task, i) => {
        task.order = i;
      });

      sourceList.columnTasks = reorderedTasks;

      setOrderedColumns(newOrderedData);
    }
    if (isActiveATask && isOverAColumn) {
      if (active.data.current?.task.column_id !== over.id) {
        // Remove Task form source List
        const [movedTask] = sourceList.columnTasks.splice(
          active.data.current?.sortable.index,
          1,
        );
        console.log(movedTask);

        movedTask.column_id = over.id as string;

        destList.columnTasks.splice(0, 0, movedTask);

        sourceList.columnTasks.forEach((t, i) => {
          t.order = i;
        });

        destList.columnTasks.forEach((t, i) => {
          t.order = i;
        });

        console.log(newOrderedData);

        setOrderedColumns(newOrderedData);
      }
    }
  }
}

export default ColumnContainer;
