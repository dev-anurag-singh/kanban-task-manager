import { getBoardById } from "@/actions/boards";
import ColumnContainer from "@/components/Board/ColumnContainer";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

async function BoardPage({
  params,
}: {
  params: {
    boardId: string;
  };
}) {
  const board = await getBoardById(params.boardId);

  if (!board) {
    notFound();
  }

  if (!board.columns || !board.columns.length) {
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

  return <ColumnContainer columns={board.columns} tasks={board.tasks} />;
}

export default BoardPage;
