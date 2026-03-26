import type { Metadata } from "next";
import { BASE_URL } from "../constants";

export const DASHBOARD_PAGE_METADATA: Metadata = {
  title: "Dashboard",
  description:
    "View and manage all your saved bookmarks in one place. Filter, search, and organize your links effortlessly.",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: BASE_URL + "/dashboard",
  },
}

export const DOMAINS_PAGE_METADATA: Metadata = {
  title: "Domains",
  description: "See all the domains you have bookmarked. Group and explore your saved links by their source domain.",

  robots: {
    index: true,
    follow: true
  },

  alternates: {
    canonical: BASE_URL + "/dashboard/domains",
  },
};

export const RECENTS_PAGE_METADATA: Metadata = {
  title: "Recents",
  description: "See and manage your recently added bookmarks from here.",

  robots: {
    index: true,
    follow: true
  },

  alternates: {
    canonical: BASE_URL + "/dashboard/recent",
  },
}

export const FAVOURITES_PAGE_METADATA: Metadata = {
  title: "Favourites",
  description: "See and manage your recently added bookmarks from here.",

  robots: {
    index: true,
    follow: true
  },

  alternates: {
    canonical: BASE_URL + "/dashboard/favourites",
  },
}

export const TAGS_PAGE_METADATA: Metadata = {
  title: "Tags",
  description: "Browse all your URL tags. Quickly filter and find bookmarks by topic or category.",

  robots: {
    index: true,
    follow: true
  },

  alternates: {
    canonical: BASE_URL + "/dashboard/tags",
  },
};
