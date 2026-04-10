import "./globals.css"
import type { IRootLayout } from "@/types";
import { Google_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/components/ui/sonner";
import { SmootScroll } from "@/components/smooth-scroll";
import { QueryProvider } from "@/providers/query-provider";
import { LANDING_PAGE_METADATA } from "@/lib/metadata/landing";
import { TooltipProvider } from "@/components/ui/tooltip";

const _googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  fallback: ["montserrat"],
  weight: ["400", "500", "600"],
  preload: true,
  display: "swap",
});

export const metadata = LANDING_PAGE_METADATA;

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <body className={`${_googleSans.className} font-sans antialiased`}>
        <QueryProvider>
          <SmootScroll>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster position="bottom-center" richColors duration={3000} />
          </SmootScroll>
        </QueryProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
