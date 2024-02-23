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
    .insert({
      title: title,
    })
    .select()
    .single();

  console.log(error);

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

  if (columnsError) throw new Error(columnsError.message);

  return data;
}
