import { LogoSmall } from "../Logo";
import Link from "next/link";
import { BoardWithColumns } from "@/lib/types";
import SidebarDropDown from "../Sidebar/SidebarDropDown";
import BoardPopover from "./BoardPopover";
import AddTask from "../Modals/Task/AddTask";

function Navbar({ board }: { board: BoardWithColumns }) {
  const disabled = board.columns.length === 0;

  return (
    <div className="flex border-b bg-muted">
      <div className="flex grow items-center p-4 md:px-6 ">
        <Link href="/" className="mr-4 md:hidden ">
          <LogoSmall />
        </Link>
        <div className="mr-auto flex items-center gap-1">
          <h1 className="max-w-[9rem] overflow-hidden text-ellipsis whitespace-nowrap text-lg md:max-w-[12rem] lg:max-w-xs">
            {board.title}
          </h1>
          <div className="inline-flex md:hidden">
            <SidebarDropDown />
          </div>
        </div>
        <AddTask board={board} triggerDisabled={disabled} />
        <BoardPopover board={board} />
      </div>
    </div>
  );
}

export default Navbar;
