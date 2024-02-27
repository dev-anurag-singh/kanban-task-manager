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
import { BoardWithColumns } from "@/lib/types";
import { useUpdateBoard } from "./useUpdateBoard";
import { useState } from "react";

interface BoardFormProps {
  closeModal: () => void;
  edit?: boolean;
  data?: BoardWithColumns;
}

function BoardForm({ closeModal, edit = false, data }: BoardFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBoardValidator>({
    resolver: zodResolver(BoardValidator),
    defaultValues: {
      title: data?.title,
      columns: data?.columns.map((col) => ({
        column: col.title,
        columnId: col.id,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const [removedColumns, setRemovedColumns] = useState<number[]>([]);

  const { addBoard, isPending } = useCreateBoard();
  const { editBoard, isPending: isUpdating } = useUpdateBoard();

  const onSubmit = (formData: TBoardValidator) => {
    if (edit) {
      if (data) {
        editBoard(
          { ...formData, board_id: data?.id, removedColumns },
          {
            onSettled: closeModal,
          },
        );
      }
    } else {
      addBoard(formData, {
        onSettled: closeModal,
      });
    }
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
            disabled={isPending || isUpdating}
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
                    disabled={isPending || isUpdating}
                    className="basis-full"
                  />
                  <Button
                    onClick={() => {
                      remove(index);
                      if (field.columnId) {
                        setRemovedColumns((s) => [...s, field.columnId!]);
                      }
                    }}
                    type="button"
                    variant={"ghost"}
                    disabled={isPending || isUpdating}
                    size={"icon"}
                  >
                    <X />
                  </Button>
                </div>
              );
            })}
            <Button
              disabled={isPending || isUpdating}
              onClick={() => append({ column: "" })}
              type="button"
              variant="secondary"
            >
              + Add new column
            </Button>
          </div>
        </div>
        <Button disabled={isPending || isUpdating}>
          {edit ? "Save changes" : "Create New Board"}
        </Button>
      </div>
    </form>
  );
}

export default BoardForm;
