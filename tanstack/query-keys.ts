export const queryKeys = {
  bookmarks: ["bookmarks"],
  bookmark: (id: string) => ["bookmark", id],
  recentBookmarks: ["bookmarks", "recent"],
  tags: ["tags"],
  domains: ["domains"],
  favourites: ["bookmarks", "favourites"]
}