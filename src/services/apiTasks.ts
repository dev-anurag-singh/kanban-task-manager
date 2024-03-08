import { supabaseBrowserClient } from "@/lib/supabase/browserClient";
import { Tasks } from "@/lib/types";

export async function reorderTasks(tasks: Tasks) {
  const { data, error } = await supabaseBrowserClient
    .from("tasks")
    .upsert(tasks)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function createTask({
  title,
  subtasks,
  description,
  column_id,
  board_id,
}: {
  title: string;
  subtasks: { title: string }[];
  description: string;
  column_id: number;
  board_id: string;
}) {
  const { count, error: countError } = await supabaseBrowserClient
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("column_id", column_id);

  if (countError) throw new Error(countError.message);

  const { data, error } = await supabaseBrowserClient
    .from("tasks")
    .insert({
      title,
      description,
      order: count,
      column_id,
      board_id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (subtasks.length) {
    const postData = subtasks.map((subtask, i) => ({
      title: subtask.title,
      order: i,
      column_id,
      board_id,
      parent_id: data.id,
    }));

    const { data: subtasksData, error } = await supabaseBrowserClient
      .from("tasks")
      .insert(postData);
  }

  return data;
}
export async function updateTask({
  title,
  subtasks,
  description,
  column_id,
  board_id,
  id,
}: {
  title: string;
  subtasks: { title: string; completed?: boolean }[];
  description: string;
  column_id: number;
  board_id: string;
  order: number;
  id: string;
}) {
  const { data, error } = await supabaseBrowserClient
    .from("tasks")
    .update({
      title,
      description,
      column_id,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  const { error: deleteError } = await supabaseBrowserClient
    .from("tasks")
    .delete()
    .eq("parent_id", id);

  if (deleteError) throw new Error("Something went wrong!");

  if (subtasks.length) {
    const postData = subtasks.map((subtask, i) => ({
      title: subtask.title,
      order: i,
      column_id,
      board_id,
      parent_id: data.id,
      completed: subtask.completed || false,
    }));

    const { data: subtasksData, error } = await supabaseBrowserClient
      .from("tasks")
      .insert(postData);
  }

  return data;
}

export async function updateTaskStatus({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) {
  const { data, error } = await supabaseBrowserClient
    .from("tasks")
    .update({ completed: status })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteTask(id:string){
  const {error} = await supabaseBrowserClient.from('tasks').delete().eq('id',id);

  if(error) throw new Error(error.message);
}