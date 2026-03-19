import { Suspense } from "react";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { domainsQuery } from "@/tanstack/queries";
import DomainsPageClient from "@/components/dashboard/domains/domains-page-client";
import { DomainsPageSkeleton } from "@/components/dashboard/domains/domains-page-skeleton";

export default function DomainsPage() {
  return (
    <Suspense fallback={<DomainsPageSkeleton />}>
      <DomainsDataLoader />
    </Suspense>
  )
}

async function DomainsDataLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(domainsQuery.default())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DomainsPageClient />
    </HydrationBoundary>
  );
}
