"use client"

import type { TBookmarkWithTags } from "@/types";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import { ExternalLinkIcon, Edit2Icon, Trash2Icon, CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const EditBookmarkDialog = dynamic(() => import("./edit-bookmark-dialog")
  .then(mod => mod.EditBookmarkDialog), { ssr: false })
const DeleteBookmarkConfirmationDialog = dynamic(() => import("./delete-bookmark-confirmation-dialog")
  .then(mod => mod.DeleteBookmarkConfirmationDialog), { ssr: false })

type TBookmarkCardActionsDropwdownMenuProps = {
  bookmark: TBookmarkWithTags
  children: ReactNode;
}

export function BookmarkCardActionsDropdownMenu({
  bookmark,
  children
}: TBookmarkCardActionsDropwdownMenuProps) {
  const {
    id: bookmarkId,
    title: bookmarkTitle,
    description: bookmarkDescription,
    url: bookmarkUrl,
  } = bookmark;

  const [isEditBookmarkDialogOpen, setEditBookmarkDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
          {children}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-40 bg-card/95 backdrop-blur-md font-semibold shadow-2xl border-2 border-zinc-300 space-y-2 p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href={bookmarkUrl.startsWith("https://")
              ? bookmarkUrl
              : `https://${bookmarkUrl}`}
            className={cn(
              "text-sm cursor-pointer gap-2 w-full",
              buttonVariants({ variant: "secondary" })
            )}
            target="_blank"
          >
            <ExternalLinkIcon className="size-4" /> Open link
          </Link>
          <Button
            variant={"secondary"}
            className="text-sm cursor-pointer gap-2 w-full"
            onClick={() => {
              try {
                navigator.clipboard.writeText(bookmark.url)
                toast.success("Link copied !!")
              } catch (err: unknown) {
                toast((err as Error).message)
              }
            }}
          >
            <CopyIcon className="size-4" /> Copy link
          </Button>
          <Button
            variant={"secondary"}
            className="text-sm cursor-pointer gap-2 w-full"
            onClick={() => setEditBookmarkDialogOpen(true)}
          >
            <Edit2Icon className="size-4" /> Edit
          </Button>
          <Separator orientation="horizontal" />
          <Button
            variant="destructive"
            className="text-sm cursor-pointer gap-2 w-full"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2Icon className="size-4" /> Delete
          </Button>
        </PopoverContent>
      </Popover>

      <EditBookmarkDialog
        isOpen={isEditBookmarkDialogOpen}
        setOpen={setEditBookmarkDialogOpen}
        bookmarkDescription={bookmarkDescription}
        bookmarkTitle={bookmarkTitle}
        bookmarkId={bookmarkId}
      />

      <DeleteBookmarkConfirmationDialog
        isOpen={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        bookmarkId={bookmarkId}
      />
    </div>
  )
}