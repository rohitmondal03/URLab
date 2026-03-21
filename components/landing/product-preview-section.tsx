"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { SearchIcon, PlusIcon, KeyboardIcon, StarIcon, TagIcon, GlobeIcon, ClockIcon, BookmarkIcon, MoreVertical, StarsIcon, TrendingUpIcon, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/shared/logo";
import { formattedDateWithTime } from "@/lib/helper";
import { cn } from "@/lib/utils";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const NAV_ITEMS = [
  {
    title: "Navigation",
    items: [
      { name: "Your Bookmarks", icon: <BookmarkIcon className="size-4" />, isActive: true },
      { name: "Favorites", icon: <StarIcon className="size-4" />, isActive: false },
      { name: "Recently Added", icon: <ClockIcon className="size-4" />, isActive: false },
    ]
  },
  {
    title: "Organization",
    items: [
      { name: "Tags", icon: <TagIcon className="size-4" />, isActive: false },
      { name: "Domains", icon: <GlobeIcon className="size-4" />, isActive: false },
    ]
  },
  {
    title: "Discovery",
    items: [
      { name: "Popular", icon: <StarsIcon className="size-4" />, path: "/dashboard/popular", isActive: false },
      { name: "Trending", icon: <TrendingUpIcon className="size-4" />, path: "/dashboard/trending", isActive: false },
    ]
  }
];

export function ProductPreviewSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariants}
      id="preview"
      className="w-full py-12 hidden md:flex justify-center perspective-[2000px]"
    >
      <div className="relative w-full max-w-6xl rounded-2xl border-2 border-zinc-500 bg-card/50 p-2 shadow-zinc-400 shadow-[0px_0px_50px_0px] overflow-hidden ring-1 ring-border/50 backdrop-blur-sm transform-gpu rotate-x-12 scale-[0.98] hover:rotate-x-0 hover:scale-100 transition-all duration-700 ease-out">
        <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent opacity-50 z-0" />

        <div className="rounded-xl overflow-hidden border border-border/50 shadow-sm relative z-10 bg-background flex aspect-video">

          {/* Mock Sidebar */}
          <div className="hidden lg:flex w-60 flex-col bg-sidebar/50 backdrop-blur-sm border-r border-zinc-400">
            <div className="h-20 flex items-center px-4 md:px-6 border-b border-zinc-400 shrink-0">
              <Logo variant="large" />
            </div>
            <div className="py-6 px-3 space-y-8 overflow-hidden pointer-events-none">
              {NAV_ITEMS.map(item => (
                <div key={item.title} className="mx-4 space-y-2">
                  <h1 className="text-lg font-semibold">
                    {item.title}
                  </h1>
                  <div className="space-y-1">
                    {item.items.map((link) => (
                      <div
                        key={link.name}
                        className={cn(
                          "flex items-center gap-2 justify-start py-2 px-3 text-sm rounded-md transition-colors font-medium",
                          link.isActive
                            ? "bg-secondary border border-zinc-400 text-secondary-foreground"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        {link.icon}
                        {link.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mock Header */}
            <div className="h-20 flex items-center justify-between px-4 md:px-6 border-b border-zinc-400 bg-background/80 backdrop-blur-md shrink-0 pointer-events-none">
              <div className="flex items-center gap-5 flex-1">
                <MenuIcon className="block lg:hidden size-4" />

                <div className="relative outline-1 outline-zinc-400 w-full max-w-sm hidden sm:flex items-center gap-3 py-2 px-4 rounded-3xl bg-background text-muted-foreground">
                  <SearchIcon className="size-3" />
                  <div className="text-xs">Search bookmarks, tags, domains...</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button className="gap-x-2 shrink-0" size="sm">
                  <PlusIcon className="size-4" />
                  <span className="hidden lg:inline">Bookmark</span>
                </Button>
                <Button variant="secondary" size="sm" className="gap-x-2 shrink-0">
                  <KeyboardIcon className="size-4" />
                  <span className="hidden lg:inline">View Shortcuts</span>
                </Button>
              </div>
            </div>

            {/* Mock Bookmarks Grid */}
            <div className="flex-1 p-4 md:p-8 bg-background overflow-hidden pointer-events-none relative">
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-linear-to-t from-background to-transparent z-10" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="flex flex-col gap-0 shadow-zinc-400 shadow-[10px_10px_10px] border-zinc-500 overflow-hidden h-72 p-0">
                    {/* <div className="relative w-full h-30 bg-muted overflow-hidden shrink-0 border-b-2 flex items-center justify-center">
                    </div> */}
                    <Image
                      src={"/vercel.svg"}
                      alt="preview-images"
                      className="w-full h-30 bg-muted overflow-hidden shrink-0 border-b-2"
                      fetchPriority="high"
                      height={100}
                      width={100}
                    />
                    <CardContent className="flex flex-col gap-3 p-4 flex-1">
                      <div className="flex items-center justify-between gap-2 w-full">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-4 bg-muted-foreground/30 rounded-sm" />
                          <span className="text-sm truncate text-muted-foreground">
                            example.com
                          </span>
                        </div>
                        <MoreVertical className="size-4 text-muted-foreground" />
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {formattedDateWithTime(new Date())}
                      </p>
                      <h1 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
                        Design Inspiration Resource {i}
                      </h1>
                      <Separator />
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        <Badge variant="secondary" className="text-[10px] px-2 py-0 border-border/30">ui</Badge>
                        <Badge variant="secondary" className="text-[10px] px-2 py-0 border-border/30">resources</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  )
}