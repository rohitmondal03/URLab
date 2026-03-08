CREATE TABLE "bookmarks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"domain_id" uuid NOT NULL,
	"url" text NOT NULL,
	"title" text,
	"description" text,
	"favicon" text,
	"preview_image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookmarks_tag" (
	"bookmark_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain" text NOT NULL,
	"description" text,
	"favicon" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "domains_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tag" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tags_tag_unique" UNIQUE("tag")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"provider" text NOT NULL,
	"avatar_url" text NOT NULL,
	"joined_at" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks_tag" ADD CONSTRAINT "bookmarks_tag_bookmark_id_bookmarks_id_fk" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks_tag" ADD CONSTRAINT "bookmarks_tag_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_bookmarks_user_id" ON "bookmarks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_bookmarks_domain_id" ON "bookmarks" USING btree ("domain_id");--> statement-breakpoint
CREATE INDEX "idx_bookmarks_url" ON "bookmarks" USING btree ("url");--> statement-breakpoint
CREATE INDEX "idx_bookmarks_tag_bookmark_id" ON "bookmarks_tag" USING btree ("bookmark_id");--> statement-breakpoint
CREATE INDEX "idx_bookmarks_tag_tag_id" ON "bookmarks_tag" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "idx_domain_domain" ON "domains" USING btree ("domain");--> statement-breakpoint
CREATE INDEX "idx_tags_tag" ON "tags" USING btree ("tag");--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email");


-- FUNCTION TO AUTO-ENTER "NEW USER'S" DETAILS IN "users" TABLE
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    user_id,
    name,
    email,
    provider,
    avatar_url
  )
  values (
    new.id,

    coalesce(
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'full_name',
      'User'
    ),

    new.email,

    coalesce(
      new.raw_app_meta_data->>'provider',
      'email'
    ),

    coalesce(
      new.raw_user_meta_data->>'avatar_url',
      ''
    )
  );

  return new;
end;
$$;

-- TRIGGER FOR "AUTO-USER'S ENTERY" in "users" TABLE
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();