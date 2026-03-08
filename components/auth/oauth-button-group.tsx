import { type Provider as OAuthProvider } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { signinWithOAuth } from "@/lib/actions/auth";
import { capitalizeFirstChar, DEFAULT_ERROR_MESSAGE } from "@/lib/helper";
import { useState } from "react";
import { GoogleFillIcon } from "../icons/static/google-fill";
import { GithubFillIcon } from "../icons/static/github-fill";

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
        <GithubFillIcon />
        Continue with GitHub
      </Button>
      <Button
        variant="secondary"
        className="w-full gap-x-2"
        type="button"
        onClick={() => handleOAuthSignin("google")}
        disabled={isLoading}
      >
        <GoogleFillIcon />
        Continue with Google
      </Button>
    </div>
  )
}