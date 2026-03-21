import { Skeleton } from "@/components/ui/skeleton";

export function BookmarkGridSkeleton({
  count = 9,
  title = "",
  subtitle = "",
}: {
  count?: number;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header skeleton */}
      {/* <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <div className="space-y-2">
          {title ? (
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          ) : (
            <Skeleton className="h-7 w-32" />
          )}
          {subtitle ? (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          ) : (
            <Skeleton className="h-4 w-24" />
          )}
        </div>
      </div> */}

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <BookmarkCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/** A single bookmark card skeleton — matches the layout of BookmarkCard. */
function BookmarkCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-300 bg-card shadow-lg overflow-hidden">
      {/* Preview image area */}
      <Skeleton className="w-full h-40 rounded-none" />

      {/* Card content */}
      <div className="flex flex-col gap-3 p-4">
        {/* Favicon + domain row */}
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-sm shrink-0" />
          <Skeleton className="h-3.5 w-28 rounded-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-4/5 rounded-md" />

        {/* Description */}
        <Skeleton className="h-3.5 w-full rounded-full" />
        <Skeleton className="h-3.5 w-3/4 rounded-full" />

        {/* Separator */}
        <div className="border-t border-border/40 my-0.5" />

        {/* Tags */}
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
