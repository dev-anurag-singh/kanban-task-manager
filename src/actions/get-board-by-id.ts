"use server";

import supabaseServerClient from "@/lib/supabase/serverClient";

export async function getBoardById(id: string) {
  const supabase = await supabaseServerClient();

  const { data } = await supabase
    .from("boards")
    .select(`*,columns(id)`)
    .eq("id", id)
    .single();

  return data;
}
