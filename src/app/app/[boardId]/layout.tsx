import { getBoardById } from "@/actions/boards";
import Navbar from "@/components/Board/Navbar";
import { notFound } from "next/navigation";

interface BoardLayoutProps {
  params: {
    boardId: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: BoardLayoutProps) {
  const board = await getBoardById(params.boardId);

  return {
    title: board?.title,
  };
}

async function BoardLayout({ children, params }: BoardLayoutProps) {
  const board = await getBoardById(params.boardId);

  if (!board) {
    notFound();
  }

  return (
    <div className="grid grow grid-cols-1 grid-rows-[auto_1fr] overflow-hidden">
      <Navbar board={board} />
      {children}
    </div>
  );
}

export default BoardLayout;
