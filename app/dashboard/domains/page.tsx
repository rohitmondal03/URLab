import { Suspense } from "react";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { domainsQuery } from "@/tanstack/queries";
import DomainsPageClient from "@/components/dashboard/domains/domains-page-client";
import { DomainsPageSkeleton } from "@/components/dashboard/domains/domains-page-skeleton";

export default function DomainsPage() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between pb-4 border-b border-border/40">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Domains
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Browse your bookmarks by website
        </p>
      </div>

      <Suspense fallback={<DomainsPageSkeleton />}>
        <DomainsDataLoader />
      </Suspense>
    </div>
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
