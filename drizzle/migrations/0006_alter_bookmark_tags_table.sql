ALTER TABLE "bookmark_tags" DROP CONSTRAINT "bookmark_tags_bookmark_id_bookmarks_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmark_tags" ADD CONSTRAINT "bookmark_tags_bookmark_id_bookmarks_id_fk" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE cascade ON UPDATE no action;