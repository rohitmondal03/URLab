import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";
import { FavouritesPageClient } from "@/components/dashboard/favourites/favourites-page-client";
import { bookmarkQuery } from "@/tanstack/queries";

export default function FavouriteBookmarkPage() {
  return (
    <Suspense fallback={<BookmarkGridSkeleton title="Favourites" />}>
      <FavouritesPageDataLoader />
    </Suspense>
  );
}

async function FavouritesPageDataLoader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(bookmarkQuery.favourites());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FavouritesPageClient />
    </HydrationBoundary>
  );
}