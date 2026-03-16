import { RiGithubFill } from "@remixicon/react"
import Link from "next/link";
import { Logo } from "../shared/logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";


const FOOTER_LINK = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Github",
    href: "#",
    icon: <RiGithubFill />
  },
]


export function Footer() {
  return (
    <footer className="w-full max-w-6xl py-8 px-6 md:px-12 border-t border-zinc-500 mt-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <Logo />
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        {FOOTER_LINK.map(link => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              buttonVariants({ variant: "link" }),
              "hover:text-foreground transition-colors"
            )}
          >
            {link.icon} {link.title}
          </Link>
        ))}
      </div>
    </footer>
  )
}