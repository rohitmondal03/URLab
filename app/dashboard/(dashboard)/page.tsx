import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";
import DashboardPageClient from "@/components/dashboard/(dashboard)/dashboard-page-client";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(bookmarkQuery.all())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPageClient />;
    </HydrationBoundary>
  );
}
