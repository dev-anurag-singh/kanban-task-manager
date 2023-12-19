"use server";

import supabaseServerClient from "@/lib/supabase/serverClient";
import { cache } from "react";

export const getBoardById = cache(async (id: string) => {
  const supabase = await supabaseServerClient();

  const { data } = await supabase
    .from("boards")
    .select(`*,columns(*)`)
    .eq("id", id)
    .single();

  return data;
});
