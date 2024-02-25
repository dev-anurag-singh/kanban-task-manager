"use client";
import { useForm, useFieldArray } from "react-hook-form";
import {
  BoardValidator,
  TBoardValidator,
} from "@/lib/validators/board-validator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBoard } from "./useCreateBoard";

interface BoardFormProps {
  closeModal: () => void;
  edit?: boolean;
}

function BoardForm({ closeModal, edit = false }: BoardFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBoardValidator>({
    resolver: zodResolver(BoardValidator),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const { addBoard, isPending } = useCreateBoard();

  const onSubmit = (data: TBoardValidator) => {
    addBoard(data, {
      onSettled: closeModal,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="board-name">Board Name</Label>
          <Input
            {...register("title")}
            error={errors.title?.message}
            id="board-name"
            placeholder="e.g. web design"
            disabled={isPending}
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
                    error={
                      errors.columns && errors.columns[index]?.column?.message
                    }
                    disabled={isPending}
                    className="basis-full"
                  />
                  <Button
                    onClick={() => remove(index)}
                    type="button"
                    variant={"ghost"}
                    disabled={isPending}
                    size={"icon"}
                  >
                    <X />
                  </Button>
                </div>
              );
            })}
            <Button
              disabled={isPending}
              onClick={() => append({ column: "" })}
              type="button"
              variant="secondary"
            >
              + Add new column
            </Button>
          </div>
        </div>
        <Button disabled={isPending}>
          {edit ? "Save changes" : "Create New Board"}
        </Button>
      </div>
    </form>
  );
}

export default BoardForm;
