import { cn } from "@/lib/utils";
import { AnimateIcon } from "../animate-ui/icons/icon";
import { Layers } from "../animate-ui/icons/layers";

type TLogoProps = {
  variant?: "small" | "large" | "x-large";
  className?: string;
}

export function Logo({ variant, className }: TLogoProps) {
  return (
    <div className={cn(
      !variant || variant === "small" ? "text-muted-foreground" : null,
      "flex items-center gap-2",
      className ? className : null,
    )}>
      <AnimateIcon animateOnHover animate="default-loop" delay={1000}>
        <Layers className={!variant || variant === "small"
          ? "size-6"
          : variant === "large"
            ? "size-7"
            : "size-8"
        } />
      </AnimateIcon>
      <span className={!variant || variant == "small"
        ? "font-medium text-lg"
        : variant === "large"
          ? "font-semibold text-xl"
          : "font-bold text-2xl"
      }>
        URLab
      </span>
    </ div >
  )
}