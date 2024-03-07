import { z } from "zod";

export const TaskValidator = z.object({
  title: z.string().min(1, { message: "Can't be empty" }),
  subtasks: z
    .object({
      title: z.string().min(1, { message: "Can't be empty" }),
    })
    .array(),
  description: z.string(),
  column_id: z.number(),
});

export type TTaskValidator = z.infer<typeof TaskValidator>;
