"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BookmarkCard } from "./bookmark-card";
import { BookmarkDetailDialog } from "./bookmark-details-dialog";
import { getDomainFromUrl } from "@/lib/helper";

type Bookmark = {
  id: number;
  url: string;
  title: string;
  description: string;
  domain: string;
  tags: string[];
  favicon: string;
  previewImage: string;
};

const mockBookmarks: Bookmark[] = [
  {
    id: 1,
    url: "https://raindrop.io/hello",
    title: "All-in-one bookmark manager",
    description: "Intuitive, powerful and beautiful bookmark manager. Save anything from the web — links, articles, images, and much more.",
    domain: "raindrop.io",
    tags: ["tools", "inspiration"],
    favicon: "https://www.google.com/s2/favicons?domain=raindrop.io&sz=128",
    previewImage: "https://og.raindrop.io/og.png",
  },
  {
    id: 2,
    url: "https://notion.so",
    title: "Notion – The all-in-one workspace",
    description: "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.",
    domain: "notion.so",
    tags: ["workspace", "productivity"],
    favicon: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    previewImage: "https://www.notion.so/front-static/meta/default.png",
  },
  {
    id: 3,
    url: "https://ui.shadcn.com",
    title: "shadcn/ui — Beautifully designed components",
    description: "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
    domain: "ui.shadcn.com",
    tags: ["design", "react", "components"],
    favicon: "https://www.google.com/s2/favicons?domain=ui.shadcn.com&sz=128",
    previewImage: "https://ui.shadcn.com/og.jpg",
  },
  {
    id: 4,
    url: "https://vercel.com",
    title: "Vercel — Build and deploy the best Web experiences",
    description: "Vercel is the platform for frontend developers, providing speed and reliability for deploying at the moment of inspiration.",
    domain: "vercel.com",
    tags: ["hosting", "nextjs"],
    favicon: "https://www.google.com/s2/favicons?domain=vercel.com&sz=128",
    previewImage: "https://assets.vercel.com/image/upload/front/vercel/dps.png",
  },
  {
    id: 5,
    url: "https://github.com",
    title: "GitHub: Let's build from here",
    description: "GitHub is where over 100 million developers shape the future of software. Contribute to open source, manage your projects, and ship better code.",
    domain: "github.com",
    tags: ["code", "collaboration"],
    favicon: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
    previewImage: "https://github.githubassets.com/images/modules/site/social-cards/homepage.png",
  },
  {
    id: 6,
    url: "https://framer.com/motion",
    title: "Framer Motion — Production-ready animations",
    description: "A production-ready motion library for React. Harness the power of natural spring animations, gestures, and GPU-accelerated transitions.",
    domain: "framer.com",
    tags: ["animation", "react"],
    favicon: "https://www.google.com/s2/favicons?domain=framer.com&sz=128",
    previewImage: "https://www.framer.com/images/social/motion.png",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPageClient() {
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = (bookmark: Bookmark) => {
    setSelectedBookmark({ ...bookmark, domain: getDomainFromUrl(bookmark.url) || "" });
    setDialogOpen(true);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/40">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">All Links</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{mockBookmarks.length} saved items</p>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mockBookmarks.map((bookmark) => (
            <motion.div key={bookmark.id} variants={itemVariants}>
              <BookmarkCard bookmark={{ ...bookmark, domain: getDomainFromUrl(bookmark.url) || "" }} onOpen={handleOpen} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail dialog */}
      <BookmarkDetailDialog
        bookmark={selectedBookmark}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
