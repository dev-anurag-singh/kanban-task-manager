"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BoardIcon from "@/icons/BoardIcon.svg";
import { Board } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "@/services/apiBoards";
import { Skeleton } from "../ui/skeleton";
import CreateBoard from "../Modal/CreateBoard";

function NavItems() {
  const { data: boards, isLoading } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  const pathname = usePathname();

  if (isLoading) {
    return (
      <>
        <h4 className="ml-6 text-sm uppercase lg:ml-8">All Boards</h4>
        <div className="mx-8 mb-auto space-y-2">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </>
    );
  }

  const boardsCount = boards?.length || 0;
  return (
    <>
      <h4 className="ml-6 text-sm uppercase lg:ml-8">
        All Boards ({boardsCount})
      </h4>
      {boards && (
        <div className="mb-auto">
          {boards.map(({ title, id }) => (
            <Link
              className={cn(
                "relative mr-5 flex h-12 items-center gap-3 overflow-hidden rounded-r-full px-6 py-4 capitalize transition-colors after:absolute after:left-0 after:top-0 after:h-full after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:text-secondary-foreground hover:after:w-full lg:mr-6 lg:px-8",
                {
                  "pointer-events-none text-primary-foreground after:w-full after:bg-primary":
                    pathname === `/app/${id}`,
                },
              )}
              key={id}
              href={`/app/${id}`}
            >
              <span className="z-10">
                <BoardIcon />
              </span>
              <span className="z-10 overflow-hidden text-ellipsis whitespace-nowrap break-words text-lg">
                {title}
              </span>
            </Link>
          ))}
          <div className="px-6 lg:px-8">
            <CreateBoard />
          </div>
        </div>
      )}
    </>
  );
}

export default NavItems;
