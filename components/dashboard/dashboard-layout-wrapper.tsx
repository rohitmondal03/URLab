"use client";

import { Search, Plus, Link2, Star, Tag, Globe, Clock, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../shared/logo";
import { cn } from "@/lib/utils";
import { AddBookmarkDialog } from "./add-bookmark-dialog";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const navItems = [
    { name: "All Links", icon: <Link2 className="h-4 w-4 mr-2" />, path: "/dashboard" },
    { name: "Favorites", icon: <Star className="h-4 w-4 mr-2" />, path: "/dashboard/favorites" },
    { name: "Tags", icon: <Tag className="h-4 w-4 mr-2" />, path: "/dashboard/tags" },
    { name: "Domains", icon: <Globe className="h-4 w-4 mr-2" />, path: "/dashboard/domains" },
    { name: "Recently Added", icon: <Clock className="h-4 w-4 mr-2" />, path: "/dashboard/recent" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar/50 backdrop-blur-sm border-r border-zinc-400">
      <div className="h-20 flex items-center px-4 md:px-6 border-b border-zinc-400">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Logo variant="large" />
        </Link>
      </div>
      <div className="flex-1 py-6 px-3 space-y-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                `w-full justify-start ${isActive ? "bg-secondary text-secondary-foreground font-medium shadow-sm" : "text-muted-foreground hover:bg-muted/50"}`
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/40">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 ring-1 ring-border/50">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">User</span>
            <span className="text-xs text-muted-foreground mt-1">Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block sticky top-0 left-0 w-64 h-screen shrink-0 z-10 transition-all duration-300">
        <SidebarContent />
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

          <Button onClick={() => setIsAddModalOpen(true)} className="gap-x-2">
            <Plus className="size-4" />
            Add Link
          </Button>
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
              <SidebarContent />
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 relative">
          {children}
        </main>
      </div >
    </div >
  );
}
