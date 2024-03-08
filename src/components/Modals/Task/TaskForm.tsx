"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BoardWithColumns, Task } from "@/lib/types";
import { TTaskValidator, TaskValidator } from "@/lib/validators/task-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useCreateTask } from "./useCreateTask";
import { useUpdateTask } from "./useEditTask";

function TaskForm({
  board: { id, columns },
  closeModal,
  task,
  subtasks,
  edit,
}: {
  board: BoardWithColumns;
  closeModal: () => void;
  task?: Task;
  subtasks?: Task[];
  edit?: boolean;
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTaskValidator>({
    resolver: zodResolver(TaskValidator),
    defaultValues: {
      title: task?.title,
      description: task?.description || "",
      subtasks: subtasks,
      column_id: task?.column_id,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const { addTask, isPending } = useCreateTask();
  const { updateTask, isUpdating } = useUpdateTask();

  function onSubmit(data: TTaskValidator) {
    if (edit) {
      if (task) {
        updateTask(
          { ...data, id: task.id, board_id: id, order: task.order },
          { onSettled: closeModal },
        );
      }
    } else {
      addTask({ ...data, board_id: id }, { onSettled: closeModal });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="task-title">Title</Label>
          <Input
            {...register("title")}
            error={errors.title?.message}
            id="task-title"
            placeholder="e.g. Take coffee break"
            disabled={isPending || isUpdating}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description")}
            error={errors.description?.message}
            id="description"
            placeholder="e.g. Take coffee break"
            className="resize-none"
            disabled={isPending || isUpdating}
          />
        </div>
        <div className="space-y-2">
          <Label>Subtasks</Label>
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-1"
                >
                  <Input
                    {...register(`subtasks.${index}.title`)}
                    error={
                      errors.subtasks && errors.subtasks[index]?.title?.message
                    }
                    className="basis-full"
                    disabled={isPending || isUpdating}
                  />
                  <Button
                    onClick={() => remove(index)}
                    type="button"
                    variant={"ghost"}
                    size={"icon"}
                    disabled={isPending || isUpdating}
                  >
                    <X />
                  </Button>
                </div>
              );
            })}
            <Button
              onClick={() => append({ title: "" })}
              type="button"
              variant="secondary"
              disabled={isPending || isUpdating}
            >
              + Add New Subtask
            </Button>
          </div>
        </div>
        <div className="relative space-y-2">
          <Label htmlFor="select-column">Column</Label>
          <Controller
            render={({ field }) => (
              <Select
                onValueChange={(v) => field.onChange(Number(v))}
                defaultValue={field.value ? field.value.toString() : ""}
                disabled={isPending || isUpdating}
              >
                <SelectTrigger id="select-column">
                  <SelectValue placeholder="Select a column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((col) => (
                    <SelectItem
                      className="capitalize"
                      key={col.id}
                      value={`${col.id}`}
                    >
                      {col.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            control={control}
            name="column_id"
          />
          {errors.column_id && (
            <div
              aria-live="polite"
              className="absolute right-2 top-0  bg-transparent  px-2 text-base text-destructive"
            >
              {errors.column_id.message}
            </div>
          )}
        </div>
        <Button disabled={isPending || isUpdating}>
          {edit ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
