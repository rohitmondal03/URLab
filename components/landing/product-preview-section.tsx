"use client"

import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/animation-variants";

export function ProductPreviewSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariants}
      id="preview"
      className="w-full py-12 flex justify-center perspective-[2000px]"
    >
      <div className="relative w-full max-w-5xl rounded-2xl border border-border/50 bg-card/50 p-2 md:p-4 shadow-2xl overflow-hidden ring-1 ring-border/50 backdrop-blur-sm transform-gpu rotate-x-12 scale-[0.98] hover:rotate-x-0 hover:scale-100 transition-all duration-700 ease-out">
        <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent opacity-50 z-0"></div>
        <div className="rounded-xl overflow-hidden border border-border/50 shadow-sm relative z-10 bg-background flex flex-col aspect-16/10">
          {/* Mock Browser/App Header */}
          <div className="h-12 border-b border-border/50 bg-muted/30 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
              <div className="w-3 h-3 rounded-full bg-border"></div>
            </div>
            <div className="ml-4 h-6 w-48 bg-background rounded-md border border-border/50"></div>
          </div>
          {/* Mock App Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Mock Sidebar */}
            <div className="w-48 border-r border-border/50 bg-muted/10 p-4 flex-col gap-3 hidden sm:flex">
              <div className="h-6 w-24 bg-border/50 rounded-md"></div>
              <div className="h-8 w-full bg-border/30 rounded-md mt-4"></div>
              <div className="h-8 w-full bg-border/20 rounded-md"></div>
              <div className="h-8 w-full bg-border/20 rounded-md"></div>
            </div>
            {/* Mock Main Content */}
            <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-background">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-32 bg-card rounded-lg border border-border/50 shadow-sm p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-border/50"></div>
                    <div className="h-4 w-24 bg-border/40 rounded"></div>
                  </div>
                  <div className="h-3 w-full bg-border/20 rounded mt-2"></div>
                  <div className="h-3 w-2/3 bg-border/20 rounded"></div>
                  <div className="mt-auto h-5 w-16 bg-primary/10 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}