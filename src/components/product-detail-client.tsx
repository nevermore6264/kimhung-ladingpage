"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, InputNumber } from "antd";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useQuote } from "@/components/quote-provider";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const images = product.thumbs.length ? product.thumbs : [product.image];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={active}
        slides={images.map((src) => ({ src, alt: product.name }))}
        on={{ view: ({ index }) => setActive(index) }}
      />
    </>
  );
}

export function ProductBuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useQuote();
  const [qty, setQty] = useState(10);
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm">Số lượng</span>
        <InputNumber min={1} size="large" value={qty} onChange={(value) => setQty(Number(value) || 1)} />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="primary"
          size="large"
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
        >
          Thêm vào yêu cầu báo thầu
        </Button>
        <Button size="large" onClick={() => router.push("/lien-he")}>
          Liên hệ tư vấn
        </Button>
      </div>
      {message ? <p className="text-sm text-[#1677ff]">{message}</p> : null}
    </div>
  );
}

export function StickyQuoteBar({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useQuote();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <Button
        type="primary"
        size="large"
        block
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
      >
        Thêm vào báo giá
      </Button>
    </div>
  );
}
