import { getBoardById } from "@/actions/get-board-by-id";
import Navbar from "@/components/Board/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
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
    <div className="flex h-full">
      <Sidebar />
      <div className="grid grow grid-cols-1 grid-rows-[auto_1fr] overflow-hidden">
        <Navbar board={board} />
        {children}
      </div>
    </div>
  );
}

export default BoardLayout;
