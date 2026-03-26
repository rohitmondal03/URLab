import Link from "next/link";
import { RiGithubFill } from "@remixicon/react"
import { Logo } from "../shared/logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { GITHUB_LINK } from "@/lib/constants";


const FOOTER_LINK = [
  {
    title: "Credits",
    href: "/credits",
    target: "__self"
  },
  {
    icon: <RiGithubFill />,
    title: "Github",
    href: GITHUB_LINK,
    target: "__blank"
  },
]


export function Footer() {
  return (
    <footer className="w-full max-w-6xl py-8 px-4 sm:px-6 md:px-12 border-t border-zinc-500 mt-auto flex flex-col sm:flex-row justify-between items-center gap-6">
      <Logo />
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
        {FOOTER_LINK.map(link => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "hover:text-foreground transition-colors"
            )}
            target={link.target}
          >
            {link.icon} {link.title}
          </Link>
        ))}
      </div>
    </footer>
  )
}