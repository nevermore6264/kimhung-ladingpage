import Link from "next/link";
import { FigmaIcon } from "@/components/figma-icon";
import { JsonLd } from "@/components/json-ld";
import { Showroom } from "@/components/showroom";
import { categories, company, faqs } from "@/lib/data";

export function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <Showroom />

      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="border-t border-border px-5 py-6 hover:bg-ice sm:px-8 lg:border-t-0 lg:border-l lg:first:border-l-0"
            >
              <span className="text-[13px] font-semibold tracking-[0.12em] text-sky uppercase">Danh mục</span>
              <span className="mt-2 block font-heading text-[22px] font-semibold text-navy">{category.name}</span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-muted-foreground">{category.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-20">
          <div>
            <h2 className="font-heading text-[28px] font-semibold text-navy sm:text-[36px]">Câu hỏi trước khi đặt</h2>
            <Link
              href="/lien-he"
              className="btn mt-6 inline-flex min-h-11 items-center bg-sky px-5 py-3 text-[14px] font-medium text-white hover:bg-sky-dark"
            >
              Gửi nhu cầu
            </Link>
          </div>
          <div className="border-t border-border">
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-border py-4">
                <summary className="cursor-pointer list-none text-[16px] font-semibold text-navy">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="text-sky group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export function CtaBanner() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-20">
        <div>
          <h2 className="font-heading text-[28px] font-semibold sm:text-[36px]">Cần bộ cho đơn vị</h2>
          <p className="mt-3 max-w-md text-[15px] leading-[1.6] text-white/70">
            Xem từng máy ở trên, đưa vào phiếu, rồi gọi hoặc viết cho Kim Hưng.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={company.hotlineHref}
            className="btn inline-flex min-h-11 items-center gap-2 bg-sky px-5 py-3 text-[15px] font-medium text-white hover:bg-sky-dark"
          >
            <FigmaIcon name="phone" size={16} className="brightness-0 invert" />
            {company.hotline}
          </a>
          <Link
            href="/lien-he"
            className="btn inline-flex min-h-11 items-center border border-white/30 px-5 py-3 text-[15px] font-medium text-white hover:bg-white/10"
          >
            Viết phiếu
          </Link>
        </div>
      </div>
    </section>
  );
}
