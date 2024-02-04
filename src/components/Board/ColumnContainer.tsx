"use client";
import Column from "./Column";
import type { Columns, TaskAndSubtasks, Tasks } from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
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
  // CUSTOM HOOK TO STRUCTURE TASKS
  // const { orderedColumns, setOrderedColumns } = useOrderedColumns(columns);
  // const [orderedColumns, setOrderedColumns] = useState(columns);
  const [tasksByColumn, setTasksByColumn] = useState(() => {
    let tasksByColumnId: { [key: number]: Tasks } = {};

    columns.forEach((column) => {
      const { id } = column;
      tasksByColumnId[id] = [...tasks.filter((task) => task.column_id === id)];
    });

    return tasksByColumnId;
  });

  const [activeTask, setActiveTask] = useState<TaskAndSubtasks | null>(null);

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
        <DragOverlay>
          {activeTask && (
            <Task task={activeTask.task} subtasks={activeTask.subtasks} />
          )}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );

  function handleDragEnd() {
    console.log(tasksByColumn);

    setActiveTask(null);
    // When Columns are Dragged
    // const { active, over } = event;
    // if (!over) return;

    // if (active.id === over.id) return;

    // if (active.data.current?.type === "Column") {
    //   const reorderedColumns = arrayMove(
    //     orderedColumns,
    //     active.data.current?.sortable.index,
    //     over.data.current?.sortable.index,
    //   ).map((item, index) => ({ ...item, order: index }));

    //   setOrderedColumns(reorderedColumns);

    //   // updating data into the database
    // }
  }

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask({
        task: event.active.data.current.task,
        subtasks: event.active.data.current.subtasks,
      });
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

    if (activeColumnId !== overColumnId) {
      setTasksByColumn((tasks) => {
        const activeColumnTasks = tasks[activeColumnId];
        const overColumnTasks = tasks[overColumnId];
        const activeIndex = activeColumnTasks.findIndex(
          (t) => t.id === active.id,
        );
        let overIndex;

        if (isOverATask) {
          overIndex = overColumnTasks.findIndex((t) => t.id === over.id);
        } else {
          overIndex = overColumnTasks.length;
        }

        const movedTasks = [
          ...activeColumnTasks.filter(
            (task) =>
              task.id === active.id || task.parent_task_id === active.id,
          ),
        ];

        const updatedMovedTasks = movedTasks.map((task) => {
          const item = { ...task };
          item.column_id = overColumnId;

          return item;
        });

        let newOverClolumnTasks = [...overColumnTasks];

        newOverClolumnTasks
          .splice(overIndex, 0, ...updatedMovedTasks)
          .filter((item) => !item.parent_task_id)
          .map((item, i) => (item.order = i));

        return {
          ...tasks,
          [activeColumnId]: tasks[activeColumnId].filter(
            (task) =>
              task.id !== active.id && task.parent_task_id !== active.id,
          ),
          [overColumnId]: newOverClolumnTasks,
        };
      });
    }
    if (activeColumnId === overColumnId) {
    }
  }
}

export default ColumnContainer;
