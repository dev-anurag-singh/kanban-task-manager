import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import NavItems from "./NavItems";
import ThemeToggler from "./ThemeToggler";

function SidebarDropDown({ align }: { align?: "start" | "end" }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="transition-transform data-[state=open]:rotate-180 md:hidden">
        <ChevronDown className="-mb-0.5 h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="text-muted-foreground md:hidden"
        sideOffset={30}
        side="bottom"
        align={align || "start"}
      >
        <div className="flex w-64 flex-col gap-5 py-4">
          <NavItems />
          <ThemeToggler />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SidebarDropDown;
