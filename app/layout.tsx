import "@/styles/globals.css";
import { Google_Sans } from "next/font/google";
import type { IRootLayout } from "@/types";
import { Toaster } from "@/components/ui/sonner";
import { SmootScroll } from "@/components/smooth-scroll";
import { QueryProvider } from "@/providers/query-provider";
import { LANDING_PAGE_METADATA } from "@/lib/metadata/landing";

const _googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  fallback: ["montserrat"],
  weight: ["400", "500", "600", "700"]
});

export const metadata = LANDING_PAGE_METADATA;

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <body className={`${_googleSans.className} font-sans antialiased`}>
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
