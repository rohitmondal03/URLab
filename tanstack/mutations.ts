"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark, deleteBookmark, editBookmark, updateBookmarkToFavourites } from "@/lib/actions/bookmark.action";
import { deleteAvatar, updateUserDetails, uploadUsersAvatar } from "@/lib/actions/users.action";
import { queryKeys } from "./query-keys";

export const createBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      url,
      tags,
      isFavourite
    }: {
      url: string,
      tags: string[],
      isFavourite: boolean
    }) => {
      const res = await createBookmark(url.trim(), tags, isFavourite);
      if (res && 'error' in res && typeof res.error === 'string') {
        throw new Error(res.error);
      }
      return res;
    },
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
    mutationFn: async ({ bookmarkId }: { bookmarkId: string }) => {
      const res = await deleteBookmark(bookmarkId);
      if (res && 'error' in res && typeof res.error === 'string') {
        throw new Error(res.error);
      }
      return res;
    },
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
    mutationFn: async ({ bookmarkId, bookmarkTitle, bookmarkDescription }: { bookmarkId: string, bookmarkTitle: string, bookmarkDescription: string }) => {
      const res = await editBookmark(bookmarkId, bookmarkTitle, bookmarkDescription);
      if (res && 'error' in res && typeof res.error === 'string') {
        throw new Error(res.error);
      }
      return res;
    },
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
    mutationFn: async ({ bookmarkId, newFavouriteValue }: { bookmarkId: string, newFavouriteValue: boolean }) => {
      const res = await updateBookmarkToFavourites(bookmarkId, newFavouriteValue);
      if (res && 'error' in res && typeof res.error === 'string') {
        throw new Error(res.error);
      }
      return res;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.bookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.recentBookmarks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.favourites }),
      ])
    }
  })
}

export const uploadUsersAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file }: { file: File }) => uploadUsersAvatar(file),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user });
    }
  })
}

export const deleteUsersAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAvatar(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user })
    }
  })
}

export const editUsersDetailsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email }: { name: string, email: string }) => updateUserDetails(name, email),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user })
    }
  })
}