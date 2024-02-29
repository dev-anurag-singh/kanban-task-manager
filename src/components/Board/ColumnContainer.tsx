"use client";
import Column from "./Column";
import type {
  BoardWithColumns,
  Columns,
  Task as TTask,
  Tasks,
} from "@/lib/types";
import {
  DndContext,
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
import { Button } from "../ui/button";
import BoardSkeleton from "./BoardSkeleton";
import EditBoard from "../Modals/Board/EditBoard";

interface ColumnContainerProps {
  columns: Columns;
  tasks: Tasks;
  board: BoardWithColumns;
}

function ColumnContainer({ board, columns, tasks }: ColumnContainerProps) {
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

  // TO AVOID HYDRATION ERROR

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <BoardSkeleton />;
  }

  return (
    <main className="flex gap-6 overflow-x-auto p-4">
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
                // tasks={tasksByColumn[column.id]}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>{activeTask && <Task task={activeTask} />}</DragOverlay>,
          document.body,
        )}
      </DndContext>

      <div className="grid w-72 shrink-0 place-content-center rounded-md bg-column">
        <EditBoard data={board}>
          <Button variant={"link"} className="text-2xl text-muted-foreground">
            + New Column
          </Button>
        </EditBoard>
      </div>
    </main>
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
