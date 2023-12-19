"use server";

import supabaseServerClient from "@/lib/supabase/serverClient";

export async function getTasksByColumnId(id: string) {
  const supabase = await supabaseServerClient();

  const { data } = await supabase
    .from("tasks")
    .select(`*,subtasks(*)`)
    .eq("column_id", id);

  return data;
}
