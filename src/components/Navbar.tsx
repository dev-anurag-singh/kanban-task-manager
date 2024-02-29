import Link from "next/link";
import SidebarDropDown from "@/components/Sidebar/SidebarDropDown";

import { LogoFull } from "./Logo";

function Navbar() {
  return (
    <div className="flex border-b bg-muted md:hidden">
      <div className="flex grow items-center justify-between p-4 md:px-6">
        <Link href="/app" className="mr-8 ">
          <LogoFull />
        </Link>
        <div className="mr-2 flex items-center gap-1">
          <h1 className="max-w-[9rem] overflow-hidden text-ellipsis whitespace-nowrap text-lg md:max-w-[12rem] lg:max-w-xs">
            Select a board
          </h1>
          <div className="inline-flex md:hidden">
            <SidebarDropDown align="end" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
