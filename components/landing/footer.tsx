import { Github, Layers } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full max-w-6xl py-8 px-6 md:px-12 border-t border-border/40 mt-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Layers className="size-5" />
        <span className="">URLab</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <Link href="#" className="hover:text-foreground transition-colors">About</Link>
        <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
        <Link href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Github className="size-4" />
          GitHub
        </Link>
      </div>
    </footer>
  )
}