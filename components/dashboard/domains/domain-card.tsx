import type { TDomainWithStats } from "@/types";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getFaviconFromURL } from "@/lib/helper";

type TDomainCardProps = {
  domain: TDomainWithStats;
  onClick: (domain: string) => void;
};

export function DomainCard({ domain, onClick }: TDomainCardProps) {
  return (
    <Card
      className="group flex flex-col gap-0 bg-card shadow-zinc-400 shadow-[5px_5px_10px] hover:shadow-[10px_10px_20px] border-zinc-300 transition-all duration-300 py-0 cursor-pointer overflow-hidden h-full hover:scale-[1.02]"
      onClick={() => onClick(domain.domain)}
    >
      <CardContent className="flex flex-col gap-3 p-5">
        {/* Favicon + domain name */}
        <div className="flex items-center gap-3">
          <Image
            src={getFaviconFromURL(domain.domain)}
            alt={domain.domain}
            width={32}
            height={32}
            // className="object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">
              {domain.domain}
            </p>
            <p className="text-xs text-muted-foreground">
              {domain.bookmarkCount} {domain.bookmarkCount === 1 ? "bookmark" : "bookmarks"}
            </p>
          </div>
        </div>

        {/* Last saved bookmark */}
        {domain.lastBookmarkTitle && (
          <div className="border-t border-border/40 pt-3">
            <p className="text-[11px] text-muted-foreground leading-none mb-1.5">
              Last saved
            </p>
            <p className="text-xs text-foreground/80 line-clamp-2 leading-snug">
              &ldquo;{domain.lastBookmarkTitle}&rdquo;
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
