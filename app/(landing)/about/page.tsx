import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Zap } from "lucide-react";

export const metadata = {
  title: "About Us | URLab",
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">About URLab</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're on a mission to simplify and optimize your digital links with the most advanced tools available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-zinc-900/50 border-zinc-500/30 backdrop-blur-sm">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-muted-foreground text-sm">To provide developers and marketers with the ultimate URL management experience.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900/50 border-zinc-500/30 backdrop-blur-sm">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground text-sm">Constantly pushing the boundaries of what link management can achieve globally.</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-500/30 backdrop-blur-sm">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground text-sm">Built with the community in mind, driven by user feedback and modern web standards.</p>
          </CardContent>
        </Card>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">Our Story</h2>
        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-center max-w-3xl mx-auto">
          <p>
            URLab started as a simple idea: link management shouldn't be cumbersome. Over the years, we've carefully crafted a platform that combines stunning design with powerful analytics and robust backend infrastructure.
          </p>
          <p>
            Today, we help thousands of professionals optimize their digital presence, track their campaigns, and engage with their audience seamlessly. Our team is dedicated to continuous improvement and delivering a world-class experience.
          </p>
        </div>
      </div>
    </div>
  );
}
