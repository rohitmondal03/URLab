import Link from "next/link";
import { useState, type Dispatch, type SetStateAction } from "react";
import { BookmarkIcon, GlobeIcon, TagIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TSearchDialogProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SEARCH_BUTTON_ITEMS = [
  {
    icon: <BookmarkIcon fill="#000" className="size-5" />,
    title: "Bookmarks",
    href: "/dashboard?bookmark=",
  },
  {
    icon: <TagIcon className="size-5" />,
    title: "Tags",
    href: "/dashboard?tag=",
  },
  {
    icon: <GlobeIcon className="size-5" />,
    title: "Domains",
    href: "/dashboard?domain=",
  },
]

export function SearchDialog({ isOpen, setOpen }: TSearchDialogProps) {
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchInput = useDebounce(searchInput, 750);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>
            Search Domains, Tags, Bookmarks....
          </DialogTitle>
          <DialogDescription>
            Write keyword, and get your Bookmarks !
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <Label>
            Enter keyword
          </Label>
          <Input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="flex flex-col gap-y-4">
          {SEARCH_BUTTON_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href + encodeURIComponent(debouncedSearchInput)}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-full justify-start border font-normal",
              )}
              onClick={() => setOpen(prev => prev ? false : true)}
            >
              {item.icon}
              Search {item.title} with -
              <span className="font-semibold text-base">{debouncedSearchInput}</span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}