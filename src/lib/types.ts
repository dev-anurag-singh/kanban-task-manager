import { Tables } from "./database.types";

export type Column = Tables<"columns">;
export type Task = Tables<"tasks">;
export type Board = Tables<"boards">;

export type ColumnWithTasks = Column & { tasks: Task[] };
export type BoardWithColumns = Board & { columns: Column[] };
