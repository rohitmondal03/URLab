import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
        <Search className="size-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">No results for &ldquo;{query}&rdquo;</p>
        <p className="text-sm text-muted-foreground mt-1">Try a different domain name.</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full" onClick={onClear}
      >
        Clear search
      </Button>
    </div>
  );
}