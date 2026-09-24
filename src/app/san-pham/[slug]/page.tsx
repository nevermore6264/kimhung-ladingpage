import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FigmaIcon } from "@/components/figma-icon";
import {
  ProductBuyBox,
  ProductGallery,
  StickyQuoteBar,
} from "@/components/product-detail-client";
import { ProductCard } from "@/components/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonLd } from "@/components/json-ld";
import {
  getCategory,
  getProduct,
  getRelatedProducts,
  products,
} from "@/lib/data";
import { absoluteUrl, pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Sản phẩm" };
  return pageMetadata({
    title: product.name,
    description: product.description || product.excerpt,
    path: `/san-pham/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categoryId);
  const related = getRelatedProducts(product.slug, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          sku: product.sku,
          image: absoluteUrl(product.image),
          description: product.description,
          category: product.categoryLabel,
          brand: {
            "@type": "Brand",
            name: product.specs.find((spec) => spec.label === "Hãng")?.value ?? "Kim Hưng",
          },
          url: absoluteUrl(`/san-pham/${product.slug}`),
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/san-pham" },
          {
            label: category?.shortName ?? "Danh mục",
            href: category?.href ?? "/san-pham",
          },
          { label: product.shortName },
        ]}
      />

      <div className="bg-white pb-20 lg:pb-0">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-20 lg:py-10">
          <ProductGallery product={product} />

          <div className="lg:sticky lg:top-32 lg:self-start">
            <h1 className="font-heading text-[24px] font-extrabold tracking-tight text-navy sm:text-[26px] md:text-[32px]">
              {product.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-[#64748b]">
              <span className="inline-flex items-center gap-1">
                <FigmaIcon name="star" size={14} />
                {product.rating}/5 ({product.reviewCount} đánh giá)
              </span>
              <span className="hidden h-4 w-px bg-[#e2e8f0] sm:block" />
              <span>Mã sản phẩm: {product.sku}</span>
            </div>

            <div className="mt-6 border-t border-[#e2e8f0] pt-6">
              <p className="text-[22px] font-extrabold text-sky-dark">
                Liên hệ báo giá sỉ
              </p>
              <p className="mt-1 text-[12px] text-[#64748b]">
                Cam kết chiết khấu thương mại tốt nhất cho các đại lý & đơn vị thầu y tế.
              </p>
            </div>

            <p className="mt-5 text-[15px] leading-[1.5] text-[#64748b]">
              {product.description}
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <ProductBuyBox product={product} />
            </div>

            <div className="mt-6 border-t border-[#e2e8f0] pt-4 text-[13px] text-[#64748b]">
              <p>Phân mục: {product.categoryLabel}</p>
              <p className="mt-1">
                Chứng chỉ kiểm định: {product.certifications}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-20">
          <Tabs defaultValue="mo-ta">
            <TabsList
              variant="line"
              className="h-12 w-full justify-start overflow-x-auto rounded-none border-b border-[#e2e8f0] p-0"
            >
              <TabsTrigger
                value="mo-ta"
                className="h-12 shrink-0 rounded-none px-4 whitespace-nowrap data-active:text-sky-dark sm:px-6"
              >
                Mô tả sản phẩm
              </TabsTrigger>
              <TabsTrigger value="thong-so" className="h-12 shrink-0 rounded-none px-4 whitespace-nowrap sm:px-6">
                Thông số kỹ thuật
              </TabsTrigger>
              <TabsTrigger value="huong-dan" className="h-12 shrink-0 rounded-none px-4 whitespace-nowrap sm:px-6">
                Hướng dẫn sử dụng
              </TabsTrigger>
              <TabsTrigger value="phap-ly" className="h-12 shrink-0 rounded-none px-4 whitespace-nowrap sm:px-6">
                Đánh giá & Pháp lý
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mo-ta" className="pt-6">
              <h2 className="text-[18px] font-bold text-navy">
                Mô Tả Sản Phẩm {product.shortName}
              </h2>
              <p className="mt-4 max-w-none text-[14px] leading-[1.6] text-[#64748b]">
                {product.slug === "que-thu-nhanh-5-chat-doa"
                  ? "Cốc test 5 chất ma túy DOA là giải pháp chẩn đoán chuyên dụng dạng hộp cốc chứa kín mẫu nước tiểu của bệnh nhân hoặc người lao động cần kiểm chứng. Thiết kế cốc tự động chống tràn giúp bảo vệ nhân viên kiểm duyệt tối đa khỏi lây nhiễm chéo hoặc can thiệp ngoại vi vào mẫu phẩm."
                  : product.description}
              </p>
              {product.slug === "que-thu-nhanh-5-chat-doa" ? (
                <p className="mt-4 text-[14px] leading-[1.6] text-[#64748b]">
                  Sản phẩm sử dụng công nghệ miễn dịch sắc ký dòng chảy bên để phát
                  hiện định tính định mức giới hạn của các chất kích thích có trong
                  mẫu sinh hóa. Có kết quả rõ ràng sắc nét thể hiện qua các vạch màu
                  đỏ chuẩn (Vạch C và Vạch T) trên thân cốc kiểm.
                </p>
              ) : null}
              <div className="mt-6 rounded-lg bg-[#f8fafc] p-5">
                <p className="text-[15px] font-bold text-navy">
                  Ưu Điểm Vượt Trội Của {product.name} Kim Hưng Phân Phối:
                </p>
                <ul className="mt-3 flex flex-col gap-2 text-[14px] text-[#64748b]">
                  {product.benefits.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="thong-so" className="pt-6">
              <table className="w-full max-w-3xl text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-[#e2e8f0]">
                      <th className="w-1/3 py-3 text-left font-semibold text-navy">
                        {spec.label}
                      </th>
                      <td className="py-3 text-[#64748b]">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="huong-dan" className="pt-6">
              <ol className="flex max-w-3xl list-decimal flex-col gap-2 pl-5 text-[14px] leading-[1.6] text-[#64748b]">
                {product.usage.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </TabsContent>

            <TabsContent value="phap-ly" className="pt-6">
              <p className="max-w-3xl text-[14px] leading-[1.6] text-[#64748b]">
                {product.legal}
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-20">
          <h2 className="mb-8 text-[24px] font-extrabold text-navy">
            Sản Phẩm Tương Tự & Liên Quan
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </div>
      <StickyQuoteBar product={product} />
    </>
  );
}
