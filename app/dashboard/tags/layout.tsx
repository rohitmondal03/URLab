import type { IRootLayout } from "@/types";
import { TAGS_PAGE_METADATA } from "@/lib/metadata/dashboard";

export const metadata = TAGS_PAGE_METADATA;

export default function TagsLayout({ children }: IRootLayout) {
  return <>{children}</>
}