import type { TBookmarkWithTags } from "@/types";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useMemo } from "react";
import { CopyIcon, ArrowUpRightIcon, ExternalLinkIcon, MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formattedDateWithTime, getFaviconFromURL } from "@/lib/helper";
import { cn } from "@/lib/utils";

const BookmarkCardActionsDropdownMenu = dynamic(() => import("./bookmark-card-actions-dropdown-menu")
  .then(mod => mod.BookmarkCardActionsDropdownMenu), { ssr: false });

type TBookmarkDetailDialogProps = {
  bookmark: TBookmarkWithTags | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookmarkDetailDialog({
  bookmark,
  open,
  onOpenChange,
}: TBookmarkDetailDialogProps) {
  if (!bookmark) return null;

  const bookmarksFaviconURL = useMemo(() => getFaviconFromURL(bookmark.url), [bookmark.url]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onWheel={e => e.stopPropagation()}
        className="w-full max-w-lg p-0 overflow-hidden border-border/50 bg-card"
      >
        {/* Preview image area */}
        <div className="relative w-full h-64 bg-muted overflow-hidden">
          <Image
            height={1000}
            width={1000}
            src={bookmark.previewImage || ""}
            alt={bookmark.title || ""}
            className="size-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 min-w-0">
          <DialogHeader className="space-y-3 min-w-0">
            <div className="flex items-center justify-between">
              {/* Favicon + Url row */}
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                <Image
                  height={500}
                  width={500}
                  src={bookmarksFaviconURL}
                  alt={bookmark.url}
                  className="size-5 shrink-0 object-contain rounded-sm"
                  loading="lazy"
                />
                <Link
                  href={!bookmark.url.startsWith("https://")
                    ? `https://${bookmark.url}`
                    : bookmark.url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:text-foreground transition-colors flex items-center gap-1 w-52 md:w-64 lg:w-80 truncate"
                >
                  <span className="truncate">{bookmark.url}</span>
                  <ExternalLinkIcon className="size-3 shrink-0" />
                </Link>
              </div>

              <BookmarkCardActionsDropdownMenu bookmark={bookmark}>
                <Button
                  variant={"default"}
                  size={"icon-lg"}
                >
                  <MoreVertical />
                </Button>
              </BookmarkCardActionsDropdownMenu>
            </div>

            <p className="text-sm">
              <span className="text-muted-foreground">Uploaded at -</span> {" "}
              {formattedDateWithTime(bookmark.createdAt)}
            </p>

            <DialogTitle className="text-xl font-semibold leading-snug text-foreground wrap-break-word">
              {bookmark.title}
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {bookmark.description}
          </p>

          <Separator className="bg-zinc-300" />

          {/* Tags */}
          {bookmark.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {bookmark.tags.map(tag => (
                <Badge key={tag} className="text-[10px] px-3 py-px font-normal rounded-full border border-border/30">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <Link
              href={bookmark.url}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "flex-1 shadow-sm gap-2",
                buttonVariants({ variant: "secondary" })
              )}
            >
              <ArrowUpRightIcon className="size-4" />
              Open Link
            </Link>
            <Button
              variant="default"
              size="icon"
              className="shadow-sm"
              onClick={() => {
                try {
                  navigator.clipboard.writeText(bookmark.url)
                  toast.success("Link copied !!")
                } catch (error) {
                  toast.error("Link cannot be copied !!")
                }
              }}
            >
              <CopyIcon className="size-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  );
}