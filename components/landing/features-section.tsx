"use client"

import { Layers, Layout, Zap } from "lucide-react";
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};


export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FeaturesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="w-full py-24"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight">Everything you need, nothing you don&apos;t.</h2>
        <p className="text-muted-foreground mt-4 text-lg">Designed for maximum focus and effortless organization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Layout className="h-6 w-6 text-primary mb-2" />,
            title: "Smart Metadata",
            desc: "Automatically extracts titles, descriptions, and high-quality favicons from any link you save."
          },
          {
            icon: <Layers className="h-6 w-6 text-primary mb-2" />,
            title: "Tag-based Organization",
            desc: "Fluidly organize your collection with flexible tags instead of rigid folders. Find what you need instantly."
          },
          {
            icon: <Zap className="h-6 w-6 text-primary mb-2" />,
            title: "Lightning Fast",
            desc: "Built on a modern stack to ensure your dashboard loads instantly, with real-time syncing across devices."
          }
        ].map((feature, i) => (
          <motion.div key={i} variants={fadeUpVariants}>
            <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
              <CardHeader>
                {feature.icon}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.desc}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}