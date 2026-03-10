"use server"

import type { TBookmarkWithTags, TDomainWithStats, TTagWithStats } from "@/types"
import { eq } from "drizzle-orm"
import { db } from "@/drizzle"
import { bookmarkTable, bookmarkTagsTable, domainsTable, tagsTable } from "@/drizzle/schema"
import { getCurrentUser } from "./auth.action"
import { getURLMetadata } from "./metadata.action"
import "dotenv/config"

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

// To "Get user's bookmarks" with tags using Drizzle joins
export const getCurrentUsersBookmarks = async (): Promise<TBookmarkWithTags[]> => {
  const { userId: currentUserId } = await getCurrentUser();

  // Single query: bookmarks ⟶ bookmark_tags ⟶ tags (left joins so bookmarks with no tags are still returned)
  const rows = await db
    .select({
      // Bookmark columns
      id: bookmarkTable.id,
      userId: bookmarkTable.userId,
      domainId: bookmarkTable.domainId,
      url: bookmarkTable.url,
      title: bookmarkTable.title,
      description: bookmarkTable.description,
      previewImage: bookmarkTable.previewImage,
      createdAt: bookmarkTable.createdAt,
      // Tag column (null when the bookmark has no tags)
      tag: tagsTable.tag,
    })
    .from(bookmarkTable)
    .leftJoin(bookmarkTagsTable, eq(bookmarkTagsTable.bookmarkId, bookmarkTable.id))
    .leftJoin(tagsTable, eq(tagsTable.id, bookmarkTagsTable.tagId))
    .where(eq(bookmarkTable.userId, currentUserId));

  // Group flat rows into { bookmark, tags[] } map
  const bookmarkMap = new Map<string, TBookmarkWithTags>();

  for (const row of rows) {
    if (!bookmarkMap.has(row.id)) {
      bookmarkMap.set(row.id, {
        id: row.id,
        userId: row.userId,
        domainId: row.domainId,
        url: row.url,
        title: row.title,
        description: row.description,
        previewImage: row.previewImage,
        createdAt: row.createdAt,
        tags: [],
      });
    }

    if (row.tag) {
      bookmarkMap.get(row.id)!.tags.push(row.tag);
    }
  }

  return Array.from(bookmarkMap.values());
}

// To "Get domains with bookmark counts" for the current user
export const getDomainsWithBookmarkCounts = async () => {
  const { userId: currentUserId } = await getCurrentUser();

  const domainMap = new Map<string, { count: number; lastTitle: string; lastAt: Date }>();

  // join bookmarks → domains, filtered to the current user
  const rows = await db
    .select({
      domain: domainsTable.domain,
      title: bookmarkTable.title,
      createdAt: bookmarkTable.createdAt,
    })
    .from(bookmarkTable)
    .innerJoin(domainsTable, eq(domainsTable.id, bookmarkTable.domainId))
    .where(eq(bookmarkTable.userId, currentUserId))
    .orderBy(bookmarkTable.createdAt);

  for (const row of rows) {
    const existing = domainMap.get(row.domain);
    domainMap.set(row.domain, {
      count: (existing?.count ?? 0) + 1,
      lastTitle: row.title,
      lastAt: row.createdAt,
    });
  }

  return Array.from(domainMap.entries()).map(([domain, stats]) => ({
    domain,
    bookmarkCount: stats.count,
    lastBookmarkTitle: stats.lastTitle,
    lastBookmarkCreatedAt: stats.lastAt,
  }));
}

// To "Get tags with bookmark counts" for the current user
export const getTagsWithBookmarkCounts = async (): Promise<TTagWithStats[]> => {
  const { userId: currentUserId } = await getCurrentUser();

  // Join bookmark_tags → tags → bookmarks, filtered to the current user
  // Ordered oldest-first so each overwrite of lastTitle/lastAt is always more recent
  const rows = await db
    .select({
      tag: tagsTable.tag,
      title: bookmarkTable.title,
      createdAt: bookmarkTable.createdAt,
    })
    .from(bookmarkTagsTable)
    .innerJoin(tagsTable, eq(tagsTable.id, bookmarkTagsTable.tagId))
    .innerJoin(bookmarkTable, eq(bookmarkTable.id, bookmarkTagsTable.bookmarkId))
    .where(eq(bookmarkTable.userId, currentUserId))
    .orderBy(bookmarkTable.createdAt);

  // Single pass: accumulate count + track latest bookmark per tag
  const tagMap = new Map<string, { count: number; lastTitle: string; lastAt: Date }>();

  for (const row of rows) {
    const existing = tagMap.get(row.tag);
    tagMap.set(row.tag, {
      count: (existing?.count ?? 0) + 1,
      lastTitle: row.title,
      lastAt: row.createdAt,
    });
  }

  return Array.from(tagMap.entries()).map(([tag, stats]) => ({
    tag,
    bookmarkCount: stats.count,
    lastBookmarkTitle: stats.lastTitle,
    lastBookmarkCreatedAt: stats.lastAt,
  }));
}