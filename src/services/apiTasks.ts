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
