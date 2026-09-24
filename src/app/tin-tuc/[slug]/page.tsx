import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/home-page";
import { MediaImage } from "@/components/media-image";
import { JsonLd } from "@/components/json-ld";
import { getPost, posts } from "@/lib/data";
import { absoluteUrl, pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Tin tức" };
  return {
    ...pageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/tin-tuc/${post.slug}`,
      image: post.image,
    }),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/tin-tuc/${post.slug}`,
      type: "article",
      locale: "vi_VN",
      images: [{ url: post.image, alt: post.title }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.image),
          datePublished: post.date.split("/").reverse().join("-"),
          author: { "@type": "Organization", name: "Kim Hưng" },
          publisher: { "@type": "Organization", name: "Kim Hưng", url: absoluteUrl("/") },
          mainEntityOfPage: absoluteUrl(`/tin-tuc/${post.slug}`),
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/tin-tuc" },
          { label: post.title },
        ]}
      />
      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-sky uppercase">{post.date}</p>
          <h1 className="mt-3 font-heading text-[32px] leading-[1.1] font-semibold text-navy sm:text-[40px]">{post.title}</h1>
          <div className="relative mt-8 h-[280px] overflow-hidden bg-ice">
            <MediaImage src={post.image} alt={post.title} sizes="800px" />
          </div>
          <div className="mt-8 space-y-4 text-[16px] leading-[1.7] text-muted-foreground">
            <p>{post.excerpt}</p>
            <p>
              Kim Hưng cập nhật thường xuyên các hướng dẫn kỹ thuật, quy định lưu hành
              và kinh nghiệm triển khai thiết bị cho bệnh viện, lực lượng chức năng
              và doanh nghiệp. Liên hệ đội ngũ tư vấn nếu bạn cần giải pháp phù hợp
              với quy mô đơn vị.
            </p>
          </div>
        </div>
      </article>
      <CtaBanner />
    </>
  );
}
