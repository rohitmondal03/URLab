// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from "https://deno.land/std@0.192.0/http/server.ts"
import { getDomain } from "npm:tldts"

serve(async (req) => {
  const { url } = await req.json()

  const res = await fetch(url)
  const html = await res.text()

  const titleMatch = html.match(/<title>(.*?)<\/title>/i)
  const descriptionMatch = html.match(
    /<meta name="description" content="(.*?)"/i
  )
  const imageMatch = html.match(
    /<meta property="og:image" content="(.*?)"/i
  )

  const metadata = {
    title: titleMatch?.[1] ?? null,
    description: descriptionMatch?.[1] ?? null,
    previewImage: imageMatch?.[1] ?? null,
    domain: getDomain(url),
  }

  return new Response(JSON.stringify(metadata), {
    headers: { "Content-Type": "application/json" }
  })
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/fetch-metadata' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
