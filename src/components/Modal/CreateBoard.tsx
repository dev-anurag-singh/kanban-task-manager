"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import BoardIcon from "@/icons/BoardIcon.svg";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { X } from "lucide-react";

type FormValues = {
  board: string;
  columns: {
    column: string;
  }[];
};

function CreateBoard() {
  const { control, register, handleSubmit } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0">
          <span className="mr-3">
            <BoardIcon />
          </span>
          <span className="text-lg">+ Add New Board</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}

export default CreateBoard;
