"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SearchIcon, PlusIcon, MenuIcon, KeyboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebarContent } from "./dashboard-sidebar-content";

const SearchDialog = dynamic(() => import("./search-dialog")
  .then(mod => mod.SearchDialog), { ssr: false });
const AddBookmarkDialog = dynamic(() => import("../shared/add-bookmark-dialog")
  .then(mod => mod.AddBookmarkDialog), { ssr: false })
const ViewShortcutDialog = dynamic(() => import("./view-shortcut-dialog")
  .then(mod => mod.ViewShortcutDialog), { ssr: false });

export function DashboardHeader() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isShortcutDialogOpen, setShorcutDialogOpen] = useState(false);

  useEffect(() => {
    window.onkeyup = (e) => {
      e.stopPropagation();

      if (e.key === 'a') {
        e.preventDefault();
        setAddModalOpen(true);
      }
      if (e.key === "/") {
        e.preventDefault();
        setSearchModalOpen(true)
      }
    }
  }, [])

  return (
    <>
      {/* Top bar */}
      <header className="h-20 flex items-center justify-between px-4 md:px-6 border-b border-zinc-400 bg-background/80 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            <MenuIcon className="size-5" />
          </Button>

          <div
            className="relative outline-1 outline-zinc-400 w-full max-w-sm hidden sm:flex items-center gap-3 py-2 px-4 rounded-3xl transition-all hover:outline-2 cursor-text"
            onClick={() => setSearchModalOpen(true)}
          >
            <SearchIcon className="size-4 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              Search bookmarks, tags, domains...
            </div>
          </div>

          {/* Search Dialog */}
          <SearchDialog
            isOpen={isSearchModalOpen}
            setOpen={setSearchModalOpen}
          />
        </div>

        <div className="flex items-center gap-5">
          <Button onClick={() => setAddModalOpen(true)} className="gap-x-2">
            <PlusIcon className="size-4" />
            Bookmark
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => setShorcutDialogOpen(true)}
          >
            <KeyboardIcon />
            View Shortcuts
          </Button>
          <AddBookmarkDialog
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setAddModalOpen}
          />
          <ViewShortcutDialog
            isOpen={isShortcutDialogOpen}
            setOpen={setShorcutDialogOpen}
          />
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <DashboardSidebarContent />
          </div>
        </div>
      )}
    </>
  )
}