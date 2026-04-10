"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TechCredit = {
  name: string;
  purpose: string;
  docs: string;
  website: string;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export function CreditsGrid({ credits }: { credits: TechCredit[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {credits.map((item, i) => (
        <motion.div
          key={item.name}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="h-full border-zinc-500/30 backdrop-blur-sm bg-card/60 hover:border-zinc-400/60 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-xl">{item.name}</CardTitle>
              <CardDescription>{item.purpose}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Link
                  href={item.docs}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Docs
                  <ExternalLink className="size-4" />
                </Link>
                <Link
                  href={item.website}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Website
                  <ExternalLink className="size-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
