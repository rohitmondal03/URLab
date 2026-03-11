"use client";

import type { TTagWithStats } from "@/types";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { tagsQuery } from "@/tanstack/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagCard } from "./tag-card";
import { StatChip } from "./tag-stat-chip";
import { TagsPageSkeleton } from "./tags-page-skeleton";
import { EmptyState } from "./empty-tags-state";
import { NoResults } from "./empty-query-results";

const PAGE_SIZE = 12;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

type SortKey = "bookmarks" | "recent" | "alpha";

export default function TagsPageClient() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("bookmarks");
  const [page, setPage] = useState(1);

  const { data: tags = [], isLoading } = useQuery(tagsQuery.default());

  // Derived statistics (computed from full list, not filtered)
  const stats = useMemo(() => {
    const totalTagged = tags.reduce((acc, t) => acc + t.bookmarkCount, 0);
    const mostUsed = tags.reduce<TTagWithStats | null>(
      (best, t) => (!best || t.bookmarkCount > best.bookmarkCount ? t : best),
      null
    );
    return { totalTags: tags.length, totalTagged, mostUsed };
  }, [tags]);

  const processed = useMemo(() => {
    const filtered = search.trim()
      ? tags.filter((t) =>
        t.tag.toLowerCase().includes(search.toLowerCase())
      )
      : tags;

    return [...filtered as TTagWithStats[]].sort((a, b) => {
      if (sort === "bookmarks") return b.bookmarkCount - a.bookmarkCount;
      if (sort === "recent") {
        const ta = a.lastBookmarkCreatedAt?.getTime() ?? 0;
        const tb = b.lastBookmarkCreatedAt?.getTime() ?? 0;
        return tb - ta;
      }
      return a.tag.localeCompare(b.tag);
    });
  }, [tags, search, sort]);

  const paginated = processed.slice(0, PAGE_SIZE * page);
  const hasMore = paginated.length < processed.length;

  const handleCardClick = (tag: string) => {
    router.push(`/dashboard?tag=${encodeURIComponent(tag)}`);
  };

  return isLoading
    ? <TagsPageSkeleton />
    : (
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border/40">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Tags</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Organize and explore bookmarks by tags
            </p>
          </div>
          <span className="text-sm text-muted-foreground self-center">
            {processed.length} {processed.length === 1 ? "tag" : "tags"}
          </span>
        </div>

        {/* Statistics chips */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            <StatChip label="Total Tags" value={String(stats.totalTags)} />
            <StatChip label="Total Tagged Bookmarks" value={String(stats.totalTagged)} />
            {stats.mostUsed && (
              <StatChip label="Most Used" value={`#${stats.mostUsed.tag}`} />
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-52 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search tags…"
              className="pl-9 h-9 bg-secondary/30 focus-visible:bg-background focus-visible:border-ring/50 rounded-full shadow-none text-sm"
            />
          </div>

          <Select
            value={sort}
            onValueChange={(v) => {
              setSort(v as SortKey);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-44 text-sm rounded-full bg-secondary/30 border-border/50 shadow-none focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bookmarks">Most bookmarks</SelectItem>
              <SelectItem value="recent">Recently created</SelectItem>
              <SelectItem value="alpha">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid / Empty */}
        {tags.length === 0 ? (
          <EmptyState />
        ) : processed.length === 0 ? (
          <NoResults query={search} onClear={() => setSearch("")} />
        ) : (
          <>
            <motion.div
              key={`${search}-${sort}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {paginated.map((tag) => (
                <motion.div key={tag.tag} variants={itemVariants}>
                  <TagCard tag={tag} onClick={handleCardClick} />
                </motion.div>
              ))}
            </motion.div>

            {hasMore && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  className="rounded-full text-sm px-6"
                  onClick={() => setPage((p) => p + 1)}
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    )
}

