import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, Tag, Globe, Clock, StarsIcon, TrendingUp, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "../../shared/logo";
import { BookmarkFillIcon } from "../../icons/static/bookmark-fill";

export function DashboardSidebarContent() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    {
      title: "Navigation",
      items: [
        { name: "Your Bookmarks", icon: <BookmarkFillIcon />, path: "/dashboard" },
        { name: "Favorites", icon: <Star />, path: "/dashboard/favorites" },
        { name: "Recently Added", icon: <Clock />, path: "/dashboard/recent" },
      ]
    },
    {
      title: "Organization",
      items: [
        { name: "Tags", icon: <Tag />, path: "/dashboard/tags" },
        { name: "Domains", icon: <Globe />, path: "/dashboard/domains" },
      ]
    },
    {
      title: "Discovery",
      items: [
        { name: "Popular", icon: <StarsIcon />, path: "/dashboard/popular" },
        { name: "Trending", icon: <TrendingUp />, path: "/dashboard/trending" },
      ]
    }
  ]


  return (
    <div className="flex flex-col h-full bg-sidebar/50 backdrop-blur-sm border-r border-zinc-400">
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
    </div >
  )
}