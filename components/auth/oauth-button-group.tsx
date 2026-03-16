import { type Provider as OAuthProvider } from "@supabase/supabase-js";
import { toast } from "sonner";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react"
import { Button } from "../ui/button";
import { signinWithOAuth } from "@/lib/actions/auth.action";
import { capitalizeFirstChar, DEFAULT_ERROR_MESSAGE } from "@/lib/helper";
import { useState } from "react";

export function OAuthButtonGroup() {
  const [isLoading, setLoading] = useState(false);

  const handleOAuthSignin = async (provider: OAuthProvider) => {
    setLoading(true);

    try {
      await signinWithOAuth(provider);
      toast.success(capitalizeFirstChar(provider) + " sign in successfull")
    } catch (error: any) {
      toast.error(error || DEFAULT_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="secondary"
        className="w-full gap-x-2"
        type="button"
        onClick={() => handleOAuthSignin("github")}
        disabled={isLoading}
      >
        <RiGithubFill />
        Continue with GitHub
      </Button>
      <Button
        variant="secondary"
        className="w-full gap-x-2"
        type="button"
        onClick={() => handleOAuthSignin("google")}
        disabled={isLoading}
      >
        <RiGoogleFill />
        Continue with Google
      </Button>
    </div>
  )
}