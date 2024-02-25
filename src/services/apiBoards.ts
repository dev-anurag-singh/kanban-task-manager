import { supabaseBrowserClient } from "@/lib/supabase/browserClient";

export async function fetchBoards() {
  const { data, error } = await supabaseBrowserClient
    .from("boards")
    .select("*");

  if (error) throw new Error(error.message);

  return data;
}

export async function createNewBoard({
  title,
  columns,
}: {
  title: string;
  columns: { column: string }[];
}) {
  const { data, error } = await supabaseBrowserClient
    .from("boards")
    .insert({ title: title })
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (!columns.length) {
    return data;
  }

  // WHEN BOARD HAVE COLUMNS

  const newColumnsData = <
    {
      title: string;
      order: number;
      board_id: string;
    }[]
  >[];

  columns.forEach((col, i) => {
    newColumnsData.push({ title: col.column, order: i, board_id: data.id });
  });

  const { data: columnsData, error: columnsError } = await supabaseBrowserClient
    .from("columns")
    .insert(newColumnsData)
    .select();

  if (columnsError) {
    const { error } = await supabaseBrowserClient
      .from("boards")
      .delete()
      .eq("id", data.id);

    throw new Error(columnsError.message);
  }

  return data;
}

export async function updateBoard({
  title,
  board_id,
  columns,
}: {
  title: string;
  board_id: string;
  columns: { column: string; id?: string }[];
}) {
  const { data, error } = await supabaseBrowserClient
    .from("boards")
    .update({ title: title })
    .eq("id", board_id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (!columns.length) {
    return data;
  }

  // WHEN BOARD HAVE COLUMNS

  const newColumnsData = <
    {
      title: string;
      order: number;
      board_id: string;
      id?: string;
    }[]
  >[];

  columns.forEach((col, i) => {
    newColumnsData.push({
      title: col.column,
      order: i,
      board_id: data.id,
      id: col.id,
    });
  });

  const { data: columnsData, error: columnsError } = await supabaseBrowserClient
    .from("columns")
    .upsert(newColumnsData)
    .select();

  if (columnsError) {
    throw new Error(columnsError.message);
  }

  return data;
}
