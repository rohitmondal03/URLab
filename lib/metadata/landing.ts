import { type Metadata } from "next";
import { BASE_URL } from "../helper";


export const LANDING_PAGE_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "URLab – Your Personal Lab for Organizing the Internet",
    template: "%s | URLab",
  },
  description:
    "URLab is your personal lab for saving, tagging, and organizing URLs from across the internet. Bookmark smarter, find faster.",

  keywords: [
    "URL organizer",
    "bookmark manager",
    "save links",
    "tag URLs",
    "organize bookmarks",
    "link manager",
    "URLab",
    "internet organizer",
  ],

  authors: [{ name: "URLab" }],
  creator: "URLab",
  publisher: "URLab",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "URLab",
    title: "URLab – Your Personal Lab for Organizing the Internet",
    description:
      "Save, tag, and organize URLs from across the internet. Bookmark smarter with URLab.",
  },

  twitter: {
    card: "summary_large_image",
    title: "URLab – Your Personal Lab for Organizing the Internet",
    description:
      "Save, tag, and organize URLs from across the internet. Bookmark smarter with URLab.",
    creator: "@urlab_app",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: BASE_URL,
  },
};