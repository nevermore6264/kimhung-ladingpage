import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/page-intro";
import { company } from "@/lib/data";
import { absoluteUrl, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Liên hệ",
  description:
    "Gọi 0909 115 115 hoặc gửi phiếu nhu cầu. Kim Hưng tư vấn giá sỉ que thử, máy đo cồn và thiết bị an ninh.",
  path: "/lien-he",
});

export default function LienHePage() {
  const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&z=16&output=embed`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: company.legalName,
          url: absoluteUrl("/lien-he"),
          telephone: "+84909115115",
          email: company.email,
          image: absoluteUrl("/images/hero.png"),
          address: {
            "@type": "PostalAddress",
            streetAddress: "184/1A Lê Văn Sỹ, Phường 10",
            addressLocality: "Quận Phú Nhuận",
            addressRegion: "TP. Hồ Chí Minh",
            addressCountry: "VN",
          },
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" },
        ]}
      />
      <PageIntro
        eyebrow="Liên hệ"
        title="Gửi phiếu cho Kim Hưng"
        lede="Đội ngũ Kim Hưng trả lời về danh mục, giá sỉ và hồ sơ thầu."
      />
      <section className="mx-auto grid max-w-[1120px] gap-6 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[13px] font-semibold text-slate-500">Hotline</p>
            <a href={company.hotlineHref} className="mt-1 block text-[22px] font-bold text-[#003ab9]">
              {company.hotline}
            </a>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[13px] font-semibold text-slate-500">Email</p>
            <a href={company.emailHref} className="mt-1 block text-[18px] font-bold text-navy">
              {company.email}
            </a>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[13px] font-semibold text-slate-500">Văn phòng</p>
            <p className="mt-1 text-[15px] leading-relaxed text-navy">{company.address}</p>
            <p className="mt-2 text-[14px] text-muted-foreground">MST {company.taxId}</p>
            <Link href="/dang-ky" className="mt-3 inline-block text-[14px] font-semibold text-[#003ab9]">
              Đăng ký form tư vấn nhanh →
            </Link>
          </article>
          <div className="h-[220px] overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Bản đồ Kim Hưng"
              src={mapsSrc}
              className="size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-[20px] font-bold text-navy">Gửi yêu cầu</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
