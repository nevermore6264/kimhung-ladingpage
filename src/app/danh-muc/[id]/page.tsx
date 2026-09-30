import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ProductListing } from "@/components/product-listing";
import { categories, getCategory, getProductsByCategory, type CategoryId } from "@/lib/data";
import { absoluteUrl, pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((category) => ({ id: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) return { title: "Danh mục" };
  return pageMetadata({
    title: category.name,
    description: category.listingIntro,
    path: category.href,
    image: category.image,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();

  const items = getProductsByCategory(category.id);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.listingIntro,
          url: absoluteUrl(category.href),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product.name,
              url: absoluteUrl(`/san-pham/${product.slug}`),
            })),
          },
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham" },
          { label: category.shortName },
        ]}
      />
      <ProductListing categoryId={category.id as CategoryId} />
    </>
  );
}
