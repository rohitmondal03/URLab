"use server"

import type { TBookmarkWithTags, TTagWithStats } from "@/types"
import { and, desc, eq, inArray, sql } from "drizzle-orm"
import { db } from "@/drizzle"
import { bookmarkTable, bookmarkTagsTable, domainsTable, tagsTable } from "@/drizzle/schema"
import { getCurrentUser } from "./auth.action"
import { getURLMetadata } from "./metadata.action"
import "dotenv/config"
import { DEFAULT_ERROR_MESSAGE } from "../helper"


// To "Create a New Bookmark", with edge function and imp few checks
export async function createBookmark(url: string, tags: string[]) {
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


// To "Get user's bookmarks & ALSO recent bookmarks" with tags using joins
export const getCurrentUsersBookmarks = async (
  limit?: number,
  isRecent?: boolean
): Promise<TBookmarkWithTags[]> => {
  const { userId: currentUserId } = await getCurrentUser();

  // Fetch only required bookmarks (NO JOINS here)
  const bookmarks = await db
    .select({
      id: bookmarkTable.id,
      userId: bookmarkTable.userId,
      domainId: bookmarkTable.domainId,
      url: bookmarkTable.url,
      title: bookmarkTable.title,
      description: bookmarkTable.description,
      previewImage: bookmarkTable.previewImage,
      createdAt: bookmarkTable.createdAt,
    })
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
  }));

  return result;
};


// To "Get domains with bookmark counts" for the current user
export const getDomainsWithBookmarkCounts = async () => {
  const { userId: currentUserId } = await getCurrentUser();

  const query = sql`
    SELECT
      d.domain AS "domain",
      COUNT(b.id)::int AS "bookmarkCount",
      MAX(b.created_at) AS "lastBookmarkCreatedAt",
      (
        SELECT b2.title FROM bookmarks b2 
        WHERE b2.domain_id = d.id AND b2.user_id = ${currentUserId} 
        ORDER BY b2.created_at DESC LIMIT 1
      ) AS "lastBookmarkTitle"
    FROM domains d
    INNER JOIN bookmarks b ON b.domain_id = d.id
    WHERE b.user_id = ${currentUserId}
    GROUP BY d.id, d.domain
  `;

  const result = await db.execute(query);
  const rows = result as any[];

  return rows.map((row) => ({
    domain: row.domain,
    bookmarkCount: Number(row.bookmarkCount),
    lastBookmarkTitle: row.lastBookmarkTitle ?? "",
    lastBookmarkCreatedAt: new Date(row.lastBookmarkCreatedAt),
  }));
};

// To "Get tags with bookmark counts" for the current user
export const getTagsWithBookmarkCounts = async (): Promise<TTagWithStats[]> => {
  const { userId: currentUserId } = await getCurrentUser();

  const query = sql`
    SELECT 
      t.tag AS "tag",
      COUNT(b.id)::int AS "bookmarkCount",
      MAX(b.created_at) AS "lastBookmarkCreatedAt",
      (
        SELECT b2.title 
        FROM bookmarks b2
        INNER JOIN bookmark_tags bt2 ON bt2.bookmark_id = b2.id
        WHERE bt2.tag_id = t.id AND b2.user_id = ${currentUserId}
        ORDER BY b2.created_at DESC LIMIT 1
      ) AS "lastBookmarkTitle"
    FROM tags t
    INNER JOIN bookmark_tags bt ON bt.tag_id = t.id
    INNER JOIN bookmarks b ON b.id = bt.bookmark_id
    WHERE b.user_id = ${currentUserId}
    GROUP BY t.id, t.tag
  `;

  const result = await db.execute(query);
  const rows = result as any[];

  if (rows.length === 0) return [];

  return rows.map((item) => ({
    tag: item.tag,
    bookmarkCount: Number(item.bookmarkCount),
    lastBookmarkTitle: item.lastBookmarkTitle ?? "",
    lastBookmarkCreatedAt: new Date(item.lastBookmarkCreatedAt),
  }));
};