"use client";

import { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
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
        setDone(true);
        window.setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? "Đã thêm" : null}
    </Button>
  );
}
