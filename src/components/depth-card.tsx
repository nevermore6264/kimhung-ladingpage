"use client";

import { useEffect, useState } from "react";
import Atropos from "atropos/react";
import "atropos/css";

export function DepthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <Atropos
      className={className ?? "block w-full"}
      shadow={false}
      highlight={false}
      rotateTouch="scroll-y"
      rotateXMax={8}
      rotateYMax={10}
    >
      {children}
    </Atropos>
  );
}
