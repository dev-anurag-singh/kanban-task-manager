import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import NavItems from "./NavItems";
import ThemeToggler from "./ThemeToggler";

function SidebarDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="transition-transform data-[state=open]:rotate-180">
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:hidden" sideOffset={30}>
        <div className="flex w-64 flex-col gap-5 py-4">
          <NavItems />
          <ThemeToggler />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SidebarDropDown;
