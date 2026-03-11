"use client"

import type { TUrlMetadata } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Info, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { getURLMetadata } from "@/lib/actions/metadata.action";
import { createBookmark } from "@/lib/actions/bookmark.action";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/helper";
import { useDebounce } from "@/hooks/use-debounce";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { CircleX } from "@/components/animate-ui/icons/circle-x";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

const URLPreviewCard = dynamic(() => import("./url-preview-card")
  .then(mod => mod.URLPreviewCard), { ssr: false })
const URLPreviewCardSkeleton = dynamic(() => import("./url-preview-card")
  .then(mod => mod.URLPreviewCardSkeleton), { ssr: false })

type TAddBookmarkProps = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
}

export function AddBookmarkDialog({ isAddModalOpen, setIsAddModalOpen }: TAddBookmarkProps) {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<TUrlMetadata | null>(null)
  const debouncedUrl = useDebounce(url, 300);

  // for getting preview of the entered URl
  useEffect(() => {
    (async () => {
      if (!debouncedUrl) return

      setIsPreviewLoading(true);

      await getURLMetadata(debouncedUrl)
        .then(d => {
          setMetadata({ ...d, url: url.trim() })
          setError(null)
        })
        .catch((err) => {
          setError(err.message as string)
          setMetadata(null)
        })
        .finally(() => setIsPreviewLoading(false))
    })()
  }, [debouncedUrl])

  // handler to add bookmark
  const handleBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await createBookmark(url.trim(), tags);
      toast.success("Bookmark added successfully !!");
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div onClick={e => e.stopPropagation()}>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="border-border/50 bg-card/95 backdrop-blur-md w-full max-h-[90vh] flex flex-col">
          <form onSubmit={handleBookmark} className="flex flex-col gap-2 min-h-0 flex-1">
            <DialogHeader>
              <DialogTitle>Save a new bookmark</DialogTitle>
              <DialogDescription>
                Paste a URL below. We&apos;ll automatically fetch the details.
              </DialogDescription>
            </DialogHeader>
            <div
              className="flex flex-col items-center justify-normal w-full gap-6 py-4 flex-1 pr-1 overflow-y-auto"
              onWheel={e => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  className="bg-background/50 h-10"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  autoComplete="off"
                />
                <p className="text-muted-foreground text-sm">
                  Enter correct URL, then a preview window will appear below
                </p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="tags">Tags (optional)</Label>
                <Input
                  id="tags"
                  placeholder="design, inspiration, tools"
                  className="bg-background/50 h-10"
                  autoComplete="off"
                  onChange={(e) => {
                    const currentValue = e.target.value;
                    if (currentValue.endsWith(",")) {
                      const enteredText = currentValue.slice(0, currentValue.length - 1).trim().toLowerCase();
                      setTags(prev => ([...prev, enteredText]));
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
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex w-full gap-3">
                    <Label>Entered Tags:</Label>
                    <div className="flex items-center justify-start w-full gap-1 flex-1">
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
                  <p className="text-muted-foreground text-sm">
                    Click on the tags to delete it
                  </p>
                </div>
              ) : null}
            </div>
            <div className="border-4 border-zinc-400 border-dotted p-5 rounded-2xl w-full">
              {!error && !metadata && !isPreviewLoading ? (
                <p className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Info className="size-4" />
                  Preview will appear here
                </p>
              ) : null}
              {isPreviewLoading
                ? <URLPreviewCardSkeleton />
                : error
                  ? <div className="flex items-center gap-4">
                    <AnimateIcon animateOnHover animateOnView>
                      <CircleX className={"text-red-700"} />
                    </AnimateIcon>
                    <p className="text-sm text-red-500">
                      {error}
                    </p>
                  </div>
                  : metadata
                    ? <URLPreviewCard {...metadata} />
                    : null
              }
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading
                  || isPreviewLoading
                  || (error !== null && error.trim().length > 0)
                }
              >
                {isLoading
                  ? <Loader className="animate-spin" />
                  : "Save Link"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}