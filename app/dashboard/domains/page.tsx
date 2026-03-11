import { Metadata } from "next";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { domainsQuery } from "@/tanstack/queries";
import DomainsPageClient from "@/components/dashboard/domains/domains-page-client";

export const metadata: Metadata = {
  title: "Domains",
};

export default async function DomainsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(domainsQuery.default())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DomainsPageClient />
    </HydrationBoundary>
  );
}
