import { Skeleton } from "@/components/ui/skeleton";

export function DomainsPageSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      <Skeleton className="h-9 w-44 rounded-full" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 flex-1 max-w-sm rounded-full" />
        <Skeleton className="h-9 w-44 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}