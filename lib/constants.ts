export const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://urlab-live.vercel.app"

export const GITHUB_LINK = "https://github.com/rohitmondal03/urlab"

export const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again later.";
export const DEFAULT_METADATA_ERROR_MESSAGE = "Error fetching data from URL or you might've entered wrong URL"

export const KEYBOARD_SHORTCUT_LIST = [
  { key: "a", label: "Add Bookmark" },
  { key: "/", label: "Search Bookmark" },
  { key: "k", label: "View Shortcuts" },
  { key: "d", label: "Dashboard" },
  { key: "r", label: "Recently Added" },
  { key: "f", label: "Favourites" },
  { key: "t", label: "Tags" },
  { key: "o", label: "Domains" },
  { key: "p", label: "Popular" },
  { key: "g", label: "Trending" },
]

export const TANSTACK_STALE_TIME = 100 * 60 * 5;