import { Suspense } from "react";
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
        <DomainsPageClient />
      </Suspense>
    </div>
  )
}
