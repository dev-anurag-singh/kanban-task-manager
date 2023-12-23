"use client";

import { cn } from "@/lib/utils";
import Column from "./Column";
import { ColumnWithTasks } from "@/lib/types";
import { useState } from "react";

interface ColumnContainerProps {
  columns: ColumnWithTasks[];
}

function ColumnContainer({ columns }: ColumnContainerProps) {
  const [orderedColumns, setOrderedColumns] = useState(columns);

  return (
    <main className={cn("flex gap-6 overflow-x-scroll p-6")}>
      {orderedColumns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </main>
  );
}

export default ColumnContainer;
