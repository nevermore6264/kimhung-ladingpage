import Link from "next/link";
import { AddToQuoteButton } from "@/components/add-to-quote-button";
import { MediaImage } from "@/components/media-image";
import type { Product } from "@/lib/data";
import { Tag } from "antd";
import { AntdLinkButton } from "@/components/antd-link-button";

export function ProductCard({
  product,
  variant = "home",
}: {
  product: Product;
  variant?: "home" | "listing";
}) {
  const href = `/san-pham/${product.slug}`;

  return (
    <article className="card-3d group flex h-full flex-col overflow-hidden border border-border bg-white">
      <Link
        href={href}
        className="studio-surface flex h-[220px] items-center justify-center overflow-hidden"
      >
        <span className="relative block size-[180px] overflow-hidden">
          <MediaImage
            src={product.image}
            alt={product.name}
            sizes="(max-width: 640px) 80vw, 280px"
            className="object-contain"
          />
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-2 font-heading text-[16px] font-bold text-navy">
            <Link href={href} className="hover:text-sky-dark">
              {product.name}
            </Link>
          </h3>
          <p className="line-clamp-2 text-[13px] leading-[1.5] text-muted-foreground">
            {variant === "listing" ? product.listingExcerpt : product.excerpt}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[15px] font-medium text-[#1677ff]">Liên hệ báo giá</span>
          <Tag color="blue">Chính hãng</Tag>
        </div>
        <div className="flex items-center gap-2">
          <AntdLinkButton href={href} type="default" size="middle">
            Xem chi tiết
          </AntdLinkButton>
          <AddToQuoteButton product={product} />
        </div>
      </div>
    </article>
  );
}
