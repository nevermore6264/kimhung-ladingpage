"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FigmaIcon } from "@/components/figma-icon";
import { ProductCard } from "@/components/product-card";
import { Button, Checkbox, Pagination } from "antd";
import {
  brands,
  categories,
  getCategory,
  getCommerce,
  getProductsByCategory,
  priceRanges,
  type CategoryId,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProductListing({
  categoryId,
}: {
  categoryId?: CategoryId;
}) {
  const category = getCategory(categoryId);
  const [page, setPage] = useState(1);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const products = useMemo(() => {
    return getProductsByCategory(categoryId).filter((product) => {
      const commerce = getCommerce(product.slug);
      const priceOk =
        selectedPrices.length === 0 ||
        (commerce ? selectedPrices.includes(commerce.priceTier) : false);
      const brandOk =
        selectedBrands.length === 0 ||
        (commerce ? selectedBrands.includes(commerce.brand) : false);
      return priceOk && brandOk;
    });
  }, [categoryId, selectedBrands, selectedPrices]);

  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const visible = products.slice((currentPage - 1) * perPage, currentPage * perPage);
  const hasFilters = selectedPrices.length > 0 || selectedBrands.length > 0;

  useEffect(() => {
    setPage(1);
  }, [categoryId, selectedBrands, selectedPrices]);

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 lg:px-20 lg:py-8">
        <h1 className="font-heading text-[28px] font-extrabold tracking-tight text-navy sm:text-[32px] md:text-[40px]">
          {category?.name ?? "Tất cả sản phẩm"}
        </h1>
        <p className="mt-3 max-w-[800px] text-[15px] leading-[1.5] text-muted-foreground">
          {category?.listingIntro ??
            "Kim Hưng nhập khẩu và phân phối trực tiếp các giải pháp test ma túy nhanh, thiết bị đo nồng độ cồn và thiết bị an ninh chính hãng."}
        </p>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-20">
        <nav
          aria-label="Danh mục sản phẩm"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-4 lg:hidden"
        >
          <Link
            href="/san-pham"
            className={cn(
              "shrink-0 border px-4 py-2 text-[14px] font-medium",
              !categoryId ? "border-sky bg-sky text-white" : "border-border bg-white text-navy",
            )}
          >
            Tất cả
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={cn(
                "shrink-0 border px-4 py-2 text-[14px] font-medium",
                cat.id === categoryId ? "border-sky bg-sky text-white" : "border-border bg-white text-navy",
              )}
            >
              {cat.shortName}
            </Link>
          ))}
        </nav>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="flex flex-col gap-6">
          <div className="hidden border border-border bg-white p-5 lg:block">
            <h2 className="mb-4 text-[16px] font-bold text-navy">Danh Mục Sản Phẩm</h2>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/san-pham"
                  className={cn(
                    "flex min-h-11 items-center justify-between text-[14px]",
                    !categoryId ? "font-bold text-sky-dark" : "text-navy hover:text-sky-dark",
                  )}
                >
                  Tất cả sản phẩm
                  <FigmaIcon name="chevron-right" size={12} />
                </Link>
              </li>
              {categories.map((cat) => {
                const active = cat.id === categoryId;
                return (
                  <li key={cat.id}>
                    <Link
                      href={cat.href}
                      className={cn(
                        "flex min-h-11 items-center justify-between text-[14px]",
                        active ? "font-bold text-sky-dark" : "text-navy hover:text-sky-dark",
                      )}
                    >
                      {cat.shortName}
                      <FigmaIcon name="chevron-right" size={12} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <details className="border border-border bg-white lg:contents">
            <summary className="min-h-11 cursor-pointer list-none px-5 py-3 text-[16px] font-bold text-navy lg:hidden">
              Lọc giá và thương hiệu
            </summary>
            <div className="flex flex-col gap-6 border-t border-border p-5 lg:contents lg:border-0 lg:p-0">
          <div className="border border-border bg-white p-5">
            <h2 className="mb-4 text-[16px] font-bold text-navy">Khoảng Giá</h2>
            <ul className="flex flex-col gap-3">
              {priceRanges.map((range) => (
                <li key={range.id}>
                  <Checkbox
                    checked={selectedPrices.includes(range.id)}
                    onChange={() => toggle(selectedPrices, range.id, setSelectedPrices)}
                  >
                    {range.label}
                  </Checkbox>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-white p-5">
            <h2 className="mb-4 text-[16px] font-bold text-navy">Thương Hiệu</h2>
            <ul className="flex flex-col gap-3">
              {brands.map((brand) => (
                <li key={brand}>
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggle(selectedBrands, brand, setSelectedBrands)}
                  >
                    {brand}
                  </Checkbox>
                </li>
              ))}
            </ul>
          </div>
            </div>
          </details>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[13px] text-muted-foreground">
              {products.length} sản phẩm
              {hasFilters ? " khớp bộ lọc" : ""}
            </p>
            {hasFilters ? (
              <Button type="link" onClick={() => { setSelectedPrices([]); setSelectedBrands([]); }}>
                Xóa bộ lọc
              </Button>
            ) : null}
          </div>

          {visible.length === 0 ? (
            <div className="border border-dashed border-border bg-white px-6 py-16 text-center">
              <p className="font-heading text-[18px] font-bold text-navy">
                Không tìm thấy sản phẩm phù hợp
              </p>
              <p className="mt-2 text-[14px] text-muted-foreground">
                Thử bỏ bớt khoảng giá hoặc thương hiệu, hoặc xem toàn bộ danh mục.
              </p>
              <Button
                type="primary"
                className="mt-5"
                onClick={() => {
                  setSelectedPrices([]);
                  setSelectedBrands([]);
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((product) => (
                <ProductCard key={product.slug} product={product} variant="listing" />
              ))}
            </div>
          )}

          {products.length > perPage ? (
            <div className="mt-8 flex justify-center">
              <Pagination
                current={currentPage}
                total={products.length}
                pageSize={perPage}
                showSizeChanger={false}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null}
          <p className="mt-3 text-center text-xs text-muted-foreground">
            <Link href="/san-pham" className="hover:text-sky-dark">
              Xem tất cả danh mục
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
