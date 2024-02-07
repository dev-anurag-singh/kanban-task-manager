"use client";
import Column from "./Column";
import type {
  Columns,
  Task as TTask,
  TaskAndSubtasks,
  Tasks,
} from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Task from "./Task";

interface ColumnContainerProps {
  columns: Columns;
  tasks: Tasks;
}

function ColumnContainer({ columns, tasks }: ColumnContainerProps) {
  const [mounted, setMounted] = useState(false);
  const [tasksByColumn, setTasksByColumn] = useState(() => {
    let tasksByColumnId: { [key: number]: Tasks } = {};

    columns.forEach((column) => {
      const { id } = column;
      tasksByColumnId[id] = [...tasks.filter((task) => task.column_id === id)];
    });

    return tasksByColumnId;
  });

  const [activeTask, setActiveTask] = useState<TTask | null>(null);

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
        <SortableContext items={columns}>
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasksByColumn[column.id]}
            />
          ))}
        </SortableContext>
      </div>

      {createPortal(
        <DragOverlay>{activeTask && <Task task={activeTask} />}</DragOverlay>,
        document.body,
      )}
    </DndContext>
  );

  function handleDragEnd() {
    console.log(tasksByColumn);

    setActiveTask(null);
  }

  function handleDragStart(event: DragStartEvent) {
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

    if (!isActiveATask) return;

    const activeColumnId = active.data.current?.task.column_id;
    let overColumnId: number;
    if (isOverATask) {
      overColumnId = over.data.current?.task.column_id;
    } else {
      overColumnId = over.id as number;
    }

    console.log(over);

    if (activeColumnId !== overColumnId) {
      setTasksByColumn((tasks) => {
        const activeColumnTasks = tasks[activeColumnId];
        const overColumnTasks = tasks[overColumnId];

        let overIndex;

        if (isOverATask) {
          overIndex = overColumnTasks.findIndex((t) => t.id === over.id);
        } else {
          overIndex = overColumnTasks.length;
        }

        const movedTask = activeColumnTasks.find(
          (task) => task.id === active.id,
        );
        if (!movedTask) {
          return { ...tasks };
        }

        const updatedMovedTask = { ...movedTask };

        updatedMovedTask.column_id = overColumnId;

        let newOverClolumnTasks = [...overColumnTasks];

        newOverClolumnTasks.splice(overIndex, 0, updatedMovedTask);

        newOverClolumnTasks.forEach((item, i) => (item.order = i));

        return {
          ...tasks,
          [activeColumnId]: tasks[activeColumnId].filter(
            (task) => task.id !== active.id,
          ),
          [overColumnId]: newOverClolumnTasks,
        };
      });
    }
    if (activeColumnId === overColumnId) {
      setTasksByColumn((tasks) => {
        const activeColumnTasks = tasks[activeColumnId];
        const activeIndex = activeColumnTasks.findIndex(
          (t) => t.id === active.id,
        );
        let overIndex;

        if (isOverATask) {
          overIndex = activeColumnTasks.findIndex((t) => t.id === over.id);
        } else {
          overIndex = activeColumnTasks.length;
        }

        let reOrderedTasks = arrayMove(
          activeColumnTasks,
          activeIndex,
          overIndex,
        );

        const overColumnTasks = reOrderedTasks.map((task, i) => {
          const item = { ...task };
          item.order = i;
          return item;
        });

        return {
          ...tasks,
          [activeColumnId]: overColumnTasks,
        };
      });
    }
  }
}

export default ColumnContainer;
