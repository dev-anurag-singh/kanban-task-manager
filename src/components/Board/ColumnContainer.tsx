"use client";
import Column from "./Column";
import { ColumnWithTasks } from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useReorderColumns } from "./useReorderColumns";

interface ColumnContainerProps {
  columns: ColumnWithTasks[];
}

function ColumnContainer({ columns }: ColumnContainerProps) {
  const [orderedColumns, setOrderedColumns] = useState(columns);
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<null | string>(null);

  const { reorderColumns, isPending } = useReorderColumns();

  const activeColumn = useMemo(() => {
    return orderedColumns.find((column) => column.id === activeId) || null;
  }, [activeId, orderedColumns]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
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
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    // When Columns are Dragged
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const reorderedColumns = arrayMove(
      orderedColumns,
      active.data.current?.sortable.index,
      over.data.current?.sortable.index,
    ).map((item, index) => ({ ...item, order: index }));

    setOrderedColumns(reorderedColumns);

    // updating data into the database

    reorderColumns(reorderedColumns);
  }

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveId(event.active.data.current.id);
    }
  }
}

export default ColumnContainer;
