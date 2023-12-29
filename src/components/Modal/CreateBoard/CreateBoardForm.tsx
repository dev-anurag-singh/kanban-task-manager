"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type FormValues = {
  board: string;
  columns: {
    column: string;
  }[];
};

function CreateBoardForm() {
  const { control, register, handleSubmit } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="board-name">Board Name</Label>
          <Input
            {...register("board")}
            id="board-name"
            placeholder="e.g. web design"
          />
        </div>
        <div className="space-y-2">
          <Label>Board Columns</Label>
          <div className="flex flex-col gap-3">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-1"
                >
                  <Input
                    {...register(`columns.${index}.column`)}
                    className="basis-full"
                  />
                  <Button
                    onClick={() => remove(index)}
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
              onClick={() => append({ column: "" })}
              type="button"
              variant="secondary"
            >
              + Add new column
            </Button>
          </div>
        </div>
        <Button>Create New Board</Button>
      </div>
    </form>
  );
}

export default CreateBoardForm;
