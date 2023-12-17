import { getBoardById } from "@/actions/get-board-by-id";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";

async function BoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}) {
  const board = await getBoardById(params.boardId);

  if (!board) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr]">
      <Navbar board={board} />
      {children}
    </div>
  );
}

export default BoardLayout;
