import Image from "next/image";
import {
  Copy,
  ArrowUpRight,
  ExternalLink,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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

type TBookmarkDetailDialogProps = {
  bookmark: Bookmark | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookmarkDetailDialog({ bookmark, open, onOpenChange }: TBookmarkDetailDialogProps) {
  if (!bookmark) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-border/50 bg-card">
        {/* Preview image area */}
        <div className="relative w-full h-56 bg-muted overflow-hidden">
          <Image
            height={1000}
            width={1000}
            src={bookmark.previewImage}
            alt={bookmark.title}
            className="size-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <DialogHeader className="space-y-2">
            {/* Favicon + Url row */}
            <div className="flex items-center gap-2">
              <Image
                height={1000}
                width={1000}
                src={bookmark.favicon}
                alt={bookmark.url}
                className="size-5 object-contain rounded-sm"
              />
              <Link
                href={bookmark.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 truncate"
              >
                {bookmark.url}
                <ExternalLink className="size-3 shrink-0" />
              </Link>
            </div>
            <DialogTitle className="text-xl font-semibold leading-snug text-foreground">
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
            <Button asChild className="flex-1 shadow-sm gap-2">
              <a href={bookmark.url} target="_blank" rel="noreferrer">
                <ArrowUpRight className="size-4" />
                Open Link
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shadow-sm"
              onClick={() => navigator.clipboard.writeText(bookmark.url)}
            >
              <Copy className="size-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}