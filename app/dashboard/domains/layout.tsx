import type { IRootLayout } from "@/types";
import { DOMAINS_PAGE_METADATA } from "@/lib/metadata/dashboard";

export const metadata = DOMAINS_PAGE_METADATA;

export default function DomainsLayout({ children }: IRootLayout) {
  return <>{children}</>
}