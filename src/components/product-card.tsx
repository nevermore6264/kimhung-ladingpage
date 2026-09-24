import Link from "next/link";
import { AddToQuoteButton } from "@/components/add-to-quote-button";
import { MediaImage } from "@/components/media-image";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  variant = "home",
}: {
  product: Product;
  variant?: "home" | "listing";
}) {
  const href = `/san-pham/${product.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-white">
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
          <span className="text-[15px] font-bold text-sky-dark">Liên hệ báo giá</span>
          <span className="bg-ice px-2 py-1 text-[12px] font-semibold text-sky">
            Chính hãng
          </span>
        </div>
        <div className={cn("flex items-stretch gap-2")}>
          <Link
            href={href}
            className="btn flex min-h-11 flex-1 items-center justify-center bg-secondary py-2.5 text-[13px] font-semibold text-navy hover:bg-navy hover:text-white"
          >
            Xem chi tiết
          </Link>
          <AddToQuoteButton product={product} />
        </div>
      </div>
    </article>
  );
}
