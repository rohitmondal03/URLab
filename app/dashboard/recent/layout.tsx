import type { IRootLayout } from "@/types";
import { RECENTS_PAGE_METADATA } from "@/lib/metadata/dashboard";

export const metadata = RECENTS_PAGE_METADATA;

export default function RecentsLayout({ children }: IRootLayout) {
  return <>{children}</>
}