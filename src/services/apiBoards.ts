import { supabaseBrowserClient } from "@/lib/supabase/browserClient";

export async function fetchBoards() {
  const { data, error } = await supabaseBrowserClient
    .from("boards")
    .select("*");

  if (error) throw new Error(error.message);

  return data;
}
