import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { KEYBOARD_SHORTCUT_LIST } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

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
          {KEYBOARD_SHORTCUT_LIST.map((item, idx) => (
            <Button
              key={item.key}
              className={cn(
                "w-full",
                KEYBOARD_SHORTCUT_LIST.length % 2 === 1
                  && idx === KEYBOARD_SHORTCUT_LIST.length - 1
                  ? "col-span-2"
                  : "col-span-1"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {item.label}
              <Kbd>{item.key}</Kbd>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}