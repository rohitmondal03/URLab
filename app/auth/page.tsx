"use client";

import { ArrowLeft, LockKeyholeOpen, LogIn } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator"
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { OAuthButtonGroup } from "@/components/auth/oauth-button-group";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>
    }>
      <AuthContent />
    </Suspense>
  );
}

function AuthContent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-secondary/50 via-background to-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] flex flex-col items-center justify-center gap-y-6"
      >
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "mx-auto"
          )}
        >
          <ArrowLeft />
          Back To Home
        </Link>
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center w-full">
            <Logo variant="x-large" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your details to manage your links
          </p>
        </div>

        <Tabs defaultValue={"login"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">
              <LogIn />
              Log in
            </TabsTrigger>
            <TabsTrigger value="signup">
              <LockKeyholeOpen />
              Create Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>

        <Separator aria-orientation="horizontal" className="bg-zinc-300" />

        <OAuthButtonGroup />
      </motion.div>
    </div>
  );
}
