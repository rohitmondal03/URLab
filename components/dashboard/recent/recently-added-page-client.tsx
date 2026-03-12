"use client";

import type { TBookmarkWithTags } from "@/types";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";
import { BookmarkCard } from "@/components/dashboard/(dashboard)/bookmark-card";
import { BookmarkDetailDialog } from "@/components/dashboard/(dashboard)/bookmark-details-dialog";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function RecentlyAddedPageClient() {
  const [selectedBookmark, setSelectedBookmark] = useState<TBookmarkWithTags | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: recentBookmarks = [], isLoading } = useQuery(bookmarkQuery.recent({ limit: 6 }));

  const handleOpen = (bookmark: TBookmarkWithTags) => {
    setSelectedBookmark({ ...bookmark });
    setDialogOpen(true);
  };

  return isLoading
    ? <BookmarkGridSkeleton />
    : (
      <>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border/40">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Recently Added
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {recentBookmarks?.length} recent {recentBookmarks?.length === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/40 border border-border/40 rounded-full px-3 py-1.5">
              <Clock className="size-3.5" />
              Newest first
            </div>
          </div>

          {/* Grid or empty state */}
          {recentBookmarks.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {recentBookmarks?.map((bookmark) => (
                <motion.div key={bookmark.id} variants={itemVariants}>
                  <BookmarkCard bookmark={{ ...bookmark }} onOpen={handleOpen} />
                </motion.div>
              ))}
            </motion.div>
          )}
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

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
        <Clock className="size-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">No bookmarks yet</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Start saving links to see your most recent bookmarks here.
        </p>
      </div>
    </div>
  );
}