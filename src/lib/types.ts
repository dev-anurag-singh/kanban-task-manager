import { Tables } from "./database.types";

export type Column = Tables<"columns">;
export type Task = Tables<"tasks">;
export type Board = Tables<"boards">;

export type Columns = Column[];
export type Tasks = Task[];
export type TaskAndSubtasks = { task: Task; subtasks: Task[] };

export type BoardWithColumns = Board & { columns: Column[] };

export type TaskWithSubtasks = Task & {subtasks:Task[]}
