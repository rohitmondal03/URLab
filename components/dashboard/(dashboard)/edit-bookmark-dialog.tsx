import { TBookmark } from "@/types"

type TEditBookmarkDialogProps = {
  bookmarkId: TBookmark["id"];
  bookmarkTitle: TBookmark["title"];
  bookmarkDescription: TBookmark["description"];
}

export function EditBookmarkDialog({ bookmarkId, bookmarkDescription, bookmarkTitle }: TEditBookmarkDialogProps) {
  return (
    <></>
  )
}