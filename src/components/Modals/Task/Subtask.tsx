import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUpdateTaskStatus } from "./useUpdateTaskStatus";

function Subtask({ t }: { t: Task }) {
  const [isCompleted, setIsCompleted] = useState(t.completed || false);

  const { updateTaskStatus } = useUpdateTaskStatus();

  return (
    <div className="flex items-center gap-4 rounded-sm bg-background p-3">
      <Checkbox
        checked={isCompleted}
        onCheckedChange={() => {
          let checkedState = isCompleted;
          updateTaskStatus(
            { status: !checkedState, id: t.id },
            { onError: () => setIsCompleted(checkedState) },
          );
          setIsCompleted((s) => !s);
        }}
      />

      <div
        className={cn("text-sm", {
          "text-muted-foreground line-through": isCompleted,
        })}
      >
        {t.title}
      </div>
    </div>
  );
}

export default Subtask;
