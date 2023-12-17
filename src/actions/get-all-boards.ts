"use server";

import supabaseServerClient from "@/lib/supabase/serverClient";

export async function getAllBoards() {
  const supabase = await supabaseServerClient();

  const { data } = await supabase.from("boards").select("*");

  return data;
}
