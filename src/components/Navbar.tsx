import EllipsisVertical from "@/icons/EllipsisVertical.svg";
import IconPlus from "@/icons/IconPlus.svg";
import { Button } from "./ui/button";
import { LogoSmall } from "./Logo";
import Link from "next/link";

function Navbar({
  board,
}: {
  board: {
    title: string;
    columns: {
      title: string;
      order: number;
      id: string;
    }[];
  };
}) {
  const disabled = board.columns.length === 0;

  return (
    <>
      <div className="flex border-b bg-muted">
        <div className="flex grow items-center p-4 md:px-6 ">
          <Link href="/app" className="mr-4 md:hidden ">
            <LogoSmall />
          </Link>
          <div className="mr-auto flex">
            <h4 className="text-lg">{board.title}</h4>
          </div>
          <div className="hidden md:block">
            <Button disabled={disabled} size="lg">
              + Add New Task
            </Button>
          </div>
          <div className="rounded-3xl shadow-lg md:hidden">
            <Button disabled={disabled} size="icon">
              <IconPlus />
            </Button>
          </div>
          <Button size="icon" variant="ghost" className="ml-1">
            <EllipsisVertical />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
