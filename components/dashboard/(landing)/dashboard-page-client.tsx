"use client";

import type { TBookmarkWithTags } from "@/types";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BookmarkCard } from "./bookmark-card";
import { BookmarkDetailDialog } from "./bookmark-details-dialog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type TDashboardPageClientProps = {
  bookmarks: TBookmarkWithTags[];
}

export default function DashboardPageClient({ bookmarks }: TDashboardPageClientProps) {
  const [selectedBookmark, setSelectedBookmark] = useState<TBookmarkWithTags | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = (bookmark: TBookmarkWithTags) => {
    setSelectedBookmark({ ...bookmark });
    setDialogOpen(true);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/40">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">All Links</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{bookmarks.length} saved items</p>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {bookmarks.map((bookmark) => (
            <motion.div key={bookmark.id} variants={itemVariants}>
              <BookmarkCard bookmark={{ ...bookmark }} onOpen={handleOpen} />
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
