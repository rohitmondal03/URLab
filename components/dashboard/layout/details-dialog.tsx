import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type TEditDetailsDialogProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DetailsDialog({ isOpen, setOpen }: TEditDetailsDialogProps) {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    provider: string;
  }>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { name, email, provider } = await getCurrentUser();
      setUser({ name, email, provider });
      setLoading(false);
    })()
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Your Details</DialogTitle>
          <DialogDescription>Manage your details from here</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-1/5 h-6 ml-auto" />
          </div>
        ) : (
          <form className="space-y-4">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
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
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}