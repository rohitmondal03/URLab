import "@/styles/globals.css";
import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import { IRootLayout } from "@/types";
import { Toaster } from "@/components/ui/sonner";
import { SmootScroll } from "@/components/smooth-scroll";
import { QueryProvider } from "@/providers/query-provider";

const _googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  fallback: ["montserrat"],
  weight: ["400", "500", "600", "700"]
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://urlab.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

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
    url: APP_URL,
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
    canonical: APP_URL,
  },
};

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <body className={`${_googleSans.variable} font-sans antialiased`}>
        <QueryProvider>
          <SmootScroll>
            {children}
            <Toaster position="top-right" richColors duration={3000} />
          </SmootScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
