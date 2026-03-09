import Image from "next/image";
import {
  MoreVertical,
  Copy,
  Edit2,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDomainFromUrl } from "@/lib/helper";
import { CircleX } from "../animate-ui/icons/circle-x";

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

type TBookmarkCardProps = {
  bookmark: Bookmark;
  onOpen: (b: Bookmark) => void
}

export function BookmarkCard({ bookmark, onOpen }: TBookmarkCardProps) {
  return (
    <Card
      className="group flex flex-col bg-card shadow-lg hover:shadow-xl border-zinc-300 transition-all duration-300 py-0 cursor-pointer overflow-hidden h-full hover:scale-[1.02]"
      onClick={() => onOpen(bookmark)}
    >
      {/* Preview image */}
      <div className="relative w-full h-52 aspect-auto bg-muted overflow-hidden shrink-0 border-b-2">
        <Image
          height={1000}
          width={1000}
          src={bookmark.previewImage}
          alt={bookmark.url}
          loading="lazy"
          className="w-fit h-full object-fill group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).parentElement!.classList.add("preview-fallback");
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="flex flex-col gap-3 p-4 flex-1">
        {/* Favicon + Domain */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <Image
              height={1000}
              width={1000}
              src={bookmark.favicon}
              alt={bookmark.url}
              className="size-5 object-contain rounded-sm"
              loading="lazy"
            />
            <span className="text-sm text-muted-foreground truncate">
              {bookmark.domain}
            </span>
          </div>

          {/* Actions dropdown — stops card click propagation */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 border-border/50 bg-card/95 backdrop-blur-md">
              <DropdownMenuItem
                className="text-sm cursor-pointer gap-2"
                onClick={() => window.open(bookmark.url, "_blank")}
              >
                <ExternalLink className="size-4" /> Open link
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm cursor-pointer gap-2"
                onClick={() => navigator.clipboard.writeText(bookmark.url)}
              >
                <Copy className="size-4" /> Copy link
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm cursor-pointer gap-2">
                <Edit2 className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="text-sm text-destructive cursor-pointer focus:text-destructive gap-2">
                <Trash2 className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-foreground line-clamp-2 leading-snug">
          {bookmark.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {bookmark.description}
        </p>

        <Separator />

        {/* Tags */}
        {bookmark.tags.length > 0 && (
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
              <Badge className="text-[10px] px-3 py-px font-normal rounded-full border border-border/30">
                +{bookmark.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
