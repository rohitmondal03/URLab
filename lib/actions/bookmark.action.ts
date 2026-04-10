"use server"

import type { TBookmarkWithTags, TTagWithStats } from "@/types"
import { and, desc, eq, inArray, sql } from "drizzle-orm"
import { db } from "@/drizzle"
import { bookmarkTable, bookmarkTagsTable, domainsTable, tagsTable } from "@/drizzle/schema"
import { getCurrentUser } from "./auth.action"
import { getURLMetadata } from "./metadata.action"
import { DEFAULT_ERROR_MESSAGE } from "../constants"
import "dotenv/config"


// To "Create a New Bookmark", with edge function and imp few checks
export async function createBookmark(url: string, tags: string[], isFavourite: boolean) {
  const { userId: currentUserId } = await getCurrentUser();

  // Fetch URL's metadata
  const { description, previewImageUrl, title, domain } = await getURLMetadata(url);

  // Check if bookmark already exists
  const [existingBookmarkWithSameURL] = await db
    .select()
    .from(bookmarkTable)
    .where(eq(bookmarkTable.url, url))
    .limit(1)

  if (existingBookmarkWithSameURL) {
    if (existingBookmarkWithSameURL.userId === currentUserId) {
      throw new Error("You've already added this URL as bookmark.")
    }

    await db
      .insert(bookmarkTable)
      .values({
        userId: currentUserId,
        url,
        domainId: existingBookmarkWithSameURL.domainId,
        title: existingBookmarkWithSameURL.title,
        description: existingBookmarkWithSameURL.description,
        previewImage: existingBookmarkWithSameURL.previewImage,
      })

    return;
  }

  // If bookmark doesn't exists, ensure domain exists, if not add one. Call edge function, fetch metadata of URl and insert the bookmark.
  let [domainRow] = await db
    .select()
    .from(domainsTable)
    .where(eq(domainsTable.domain, domain))
    .limit(1)

  if (!domainRow) {
    const [inserted] = await db
      .insert(domainsTable)
      .values({ domain: domain })
      .returning()

    domainRow = inserted;
  }

  const [insertedBookmark] = await db
    .insert(bookmarkTable)
    .values({
      url,
      title: title,
      domainId: domainRow.id,
      description: description,
      previewImage: previewImageUrl,
      userId: currentUserId,
      isFavourite,
    })
    .returning()

  // edge function to add/process tags of the bookmark created
  fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/add-bookmark-tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
    },
    body: JSON.stringify({ tags, bookmarkId: insertedBookmark.id })
  }).catch((error: Error) => {
    throw new Error(error.message)
  })

  return insertedBookmark;
}


// To "delete a bookmark"
export const deleteBookmark = async (bookmarkId: string) => {
  const { userId: currentUserId } = await getCurrentUser();

  const [{ userId }] = await db
    .select({ userId: bookmarkTable.userId })
    .from(bookmarkTable)
    .where(eq(bookmarkTable.id, bookmarkId))
    .limit(1);

  if (currentUserId !== userId) {
    throw new Error("Only users uploaded this bookmark can DELETE it !!")
  }

  await db
    .delete(bookmarkTable)
    .where(eq(bookmarkTable.id, bookmarkId))
}


// To edit a bookmark (title and description onyl, for now)
export const editBookmark = async (bookmarkId: string, bookmarkTitle: string, bookmarkDescription: string) => {
  const { userId } = await getCurrentUser();

  try {
    await db
      .update(bookmarkTable)
      .set({
        title: bookmarkTitle.trim(),
        description: bookmarkDescription.trim(),
      })
      .where(and(
        eq(bookmarkTable.id, bookmarkId),
        eq(bookmarkTable.userId, userId),
      ))
  } catch (error: any) {
    throw new Error(error.message || DEFAULT_ERROR_MESSAGE);
  }
}


// Add bookmark to favourites
export const updateBookmarkToFavourites = async (bookmarkId: string, newFavouriteValue: boolean) => {
  const { userId } = await getCurrentUser();

  const [bookmark] = await db
    .select({ userId: bookmarkTable.userId, isFavourite: bookmarkTable.isFavourite })
    .from(bookmarkTable)
    .where(eq(bookmarkTable.id, bookmarkId))
    .limit(1);

  if (!bookmark) {
    throw new Error("Bookmark not found !!");
  }

  if (bookmark.userId !== userId) {
    throw new Error("Only user who uploaded this bookmark can add it to favourites !!")
  }

  await db
    .update(bookmarkTable)
    .set({ isFavourite: newFavouriteValue })
    .where(eq(bookmarkTable.id, bookmarkId))
}


// To "Get user's bookmarks & ALSO recent bookmarks" with tags using joins
export const getCurrentUsersBookmarks = async (
  limit?: number,
  isRecent?: boolean
): Promise<TBookmarkWithTags[]> => {
  const { userId: currentUserId } = await getCurrentUser();

  // Fetch bookmarks
  const bookmarks = await db
    .select()
    .from(bookmarkTable)
    .where(eq(bookmarkTable.userId, currentUserId))
    .orderBy(
      isRecent
        ? desc(bookmarkTable.createdAt)
        : bookmarkTable.createdAt
    )
    .limit(limit ?? 20); // LIMIT at DB level

  // Early return (no bookmarks)
  if (bookmarks.length === 0) return [];

  // Fetch tags separately (only for selected bookmarks)
  const bookmarkIds = bookmarks.map((b) => b.id);

  const tagRows = await db
    .select({
      bookmarkId: bookmarkTagsTable.bookmarkId,
      tag: tagsTable.tag,
    })
    .from(bookmarkTagsTable)
    .leftJoin(tagsTable, eq(tagsTable.id, bookmarkTagsTable.tagId))
    .where(inArray(bookmarkTagsTable.bookmarkId, bookmarkIds));

  // Map tags → bookmarkId
  const tagMap = new Map<string, string[]>();

  for (const row of tagRows) {
    if (!row.tag) continue;

    if (!tagMap.has(row.bookmarkId)) {
      tagMap.set(row.bookmarkId, []);
    }

    tagMap.get(row.bookmarkId)!.push(row.tag);
  }

  // Merge bookmarks + tags (final shape)
  const result: TBookmarkWithTags[] = bookmarks.map((bookmark) => ({
    ...bookmark,
    tags: tagMap.get(bookmark.id) ?? [],
    isFavourite: bookmark.isFavourite,
  }));

  return result;
};


// To get user's favourite bookmarks
export const getCurrentUsersFavourites = async () => {
  const { userId } = await getCurrentUser();

  // Fetch bookmarks
  const bookmarks = await db
    .select()
    .from(bookmarkTable)
    .where(and(
      eq(bookmarkTable.userId, userId),
      eq(bookmarkTable.isFavourite, true)
    ))

  // Early return (no bookmarks)
  if (bookmarks.length === 0) return [];

  // Fetch tags separately (only for selected bookmarks)
  const bookmarkIds = bookmarks.map((b) => b.id);

  const tagRows = await db
    .select({
      bookmarkId: bookmarkTagsTable.bookmarkId,
      tag: tagsTable.tag,
    })
    .from(bookmarkTagsTable)
    .leftJoin(tagsTable, eq(tagsTable.id, bookmarkTagsTable.tagId))
    .where(inArray(bookmarkTagsTable.bookmarkId, bookmarkIds));

  // Map tags → bookmarkId
  const tagMap = new Map<string, string[]>();

  for (const row of tagRows) {
    if (!row.tag) continue;

    if (!tagMap.has(row.bookmarkId)) {
      tagMap.set(row.bookmarkId, []);
    }

    tagMap.get(row.bookmarkId)!.push(row.tag);
  }

  // Merge bookmarks + tags (final shape)
  const result: TBookmarkWithTags[] = bookmarks.map((bookmark) => ({
    ...bookmark,
    tags: tagMap.get(bookmark.id) ?? [],
    isFavourite: bookmark.isFavourite,
  }));

  return result;
}


// To "Get domains with bookmark counts" for the current user
export const getDomainsWithBookmarkCounts = async () => {
  const { userId: currentUserId } = await getCurrentUser();

  // 1. Aggregate in DB
  const aggregated = await db
    .select({
      domain: domainsTable.domain,
      bookmarkCount: sql<number>`count(*)`,
      lastBookmarkCreatedAt: sql<Date>`max(${bookmarkTable.createdAt})`,
    })
    .from(bookmarkTable)
    .innerJoin(domainsTable, eq(domainsTable.id, bookmarkTable.domainId))
    .where(eq(bookmarkTable.userId, currentUserId))
    .groupBy(domainsTable.domain);

  if (aggregated.length === 0) return [];

  // 2. Fetch titles for latest bookmarks (only needed ones)
  const latestRows = await db
    .select({
      domain: domainsTable.domain,
      title: bookmarkTable.title,
      createdAt: bookmarkTable.createdAt,
    })
    .from(bookmarkTable)
    .innerJoin(domainsTable, eq(domainsTable.id, bookmarkTable.domainId))
    .where(eq(bookmarkTable.userId, currentUserId));

  // 3. Map latest title per domain
  const latestMap = new Map<string, { title: string; createdAt: Date }>();

  for (const row of latestRows) {
    const existing = latestMap.get(row.domain);

    if (!existing || row.createdAt > existing.createdAt) {
      latestMap.set(row.domain, {
        title: row.title,
        createdAt: row.createdAt,
      });
    }
  }

  // 4. Final merge
  return aggregated.map((item) => ({
    domain: item.domain,
    bookmarkCount: Number(item.bookmarkCount),
    lastBookmarkTitle: latestMap.get(item.domain)?.title ?? "",
    lastBookmarkCreatedAt: item.lastBookmarkCreatedAt,
  }));
};

// To "Get tags with bookmark counts" for the current user
export const getTagsWithBookmarkCounts = async (): Promise<TTagWithStats[]> => {
  const { userId: currentUserId } = await getCurrentUser();

  // 1. Aggregate in DB (COUNT + MAX date)
  const aggregated = await db
    .select({
      tag: tagsTable.tag,
      bookmarkCount: sql<number>`count(*)`,
      lastBookmarkCreatedAt: sql<Date>`max(${bookmarkTable.createdAt})`,
    })
    .from(bookmarkTagsTable)
    .innerJoin(tagsTable, eq(tagsTable.id, bookmarkTagsTable.tagId))
    .innerJoin(bookmarkTable, eq(bookmarkTable.id, bookmarkTagsTable.bookmarkId))
    .where(eq(bookmarkTable.userId, currentUserId))
    .groupBy(tagsTable.tag);

  if (aggregated.length === 0) return [];

  // 2. Get titles for latest bookmarks (only for needed rows)
  const latestRows = await db
    .select({
      tag: tagsTable.tag,
      title: bookmarkTable.title,
      createdAt: bookmarkTable.createdAt,
    })
    .from(bookmarkTagsTable)
    .innerJoin(tagsTable, eq(tagsTable.id, bookmarkTagsTable.tagId))
    .innerJoin(bookmarkTable, eq(bookmarkTable.id, bookmarkTagsTable.bookmarkId))
    .where(eq(bookmarkTable.userId, currentUserId));

  // 3. Map latest title per tag
  const latestMap = new Map<string, string>();

  for (const row of latestRows) {
    const existing = latestMap.get(row.tag);

    // keep only latest
    if (!existing || row.createdAt > (aggregated.find(a => a.tag === row.tag)?.lastBookmarkCreatedAt ?? new Date(0))) {
      latestMap.set(row.tag, row.title);
    }
  }

  // 4. Final merge
  return aggregated.map((item) => ({
    tag: item.tag,
    bookmarkCount: Number(item.bookmarkCount),
    lastBookmarkTitle: latestMap.get(item.tag) ?? "",
    lastBookmarkCreatedAt: item.lastBookmarkCreatedAt,
  }));
};