"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, XIcon } from "lucide-react";
import { useQuote } from "@/components/quote-provider";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const images = product.thumbs.length ? product.thumbs : [product.image];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (event.key === "ArrowLeft") {
        setActive((i) => (i - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, open]);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="stage relative flex h-[320px] w-full cursor-zoom-in items-center justify-center overflow-hidden sm:h-[420px]"
        >
          <span className="float-y relative block size-[240px] overflow-hidden sm:size-[320px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active]}
              alt={product.name}
              width={320}
              height={320}
              className="size-full object-cover"
            />
          </span>
        </button>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((src, index) => (
            <button
              key={src + index}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "studio-surface flex h-20 items-center justify-center overflow-hidden border",
                active === index
                  ? "border-sky ring-2 ring-sky/30"
                  : "border-border hover:border-sky/40",
              )}
            >
              <span className="relative block size-[60px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  width={60}
                  height={60}
                  className="size-full object-cover"
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="Đóng"
            onClick={() => setOpen(false)}
          >
            <XIcon className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={product.name}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[82vh] max-w-[min(920px,92vw)] rounded-xl object-contain shadow-2xl"
          />
        </div>
      ) : null}
    </>
  );
}

export function ProductBuyBox({ product }: { product: Product }) {
  const { add } = useQuote();
  const [qty, setQty] = useState(10);
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-[14px] text-navy">Số lượng</span>
        <div className="flex overflow-hidden rounded-md border border-border">
          <button
            type="button"
            className="h-11 w-11 text-navy"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="flex h-11 w-12 items-center justify-center border-x border-border text-[14px] font-medium">
            {qty}
          </span>
          <button
            type="button"
            className="h-11 w-11 text-navy"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              add({
                slug: product.slug,
                name: product.name,
                sku: product.sku,
                image: product.image,
                qty,
              });
              setMessage("Đã thêm vào yêu cầu báo giá. Mở biểu tượng giỏ trên menu hoặc trang Liên hệ để gửi.");
            }}
            className="btn flex-1 rounded-md bg-sky px-5 py-3.5 text-[14px] font-medium text-white hover:bg-sky-dark"
          >
            Thêm vào yêu cầu báo thầu
          </button>
          <a
            href="/lien-he"
            className="btn flex flex-1 items-center justify-center rounded-md border border-navy px-5 py-3.5 text-[14px] font-medium text-navy hover:bg-ice"
          >
            Liên hệ tư vấn
          </a>
        </div>
        {message ? (
          <p className="flex items-center gap-2 text-sm text-sky-dark">
            <CheckIcon className="size-4" />
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function StickyQuoteBar({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useQuote();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <button
        type="button"
        onClick={() => {
          add({
            slug: product.slug,
            name: product.name,
            sku: product.sku,
            image: product.image,
            qty: 1,
          });
          router.push("/lien-he");
        }}
        className="btn flex h-11 w-full items-center justify-center rounded-md bg-sky text-[14px] font-medium text-white hover:bg-sky-dark"
      >
        Thêm vào báo giá
      </button>
    </div>
  );
}
