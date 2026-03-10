import DashboardPageClient from "@/components/dashboard/(landing)/dashboard-page-client";
import { getCurrentUsersBookmarks } from "@/lib/actions/bookmark.action";

export default async function DashboardPage() {
  const bookmarks = await getCurrentUsersBookmarks();

  return <DashboardPageClient bookmarks={bookmarks} />;
}
