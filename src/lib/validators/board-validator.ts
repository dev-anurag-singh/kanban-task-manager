import { z } from "zod";

export const BoardValidator = z.object({
  board: z.string().min(4, { message: "Minimun 4 characters" }),
  columns: z
    .object({
      column: z.string().min(4, {
        message: "Minimun 4 characters",
      }),
    })
    .array(),
});

export type TBoardValidator = z.infer<typeof BoardValidator>;
