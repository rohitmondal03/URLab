"use client";

import type { TBookmarkWithTags } from "@/types";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, type Variants } from "framer-motion";
import { BookmarkCard } from "./bookmark-card";
import { BookmarkDetailDialog } from "./bookmark-details-dialog";
import { BookmarkGridSkeleton } from "@/components/dashboard/(dashboard)/bookmark-grid-skeleton";
import { bookmarkQuery } from "@/tanstack/queries";
import { EmptyState } from "./dashboard-empty-state";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPageClient() {
  const searchParams = useSearchParams();
  const tagParams = searchParams.get("tag");
  const domainParams = searchParams.get("domain");

  const [selectedBookmark, setSelectedBookmark] = useState<TBookmarkWithTags | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: bookmarks = [], isLoading } = useQuery(bookmarkQuery.all());

  // filtering based on "tag" and "domain" query
  const filteredBookmarks = useMemo(() => {
    let result = bookmarks;

    if (tagParams) {
      result = result.filter(bookmark => bookmark.tags.includes(tagParams));
    }

    if (domainParams) {
      result = result.filter(bookmark => bookmark.url.includes(domainParams));
    }

    return result;
  }, [tagParams, domainParams])

  const handleOpen = (bookmark: TBookmarkWithTags) => {
    setSelectedBookmark({ ...bookmark });
    setDialogOpen(true);
  };

  return (
    <>
      {isLoading
        ? <BookmarkGridSkeleton />
        : (
          <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border/40">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  All Links
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {filteredBookmarks.length} items
                </p>
              </div>
            </div>

            {/* Grid */}
            {filteredBookmarks.length === 0 ? (
              <EmptyState />
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBookmarks.map((bookmark) => (
                  <motion.div key={bookmark.id} variants={itemVariants}>
                    <BookmarkCard bookmark={{ ...bookmark }} onOpen={handleOpen} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )
      }

      {/* Detail dialog */}
      <BookmarkDetailDialog
        bookmark={selectedBookmark}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
