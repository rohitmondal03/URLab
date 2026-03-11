import type { Metadata } from "next";
import type { IRootLayout } from "@/types";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in or create a new URLab account to start saving, tagging, and organizing your links.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: IRootLayout) {
  return <>{children}</>;
}
