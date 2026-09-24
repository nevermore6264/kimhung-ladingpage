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
    }, 1100);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="stage fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 text-white" role="status">
      <span className="flex size-16 items-center justify-center bg-white text-[22px] font-black text-navy">KH</span>
      <span className="boot-track" aria-hidden>
        <span className="boot-fill" />
      </span>
      <p className="text-[14px] text-white/80">Đang mở sàn thiết bị</p>
      <span className="sr-only">Đang tải</span>
    </div>
  );
}
