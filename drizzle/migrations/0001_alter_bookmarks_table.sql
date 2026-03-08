ALTER TABLE "bookmarks" DROP COLUMN "favicon";


-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks_tag ENABLE ROW LEVEL SECURITY;

-- "users" TABLE POLICIES
CREATE POLICY "Users can read own profile"
ON users
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON users
FOR UPDATE
USING (auth.uid() = user_id);

-- "domains" TABLE POLICIES
CREATE POLICY "Authenticated users can only insert domain"
ON domains
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Domains are publicly readable"
ON domains
FOR SELECT
USING (true);

-- "bookmarks" TABLE POLICIES
CREATE POLICY "Users can view their bookmarks"
ON bookmarks
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookmarks"
ON bookmarks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their bookmarks"
ON bookmarks
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their bookmarks"
ON bookmarks
FOR DELETE
USING (auth.uid() = user_id);

-- "tags" TABLE POLICIES
CREATE POLICY "Tags are publicly readable"
ON tags
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can only create tags"
ON tags
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- "bookmarks_tag" TABLE POLICIES
CREATE POLICY "Users can view their bookmark tags"
ON bookmarks_tag
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM bookmarks
    WHERE bookmarks.id = bookmarks_tag.bookmark_id
    AND bookmarks.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create bookmark tags"
ON bookmarks_tag
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM bookmarks
    WHERE bookmarks.id = bookmarks_tag.bookmark_id
    AND bookmarks.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their bookmark tags"
ON bookmarks_tag
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM bookmarks
    WHERE bookmarks.id = bookmarks_tag.bookmark_id
    AND bookmarks.user_id = auth.uid()
  )
);