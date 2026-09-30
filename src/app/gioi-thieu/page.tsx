import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AnimatedStat } from "@/components/animated-stat";
import { CtaBanner } from "@/components/home-page";
import { MediaImage } from "@/components/media-image";
import { PageIntro } from "@/components/page-intro";
import { company, reasons, stats } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Giới thiệu",
  description: company.description,
  path: "/gioi-thieu",
  image: "/images/why-us.png",
});

export default function GioiThieuPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Giới thiệu" },
        ]}
      />
      <PageIntro
        eyebrow="Về chúng tôi"
        title="Công ty TNHH Đầu tư & Phát triển Kim Hưng"
        lede={`${company.description} Với hơn 10 năm kinh nghiệm, chúng tôi đồng hành cùng cơ sở y tế, lực lượng chức năng và doanh nghiệp trên toàn quốc.`}
      />
      <section className="mx-auto grid max-w-[1120px] gap-6 px-5 py-10 sm:px-8 lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-slate-100 sm:min-h-[380px]">
          <MediaImage
            src="/images/why-us.png"
            alt="Đội ngũ và kho hàng Kim Hưng"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 content-start">
          {stats.map((item) => (
            <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-[28px] font-bold text-[#003ab9]">
                <AnimatedStat value={item.value} suffix={item.suffix} />
                {item.unit ? ` ${item.unit}` : ""}
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">{item.label}</p>
            </article>
          ))}
          <article className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 text-[14px] text-muted-foreground">
            <p className="font-semibold text-navy">MST {company.taxId}</p>
            <p className="mt-2">{company.address}</p>
          </article>
        </div>
      </section>
      <section className="mx-auto max-w-[1120px] px-5 pb-16 sm:px-8">
        <h2 className="text-[28px] font-bold tracking-tight text-navy">Vì sao đơn vị chọn Kim Hưng</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {reasons.map((reason) => (
            <article key={reason.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-[18px] font-bold text-navy">{reason.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{reason.description}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
