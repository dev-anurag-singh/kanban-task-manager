"use server";

import supabaseServerClient from "@/lib/supabase/serverClient";
import { cache } from "react";

export const getBoardById = cache(async (id: string) => {
  const supabase = await supabaseServerClient();

  const { data } = await supabase
    .from("boards")
    .select(`*,columns(*),tasks(*)`)
    .eq("id", id)
    .order("order", { foreignTable: "columns", ascending: true })
    .order("order", { foreignTable: "tasks", ascending: true })
    .single();

  return data;
});
