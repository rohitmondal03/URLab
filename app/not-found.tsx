"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { MapPinOff } from "@/components/animate-ui/icons/map-pin-off";

export default function NotFound() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center justify-center gap-6 min-h-screen"
    >
      {/* <div className="rounded-2xl flex items-center justify-center shadow-lg border-2 border-zinc-300 p-4"> */}
      <AnimateIcon animateOnHover animate="off" delay={1500}>
        <MapPinOff className={"size-12"} />
      </AnimateIcon>
      {/* </div> */}

      <h1 className="text-6xl font-black tracking-tight text-foreground">404</h1>
      <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
      <p className="text-muted-foreground text-center text-balance">
        The link you followed may be broken, <br /> or the page may have been removed.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button
          variant={"outline"}
          className="gap-x-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto gap-x-2"
          )}
        >
          Back to Dashboard
          <Bookmark />
        </Link>
      </div>
    </motion.div>
  );
}
