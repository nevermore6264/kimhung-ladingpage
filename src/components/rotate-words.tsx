"use client";

import { useEffect, useState } from "react";

const words = ["Que thử ma túy", "Máy đo cồn", "Cổng dò kim loại", "Vật tư tiêu hao"];

export function RotateWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="font-extrabold text-[#003ab9]" aria-live="polite">
      {words[index]}
    </span>
  );
}
