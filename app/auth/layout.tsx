import type { IRootLayout } from "@/types";
import { AUTH_PAGE_METADATA } from "@/lib/metadata/auth";

export const metadata = AUTH_PAGE_METADATA;

export default function AuthLayout({ children }: IRootLayout) {
  return <>{children}</>;
}
