import { Suspense } from "react";
import DashboardPageClient from "@/components/dashboard/(dashboard)/dashboard-page-client";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";

export default function DashboardPage() {
  return (
    <Suspense fallback={<BookmarkGridSkeleton title="All Links" />}>
      <DashboardPageClient />
    </Suspense>
  );
}
