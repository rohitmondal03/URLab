import type { IRootLayout } from "@/types";
import { FAVOURITES_PAGE_METADATA } from "@/lib/metadata/dashboard";

export const metadata = FAVOURITES_PAGE_METADATA;

export default function FavouritesLayout({ children }: IRootLayout) {
  return <>{children}</>
}