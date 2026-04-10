import { Suspense } from "react";
import TagsPageClient from "@/components/dashboard/tags/tags-page-client";
import { TagsPageSkeleton } from "@/components/dashboard/tags/tags-page-skeleton";

export default function TagsPage() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between pb-4 border-b border-border/40">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Tags
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Organize and explore bookmarks by tags
        </p>
      </div>

      <Suspense fallback={<TagsPageSkeleton />}>
        <TagsPageClient />
      </Suspense>
    </div>
  );
}
