import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";
import DashboardPageClient from "@/components/dashboard/(dashboard)/dashboard-page-client";
import { Suspense } from "react";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";

export default function DashboardPage() {
  return (
    <Suspense fallback={<BookmarkGridSkeleton title="All Links" />}>
      <DashboardDataLoader />
    </Suspense>
  );
}

async function DashboardDataLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(bookmarkQuery.all());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPageClient />
    </HydrationBoundary>
  );
}
