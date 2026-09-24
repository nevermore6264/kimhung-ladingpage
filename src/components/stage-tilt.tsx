"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function StageTilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const plate = useRef<HTMLDivElement>(null);

  function tilt(event: React.PointerEvent<HTMLDivElement>) {
    const node = plate.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`;
  }

  function reset() {
    if (plate.current) plate.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      className="absolute inset-0 [perspective:1100px]"
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      <div
        ref={plate}
        className={cn("size-full transition-transform duration-200 ease-out [transform-style:preserve-3d]", className)}
      >
        {children}
      </div>
    </div>
  );
}
