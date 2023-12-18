import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex gap-6 overflow-x-scroll p-6">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-5" />
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Skeleton className="h-5" />
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Skeleton className="h-5" />
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
          <Skeleton className="h-[90px] w-72" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
