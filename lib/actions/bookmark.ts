"use server"

import { eq } from "drizzle-orm"
import { db } from "@/drizzle"
import { getDomainFromUrl } from "@/lib/helper"
import { bookmarkTable, domainsTable } from "@/drizzle/schema"
import { getCurrentUser } from "./auth"
import { TInsertBookmark } from "@/types"

export async function createBookmark(url: string) {
  const { userId } = await getCurrentUser();

  const domain = getDomainFromUrl(url.trim()) as string;

  // Check if bookmark already exists
  const [existingBookmark] = await db
    .select()
    .from(bookmarkTable)
    .where(eq(bookmarkTable.url, url))
    .limit(1)

  if (existingBookmark) {
    if (existingBookmark.userId === userId) {
      throw new Error("You've already added this URL as bookmark.")
    }

    await db.insert(bookmarkTable).values({
      userId,
      url,
      domainId: existingBookmark.domainId,
      title: existingBookmark.title,
      description: existingBookmark.description,
      previewImage: existingBookmark.previewImage,
    })

    return;
  }

  // If bookmark doesn't exists, ensure domain exists, if not add domain, call edge function fetch metadata of URl and then insert the bookmark.
  let domainRow = await db
    .select()
    .from(domainsTable)
    .where(eq(domainsTable.domain, domain))
    .limit(1)

  if (!domainRow) {
    const inserted = await db
      .insert(domainsTable)
      .values({ domain: domain })
      .returning()

    domainRow = inserted;
  }

  // Edge function
  const res = await fetch(
    `${process.env.SUPABASE_FUNCTION_URL}/fetch-metadata`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    }
  )

  const metadata = await res.json() as TInsertBookmark;

  // Insert bookmark
  await db.insert(bookmarkTable).values({
    userId,
    domainId: domainRow[0].id,
    url,
    title: metadata.title,
    description: metadata.description,
    previewImage: metadata.previewImage
  })

  return { success: true }
}