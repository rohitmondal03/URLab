import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import DashboardPageClient from "@/components/dashboard/(dashboard)/dashboard-page-client";
import { bookmarkQuery } from "@/tanstack/queries";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View and manage all your saved bookmarks in one place. Filter, search, and organize your links effortlessly.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(bookmarkQuery.all())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPageClient />;
    </HydrationBoundary>
  );
}
