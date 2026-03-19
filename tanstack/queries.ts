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
    staleTime: 1000 * 60 * 5
  }),
  recent: ({ limit }: { limit?: number }) => ({
    queryKey: queryKeys.recentBookmarks,
    queryFn: () => getCurrentUsersBookmarks(limit ?? 5, true),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5
  })
}

export const tagsQuery = {
  default: () => ({
    queryKey: queryKeys.tags,
    queryFn: () => getTagsWithBookmarkCounts(),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  })
}

export const domainsQuery = {
  default: () => ({
    queryKey: queryKeys.domains,
    queryFn: () => getDomainsWithBookmarkCounts(),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
  })
}