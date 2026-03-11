import { Suspense } from "react";
import { Metadata } from "next";
import { getCurrentUsersBookmarks } from "@/lib/actions/bookmark.action";
import { RecentlyAddedPageClient } from "@/components/dashboard/recent/recently-added-page-client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";

export const metadata: Metadata = {
  title: "Recently Added",
};

export default async function RecentlyAddedPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(bookmarkQuery.recent(6));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecentlyAddedPageClient />
    </HydrationBoundary>
  );
}