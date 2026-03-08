"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertCircle, Bookmark, Layers, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset, }: TErrorPageProps) {

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center justify-center gap-6 min-h-screen"
    >
      <div className="size-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center shadow-sm border border-destructive/20">
        <AlertCircle className="size-8" />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">Something went wrong</h2>
      <p className="text-muted-foreground text-center text-balance">
        We encountered an unexpected error. Please try again or return to your dashboard.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          onClick={() => reset()}
          className="gap-x-2"
        >
          <RefreshCcw className="size-4" />
          Try again
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
