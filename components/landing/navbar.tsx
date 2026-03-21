"use client"

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion"
import { buttonVariants } from "../ui/button";
import { Logo } from "../shared/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <motion.header
      className="w-full max-w-6xl flex justify-between items-center py-4 px-4 sm:px-6 md:px-12 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-zinc-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <Logo variant="large" />
      <nav className="flex items-center gap-4">
        <Link href="/dashboard" className={cn(
          buttonVariants({ variant: "default" })
        )}>
          <span className="hidden sm:inline">Your Bookmarks</span>
          <Bookmark fill={"#fff"} className="shrink-0" />
        </Link>
      </nav>
    </motion.header>
  )
}