import "./globals.css";
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

export const metadata: Metadata = {
  title: "URLab",
  description: "Your personal lab for organizing the internet.",
};

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <body className={`${_googleSans.variable} font-sans antialiased`}>
        <QueryProvider>
          <SmootScroll>
            {children}
            <Toaster
              position="top-right"
              richColors
              duration={3000}
            />
          </SmootScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
