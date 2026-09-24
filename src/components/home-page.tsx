import Link from "next/link";
import { FigmaIcon } from "@/components/figma-icon";
import { DispatchDesk } from "@/components/dispatch-desk";
import { JsonLd } from "@/components/json-ld";
import { company, faqs } from "@/lib/data";

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
      <DispatchDesk />

      <section className="border-t border-border bg-[#f6f1e8] py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-20">
          <div>
            <h2 className="font-heading text-[28px] font-semibold text-navy sm:text-[36px]">
              Trước khi chốt bộ
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">
              Phiếu vừa lắp ở trên đi theo bạn sang trang liên hệ. Kim Hưng trả hồ sơ và giá sỉ.
            </p>
            <Link
              href="/lien-he"
              className="btn mt-6 inline-flex min-h-11 items-center bg-sky px-5 py-3 text-[14px] font-medium text-white hover:bg-sky-dark"
            >
              Gửi phiếu cho đơn vị
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
          <h2 className="font-heading text-[28px] font-semibold sm:text-[32px] md:text-[44px]">
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
