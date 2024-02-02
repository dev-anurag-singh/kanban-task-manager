"use client";
import Column from "./Column";
import {
  ColumnWithTasks,
  ColumnWithTasksAndSubtasks,
  TaskWithSubtasks,
} from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useReorderColumns } from "./useReorderColumns";
import Task from "./Task";
import { useOrderedColumns } from "./useOrderedColumns";

interface ColumnContainerProps {
  columns: ColumnWithTasks[];
}

function ColumnContainer({ columns }: ColumnContainerProps) {
  const [mounted, setMounted] = useState(false);
  // CUSTOM HOOK TO STRUCTURE TASKS
  const { orderedColumns, setOrderedColumns } = useOrderedColumns(columns);
  const [activeColumn, setActiveColumn] =
    useState<null | ColumnWithTasksAndSubtasks>(null);
  const [activeTask, setActiveTask] = useState<TaskWithSubtasks | null>(null);
  const { reorderColumns, isPending } = useReorderColumns();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

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
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <div className=" flex gap-6">
        <SortableContext items={orderedColumns}>
          {orderedColumns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </SortableContext>
      </div>

      {createPortal(
        <DragOverlay>
          {activeColumn && <Column column={activeColumn} />}
          {activeTask && <Task task={activeTask} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
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
      setActiveColumn(event.active.data.current.column);
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveATask) return;

    const newOrderedData = [...orderedColumns];

    const activeTaskColumn = active.data.current?.task.column_id;

    let sourceList = newOrderedData.find((col) => col.id === activeTaskColumn);

    if (!sourceList) {
      return;
    }

    if (isOverATask) {
      const overTaskColumn = over.data.current?.task.column_id;

      // If dragged inside the same column
      if (activeTaskColumn === overTaskColumn) {
        const reorderedTasks = arrayMove(
          sourceList.tasks,
          active.data.current?.sortable.index,
          over.data.current?.sortable.index,
        ).map((task, i) => ({ ...task, order: i }));

        sourceList.tasks = reorderedTasks;

        console.log(reorderedTasks);

        setOrderedColumns(newOrderedData);
      }
      // If dragged insie another column
      else {
        let destList = newOrderedData.find((col) => col.id === overTaskColumn);
        if (!destList) {
          return;
        }
        const activeIndex = sourceList.tasks.findIndex(
          (t) => t.id === active.data.current?.task.id,
        );
        const overIndex = destList.tasks.findIndex(
          (t) => t.id === over.data.current?.task.id,
        );

        // Remove Task form source List
        const [movedTask] = sourceList.tasks.splice(activeIndex, 1);

        movedTask.column_id = overTaskColumn;
        movedTask.subtasks.forEach((sub) => {
          sub.column_id = overTaskColumn;
        });

        destList.tasks.splice(overIndex, 0, movedTask);
        sourceList.tasks.forEach((t, i) => {
          t.order = i;
        });

        destList.tasks.forEach((t, i) => {
          t.order = i;
        });

        setOrderedColumns(newOrderedData);
      }
    }
    if (isOverAColumn) {
      // If dragged over another column

      if (activeTaskColumn !== over.id) {
        let destList = newOrderedData.find((col) => col.id === over.id);
        if (!destList) {
          return;
        }
        const activeIndex = sourceList.tasks.findIndex(
          (t) => t.id === active.data.current?.task.id,
        );
        const overIndex = destList.tasks.length;
        // Remove Task form source List
        const [movedTask] = sourceList.tasks.splice(activeIndex, 1);
        movedTask.column_id = over.id as string;
        movedTask.subtasks.forEach((sub) => {
          sub.column_id = over.id as string;
        });
        destList.tasks.splice(overIndex, 0, movedTask);
        sourceList.tasks.forEach((t, i) => {
          t.order = i;
        });
        destList.tasks.forEach((t, i) => {
          t.order = i;
        });
        setOrderedColumns(newOrderedData);
      }
    }
  }
}

export default ColumnContainer;
