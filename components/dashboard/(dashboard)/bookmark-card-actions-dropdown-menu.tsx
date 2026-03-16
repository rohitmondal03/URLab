"use client"

import type { TBookmark } from "@/types";
import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { Copy, Edit2, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBookmarkMutation } from "@/tanstack/mutations";

const EditBookmarkDialog = dynamic(() => import("./edit-bookmark-dialog").then(mod => mod.EditBookmarkDialog))

type TBookmarkCardActionsDropwdownMenuProps = {
  bookmarkId: TBookmark["id"],
  bookmarkTitle: TBookmark["title"],
  bookmarkDescription: TBookmark["description"],
  bookmarkUrl: TBookmark["url"]
  children: ReactNode;
}

export function BookmarkCardActionsDropdownMenu({
  children,
  bookmarkId,
  bookmarkDescription,
  bookmarkTitle,
  bookmarkUrl
}: TBookmarkCardActionsDropwdownMenuProps) {

  const mutation = deleteBookmarkMutation();

  // For deleting bookmark
  const handleDeleteBookmark = () => {
    mutation.mutate({ bookmarkId }, {
      onSuccess: () => {
        toast.success("Bookmark deleted successfully !!");
      },
      onError: (error) => {
        toast.error("Error deleting Bookmark !!", {
          description: error.message,
        })
      }
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40 bg-card/95 backdrop-blur-md font-semibold shadow-xl border-2 border-zinc-300"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem
            className="text-sm cursor-pointer gap-2"
            onClick={() => window.open(bookmarkUrl, "_blank")}
          >
            <ExternalLink className="size-4" /> Open link
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm cursor-pointer gap-2"
            onClick={() => {
              try {
                navigator.clipboard.writeText(bookmarkUrl)
                toast.success("Link copied !!")
              } catch (err: unknown) {
                toast((err as Error).message)
              }
            }}
          >
            <Copy className="size-4" /> Copy link
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm cursor-pointer gap-2">
            <Edit2 className="size-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border/50" />
          <DropdownMenuItem
            variant="destructive"
            className="text-sm cursor-pointer gap-2"
            onClick={handleDeleteBookmark}
          >
            <Trash2 className="size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Bookmark Dialog */}
      <EditBookmarkDialog
        bookmarkId={bookmarkId}
        bookmarkTitle={bookmarkTitle}
        bookmarkDescription={bookmarkDescription}
      />
    </>
  )
}