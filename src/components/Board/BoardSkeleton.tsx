import { Skeleton } from "@/components/ui/skeleton";

function BoardSkeleton() {
  return (
    <div className="flex gap-6 overflow-hidden overflow-x-scroll p-6">
      <div className="space-y-6">
        <Skeleton className="h-5" />
        <div className="space-y-5">
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-5" />
        <div className="space-y-5">
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-5" />
        <div className="space-y-5">
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
        </div>
      </div>
    </div>
  );
}

export default BoardSkeleton;
