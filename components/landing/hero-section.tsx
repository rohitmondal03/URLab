"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="w-full py-24 md:py-32 flex flex-col items-center text-center gap-6"
    >
      <motion.div
        variants={fadeUpVariants}
        className="inline-flex items-center rounded-full border-2 border-border bg-secondary px-3 py-1 text-sm font-medium backdrop-blur-md mb-4"
      >
        <Zap className="mr-2 h-3.5 w-3.5 fill-current" />
        <span>URLab 1.0 is now live</span>
      </motion.div>

      <motion.h1
        variants={fadeUpVariants}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl text-balance"
      >
        Your personal lab for organizing the internet.
      </motion.h1>

      <motion.p
        variants={fadeUpVariants}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-2 text-balance leading-relaxed"
      >
        A smart, beautifully designed bookmark manager that helps you save, organize, and quickly find the links that matter most.
      </motion.p>

      <motion.div
        variants={fadeUpVariants}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        <Link href="/auth">
          <Button size="lg" className="shadow-md px-8 h-12 text-base">
            Start Saving Links
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="#preview">
          <Button size="lg" variant="secondary" className="px-8 h-12">
            View Demo
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  )
}