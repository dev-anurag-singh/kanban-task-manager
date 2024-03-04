"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TTaskValidator, TaskValidator } from "@/lib/validators/task-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

function TaskForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTaskValidator>({
    resolver: zodResolver(TaskValidator),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="task-title">Title</Label>
          <Input
            {...register("title")}
            // error={errors.title?.message}
            id="task-title"
            placeholder="e.g. Take coffee break"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description")}
            // error={errors.title?.message}
            id="description"
            placeholder="e.g. Take coffee break"
            className="resize-none"
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
                    // error={
                    //   errors.columns && errors.columns[index]?.column?.message
                    // }
                    className="basis-full"
                  />
                  <Button
                    onClick={() => 
                      remove(index)}
                    type="button"
                    variant={"ghost"}
                    
                    size={"icon"}
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
            >
              + Add New Subtask
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
