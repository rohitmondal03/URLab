import { pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";

export const domainsTable = pgTable("domains", {
  id: uuid("id").defaultRandom().primaryKey(),
  domain: text("domain").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_domain_domain").on(table.domain),
])

export const bookmarkTable = pgTable("bookmarks", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => usersTable.userId),
  domainId: uuid("domain_id").notNull().references(() => domainsTable.id),
  url: text("url").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  previewImage: text("preview_image").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index("idx_bookmarks_user_id").on(table.userId),
  index("idx_bookmarks_domain_id").on(table.domainId),
  index("idx_bookmarks_url").on(table.url),
])

export const tagsTable = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  tag: text("tag").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index("idx_tags_tag").on(table.tag),
])

export const bookmarkTagsTable = pgTable("bookmark_tags", {
  bookmarkId: uuid("bookmark_id").notNull().references(() => bookmarkTable.id, { onDelete: "cascade" }),
  tagId: uuid("tag_id").notNull().references(() => tagsTable.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index("idx_bookmarks_tag_bookmark_id").on(table.bookmarkId),
  index("idx_bookmarks_tag_tag_id").on(table.tagId),
])

export const usersTable = pgTable("users", {
  userId: uuid("user_id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  provider: text("provider").notNull(),
  avatarUrl: text("avatar_url"),
  joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("joined_at", { withTimezone: true }).$onUpdateFn(() => new Date()),
}, (table) => [
  index("idx_users_email").on(table.email),
])
