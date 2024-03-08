"use client";
import Column from "./Column";
import type {
  BoardWithColumns,
  Columns,
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
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Task from "./Task";
import { Button } from "../ui/button";
import BoardSkeleton from "./BoardSkeleton";
import EditBoard from "../Modals/Board/EditBoard";
import _ from "lodash";
import { useReorderTasks } from "./useReorderTasks";

interface ColumnContainerProps {
  columns: Columns;
  tasks: Tasks;
  board: BoardWithColumns;
}

function tasksByColumnId({
  columns,
  tasks,
}: {
  columns: Columns;
  tasks: Tasks;
}) {
  let tasksByColumnId: { [key: number]: Tasks } = {};

  columns.forEach((column) => {
    const { id } = column;
    tasksByColumnId[id] = [...tasks.filter((task) => task.column_id === id)];
  });

  return tasksByColumnId;
}

function ColumnContainer({ board, columns, tasks }: ColumnContainerProps) {
  const [mounted, setMounted] = useState(false);
  const [tasksByColumn, setTasksByColumn] = useState(() =>
    tasksByColumnId({ columns, tasks }),
  );
  const [orderedColumns, setOrderedColumns] = useState(columns);

  const [activeTask, setActiveTask] = useState<TaskAndSubtasks | null>(null);

  const [updatedList, setUpdatedList] = useState<Tasks | null>(null);

  const { reorder } = useReorderTasks();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  useEffect(() => {
    setTasksByColumn(() => tasksByColumnId({ columns, tasks }));
    setOrderedColumns(columns);
  }, [columns, tasks]);

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
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={orderedColumns}
          >
            {orderedColumns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasksByColumn[column.id]}
                board={board}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask && (
              <Task board={board} task={activeTask.task} subtasks={activeTask.subtasks} />
            )}
          </DragOverlay>,
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

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    if (updatedList) {
      reorder(updatedList, {
        onSettled: () => setUpdatedList(null),
      });
    }
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
        const activeColumnTasks = _.cloneDeep(tasks[activeColumnId]);
        const overColumnTasks = _.cloneDeep(tasks[overColumnId]);

        let overIndex;

        if (isOverATask) {
          overIndex = overColumnTasks.findIndex((t) => t.id === over.id);
        } else {
          overIndex = overColumnTasks.length;
        }

        const movedTasks = activeColumnTasks.filter(
          (task) => task.id === active.id || task.parent_id === active.id,
        );

        movedTasks.forEach((task) => (task.column_id = overColumnId));

        let newOverClolumnTasks = [...overColumnTasks];

        newOverClolumnTasks.splice(overIndex, 0, ...movedTasks);

        let overTasks = newOverClolumnTasks.filter((t) => !t.parent_id);

        overTasks.forEach((item, i) => (item.order = i));

        setUpdatedList(newOverClolumnTasks);

        return {
          ...tasks,
          [activeColumnId]: tasks[activeColumnId].filter(
            (task) => task.id !== active.id && task.parent_id !== active.id,
          ),
          [overColumnId]: newOverClolumnTasks,
        };
      });
    }
    if (activeColumnId === overColumnId) {
      setTasksByColumn((tasks) => {
        const activeColumnTasks = _.cloneDeep(tasks[activeColumnId]);
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

        reOrderedTasks.forEach((task, i) => (task.order = i));

        setUpdatedList(reOrderedTasks);

        return {
          ...tasks,
          [activeColumnId]: reOrderedTasks,
        };
      });
    }
  }
}

export default ColumnContainer;
