import Link from "next/link";
import { FigmaIcon } from "@/components/figma-icon";
import { FieldDesk } from "@/components/field-desk";
import { JsonLd } from "@/components/json-ld";
import { cases, company, faqs, partners, testimonials } from "@/lib/data";

export function HomePage() {
  const partnerLoop = [...partners, ...partners];
  const [featuredQuote, ...otherQuotes] = testimonials;

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
      <FieldDesk />

      <section className="overflow-hidden border-b border-border bg-[#fffdf8] py-5">
        <p className="sr-only">Đơn vị đã dùng</p>
        <div className="marquee-track flex gap-12 px-8">
          {partnerLoop.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="shrink-0 text-[13px] font-medium tracking-[0.08em] whitespace-nowrap text-navy/50 uppercase"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f1e8] py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <h2 className="font-heading text-[28px] font-semibold text-navy md:text-[36px]">
            Đã chạy ở đơn vị
          </h2>
          <div className="mt-8 grid gap-px bg-border md:grid-cols-3">
            {cases.map((item) => (
              <article key={item.title} className="bg-[#fffdf8] p-6">
                <p className="font-heading text-[28px] font-semibold text-sky">{item.metric}</p>
                <h3 className="mt-3 font-heading text-[18px] font-semibold text-navy">{item.title}</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">{item.org}</p>
                <p className="mt-3 text-[15px] leading-[1.6] text-navy">{item.result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf8] py-14 lg:py-20">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <blockquote>
            <p className="font-heading text-[24px] leading-[1.4] font-semibold text-navy md:text-[32px]">
              “{featuredQuote.quote}”
            </p>
            <footer className="mt-5 text-[14px] text-muted-foreground">
              {featuredQuote.name} — {featuredQuote.org}
            </footer>
          </blockquote>
          <div className="mt-10 grid gap-6 border-t border-border pt-8">
            {otherQuotes.map((item) => (
              <blockquote key={item.name} className="border-l-2 border-sky pl-4">
                <p className="text-[15px] leading-[1.65] text-navy">“{item.quote}”</p>
                <footer className="mt-2 text-[13px] text-muted-foreground">
                  {item.name} — {item.org}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[#f6f1e8] py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-20">
          <div>
            <h2 className="font-heading text-[28px] font-semibold text-navy md:text-[36px]">
              Trước khi lập phiếu
            </h2>
            <Link
              href="/lien-he"
              className="btn mt-6 inline-flex min-h-11 items-center bg-sky px-5 py-3 text-[14px] font-medium text-white hover:bg-sky-dark"
            >
              Gửi nhu cầu đơn vị
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
          <h2 className="font-heading text-[28px] font-semibold text-navy sm:text-[32px] md:text-[44px]">
            Lập phiếu trang bị cho đơn vị
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-[1.6] text-white/70">
            Nói tình huống và số lượng. Kim Hưng trả bộ hồ sơ và giá sỉ.
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
