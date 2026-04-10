"use server"

import { eq } from "drizzle-orm";
import { db } from "../../drizzle";
import { usersTable } from "../../drizzle/schema";
import { AVATAR_BUCKET_NAME } from "../constants";
import { getCurrentUser } from "./auth.action";
import { createAdminClient } from "../supabase/admin";
import { createClient } from "../supabase/server";

// To update user's details
export const updateUserDetails = async (name: string, email: string) => {
  const { error, data } = await (await createClient()).auth.updateUser({
    data: {
      name: name.trim(),
      email: email.trim(),
    }
  })

  if (error) {
    throw new Error(error.message);
  }
}

// To upload profile pic, by users
export async function uploadUsersAvatar(file: File) {
  const supabase = createAdminClient();

  const { userId } = await getCurrentUser();

  // If avatar exists delete it
  const [{ avatarPath: existingAvatarPath }] = await db
    .select({ avatarPath: usersTable.avatarPath })
    .from(usersTable)
    .where(eq(usersTable.userId, userId))
    .limit(1);

  if (existingAvatarPath) {
    await supabase.storage
      .from(AVATAR_BUCKET_NAME)
      .remove([existingAvatarPath]);
  }

  // upload the file into the "avatars" bucket
  // Use userId as a path prefix to avoid name collisions across users
  const filePath = `${userId}-${Date.now()}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET_NAME)
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    throw new Error(`Failed to upload profile picture: ${uploadError.message}`);
  }

  // get the public URL for the uploaded file
  const { data: publicUrlData } = supabase.storage
    .from(AVATAR_BUCKET_NAME)
    .getPublicUrl(uploadData.path);

  // update the avatar_url field in the users table
  await db
    .update(usersTable)
    .set({ avatarPath: filePath })
    .where(eq(usersTable.userId, userId));

  return { avatarUrl: publicUrlData.publicUrl, uploadData };
}

// For deleting profile pic
export async function deleteAvatar() {
  const supabase = createAdminClient();

  const { userId } = await getCurrentUser();

  // get path from users table and set it NULL, and delete from storage
  const [{ avatarPath: existingAvatarPath }] = await db
    .select({ avatarPath: usersTable.avatarPath })
    .from(usersTable)
    .where(eq(usersTable.userId, userId))
    .limit(1);

  if (!existingAvatarPath) {
    throw new Error("No Profile Picture present")
  }

  await db
    .update(usersTable)
    .set({ avatarPath: null })
    .where(eq(usersTable.userId, userId));

  supabase
    .storage
    .from(AVATAR_BUCKET_NAME)
    .remove([existingAvatarPath])
}