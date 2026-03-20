import type { TBookmarkWithTags } from "@/types";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { MoreVerticalIcon, FullscreenIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDateWithTime, getDomainFromUrl, getFaviconFromURL } from "@/lib/helper";

const BookmarkCardActionsDropwdownMenu = dynamic(() => import("./bookmark-card-actions-dropdown-menu")
  .then(mod => mod.BookmarkCardActionsDropdownMenu));

type TBookmarkCardProps = {
  bookmark: TBookmarkWithTags;
  onOpen: (b: TBookmarkWithTags) => void;
  cardIndex: number
}

export function BookmarkCard({ bookmark, onOpen, cardIndex }: TBookmarkCardProps) {
  const imagePreviewUrl = useMemo(() => bookmark.previewImage, [])
  const bookmarksFaviconURL = useMemo(() => getFaviconFromURL(bookmark.url), [bookmark.url]);
  const bookmarksDomain = useMemo(() => getDomainFromUrl(bookmark.url), [bookmark])
  const trimmedDescription = useMemo(() =>
    bookmark.description.length > 100
      ? bookmark.description?.slice(0, 100) + "...."
      : bookmark.description,
    [bookmark.description]
  );

  return (
    <Card className="group flex flex-col gap-0 bg-card shadow-zinc-400 shadow-[10px_10px_10px] hover:shadow-[20px_20px_10px] hover:-translate-1 hover:border-black border-zinc-500 transition-all duration-300 py-0 overflow-hidden h-full">
      {/* Preview image */}
      <div className="relative w-full aspect-auto bg-muted overflow-hidden shrink-0 border-b-2">
        <Image
          height={1000}
          width={1000}
          sizes="(max-width: 786px) 100vw, 451px"
          src={imagePreviewUrl ?? "/file.svg"}
          alt={bookmark.url}
          fetchPriority={cardIndex < 3 ? "high" : "low"}
          priority={cardIndex < 3}
          className="w-fit h-full object-fill group-hover:scale-[1.03] transition-transform duration-500"
          placeholder="blur"
          blurDataURL={bookmark.previewImage || ""}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).parentElement!.classList.add("preview-fallback");
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <CardContent className="flex flex-col gap-3 p-4 flex-1">
        <div className="flex items-center justify-between gap-2 w-full">
          {/* Favicon + Domain */}
          <div className="flex items-center gap-3 min-w-0">
            <Image
              height={1000}
              width={1000}
              src={bookmarksFaviconURL}
              alt={bookmark.url}
              className="size-4 object-contain rounded-sm"
            />
            <span className="text-sm truncate">
              {bookmarksDomain}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <BookmarkCardActionsDropwdownMenu bookmark={bookmark}>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
                aria-label="options-dropdown"
                onClick={e => e.stopPropagation()}
              >
                <MoreVerticalIcon className="size-4" />
              </Button>
            </BookmarkCardActionsDropwdownMenu>
            <Button
              variant="ghost"
              size="icon-lg"
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
              aria-label="open-bookmark"
              onClick={e => {
                e.stopPropagation();
                onOpen(bookmark);
              }}
            >
              <FullscreenIcon className="size-6" />
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {formattedDateWithTime(bookmark.createdAt)}
        </p>

        {/* Title */}
        <h1 className="font-semibold text-lg text-foreground line-clamp-2 leading-snug">
          {bookmark.title}
        </h1>

        {/* Description */}
        <p className="wrap-break-word text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {trimmedDescription}
        </p>

        <Separator />

        {/* Tags */}
        {bookmark.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {bookmark.tags.slice(0, 3).map(tag => (
              <Badge
                key={tag}
                className="text-[10px] px-3 py-px font-normal rounded-full border border-border/30"
              >
                {tag}
              </Badge>
            ))}
            {bookmark.tags.length > 3 && (
              <Badge variant={"secondary"} className="text-[10px] px-3 py-px font-normal rounded-full border border-border/30">
                +{bookmark.tags.length - 3}
              </Badge>
            )}
          </div>
        ) : (
          <Badge variant={"secondary"} className="text-[10px] px-3 py-px font-medium rounded-full border border-border/30">
            No Tags
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
