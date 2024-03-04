import { z } from "zod";

export const TaskValidator = z.object({
  title: z.string().min(4, { message: "Minimun 4 characters" }),
  subtasks: z
    .object({
      title: z.string().min(1, { message: "Can't be empty" }),
    })
    .array(),
  description: z.string(),
});

export type TTaskValidator = z.infer<typeof TaskValidator>;
