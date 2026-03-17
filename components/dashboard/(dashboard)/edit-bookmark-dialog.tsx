import { SubmitEvent, useState, type Dispatch, type SetStateAction } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TBookmark } from "@/types"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { editBookmarkMutation } from "@/tanstack/mutations";

type TEditBookmarkDialogProps = {
  bookmarkId: TBookmark["id"];
  bookmarkTitle: TBookmark["title"];
  bookmarkDescription: TBookmark["description"];
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditBookmarkDialog({ bookmarkId, bookmarkDescription, bookmarkTitle, isOpen, setOpen }: TEditBookmarkDialogProps) {
  const [isLoading, setLoading] = useState(false);
  const [bookmarkDetail, setBookmarkDetail] = useState(() => ({
    title: bookmarkTitle,
    description: bookmarkDescription,
  }))

  const mutation = editBookmarkMutation();

  // to edit a bookmark (rn, only title and description)
  const handleEditBookmark = (e: SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    mutation.mutate({
      bookmarkId,
      bookmarkDescription: bookmarkDetail.description.trim(),
      bookmarkTitle: bookmarkDetail.title.trim(),
    }, {
      onSuccess: () => {
        toast.success("Bookmark edited successfully !!");
      },
      onError: (error) => {
        toast.error("Error while editing Bookmark !!", {
          description: error.message,
        })
      },
      onSettled: () => {
        setLoading(false);
        setOpen(false);
      }
    })
  }

  return (
    <div onClick={e => e.stopPropagation()}>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="border-border/50 bg-card/95 backdrop-blur-md w-full max-h-[90vh] flex flex-col">
          <form
            onSubmit={handleEditBookmark}
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Bookmark's description"
                  className="bg-background/50 h-10"
                  value={bookmarkDetail.title}
                  onChange={e => setBookmarkDetail(prev => ({ ...prev, title: e.target.value }))}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Bookmark's new description"
                  value={bookmarkDetail.description}
                  onChange={e => setBookmarkDetail(prev => ({ ...prev, description: e.target.value }))}
                  autoComplete="off"
                  cols={50}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading
                  ? <Loader className="animate-spin" />
                  : "Edit Bookmark"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}