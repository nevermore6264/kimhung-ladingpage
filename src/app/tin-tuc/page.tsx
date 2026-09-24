import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MediaImage } from "@/components/media-image";
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
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-sky uppercase">Ghi chép kỹ thuật</p>
          <h1 className="mt-3 font-heading text-[32px] leading-[1.05] font-semibold text-navy sm:text-[44px]">
            Tin cho người đang dùng máy
          </h1>
          <ul className="mt-10 border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link href={`/tin-tuc/${post.slug}`} className="grid gap-4 py-5 sm:grid-cols-[8rem_11rem_1fr] sm:items-center">
                  <span className="text-[13px] text-muted-foreground">{post.date}</span>
                  <span className="relative block h-24 overflow-hidden bg-ice">
                    <MediaImage src={post.image} alt="" sizes="180px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block font-heading text-[20px] font-semibold text-navy">{post.title}</span>
                    <span className="mt-1 block text-[14px] leading-[1.5] text-muted-foreground">{post.excerpt}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
