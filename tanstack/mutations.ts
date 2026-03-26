"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark, deleteBookmark, editBookmark, updateBookmarkToFavourites } from "@/lib/actions/bookmark.action";
import { queryKeys } from "./query-keys";

export const createBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      url,
      tags,
      isFavourite
    }: {
      url: string,
      tags: string[],
      isFavourite: boolean
    }) => createBookmark(url.trim(), tags, isFavourite),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.recentBookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.domains }),
        queryClient.invalidateQueries({ queryKey: queryKeys.tags })
      ]);
    }
  })
}

export const deleteBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookmarkId }: { bookmarkId: string }) => deleteBookmark(bookmarkId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.recentBookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.domains }),
        queryClient.invalidateQueries({ queryKey: queryKeys.tags })
      ]);
    }
  })
}

export const editBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookmarkId, bookmarkTitle, bookmarkDescription }: { bookmarkId: string, bookmarkTitle: string, bookmarkDescription: string }) => editBookmark(bookmarkId, bookmarkTitle, bookmarkDescription),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.recentBookmarks })
      ]);
    }
  })
}

export const updateFavouritesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookmarkId, newFavouriteValue }: { bookmarkId: string, newFavouriteValue: boolean }) => updateBookmarkToFavourites(bookmarkId, newFavouriteValue),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.recentBookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.favourites }),
      ])
    }
  })
}