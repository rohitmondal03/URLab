import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { loginWithEmail } from "@/lib/actions/auth";
import { useState } from "react";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/helper";
import { LoaderIcon } from "lucide-react";

export function LoginForm() {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await loginWithEmail(formData.email.trim(), formData.password.trim());
      toast.success("Login successful")
    } catch (error: any) {
      toast.error(error.message || DEFAULT_ERROR_MESSAGE)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-zinc-300 border-2">
      <form onSubmit={handleLogin} className="space-y-6">
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              className="bg-background/50"
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</Link>
            </div>
            <Input
              id="password"
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
              : "Log in"
            }
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}