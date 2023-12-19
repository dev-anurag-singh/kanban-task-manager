import { Tables } from "./database.types";

export type Column = Tables<"columns">;
export type Task = Tables<"tasks">;
export type Board = Tables<"boards">;
export type Subtasks = Tables<"subtasks">;

export type TaskWithSubtasks = Task & { subtasks: Subtasks[] };
export type BoardWithColumns = Board & { columns: Column[] };
