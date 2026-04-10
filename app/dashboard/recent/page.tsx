import { Suspense } from "react";
import { RecentlyAddedPageClient } from "@/components/dashboard/recent/recently-added-page-client";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";
import { RECENTS_PAGE_METADATA } from "@/lib/metadata/dashboard";

export const metadata = RECENTS_PAGE_METADATA;

export default function RecentlyAddedPage() {
  return (
    <Suspense fallback={<BookmarkGridSkeleton title="Recently Added" />}>
      <RecentlyAddedPageClient />
    </Suspense>
  );
}