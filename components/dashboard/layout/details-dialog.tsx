import { type Dispatch, type SetStateAction, SubmitEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { editUsersDetailsMutation } from "@/tanstack/mutations";

type TEditDetailsDialogProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DetailsDialog({ isOpen, setOpen }: TEditDetailsDialogProps) {
  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    provider: string;
  }>();
  const mutation = editUsersDetailsMutation();

  useEffect(() => {
    (async () => {
      setFetching(true);
      const { name, email, provider } = await getCurrentUser();
      setUser({ name, email, provider });
      setFetching(false);
    })()
  }, [])


  // To edit user's details
  const editUser = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!user || !user.email || !user.name) {
      toast.error("User details not found !!");
      return;
    }

    setLoading(true);

    mutation.mutate({ name: user.name, email: user.email }, {
      onSuccess: () => {
        toast.success("Profile Updated successfully !!")
      },
      onError: (error) => {
        toast.error(error.message)
      },
      onSettled: () => {
        setLoading(false);
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Your Details</DialogTitle>
          <DialogDescription>Manage your details from here</DialogDescription>
        </DialogHeader>
        {isFetching ? (
          <div className="space-y-2">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-1/5 h-6 ml-auto" />
          </div>
        ) : (
          <form onSubmit={editUser} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={user?.name}
                onChange={(e) =>
                  setUser(prev => {
                    if (!prev) return;

                    return {
                      ...prev,
                      name: e.target.value,
                    }
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email}
                onChange={(e) =>
                  setUser(prev => {
                    if (!prev) return;

                    return {
                      ...prev,
                      email: e.target.value,
                    }
                  })
                }
              />
            </div>
            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                {isLoading ? <LoaderIcon className="animate-spin" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}