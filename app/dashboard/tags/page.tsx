import { Metadata } from "next";
import { QueryClient } from "@tanstack/react-query";
import { tagsQuery } from "@/tanstack/queries";
import TagsPageClient from "@/components/dashboard/tags/tags-page-client";

export const metadata: Metadata = {
  title: "Tags",
  description:
    "Browse all your URL tags. Quickly filter and find bookmarks by topic or category.",
  robots: { index: false, follow: false },
};

export default async function TagsPage() {
  const query = new QueryClient();

  await query.prefetchQuery(tagsQuery.default())

  return (
    <TagsPageClient />
  );
}
