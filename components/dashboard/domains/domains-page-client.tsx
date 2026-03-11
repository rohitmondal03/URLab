"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { domainsQuery } from "@/tanstack/queries";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DomainCard } from "./domain-card";
import { EmptyState } from "./domains-empty-state";
import { NoResults } from "./empty-query-results";
import { DomainsPageSkeleton } from "./domains-page-skeleton";

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

export default function DomainsPageClient() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("bookmarks");
  const [page, setPage] = useState(1);

  const deferredSearch = useDeferredValue(search);

  const { data: domains = [], isLoading } = useQuery(domainsQuery.default())

  const processed = useMemo(() => {
    // 1. Filter
    const filtered = deferredSearch.trim()
      ? domains.filter((d) =>
        d.domain.toLowerCase().includes(deferredSearch.toLowerCase())
      )
      : domains;

    // 2. Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "bookmarks") return b.bookmarkCount - a.bookmarkCount;
      if (sort === "recent") {
        const ta = a.lastBookmarkCreatedAt?.getTime() ?? 0;
        const tb = b.lastBookmarkCreatedAt?.getTime() ?? 0;
        return tb - ta;
      }
      // alpha
      return a.domain.localeCompare(b.domain);
    });

    return sorted;
  }, [domains, deferredSearch, sort]);

  const paginated = processed.slice(0, PAGE_SIZE * page);
  const hasMore = paginated.length < processed.length;

  const handleCardClick = (domain: string) => {
    router.push(`/dashboard?domain=${encodeURIComponent(domain)}`);
  };

  return isLoading
    ? <DomainsPageSkeleton />
    : (
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border/40">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Domains</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Browse your bookmarks by website
            </p>
          </div>
          <span className="text-sm text-muted-foreground self-center">
            {processed.length} {processed.length === 1 ? "domain" : "domains"}
          </span>
        </div>

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
              placeholder="Search domains…"
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
              <SelectItem value="recent">Recently added</SelectItem>
              <SelectItem value="alpha">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid / Empty */}
        {domains.length === 0 ? (
          <EmptyState />
        ) : processed.length === 0 ? (
          <NoResults query={deferredSearch} onClear={() => setSearch("")} />
        ) : (
          <>
            <motion.div
              key={`${deferredSearch}-${sort}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {paginated.map((domain) => (
                <motion.div key={domain.domain} variants={itemVariants}>
                  <DomainCard domain={domain} onClick={handleCardClick} />
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
