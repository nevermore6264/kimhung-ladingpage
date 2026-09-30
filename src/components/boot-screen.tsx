"use client";

import { useEffect, useState } from "react";

const KEY = "kimhung-boot";

export function BootScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(KEY)) return;
    setVisible(true);
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setVisible(false);
    }, 700);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-1 bg-slate-200" role="status">
      <span className="boot-fill block h-full" />
      <span className="sr-only">Đang mở trang</span>
    </div>
  );
}
