ALTER TABLE "users" RENAME COLUMN "avatar_url" TO "avatar_path";


-- Create "avatars" bucket
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);   

-- Users can upload their own avatar
create policy "Users can upload their own avatar"
on storage.objects for insert
to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);   

-- Users can update their own avatar
create policy "Users can update their own avatar"
on storage.objects for update
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);   

-- Users can delete their own avatar
create policy "Users can delete their own avatar"
on storage.objects for delete
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);   

-- Users can view their own avatar
create policy "Users can view their own avatar"
on storage.objects for select
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);   