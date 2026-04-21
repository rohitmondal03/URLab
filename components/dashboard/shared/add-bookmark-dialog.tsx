"use client"

import type { TUrlMetadata } from "@/types";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState, type SubmitEvent } from "react";
import { Info, Loader } from "lucide-react";
import { toast } from "sonner";
import { getURLMetadata } from "@/lib/actions/metadata.action";
import { useDebounce } from "@/hooks/use-debounce";
import { createBookmarkMutation } from "@/tanstack/mutations";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { CircleX } from "@/components/animate-ui/icons/circle-x";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const URLPreviewCard = dynamic(() => import("./url-preview-card")
  .then(mod => mod.URLPreviewCard), { ssr: false })
const URLPreviewCardSkeleton = dynamic(() => import("./url-preview-card")
  .then(mod => mod.URLPreviewCardSkeleton), { ssr: false })

type TAddBookmarkProps = {
  isAddModalOpen: boolean;
  setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function AddBookmarkDialog({ isAddModalOpen, setIsAddModalOpen }: TAddBookmarkProps) {
  const [bookmarkDetails, setBookmarkDetails] = useState<{
    url: string;
    tags: string[];
    isFavourite: boolean;
  }>({ url: "", tags: [], isFavourite: false })
  const [isLoading, setLoading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<TUrlMetadata | null>(null);

  const debouncedUrl = useDebounce(bookmarkDetails.url, 300);

  const mutation = createBookmarkMutation();

  // for getting preview of the entered URl
  useEffect(() => {
    (async () => {
      if (!debouncedUrl) return

      setIsPreviewLoading(true);

      await getURLMetadata(debouncedUrl)
        .then(d => {
          setMetadata({ ...d, url: bookmarkDetails.url.trim() })
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
  const handleCreateBookmark = async (e: SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    mutation.mutate({
      url: bookmarkDetails.url.trim(),
      tags: bookmarkDetails.tags,
      isFavourite: bookmarkDetails.isFavourite
    }, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        setBookmarkDetails({ url: "", tags: [], isFavourite: false });
        setMetadata(null);
        toast.success("Bookmark added successfully !!");
      },
      onError: (err) => {
        toast.error(err.message);
      },
      onSettled: () => {
        setError(null);
        setLoading(false);
      },
    })
  }

  return (
    <div onClick={e => e.stopPropagation()}>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="border-border/50 bg-card/95 backdrop-blur-md w-full max-h-[90vh] flex flex-col">
          <form
            onSubmit={handleCreateBookmark}
            className="flex flex-col gap-2 min-h-0 flex-1"
          >
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
                  value={bookmarkDetails.url}
                  onChange={e => setBookmarkDetails(prev => ({ ...prev, url: e.target.value }))}
                  autoComplete="off"
                />
                <p className="text-muted-foreground text-sm">
                  Enter correct URL, then a preview window will appear below
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <Label htmlFor="favourite">
                  Do you want to mark this bookmark as favourite ?
                </Label>
                <Checkbox
                  checked={bookmarkDetails.isFavourite}
                  onCheckedChange={(value: boolean) => setBookmarkDetails((prev) => ({ ...prev, isFavourite: value }))}
                  className="border border-zinc-400"
                />
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
                      setBookmarkDetails(prev => ({ ...prev, tags: [...prev.tags, enteredText] }));
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
              {bookmarkDetails.tags.length > 0 ? (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex w-full gap-3">
                    <Label>Entered Tags:</Label>
                    <div className="flex items-center justify-start w-full gap-1 flex-1">
                      {bookmarkDetails.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          className="text-[10px] hover:scale-[1.03] transition duration-150 cursor-pointer"
                          onClick={() => {
                            const currentIdx = idx;

                            setBookmarkDetails((prev) => ({
                              ...prev,
                              tags: prev.tags.filter((_, i) => i !== currentIdx)
                            }))
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
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
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
    </div >
  )
}