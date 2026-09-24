"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { FigmaIcon } from "@/components/figma-icon";
import { useQuote } from "@/components/quote-provider";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

export function AddToQuoteButton({
  product,
  qty = 1,
  className,
}: {
  product: Product;
  qty?: number;
  className?: string;
}) {
  const { add } = useQuote();
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      aria-label={done ? "Đã thêm vào báo giá" : "Thêm vào yêu cầu báo giá"}
      onClick={() => {
        add({
          slug: product.slug,
          name: product.name,
          sku: product.sku,
          image: product.image,
          qty,
        });
        setDone(true);
        window.setTimeout(() => setDone(false), 1800);
      }}
      className={cn(
        "btn flex size-11 shrink-0 items-center justify-center rounded-lg bg-sky text-white hover:bg-sky-dark",
        done && "bg-navy",
        className,
      )}
    >
      {done ? (
        <CheckIcon className="size-4" />
      ) : (
        <FigmaIcon name="shopping-cart" size={16} className="invert" />
      )}
    </button>
  );
}
