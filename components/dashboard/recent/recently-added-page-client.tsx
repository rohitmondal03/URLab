"use client";

import type { TBookmarkWithTags } from "@/types";
import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookmarkCard } from "@/components/dashboard/(dashboard)/bookmark-card";
import { BookmarkDetailDialog } from "@/components/dashboard/(dashboard)/bookmark-details-dialog";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";
import { EmptyState } from "./recenly-added-empty-state";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

type SortKey = "newest-first" | "oldest-first";

export function RecentlyAddedPageClient() {
  const [selectedBookmark, setSelectedBookmark] = useState<TBookmarkWithTags | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("newest-first");

  const { data: recentBookmarks = [], isLoading } = useQuery(bookmarkQuery.recent({ limit: 6 }));

  // based on if oldest first or newest first, default - newest first
  const sortedBookmarks = useMemo(() => sort === "newest-first" ? recentBookmarks : [...recentBookmarks].reverse(),
    [sort, recentBookmarks]
  )

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
            <Select
              value={sort}
              onValueChange={v => setSort(v as SortKey)}
            >
              <SelectTrigger className="h-9 w-44 text-sm rounded-full bg-secondary/30 shadow-none focus:ring-0 focus:ring-offset-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest-first">
                  Newest First
                </SelectItem>
                <SelectItem value="oldest-first">
                  Oldest First
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid or empty state */}
          {sortedBookmarks.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sortedBookmarks?.map((bookmark) => (
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