import { supabaseBrowserClient } from "@/lib/supabase/browserClient";
import { Column } from "@/lib/types";

export async function reorderColumns(columnsData: Column[]) {
  // REMOVING TASKS
  const upsertData = columnsData.map((data) => ({
    id: data.id,
    title: data.title,
    order: data.order,
    board_id: data.board_id,
    created_at: data.created_at,
    user_id: data.user_id,
  }));

  const { data, error } = await supabaseBrowserClient
    .from("columns")
    .upsert(upsertData)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
