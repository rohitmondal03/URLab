"use server"

import { redirect } from "next/navigation";
import { Provider as OAuthProvider } from "@supabase/supabase-js";
import { createClient } from "../supabase/server"
import { AVATAR_BUCKET_NAME, BASE_URL } from "../constants";
import { db } from "@/drizzle";
import { usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// signup user with email
export const signupWithEmail = async (name: string, email: string, password: string) => {
  const { error } = await (await createClient()).auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  })

  if (error) {
    throw new Error(error.message);
  }

  redirect("/dashboard");
}

// login with email
export const loginWithEmail = async (email: string, password: string) => {
  const { error } = await (await createClient()).auth.signInWithPassword({ email, password })

  if (error) {
    console.log(error)
    throw new Error(error.message);
  }

  redirect("/dashboard");
}

// OAuth signin
export const signinWithOAuth = async (provider: OAuthProvider) => {
  const { error } = await (await createClient()).auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${BASE_URL}/auth/callback`
    }
  })

  if (error) {
    console.log(error)
    throw new Error(error.message);
  }
}

// Sign-out
export const signout = async () => {
  const { error } = await (await createClient()).auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

// get current user
export const getCurrentUser = async () => {
  const supabase = await createClient();

  const { error, data: usersData } = await supabase.auth.getUser();

  // user's avatar path
  const [{ avatarPath }] = await db
    .select({ avatarPath: usersTable.avatarPath })
    .from(usersTable)
    .where(eq(usersTable.userId, usersData.user?.id as string))
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  let avatarUrl: string | null = null;

  if (avatarPath) {
    const urlData = supabase
      .storage
      .from(AVATAR_BUCKET_NAME)
      .getPublicUrl(avatarPath);

    avatarUrl = urlData.data.publicUrl;
  }

  const user = usersData.user;

  return {
    userId: user.id,
    name: String(user.user_metadata.name || user.user_metadata.full_name),
    email: String(user.email),
    provider: String(user.app_metadata.provider),
    avatarUrl,
  }
}