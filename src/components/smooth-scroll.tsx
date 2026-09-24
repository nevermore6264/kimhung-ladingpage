"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function ReducedMotionGuard() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenis.destroy();
    }
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.08 }}>
      <ReducedMotionGuard />
      {children}
    </ReactLenis>
  );
}
