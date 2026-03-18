import { useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteBookmarkMutation } from "@/tanstack/mutations";

type TDeleteBookmarkConfirmationDialogProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  bookmarkId: string;
}

export function DeleteBookmarkConfirmationDialog({ isOpen, setOpen, bookmarkId }: TDeleteBookmarkConfirmationDialogProps) {
  const [isLoading, setLoading] = useState(false);

  const mutation = deleteBookmarkMutation();

  // For deleting bookmark
  const handleDeleteBookmark = () => {
    setLoading(true);

    mutation.mutate({ bookmarkId }, {
      onSuccess: () => {
        toast.success("Bookmark deleted successfully !!");
      },
      onError: (error) => {
        toast.error("Error deleting Bookmark !!", {
          description: error.message,
        })
      },
      onSettled: () => {
        setLoading(false);
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to <span className="text-rose-500">DELETE</span> this Bookmark ?
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-start gap-2">
          <Button
            variant={"destructive"}
            size={"lg"}
            onClick={handleDeleteBookmark}
            disabled={isLoading}
          >
            {isLoading
              ? <LoaderIcon className="animate-spin" />
              : "Delete"
            }
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}