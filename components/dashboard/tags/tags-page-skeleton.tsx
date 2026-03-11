import { Skeleton } from "@/components/ui/skeleton";

export function TagsPageSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex items-start justify-between pb-4 border-b border-border/40">
        <div className="space-y-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-4 w-60" />
        </div>
      </div>
      <div className="flex gap-3">
        {[120, 160, 100].map((w) => (
          <Skeleton key={w} className="h-8 rounded-full" style={{ width: w }} />
        ))}
      </div>
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
