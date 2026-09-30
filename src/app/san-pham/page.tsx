import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductListing } from "@/components/product-listing";
import { getCategory } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ "danh-muc"?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const category = getCategory(params["danh-muc"]);
  if (category) {
    return pageMetadata({
      title: category.name,
      description: category.listingIntro,
      path: category.href,
      image: category.image,
    });
  }
  return pageMetadata({
    title: "Sản phẩm",
    description:
      "Danh mục que thử ma túy, máy đo nồng độ cồn, thiết bị an ninh và vật tư tiêu hao chính hãng.",
    path: "/san-pham",
  });
}

export default async function SanPhamPage({
  searchParams,
}: {
  searchParams: Promise<{ "danh-muc"?: string }>;
}) {
  const params = await searchParams;
  const category = getCategory(params["danh-muc"]);
  if (category) permanentRedirect(category.href);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham" },
        ]}
      />
      <ProductListing />
    </>
  );
}
