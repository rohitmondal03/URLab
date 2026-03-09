import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Info } from "lucide-react";
import type { TUrlMetadata } from "@/types";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { URLPreviewCard, URLPreviewCardSkeleton } from "./link-preview-card";
import { useDebounce } from "@/hooks/use-debounce";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { CircleX } from "../animate-ui/icons/circle-x";
import { Badge } from "../ui/badge";
import { Kbd } from "../ui/kbd";
import { getURLMetadata } from "@/lib/actions/metadata";

type TAddBookmarkProps = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
}

export function AddBookmarkDialog({ isAddModalOpen, setIsAddModalOpen }: TAddBookmarkProps) {
  const [url, setUrl] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<TUrlMetadata | null>(null)
  const debouncedUrl = useDebounce(url, 300);

  useEffect(() => {
    (async () => {
      if (!debouncedUrl) return

      setLoading(true);

      await getURLMetadata(debouncedUrl)
        .then(d => {
          setMetadata({ ...d, url })
          setError(null)
        })
        .catch((err) => {
          setError(err.message as string)
          setMetadata(null)
        })
        .finally(() => setLoading(false))
    })()
  }, [debouncedUrl])

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Save a new bookmark</DialogTitle>
          <DialogDescription>
            Paste a URL below. We&apos;ll automatically fetch the details.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-normal w-full gap-8 py-4">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              className="bg-background/50 h-10"
              onChange={e => setUrl(e.target.value)}
              value={url}
            />
            <p className="text-muted-foreground text-sm">
              Enter correnct url, then a preview window will apper below
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="tags">Tags (optional)</Label>
            <Input
              id="tags"
              placeholder="design, inspiration, tools"
              className="bg-background/50 h-10"
              onChange={(e) => {
                const currentValue = e.target.value;
                if (currentValue.endsWith(",")) {
                  const enteredText = currentValue.slice(0, currentValue.length - 1).trim();
                  setTags(prev => ([...prev, enteredText]))
                  e.target.value = "";
                }
              }}
            />
            <p className="text-muted-foreground text-sm">

              Enter tag value, then click hit {" "}
              <Kbd className="text-lg text-black">,</Kbd> {" "}
              key to add it
            </p>
          </div>
          {tags.length > 0 ? (
            <div className="w-full space-y-3">
              <Label>Entered Tags</Label>
              <div className="flex items-center justify-start w-full gap-2 flex-1">
                {tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    className="text-[10px] hover:scale-[1.03] transition duration-150 cursor-pointer"
                    onClick={(e) => {
                      const currentIdx = idx;
                      setTags((prev) => prev
                        .splice(0, currentIdx)
                        .concat(prev.slice(currentIdx + 1, prev.length))
                      )
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="border-4 border-zinc-400 border-dotted p-5 rounded-2xl w-full">
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <Info className="size-4" />
            Preview will appear here
          </p>
          {isLoading
            ? <URLPreviewCardSkeleton />
            : error
              ? <div className="flex items-center gap-4">
                <AnimateIcon animateOnHover animateOnView>
                  <CircleX className={"text-red-700"} />
                </AnimateIcon>
                <p className="text-sm text-red-500">{error}</p>
              </div>
              : metadata
                ? <URLPreviewCard {...metadata} />
                : null
          }
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsAddModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading || (error !== null && error.trim().length > 0)}
            onClick={() => setIsAddModalOpen(false)}
          >
            Save Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}