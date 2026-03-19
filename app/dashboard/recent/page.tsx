import { Suspense } from "react";
import { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";
import { RecentlyAddedPageClient } from "@/components/dashboard/recent/recently-added-page-client";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";

export const metadata: Metadata = {
  title: "Recently Added",
  description:
    "View the links you most recently saved to URLab. Stay up to date with your latest bookmarks.",
  robots: { index: false, follow: false },
};

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