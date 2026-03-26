import dynamic from "next/dynamic";
import { useState } from "react";
import { StarIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddBookmarkDialog = dynamic(() => import("../shared/add-bookmark-dialog")
  .then(mod => mod.AddBookmarkDialog), { ssr: false })

export function EmptyState() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
        <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
          <StarIcon className="size-7 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground">
            No Favourites Added
          </p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Start adding bookmark and add them to favourites to manage them from here.
          </p>
        </div>
        <Button size={"lg"} onClick={() => setDialogOpen(true)}>
          <PlusIcon /> Bookmark
        </Button>
      </div>

      {/* Dialog to add new Bookmark */}
      <AddBookmarkDialog isAddModalOpen={isDialogOpen} setIsAddModalOpen={setDialogOpen} />
    </>
  );
}