import type { IRootLayout } from "@/types";
import { DASHBOARD_PAGE_METADATA } from "@/lib/metadata/dashboard";

export const metadata = DASHBOARD_PAGE_METADATA;

export default function DashboardPageLayout({ children }: IRootLayout) {
  return <>{children}</>
}