"use client";

import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [reduce, setReduce] = useState(true);
  const { ref, replay } = useScramble({
    text,
    speed: 0.45,
    scramble: 6,
    playOnMount: false,
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(reduced);
    if (!reduced) replay();
  }, [replay]);

  if (reduce) return <span className={className}>{text}</span>;
  return <span ref={ref} className={className} />;
}
