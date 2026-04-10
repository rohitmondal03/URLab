import type { Metadata } from "next";
import { CreditsGrid } from "@/components/credits/credits-grid";

const TECH_STACK_CREDITS = [
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
    <section className="w-full py-12 md:py-16">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Tech Stack Credits
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
            URLab is built with a modern stack. Huge thanks to these projects and communities.
          </p>
        </div>

        <CreditsGrid credits={TECH_STACK_CREDITS} />
      </div>
    </section>
  );
}
