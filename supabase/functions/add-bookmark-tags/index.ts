// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from "https://deno.land/std/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    const { tags, bookmarkId } = await req.json()

    if (!bookmarkId) {
      return new Response(
        JSON.stringify({ error: "Missing parameters" }),
        { status: 400 }
      )
    }

    if (!tags || tags.length === 0) {
      return new Response(
        JSON.stringify({ error: "No tags" }),
        { status: 200 }
      )
    }

    // run background task
    EdgeRuntime.waitUntil(processTags(tags, bookmarkId))

    return new Response(
      JSON.stringify({ status: "processing" }),
      {
        headers: { "Content-Type": "application/json", }
      }
    )

  } catch (error) {
    console.error("Request error:", error)

    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400 }
    )
  }
})

async function processTags(tags: string[], bookmarkId: string) {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    for (const tag of tags) {

      const { data: existingTags } = await supabase
        .from("tags")
        .select()
        .eq("tag", tag)
        .limit(1)

      const existingTag = existingTags?.[0]

      if (existingTag) {
        await supabase
          .from("bookmark_tags")
          .insert({
            bookmark_id: bookmarkId,
            tag_id: existingTag.id,
          })
      }
      else {
        const { data: insertedTag } = await supabase
          .from("tags")
          .insert({ tag })
          .select()
          .single()

        await supabase
          .from("bookmark_tags")
          .insert({
            bookmark_id: bookmarkId,
            tag_id: insertedTag.id,
          })
      }
    }

  } catch (err) {
    console.error("Adding tags failed:", err)
  }
}
