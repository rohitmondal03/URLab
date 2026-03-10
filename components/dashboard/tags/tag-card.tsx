import type { TTagWithStats } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";

type TTagCardProps = {
  tag: TTagWithStats;
  onClick: (tag: string) => void;
};

export function TagCard({ tag, onClick }: TTagCardProps) {
  return (
    <Card
      className="group flex flex-col gap-0 bg-card shadow-lg hover:shadow-xl border-zinc-300 transition-all duration-300 py-0 cursor-pointer overflow-hidden h-full hover:scale-[1.02]"
      onClick={() => onClick(tag.tag)}
    >
      <CardContent className="flex flex-col gap-3 p-5">
        {/* Tag name row */}
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
            <Tag className="size-3.5 text-primary/60" />
          </div>
          <p className="font-semibold text-sm text-foreground truncate">
            #{tag.tag}
          </p>
        </div>

        {/* Bookmark count */}
        <p className="text-xs text-muted-foreground">
          {tag.bookmarkCount} {tag.bookmarkCount === 1 ? "bookmark" : "bookmarks"}
        </p>

        {/* Last saved bookmark */}
        {tag.lastBookmarkTitle && (
          <div className="border-t border-border/40 pt-3">
            <p className="text-[11px] text-muted-foreground leading-none mb-1.5">Last saved</p>
            <p className="text-xs text-foreground/80 line-clamp-2 leading-snug">
              &ldquo;{tag.lastBookmarkTitle}&rdquo;
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
