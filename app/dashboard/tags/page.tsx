import { QueryClient } from "@tanstack/react-query";
import { tagsQuery } from "@/tanstack/queries";
import TagsPageClient from "@/components/dashboard/tags/tags-page-client";

export default async function TagsPage() {
  const query = new QueryClient();

  await query.prefetchQuery(tagsQuery.default())

  return (
    <TagsPageClient />
  );
}
