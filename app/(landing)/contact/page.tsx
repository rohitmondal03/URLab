import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us | URLab",
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions, feedback, or need support? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="flex flex-col gap-6">
          <Card className="bg-zinc-900/50 border-zinc-500/30 backdrop-blur-sm border-none shadow-none bg-transparent">
            <CardContent className="p-0 flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email Us</h3>
                  <p className="text-muted-foreground mb-1">We'll get back to you within 24 hours.</p>
                  <a href="mailto:support@urlab.dev" className="text-primary hover:underline font-medium">support@urlab.dev</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Community Support</h3>
                  <p className="text-muted-foreground mb-1">Join our Discord server for quick help.</p>
                  <a href="#" className="text-primary hover:underline font-medium">Join URLab Discord</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Office</h3>
                  <p className="text-muted-foreground">
                    123 Innovation Drive<br />
                    Tech District, San Francisco<br />
                    CA 94105
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-zinc-900/50 border-zinc-500/30 backdrop-blur-md">
          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" className="bg-background/50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Include all the details here..." className="min-h-[120px] bg-background/50" />
              </div>

              <Button type="button" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
