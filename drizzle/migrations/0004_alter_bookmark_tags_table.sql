ALTER TABLE "bookmarks_tag" RENAME TO "bookmark_tags";--> statement-breakpoint
ALTER TABLE "bookmark_tags" DROP CONSTRAINT "bookmarks_tag_bookmark_id_bookmarks_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmark_tags" DROP CONSTRAINT "bookmarks_tag_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmark_tags" ADD CONSTRAINT "bookmark_tags_bookmark_id_bookmarks_id_fk" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmark_tags" ADD CONSTRAINT "bookmark_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;