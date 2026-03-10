// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// import { serve } from "https://deno.land/std@0.192.0/http/server.ts"
// import { getDomain } from "npm:tldts"

// serve(async (req) => {
//   const { url } = await req.json()

//   const res = await fetch(url)
//   const html = await res.text()

//   const titleMatch = html.match(/<title>(.*?)<\/title>/i)
//   const descriptionMatch = html.match(
//     /<meta name="description" content="(.*?)"/i
//   )
//   const imageMatch = html.match(
//     /<meta property="og:image" content="(.*?)"/i
//   )

//   const metadata = {
//     title: titleMatch?.[1] ?? null,
//     description: descriptionMatch?.[1] ?? null,
//     previewImage: imageMatch?.[1] ?? null,
//     domain: getDomain(url),
//   }

//   return new Response(JSON.stringify(metadata), {
//     headers: { "Content-Type": "application/json" }
//   })
// })


import { serve } from "https://deno.land/std/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { load } from "https://esm.sh/cheerio"

serve(async (req) => {
  try {
    const { url, bookmarkId, domainId } = await req.json()

    if (!url || !bookmarkId) {
      return new Response(
        JSON.stringify({ error: "Missing parameters" }),
        { status: 400 }
      )
    }

    // run background task
    EdgeRuntime.waitUntil(
      processBookmark(url, bookmarkId, domainId)
    )

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

async function processBookmark(
  url: string,
  bookmarkId: string,
  domainId: string
) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      }
    })

    const html = await res.text()
    const $ = load(html)

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").text() ||
      null

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      null

    const previewImage =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      null

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    await supabase
      .from("bookmarks")
      .update({
        title,
        description,
        preview_image: previewImage,
        url: url,
        domain_id: domainId
      })
      .eq("id", bookmarkId)

  } catch (err) {
    console.error("Metadata fetch failed:", err)
  }
}