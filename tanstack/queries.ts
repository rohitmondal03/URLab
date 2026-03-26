import {
  getCurrentUsersBookmarks,
  getCurrentUsersFavourites,
  getDomainsWithBookmarkCounts,
  getTagsWithBookmarkCounts,
} from "@/lib/actions/bookmark.action";
import { TANSTACK_STALE_TIME } from "@/lib/constants";
import { queryKeys } from "./query-keys";

export const bookmarkQuery = {
  all: () => ({
    queryKey: queryKeys.bookmarks,
    queryFn: () => getCurrentUsersBookmarks(),
    refetchOnWindowFocus: true,
    staleTime: TANSTACK_STALE_TIME
  }),
  recent: ({ limit }: { limit?: number }) => ({
    queryKey: queryKeys.recentBookmarks,
    queryFn: () => getCurrentUsersBookmarks(limit, true),
    refetchOnWindowFocus: true,
    staleTime: TANSTACK_STALE_TIME
  }),
  favourites: () => ({
    queryKey: queryKeys.favourites,
    queryFn: () => getCurrentUsersFavourites(),
    refetchOnWindowFocus: true,
    staleTime: TANSTACK_STALE_TIME
  })
}

export const tagsQuery = {
  default: () => ({
    queryKey: queryKeys.tags,
    queryFn: () => getTagsWithBookmarkCounts(),
    refetchOnWindowFocus: true,
    staleTime: TANSTACK_STALE_TIME
  })
}

export const domainsQuery = {
  default: () => ({
    queryKey: queryKeys.domains,
    queryFn: () => getDomainsWithBookmarkCounts(),
    refetchOnWindowFocus: true,
    staleTime: TANSTACK_STALE_TIME
  })
}