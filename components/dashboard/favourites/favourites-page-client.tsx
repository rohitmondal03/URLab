"use client"

import type { TBookmarkWithTags } from "@/types";
import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { useQuery } from "@tanstack/react-query";
import { bookmarkQuery } from "@/tanstack/queries";
import { BookmarkGridSkeleton } from "../(dashboard)/bookmark-grid-skeleton";
import { EmptyState } from "./favourites-empty-state";
import { BookmarkCard } from "../(dashboard)/bookmark-card";
import { BookmarkDetailDialog } from "../(dashboard)/bookmark-details-dialog";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FavouritesPageClient() {
  const [selectedBookmark, setSelectedBookmark] = useState<TBookmarkWithTags | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: favouriteBookmarks = [], isLoading } = useQuery(bookmarkQuery.favourites());

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
                Favourites
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {favouriteBookmarks?.length} {favouriteBookmarks?.length === 1 ? "item" : "items"} you've favourited
              </p>
            </div>
          </div>

          {/* Grid or empty state */}
          {favouriteBookmarks.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {favouriteBookmarks?.map((bookmark, idx) => (
                <motion.div key={bookmark.id} variants={itemVariants}>
                  <BookmarkCard cardIndex={idx} bookmark={{ ...bookmark }} onOpen={handleOpen} />
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