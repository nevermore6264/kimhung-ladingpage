"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { AddToQuoteButton } from "@/components/add-to-quote-button";
import { MediaImage } from "@/components/media-image";
import { StageTilt } from "@/components/stage-tilt";
import { products } from "@/lib/data";

export function Showroom() {
  const [index, setIndex] = useState(0);
  const product = products[index];
  const total = products.length;

  function step(delta: number) {
    setIndex((current) => (current + delta + total) % total);
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

  return (
    <section className="bg-[#0c121c] text-white" aria-roledescription="băng chuyền">
      <div className="grid lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
        <div className="stage relative min-h-[300px] overflow-hidden sm:min-h-[420px]">
          <div className="stage-grid pointer-events-none absolute inset-x-[-10%] bottom-0 h-[55%]" />
          <StageTilt>
            <div key={product.slug} className="desk-swap absolute inset-0">
              <div className="float-y absolute inset-8 sm:inset-16">
                <span className="stage-glow pointer-events-none absolute inset-[12%] -z-10" />
                <div className="relative size-full">
                  <MediaImage
                    src={product.image}
                    alt={product.name}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
                    priority
                  />
                </div>
              </div>
            </div>
          </StageTilt>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Thiết bị trước"
            className="absolute top-1/2 left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center bg-white text-navy hover:bg-sky hover:text-white"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Thiết bị sau"
            className="absolute top-1/2 right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center bg-white text-navy hover:bg-sky hover:text-white"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>

        <div className="flex flex-col justify-between gap-8 bg-white px-5 py-8 text-navy sm:px-8 lg:px-14 lg:py-12">
          <div key={`${product.slug}-copy`} className="desk-swap">
            <p className="sr-only" aria-live="polite">
              {product.name}
            </p>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-sky uppercase">
              {product.categoryLabel}
            </p>
            <h1 className="font-heading mt-3 text-[32px] leading-[1.05] font-semibold text-navy sm:text-[44px]">
              <span className="sr-only">Que thử ma túy, máy đo nồng độ cồn, thiết bị an ninh. </span>
              {product.name}
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-[1.6] text-muted-foreground">{product.excerpt}</p>
            <dl className="mt-6 max-w-md divide-y divide-border border-y border-border">
              {product.specs.slice(0, 3).map((spec) => (
                <div key={spec.label} className="grid gap-1 py-3 text-[14px] sm:grid-cols-[8rem_1fr]">
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="font-medium text-navy">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <AddToQuoteButton product={product} />
            <Link href={`/san-pham/${product.slug}`} className="text-[14px] font-semibold text-sky hover:underline">
              Xem hồ sơ
            </Link>
            <span className="ml-auto font-mono text-[13px] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto bg-[#0c121c] px-3 py-3" aria-label="Dãy thiết bị">
        {products.map((item, itemIndex) => {
          const active = itemIndex === index;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-current={active ? "true" : undefined}
              aria-label={item.shortName}
              className={`btn flex w-28 shrink-0 flex-col border text-left transition-transform duration-200 sm:w-36 ${
                active
                  ? "scale-[1.04] border-sky bg-white"
                  : "border-transparent bg-white/90 hover:bg-white"
              }`}
            >
              <span className={`block h-1 ${active ? "bg-sky" : "bg-transparent"}`} />
              <span className="relative block h-16">
                <MediaImage src={item.image} alt="" sizes="144px" className="object-contain p-2" />
              </span>
              <span className="line-clamp-2 px-2 pb-2 text-[12px] leading-[1.3] font-medium text-navy">
                {item.shortName}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
