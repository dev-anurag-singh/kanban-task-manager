import { z } from "zod";

export const BoardValidator = z.object({
  title: z.string().min(4, { message: "Minimun 4 characters" }),
  columns: z
    .object({
      column: z.string().min(4, {
        message: "Minimun 4 characters",
      }),
      columnId: z.number().optional(),
    })
    .array(),
});

export type TBoardValidator = z.infer<typeof BoardValidator>;
