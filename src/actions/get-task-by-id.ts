"use server";

import supabaseServerClient from "@/lib/supabase/serverClient";

export async function getTaskById(id: string) {
  const supabase = await supabaseServerClient();

  const { data } = await supabase
    .from("tasks")
    .select(`*,subtasks(*)`)
    .eq("id", id)
    .single();

  return data;
}
