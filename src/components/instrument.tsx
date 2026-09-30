"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MediaImage } from "@/components/media-image";
import { StageTilt } from "@/components/stage-tilt";
import { useQuote } from "@/components/quote-provider";
import { products } from "@/lib/data";

export function Instrument() {
  const deck = products.filter((item) => item.featured);
  const list = deck.length > 0 ? deck : products.slice(0, 4);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useQuote();
  const product = list[index];
  const total = list.length;
  const lines = [
    product.sku,
    product.categoryLabel,
    ...product.specs.slice(0, 3).map((spec) => `${spec.label}   ${spec.value}`),
  ];

  function step(delta: number) {
    setIndex((current) => (current + delta + total) % total);
    setAdded(false);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  useEffect(() => {
    setShown(1);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(lines.length);
      return;
    }
    const timer = window.setInterval(() => {
      setShown((count) => (count >= lines.length ? count : count + 1));
    }, 380);
    return () => window.clearInterval(timer);
  }, [product.slug, lines.length]);

  function onMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--sx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--sy", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      className="spot relative h-[calc(100dvh-4.5rem)] min-h-[680px] overflow-hidden"
      aria-roledescription="băng chuyền sản phẩm"
      onPointerMove={onMove}
    >
      <p className="pointer-events-none absolute top-1/2 left-[-2vw] z-0 -translate-y-1/2 text-[16vw] leading-none font-semibold tracking-[-0.08em] text-white/[0.045] select-none">
        KIM HƯNG
      </p>

      <StageTilt>
        <div key={product.slug} className="desk-swap absolute inset-[8%] sm:inset-[12%]">
          <div className="float-y relative size-full">
            <MediaImage
              src={product.image}
              alt={product.name}
              priority
              sizes="70vw"
              className="object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>
      </StageTilt>

      <div className="absolute top-6 left-5 z-20 w-[min(100%-2.5rem,340px)] sm:left-8 lg:top-10 lg:left-14">
        <p className="text-[11px] tracking-[0.22em] text-[#c8ff4a] uppercase">Hiện trường</p>
        <div className="lcd relative mt-3 overflow-hidden px-4 py-3">
          <div className="lcd-scan pointer-events-none absolute inset-0" />
          <p className="text-[11px] tracking-[0.18em] uppercase">Kim Hưng · đọc mẫu</p>
          <ul className="mt-3 space-y-1.5 text-[13px] leading-snug">
            {lines.slice(0, shown).map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li className="lcd-caret" aria-hidden>
              ▌
            </li>
          </ul>
        </div>
      </div>

      <div className="absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {list.map((item, itemIndex) => (
          <button
            key={item.slug}
            type="button"
            aria-label={item.shortName}
            aria-current={itemIndex === index ? "true" : undefined}
            onClick={() => {
              setIndex(itemIndex);
              setAdded(false);
            }}
            className={`w-[3px] rounded-full transition-all ${
              itemIndex === index ? "h-12 bg-[#c8ff4a]" : "h-6 bg-white/25 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-gradient-to-t from-black/70 to-transparent px-5 pt-10 pb-5 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="sr-only" aria-live="polite">
              {product.name}
            </p>
            <h1 className="max-w-[12ch] text-[clamp(36px,5.4vw,76px)] leading-[0.9] font-semibold tracking-[-0.055em] text-white">
              <span className="sr-only">Que thử ma túy, máy đo nồng độ cồn, thiết bị an ninh. </span>
              {product.shortName}
            </h1>
            <p className="mt-3 max-w-md text-[14px] text-white/70">{product.excerpt}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex min-h-11 items-center border border-[#c8ff4a] px-4 text-[13px] font-medium text-[#c8ff4a]"
              onClick={() => {
                add({
                  slug: product.slug,
                  name: product.name,
                  sku: product.sku,
                  image: product.image,
                  qty: 1,
                });
                setAdded(true);
              }}
            >
              {added ? "Đã vào phiếu" : "Đưa vào phiếu"}
            </button>
            <Link
              href={`/san-pham/${product.slug}`}
              className="inline-flex min-h-11 items-center border border-white/25 px-4 text-[13px] text-white"
            >
              Hồ sơ
            </Link>
            <button type="button" aria-label="Thiết bị trước" onClick={() => step(-1)} className="size-11 border border-white/20 text-white">
              ←
            </button>
            <button type="button" aria-label="Thiết bị sau" onClick={() => step(1)} className="size-11 border border-white/20 text-white">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
