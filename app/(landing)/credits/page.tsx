import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TechCredit = {
  name: string;
  purpose: string;
  docs: string;
  website: string;
};

const TECH_STACK_CREDITS: TechCredit[] = [
  {
    name: "Next.js",
    purpose: "App framework and routing",
    docs: "https://nextjs.org/docs",
    website: "https://nextjs.org",
  },
  {
    name: "React",
    purpose: "UI library",
    docs: "https://react.dev/reference/react",
    website: "https://react.dev",
  },
  {
    name: "TypeScript",
    purpose: "Type safety and better DX",
    docs: "https://www.typescriptlang.org/docs",
    website: "https://www.typescriptlang.org",
  },
  {
    name: "Tailwind CSS",
    purpose: "Utility-first styling",
    docs: "https://tailwindcss.com/docs",
    website: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    purpose: "Accessible, composable UI primitives",
    docs: "https://ui.shadcn.com/docs",
    website: "https://ui.shadcn.com",
  },
  {
    name: "Framer Motion",
    purpose: "Animations and transitions",
    docs: "https://www.framer.com/motion/introduction",
    website: "https://www.framer.com/motion",
  },
  {
    name: "Supabase",
    purpose: "Auth and backend services",
    docs: "https://supabase.com/docs",
    website: "https://supabase.com",
  },
  {
    name: "Drizzle ORM",
    purpose: "Type-safe database ORM",
    docs: "https://orm.drizzle.team/docs/overview",
    website: "https://orm.drizzle.team",
  },
  {
    name: "PostgreSQL",
    purpose: "Primary database",
    docs: "https://www.postgresql.org/docs",
    website: "https://www.postgresql.org",
  },
  {
    name: "TanStack Query",
    purpose: "Server-state caching and synchronization",
    docs: "https://tanstack.com/query/latest/docs",
    website: "https://tanstack.com/query",
  },
  {
    name: "Vercel",
    purpose: "Deployment and performance tooling",
    docs: "https://vercel.com/docs",
    website: "https://vercel.com",
  },
  {
    name: "Lenis",
    purpose: "Smooth scrolling experience",
    docs: "https://github.com/darkroomengineering/lenis",
    website: "https://www.lenis.dev",
  },
];

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Credits for the technologies used to build URLab, with links to official docs and websites.",
};

export default function CreditsPage() {
  return (
    <section className="w-full py-12 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Tech Stack Credits
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
            URLab is built with a modern stack. Huge thanks to these projects and
            communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TECH_STACK_CREDITS.map((item) => (
            <Card
              key={item.name}
              className="border-zinc-500/30 backdrop-blur-sm bg-card/60"
            >
              <CardHeader>
                <CardTitle className="text-xl">
                  {item.name}
                </CardTitle>
                <CardDescription>
                  {item.purpose}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Link
                    href={item.docs}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary" })
                    )}
                  >
                    Docs
                    <ExternalLink className="size-4" />
                  </Link>
                  <Link
                    href={item.website}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" })
                    )}
                  >
                    Website
                    <ExternalLink className="size-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
