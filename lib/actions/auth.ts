"use server"

import { Provider as OAuthProvider } from "@supabase/supabase-js";
import { createClient } from "../supabase/server"
import { BASE_URL } from "../helper";
import { redirect } from "next/navigation";

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