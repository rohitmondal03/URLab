"use server"

import { createClient } from "../supabase/server"

// Get current session
export const getCurrentSession = async () => {
  const { data, error } = await (await createClient()).auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || !data.session) {
    throw new Error("No session found")
  }

  return data.session;
}