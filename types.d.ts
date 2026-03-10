import { ReactNode } from "react";
import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import { bookmarkTable, domainsTable, usersTable, bookmarkTagsTable, tagsTable } from "./drizzle/schema";

export interface IRootLayout {
  children: ReactNode
}

export type TUrlMetadata = {
  previewImageUrl: string,
  title: string,
  description: resultstring,
  domain: string,
  url: string,
}

export type TDomains = InferSelectModel<typeof domainsTable>;
export type TInsertDomains = InferInsertModel<typeof domainsTable>;
export type TDomainWithStats = {
  domain: string;
  bookmarkCount: number;
  lastBookmarkTitle: string | null;
  lastBookmarkCreatedAt: Date | null;
};

export type TBookmark = InferSelectModel<typeof bookmarkTable>;
export type TInsertBookmark = InferInsertModel<typeof bookmarkTable>;

export type TTag = InferSelectModel<typeof tagsTable>;
export type TInsertTag = InferInsertModel<typeof tagsTable>;

export type TTagWithStats = {
  tag: string;
  bookmarkCount: number;
  lastBookmarkTitle: string | null;
  lastBookmarkCreatedAt: Date | null;
};

export type TBookmarksTags = InferSelectModel<typeof bookmarkTagsTable>;
export interface TBookmarkWithTags extends TBookmark { tags: string[] };
export type TInsertBookmarksTags = InferInsertModel<typeof bookmarkTagsTable>;

export type TUsers = InferSelectModel<typeof usersTable>;
export type TInsertUsers = InferInsertModel<typeof usersTable>;

