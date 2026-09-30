"use client";

import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";

export function Drift({
  children,
  speed = -8,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const [off, setOff] = useState(false);

  useEffect(() => {
    setOff(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Parallax speed={off ? 0 : speed} disabled={off} className={className}>
      {children}
    </Parallax>
  );
}
