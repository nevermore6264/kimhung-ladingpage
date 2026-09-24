"use client";

import Link from "next/link";
import { Breadcrumb } from "antd";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-[#f0f0f0] bg-white">
      <JsonLd data={schema} />
      <div className="mx-auto flex min-h-12 max-w-[1440px] items-center px-5 sm:px-8 lg:px-20">
        <Breadcrumb
          items={items.map((item, index) => {
            const last = index === items.length - 1;
            return {
              title:
                item.href && !last ? <Link href={item.href}>{item.label}</Link> : item.label,
            };
          })}
        />
      </div>
    </nav>
  );
}
