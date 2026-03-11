import { Hash } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
        <Hash className="size-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">No tags yet</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Start tagging bookmarks to organise them better.
        </p>
      </div>
    </div>
  );
}