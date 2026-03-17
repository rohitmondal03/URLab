import Link from "next/link";
import { Hash, MoveLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
        <Hash className="size-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">No tags yet</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Start tagging bookmarks to organise them better.
        </p>
      </div>
      <Link
        href={"/dashboard"}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" })
        )}
      >
        <MoveLeftIcon /> Start adding Bookmark
      </Link>
    </div >
  );
}