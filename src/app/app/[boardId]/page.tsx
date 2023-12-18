import { getColumnsByBoardId } from "@/actions/get-columns-by-board";
import Column from "@/components/Board/Column";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

async function BoardPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const columns = await getColumnsByBoardId(params.boardId);

  if (!columns || !columns.length) {
    return (
      <main className="grid place-items-center p-6">
        <div className=" max-w-[21rem] space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            This board is empty. Create a new column to get started.
          </p>
          <Button size={"lg"}>+ Add new column</Button>
        </div>
      </main>
    );
  }

  return (
    <main className={cn("flex gap-6 overflow-x-scroll p-6")}>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </main>
  );
}

export default BoardPage;
