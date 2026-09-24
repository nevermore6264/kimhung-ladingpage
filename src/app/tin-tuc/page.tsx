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
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <p className="text-[13px] font-bold uppercase text-sky">Tin tức & Sự kiện</p>
          <h1 className="mt-3 font-heading text-[36px] font-extrabold tracking-tight text-navy md:text-[42px]">
            Cập nhật tin tức mới nhất
          </h1>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-2xl border border-[#e2e8f0] transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href={`/tin-tuc/${post.slug}`} className="relative block h-[180px] overflow-hidden">
                  <MediaImage
                    src={post.image}
                    alt={post.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-5">
                  <p className="text-[12px] text-[#64748b]">{post.date}</p>
                  <h2 className="mt-2 text-[16px] font-bold text-navy">
                    <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-2 text-[13px] leading-[1.4] text-[#64748b]">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/tin-tuc/${post.slug}`}
                    className="mt-4 inline-block text-[13px] font-semibold text-sky-dark"
                  >
                    Đọc tiếp →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
