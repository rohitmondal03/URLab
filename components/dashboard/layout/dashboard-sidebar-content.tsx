"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  StarIcon,
  TagIcon,
  GlobeIcon,
  ClockIcon,
  StarsIcon,
  TrendingUpIcon,
  BookmarkIcon,
  LoaderIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/auth.action";

const UserDropdownMenu = dynamic(() => import("./user-dropdown-menu")
  .then(mod => mod.UserDropdownMenu), { ssr: false });

export function DashboardSidebarContent() {
  const pathname = usePathname();

  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<{
    name: string,
    email: string
  }>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { name, email } = await getCurrentUser();
      setUser({ name, email });
      setLoading(false);
    })()
  }, [])

  const NAV_ITEMS = [
    {
      title: "Navigation",
      items: [
        { name: "Your Bookmarks", icon: <BookmarkIcon />, path: "/dashboard" },
        { name: "Favorites", icon: <StarIcon />, path: "/dashboard/favorites" },
        { name: "Recently Added", icon: <ClockIcon />, path: "/dashboard/recent" },
      ]
    },
    {
      title: "Organization",
      items: [
        { name: "Tags", icon: <TagIcon />, path: "/dashboard/tags" },
        { name: "Domains", icon: <GlobeIcon />, path: "/dashboard/domains" },
      ]
    },
    {
      title: "Discovery",
      items: [
        { name: "Popular", icon: <StarsIcon />, path: "/dashboard/popular" },
        { name: "Trending", icon: <TrendingUpIcon />, path: "/dashboard/trending" },
      ]
    }
  ]

  return (
    <div className="flex flex-col items-stretch justify-between h-full bg-sidebar/50 backdrop-blur-sm border-r border-zinc-400">
      <div className="flex flex-col">
        <div className="h-20 flex items-center px-4 md:px-6 border-b border-zinc-400">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <Logo variant="large" />
          </Link>
        </div>
        <div className="py-6 px-3 space-y-8 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <div key={item.title} className="mx-4 space-y-2">
              <h1 className="text-lg font-semibold">
                {item.title}
              </h1>
              <div className="space-y-1">
                {item.items.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={cn(
                        buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                        isActive ? "border border-zinc-400" : null,
                        "flex items-center justify-start mx-0 py-0 text-sm",
                      )}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <UserDropdownMenu>
        <Button
          size={"lg"}
          variant={"secondary"}
          className="w-7/8 h-fit mx-auto mb-4 py-3 justify-start border border-zinc-400 flex flex-col items-center gap-0"
          disabled={isLoading}
        >
          {isLoading
            ? <LoaderIcon className="animate-spin" />
            : (
              <>
                <p className="text-base font-medium">
                  {user?.name}
                </p>
                <p className="text-xs text-black/70 truncate">
                  {user?.email}
                </p>
              </>
            )
          }
        </Button>
      </UserDropdownMenu>
    </div>
  )
}