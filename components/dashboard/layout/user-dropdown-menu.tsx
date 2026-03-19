import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import { KeyboardIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { signout } from "@/lib/actions/auth.action";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/helper";

const ViewShortcutDialog = dynamic(() => import("./view-shortcut-dialog")
  .then(mod => mod.ViewShortcutDialog), { ssr: false });
const DetailsDialog = dynamic(() => import("./details-dialog")
  .then(mod => mod.DetailsDialog), { ssr: false })

type TUserDropdownMenupProps = {
  children: ReactNode;
}

export function UserDropdownMenu({ children }: TUserDropdownMenupProps) {
  const [isDetailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [isShortcutDialogOpen, setShortcutDialogOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="font-semibold w-52 space-y-3 p-3 border-2 border-zinc-400 shadow-lg shadow-zinc-400">
        <Button
          variant={"secondary"}
          className="w-full"
          onClick={() => setShortcutDialogOpen(true)}
        >
          <KeyboardIcon />
          View Shortcuts
        </Button>
        <ViewShortcutDialog
          isOpen={isShortcutDialogOpen}
          setOpen={setShortcutDialogOpen}
        />
        <Separator orientation="horizontal" />
        <Button
          variant={"secondary"}
          className="w-full"
          onClick={() => setDetailsDialogOpen(true)}
        >
          <SettingsIcon className="size-5" />
          Your Details
        </Button>
        <DetailsDialog
          isOpen={isDetailsDialogOpen}
          setOpen={setDetailsDialogOpen}
        />
        <Button
          onClick={async () => {
            try {
              await signout();
              toast.success("Sign OUT successful !!")
            } catch (error: any) {
              toast.error(error.message || DEFAULT_ERROR_MESSAGE);
            }
          }}
          variant="destructive"
          className="w-full"
        >
          <LogOutIcon />
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  )
}