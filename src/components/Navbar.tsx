import EllipsisVertical from "@/icons/EllipsisVertical.svg";
import IconPlus from "@/icons/IconPlus.svg";
import { Button } from "./ui/button";

function Navbar({
  board,
}: {
  board: {
    title: string;
  };
}) {
  return (
    <>
      <div className="flex bg-muted border-b">
        <div className="flex grow items-center p-4 md:px-6 ">
          <div className="mr-auto flex">
            <h4 className="text-lg">{board.title}</h4>
          </div>
          <div className="hidden md:block">
            <Button size="lg">+ Add New Task</Button>
          </div>
          <div className="rounded-3xl shadow-lg md:hidden">
            <Button size="icon">
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
