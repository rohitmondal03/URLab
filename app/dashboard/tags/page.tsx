import { Suspense } from "react";
import { Metadata } from "next";
import { getTagsWithBookmarkCounts } from "@/lib/actions/bookmark.action";
import TagsPageClient, { TagsPageSkeleton } from "@/components/dashboard/tags/tags-page-client";

export const metadata: Metadata = {
  title: "Tags",
};

async function TagsContent() {
  const tags = await getTagsWithBookmarkCounts();
  return <TagsPageClient tags={tags} />;
}

export default function TagsPage() {
  return (
    <Suspense fallback={<TagsPageSkeleton />}>
      <TagsContent />
    </Suspense>
  );
}
