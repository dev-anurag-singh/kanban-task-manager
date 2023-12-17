import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="grid grid-cols-[repeat(3,17.5rem)] gap-6 overflow-hidden p-6">
      <Skeleton className="w-72" />

      <Skeleton className="w-72" />

      <Skeleton className="w-72" />
    </div>
  );
}

export default Loading;
