"use server"

import { redirect } from "next/navigation";
import { Provider as OAuthProvider } from "@supabase/supabase-js";
import { createClient } from "../supabase/server"
import { BASE_URL } from "../constants";

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
  const { error, data } = await (await createClient()).auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  return {
    userId: user.id,
    name: String(user.user_metadata.name || user.user_metadata.full_name),
    email: String(user.email),
    provider: String(user.app_metadata.provider),
  }
} 