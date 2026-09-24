import Link from "next/link";
import { FigmaIcon } from "@/components/figma-icon";
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
    <nav aria-label="Breadcrumb" className="border-b border-border bg-white">
      <JsonLd data={schema} />
      <div className="mx-auto flex min-h-12 max-w-[1440px] items-center px-5 sm:px-8 lg:px-20">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[14px] text-muted-foreground">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
                {item.href && !last ? (
                  <Link href={item.href} className="hover:text-sky-dark">
                    {item.label}
                  </Link>
                ) : (
                  <span className={last ? "min-w-0 text-navy" : undefined}>{item.label}</span>
                )}
                {!last ? <FigmaIcon name="chevron-right" size={10} /> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
