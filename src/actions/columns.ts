"use server";

import supabaseServerClient from "@/lib/supabase/serverClient";

export async function getColumnsByBoardId(id: string) {
  const supabase = await supabaseServerClient();

  const { data } = await supabase
    .from("columns")
    .select(`*,tasks(*)`)
    .eq("board_id", id)
    .order("order", { ascending: true })
    .order("order", { foreignTable: "tasks", ascending: true });

  return data;
}
