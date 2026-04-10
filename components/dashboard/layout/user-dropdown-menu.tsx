import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import { KeyboardIcon, LogOutIcon, SettingsIcon, UserCircle2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { signout } from "@/lib/actions/auth.action";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";

const ViewShortcutDialog = dynamic(() => import("./view-shortcut-dialog")
  .then(mod => mod.ViewShortcutDialog), { ssr: false });
const DetailsDialog = dynamic(() => import("./details-dialog")
  .then(mod => mod.DetailsDialog), { ssr: false });
const ProfilePicUploadDialog = dynamic(() => import('../shared/profile-pic-upload-dialog')
  .then(mod => mod.ProfilePicUploadDialog), { ssr: false });

type TUserDropdownMenupProps = {
  children: ReactNode;
}

export function UserDropdownMenu({ children }: TUserDropdownMenupProps) {
  const [isDetailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [isShortcutDialogOpen, setShortcutDialogOpen] = useState(false);
  const [isProfilePicUploadDialogOpen, setProfilePicUploadDialogOpen] = useState(false);

  // To signout user
  const signoutUser = async () => {
    try {
      await signout();
      toast.success("Sign OUT successful !!")
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="font-semibold w-52 space-y-3 p-3 border-2 border-zinc-500 shadow-[0px_0px_30px] shadow-zinc-600">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setProfilePicUploadDialogOpen(true)}
        >
          <UserCircle2Icon />
          Change Profile Pic
        </Button>
        <ProfilePicUploadDialog
          isOpen={isProfilePicUploadDialogOpen}
          onOpenChange={setProfilePicUploadDialogOpen}
        />
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setDetailsDialogOpen(true)}
        >
          <SettingsIcon />
          Your Details
        </Button>
        <DetailsDialog
          isOpen={isDetailsDialogOpen}
          setOpen={setDetailsDialogOpen}
        />
        <Button
          onClick={signoutUser}
          variant="destructive"
          className="w-full"
        >
          <LogOutIcon />
          Sign out
        </Button>

        <Separator orientation="horizontal" />

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
      </PopoverContent>
    </Popover>
  )
}