import {
  getCurrentUsersBookmarks,
  getDomainsWithBookmarkCounts,
  getTagsWithBookmarkCounts,
} from "@/lib/actions/bookmark.action";
import { queryKeys } from "./query-keys";

export const bookmarkQuery = {
  all: () => ({
    queryKey: queryKeys.bookmarks,
    queryFn: () => getCurrentUsersBookmarks(),
    refetchOnWindowFocus: true,
    staleTime: Infinity
  }),
  recent: ({ limit }: { limit?: number }) => ({
    queryKey: queryKeys.recentBookmarks,
    queryFn: () => getCurrentUsersBookmarks(limit, true),
    refetchOnWindowFocus: true,
    staleTime: Infinity
  })
}

export const tagsQuery = {
  default: () => ({
    queryKey: queryKeys.tags,
    queryFn: () => getTagsWithBookmarkCounts(),
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  })
}

export const domainsQuery = {
  default: () => ({
    queryKey: queryKeys.domains,
    queryFn: () => getDomainsWithBookmarkCounts(),
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  })
}