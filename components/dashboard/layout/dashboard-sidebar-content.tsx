"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { Kbd } from "@/components/ui/kbd";
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

  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "d":
          e.preventDefault();
          router.push("/dashboard");
          break;
        case "r":
          e.preventDefault();
          router.push("/dashboard/recent");
          break;
        case "f":
          e.preventDefault();
          router.push("/dashboard/favorites");
          break;
        case "t":
          e.preventDefault();
          router.push("/dashboard/tags");
          break;
        case "o":
          e.preventDefault();
          router.push("/dashboard/domains");
          break;
        case "p":
          e.preventDefault();
          router.push("/dashboard/popular");
          break;
        case "g":
          e.preventDefault();
          router.push("/dashboard/trending");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

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
        { name: "Your Bookmarks", icon: <BookmarkIcon />, path: "/dashboard", disabled: false, shortcut: "d" },
        { name: "Favourites", icon: <StarIcon />, path: "/dashboard/favourites", disabled: true, shortcut: "f" },
        { name: "Recently Added", icon: <ClockIcon />, path: "/dashboard/recent", disabled: false, shortcut: "r" },
      ]
    },
    {
      title: "Organization",
      items: [
        { name: "Tags", icon: <TagIcon />, path: "/dashboard/tags", disabled: false, shortcut: "t" },
        { name: "Domains", icon: <GlobeIcon />, path: "/dashboard/domains", disabled: false, shortcut: "o" },
      ]
    },
    // {
    //   title: "Discovery",
    //   items: [
    //     { name: "Popular", icon: <StarsIcon />, path: "/dashboard/popular", disabled: true },
    //     { name: "Trending", icon: <TrendingUpIcon />, path: "/dashboard/trending", disabled: true },
    //   ]
    // }
  ]

  return (
    <div className="flex flex-col items-stretch justify-between h-full bg-sidebar backdrop-blur-sm border-r border-zinc-400">
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
              <div className="space-y-2">
                {item.items.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={cn(
                        buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                        isActive ? "border border-zinc-400" : null,
                        "flex items-center justify-between mx-0 py-0 text-sm",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {link.icon}
                        {link.name}
                      </div>
                      {link.shortcut && (
                        <Kbd className="uppercase hidden md:inline-flex bg-background">{link.shortcut}</Kbd>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User's profile dropdown */}
      <UserDropdownMenu>
        <Button
          size={"lg"}
          variant={"secondary"}
          className="w-7/8 h-fit mx-auto mb-4 py-3 justify-start border border-zinc-400 flex flex-col items-center gap-0"
          disabled={isLoading}
          aria-label="user-dropdown-menu"
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