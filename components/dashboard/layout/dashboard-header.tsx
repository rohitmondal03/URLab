"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SearchIcon, PlusIcon, MenuIcon, KeyboardIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardSidebarContent } from "./dashboard-sidebar-content";
import { usersQuery } from "@/tanstack/queries";

const SearchDialog = dynamic(() => import("./search-dialog")
  .then(mod => mod.SearchDialog), { ssr: false });
const AddBookmarkDialog = dynamic(() => import("../shared/add-bookmark-dialog")
  .then(mod => mod.AddBookmarkDialog), { ssr: false })
const ViewShortcutDialog = dynamic(() => import("./view-shortcut-dialog")
  .then(mod => mod.ViewShortcutDialog), { ssr: false });
const UserDropdownMenu = dynamic(() => import("./user-dropdown-menu")
  .then(mod => mod.UserDropdownMenu), { ssr: false });

export function DashboardHeader() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isShortcutDialogOpen, setShortcutDialogOpen] = useState(false);

  const { data: usersData } = useQuery(usersQuery.default());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) return;

      if (e.key === "a") {
        e.preventDefault();
        setAddModalOpen(true);
      }
      if (e.key === "/") {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === "k") {
        e.preventDefault();
        setShortcutDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Top bar */}
      <header className="h-20 flex items-center justify-between px-4 md:px-6 border-b border-zinc-400 bg-background/80 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground shrink-0"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            <MenuIcon className="size-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="sm:hidden text-muted-foreground shrink-0"
            onClick={() => setSearchModalOpen(true)}
          >
            <SearchIcon className="size-5" />
          </Button>
          <Button
            variant={"ghost"}
            className=" w-full max-w-sm hidden sm:flex items-center justify-between py-2 px-4 rounded-3xl transition-all hover:outline-2 cursor-text border-2 border-zinc-400"
            onClick={() => setSearchModalOpen(true)}
          >
            <div className="flex items-center gap-3">
              <SearchIcon className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Search bookmarks, tags...
              </span>
            </div>
            <Kbd className="hidden md:inline-flex bg-zinc-300 dark:bg-zinc-800">/</Kbd>
          </Button>

          {/* Search Dialog */}
          <SearchDialog
            isOpen={isSearchModalOpen}
            setOpen={setSearchModalOpen}
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button onClick={() => setAddModalOpen(true)} className="gap-x-2 px-3 sm:px-4 shrink-0">
            <PlusIcon className="size-4 sm:size-5" />
            <span className="hidden lg:inline">Bookmark</span>
            <Kbd className="hidden lg:inline-flex bg-white/20 text-white ml-2">A</Kbd>
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => setShortcutDialogOpen(true)}
            className="gap-x-3 px-3 sm:px-4 shrink-0 hidden sm:flex"
          >
            <KeyboardIcon className="size-4 sm:size-5" />
            <span className="hidden lg:inline">View Shortcuts</span>
            <Kbd className="hidden lg:inline-flex">K</Kbd>
          </Button>
          <AddBookmarkDialog
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setAddModalOpen}
          />
          <ViewShortcutDialog
            isOpen={isShortcutDialogOpen}
            setOpen={setShortcutDialogOpen}
          />

          {/* Profile Avatar Dropdown */}
          <UserDropdownMenu>
            <button
              className="shrink-0 rounded-full ring-2 ring-zinc-400 hover:ring-primary transition-all duration-200 focus:outline-none focus:ring-primary"
              aria-label="Open user menu"
            >
              <Avatar size="lg">
                <AvatarImage
                  src={usersData?.avatarUrl ?? undefined}
                  alt={usersData?.name ?? "User"}
                />
                <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-primary font-semibold">
                  {usersData?.name?.slice(0, 1).toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
            </button>
          </UserDropdownMenu>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-64 h-full shadow-2xl relative">
            <DashboardSidebarContent />
          </div>
        </div>
      )}
    </>
  )
}