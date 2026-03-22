import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background selection:bg-primary/10">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl px-4 sm:px-6 md:px-12 flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
