import { Suspense } from "react";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";
import { FavouritesPageClient } from "@/components/dashboard/favourites/favourites-page-client";

export default function FavouriteBookmarkPage() {
  return (
    <Suspense fallback={<BookmarkGridSkeleton title="Favourites" />}>
      <FavouritesPageClient />
    </Suspense>
  );
}