import { Suspense } from "react";
import { Metadata } from "next";
import { getDomainsWithBookmarkCounts } from "@/lib/actions/bookmark.action";
import DomainsPageClient, { DomainsPageSkeleton } from "@/components/dashboard/domains/domains-page-client";

export const metadata: Metadata = {
  title: "Domains",
};

async function DomainsContent() {
  const domains = await getDomainsWithBookmarkCounts();
  return <DomainsPageClient domains={domains} />;
}

export default function DomainsPage() {
  return (
    <Suspense fallback={<DomainsPageSkeleton />}>
      <DomainsContent />
    </Suspense>
  );
}
