import { type Dispatch, type SetStateAction } from "react";
import { Copy, Edit2, Trash2, ExternalLink, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type TBookmarkCardActionsDropwdownMenuProps = {
  url: string;
  id: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function BookmarkCardActionsDropwdownMenu({ url, id, isOpen, setOpen }: TBookmarkCardActionsDropwdownMenuProps) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu open={isOpen} onOpenChange={setOpen}>
        <DropdownMenuContent align="end" className="w-40 bg-card/95 backdrop-blur-md font-semibold shadow-xl border-2 border-zinc-300">
          <DropdownMenuItem
            className="text-sm cursor-pointer gap-2"
            onClick={() => window.open(url, "_blank")}
          >
            <ExternalLink className="size-4" /> Open link
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm cursor-pointer gap-2"
            onClick={() => {
              try {
                navigator.clipboard.writeText(url)
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
          <DropdownMenuItem variant="destructive" className="text-sm cursor-pointer gap-2">
            <Trash2 className="size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}