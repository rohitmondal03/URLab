import QRCodeStyled from "@/components/shared/qr-code-styled";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getDomainFromUrl } from "@/lib/helper";
import { TBookmark } from "@/types";
import { Dispatch, SetStateAction } from "react";

type TBookmarkQRCodeDialog = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  bookmark: TBookmark;
}

export function BookmarkQRCodeDialog({ isOpen, setOpen, bookmark }: TBookmarkQRCodeDialog) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="w-108">
        <DialogHeader>
          <DialogTitle className="mr-8 leading-snug">
            {bookmark.title}
            <span className="text-muted-foreground">'s QR Code</span>
          </DialogTitle>
          <DialogDescription>
            {bookmark.description}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center justify-between">
          <QRCodeStyled
            data={bookmark.url}
            domain={getDomainFromUrl(bookmark.url)}
            height={200}
            width={200}
            className="mx-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}