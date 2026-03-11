import {
  getCurrentUsersBookmarks,
  getDomainsWithBookmarkCounts,
  getTagsWithBookmarkCounts,
} from "@/lib/actions/bookmark.action";
import { queryKeys } from "./query-keys";

export const bookmarkQuery = {
  all: () => ({
    queryKey: queryKeys.bookmarks,
    queryFn: () => getCurrentUsersBookmarks()
  }),
  recent: (limit?: number) => ({
    queryKey: queryKeys.recentBookmarks,
    queryFn: () => getCurrentUsersBookmarks(limit, true)
  })
}

export const tagsQuery = {
  default: () => ({
    queryKey: queryKeys.tags,
    queryFn: () => getTagsWithBookmarkCounts()
  })
}

export const domainsQuery = {
  default: () => ({
    queryKey: queryKeys.domains,
    queryFn: () => getDomainsWithBookmarkCounts(),
  })
}