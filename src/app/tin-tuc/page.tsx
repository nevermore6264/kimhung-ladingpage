import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MediaImage } from "@/components/media-image";
import { PageIntro } from "@/components/page-intro";
import { posts } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Tin tức",
  description:
    "Hướng dẫn phân biệt chất ma túy, hiệu chuẩn máy đo cồn và tiêu chuẩn cổng dò kim loại từ Kim Hưng.",
  path: "/tin-tuc",
});

export default function TinTucPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức" },
        ]}
      />
      <PageIntro
        eyebrow="Ghi chép kỹ thuật"
        title="Tin cho người đang dùng máy"
        lede="Hướng dẫn que thử, hiệu chuẩn máy đo cồn và tiêu chuẩn cổng dò."
      />
      <section className="mx-auto grid max-w-[1120px] gap-6 px-5 py-10 sm:px-8 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Link href={`/tin-tuc/${post.slug}`} className="relative block h-44 bg-slate-100">
              <MediaImage src={post.image} alt={post.title} sizes="360px" />
            </Link>
            <div className="p-5">
              <p className="text-[12px] font-semibold text-[#003ab9]">{post.date}</p>
              <h2 className="mt-2 text-[18px] font-bold text-navy">
                <Link href={`/tin-tuc/${post.slug}`} className="hover:text-[#003ab9]">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
