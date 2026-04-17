// app/api/favicon/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  const res = await fetch(
    `https://www.google.com/s2/favicons?domain=${domain}&sz=256`
  );

  const buffer = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "image/png";

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}