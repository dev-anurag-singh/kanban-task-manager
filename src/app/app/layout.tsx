import { getAllBoards } from "@/actions/get-all-boards";
import Sidebar from "@/components/Sidebar/Sidebar";

async function AppLayout({ children }: { children: React.ReactNode }) {
  const boards = await getAllBoards();

  return (
    <div className="relative flex h-screen">
      <Sidebar boards={boards} />
      <div className="grid grow">{children}</div>
    </div>
  );
}

export default AppLayout;
