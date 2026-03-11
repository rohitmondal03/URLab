"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Search, Plus, Menu, User, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardSidebarContent } from "./dashboard-sidebar-content";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { signout } from "@/lib/actions/auth.action";

const AddBookmarkDialog = dynamic(() => import("./add-bookmark-dialog").then(mod => mod.AddBookmarkDialog))

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block sticky top-0 left-0 w-64 h-screen shrink-0 z-10 transition-all duration-300">
        <DashboardSidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar */}
        <header className="h-20 flex items-center justify-between px-4 md:px-6 border-b border-zinc-400 bg-background/80 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="size-5" />
            </Button>

            <div className="relative w-full max-w-sm hidden sm:flex items-center">
              <Search className="absolute left-2.5 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search links, tags, or domains..."
                className="w-full bg-secondary/30 focus-visible:bg-background focus-visible:border-ring/50 pl-9 rounded-full h-9 shadow-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-x-2">
              <Plus className="size-4" />
              New Bookmark
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size={"icon-lg"}
                  variant={"secondary"}
                  className="rounded-full border border-zinc-400"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-semibold">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={signout} variant="destructive">
                    <LogOutIcon />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <AddBookmarkDialog
            isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
          />
        </header>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="w-64 h-full shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <DashboardSidebarContent />
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
