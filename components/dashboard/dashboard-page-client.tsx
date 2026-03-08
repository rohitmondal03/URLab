"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical, Copy, Edit2, Trash2, ArrowUpRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { containerVariants } from "@/lib/animation-variants";

const mockBookmarks = [
  {
    id: 1,
    url: "https://raindrop.io",
    title: "All-in-one bookmark manager",
    description: "Intuitive, powerful and beautiful bookmark manager. Save anything from the web.",
    domain: "raindrop.io",
    tags: ["tools", "inspiration"],
    favicon: "https://www.google.com/s2/favicons?domain=raindrop.io&sz=128",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    id: 2,
    url: "https://notion.so",
    title: "Notion – The all-in-one workspace",
    description: "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.",
    domain: "notion.so",
    tags: ["workspace", "productivity"],
    favicon: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    color: "bg-stone-500/10 text-stone-500"
  },
  {
    id: 3,
    url: "https://ui.shadcn.com",
    title: "shadcn/ui",
    description: "Beautifully designed components that you can copy and paste into your apps.",
    domain: "ui.shadcn.com",
    tags: ["design", "react", "components"],
    favicon: "https://www.google.com/s2/favicons?domain=ui.shadcn.com&sz=128",
    color: "bg-zinc-800/10 text-zinc-800 dark:bg-zinc-200/10 dark:text-zinc-200"
  },
  {
    id: 4,
    url: "https://vercel.com",
    title: "Vercel: Build and deploy the best Web experiences",
    description: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    domain: "vercel.com",
    tags: ["hosting", "nextjs"],
    favicon: "https://www.google.com/s2/favicons?domain=vercel.com&sz=128",
    color: "bg-black/10 text-black dark:bg-white/10 dark:text-white"
  },
  {
    id: 5,
    url: "https://github.com",
    title: "GitHub: Let's build from here",
    description: "GitHub is where over 100 million developers shape the future of software, together.",
    domain: "github.com",
    tags: ["code", "collaboration"],
    favicon: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
    color: "bg-neutral-500/10 text-neutral-500"
  },
  {
    id: 6,
    url: "https://framer.com/motion",
    title: "Framer Motion",
    description: "A production-ready motion library for React.",
    domain: "framer.com",
    tags: ["animation", "react"],
    favicon: "https://www.google.com/s2/favicons?domain=framer.com&sz=128",
    color: "bg-blue-600/10 text-blue-600"
  }
];

export default function DashboardPageClient() {

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">All Links</h1>
        <p className="text-sm text-muted-foreground">{mockBookmarks.length} items</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {mockBookmarks.map((bookmark) => (
          <motion.div key={bookmark.id} variants={itemVariants}>
            <Card className="group relative overflow-hidden h-[180px] flex flex-col border-border/50 bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-border transition-all duration-300 transform-gpu hover:-translate-y-0.5">
              <CardContent className="p-5 flex flex-col h-full gap-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 rounded-md bg-background border border-border/50 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                      <Image
                        src={bookmark.favicon}
                        alt=""
                        className="size-8 object-contain"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground bg-background/50 shadow-sm" asChild>
                      <a href={bookmark.url} target="_blank" rel="noreferrer">
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground bg-background/50 shadow-sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-40 border-border/50 bg-card/95 backdrop-blur-md"
                      >
                        <DropdownMenuItem className=" text-sm cursor-pointer">
                          <Copy className="size-4" /> Copy link
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm cursor-pointer">
                          <Edit2 className="size-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem className="text-sm cursor-pointer" variant="destructive">
                          <Trash2 className="size-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col cursor-pointer" onClick={() => window.open(bookmark.url, '_blank')}>
                  <h3 className="font-medium text-base text-foreground line-clamp-1 leading-tight mb-1" title={bookmark.title}>{bookmark.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">{bookmark.description}</p>
                </div>

                <div className="flex items-center justify-between mt-auto shrink-0 pt-2 border-t border-border/30">
                  <div className="flex items-center text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    <span className="truncate max-w-[120px]">{bookmark.domain}</span>
                  </div>
                  <div className="flex gap-1.5 overflow-hidden">
                    {bookmark.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground whitespace-nowrap border border-border/40">
                        {tag}
                      </span>
                    ))}
                    {bookmark.tags.length > 2 && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground whitespace-nowrap border border-border/40">
                        +{bookmark.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
