"use client"

import { useEffect } from "react";
import Lenis from "lenis";
import type { IRootLayout } from "@/types";

export function SmootScroll({ children }: IRootLayout) {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, [])

  return <>{children}</>
}