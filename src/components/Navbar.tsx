import { LogoFull, LogoSmall } from "./Logo";
import EllipsisVertical from "@/icons/EllipsisVertical.svg";
import ArrowDown from "@/icons/ArrowDown.svg";
import IconPlus from "@/icons/IconPlus.svg";
import Button from "./Button";

function Navbar() {
  return (
    <nav className="flex">
      <div className="hidden items-center border-r border-lines-light pl-6 transition-colors  dark:border-lines-dark md:flex md:w-64 lg:w-80 lg:p-8">
        <LogoFull />
      </div>
      <div className="flex grow items-center gap-4 p-4 md:px-6 ">
        <div className="md:hidden">
          <LogoSmall />
        </div>
        <div className="mr-auto flex">
          <h4 className="text-lg dark:text-white">Platform Launch</h4>
          <span className="grid cursor-pointer place-content-center p-2 md:hidden">
            <ArrowDown />
          </span>
        </div>
        <div className="hidden md:block">
          <Button disabled={true} size="large">
            + Add New Task
          </Button>
        </div>
        <div className="rounded-3xl shadow-lg md:hidden">
          <Button disabled={true} size="medium">
            <IconPlus />
          </Button>
        </div>
        <button>
          <EllipsisVertical />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
