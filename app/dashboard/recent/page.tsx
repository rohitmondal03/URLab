import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";
import { RecentlyAddedPageClient } from "@/components/dashboard/recent/recently-added-page-client";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";
import { RECENTS_PAGE_METADATA } from "@/lib/metadata/dashboard";

export const metadata = RECENTS_PAGE_METADATA;

export default function RecentlyAddedPage() {
  return (
    <Suspense fallback={<BookmarkGridSkeleton title="Recently Added" />}>
      <RecentlyAddedDataLoader />
    </Suspense>
  );
}

async function RecentlyAddedDataLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(bookmarkQuery.recent({ limit: 6 }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecentlyAddedPageClient />
    </HydrationBoundary>
  );
}