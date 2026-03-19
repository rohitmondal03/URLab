import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { KEYBOARD_SHORTCUT_LIST } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

type TViewShortcutDialogProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function ViewShortcutDialog({ isOpen, setOpen }: TViewShortcutDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcut</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {KEYBOARD_SHORTCUT_LIST.map(item => (
            <Button key={item.key} className="w-full">
              {item.label}
              <Kbd>{item.key}</Kbd>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}