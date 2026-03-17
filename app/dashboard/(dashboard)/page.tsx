import type { TSearchParams } from "@/types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";
import DashboardPageClient from "@/components/dashboard/(dashboard)/dashboard-page-client";

type TDashboardPageProps = {
  searchParams: TSearchParams
}

export default async function DashboardPage({ searchParams }: TDashboardPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(bookmarkQuery.all())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPageClient />;
    </HydrationBoundary>
  );
}
