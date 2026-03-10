"use client"

import { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { signupWithEmail } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/helper";
import { LoaderIcon } from "lucide-react";

export function SignupForm() {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })

  const handleSignup = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await signupWithEmail(formData.name.trim(), formData.email.trim(), formData.password.trim());
      toast.success("Welcome to URLab !!")
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-zinc-300 border-2">
      <form onSubmit={handleSignup} className="space-y-6">
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              className="bg-background/50"
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-signup">Email</Label>
            <Input
              id="email-signup"
              type="email"
              placeholder="name@example.com"
              required
              className="bg-background/50"
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signup">Password</Label>
            <Input
              id="password-signup"
              type="password"
              required
              className="bg-background/50"
              onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading
              ? <LoaderIcon className="animate-spin" />
              : "Create Account"
            }
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}