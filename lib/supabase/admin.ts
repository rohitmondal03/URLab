import { createClient } from "@supabase/supabase-js";

// Admin client uses the service role key — bypasses RLS.
// Only use this on the server (server actions, API routes).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
