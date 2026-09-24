"use client";

import { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import confetti from "canvas-confetti";
import { useQuote } from "@/components/quote-provider";
import type { Product } from "@/lib/data";

export function AddToQuoteButton({
  product,
  qty = 1,
}: {
  product: Product;
  qty?: number;
  className?: string;
}) {
  const { add } = useQuote();
  const [done, setDone] = useState(false);

  return (
    <Button
      type="primary"
      aria-label={done ? "Đã thêm vào báo giá" : "Thêm vào yêu cầu báo giá"}
      icon={done ? undefined : <ShoppingCartOutlined />}
      onClick={() => {
        add({
          slug: product.slug,
          name: product.name,
          sku: product.sku,
          image: product.image,
          qty,
        });
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          void confetti({
            particleCount: 42,
            spread: 58,
            origin: { y: 0.72 },
            colors: ["#1677ff", "#0958d9", "#ffffff", "#111111"],
          });
        }
        setDone(true);
        window.setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? "Đã thêm" : null}
    </Button>
  );
}
