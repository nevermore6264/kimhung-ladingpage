import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CountUp } from "@/components/count-up";
import { FigmaIcon } from "@/components/figma-icon";
import { CtaBanner } from "@/components/home-page";
import { MediaImage } from "@/components/media-image";
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
      <section className="grid bg-white lg:grid-cols-2">
        <div className="relative min-h-[260px] bg-ice sm:min-h-[420px]">
          <MediaImage
            src="/images/why-us.png"
            alt="Đội ngũ và kho hàng Kim Hưng"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-10 sm:px-8 lg:px-14">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-sky uppercase">Về chúng tôi</p>
          <h1 className="mt-3 font-heading text-[32px] leading-[1.05] font-semibold text-navy sm:text-[44px]">
            Công ty TNHH Đầu tư & Phát triển Kim Hưng
          </h1>
          <p className="mt-5 max-w-lg text-[16px] leading-[1.6] text-muted-foreground">
            {company.description} Với hơn 10 năm kinh nghiệm, chúng tôi đồng hành
            cùng cơ sở y tế, lực lượng chức năng và doanh nghiệp trên toàn quốc.
          </p>
          <p className="mt-4 text-[15px] text-navy">MST: {company.taxId}</p>
          <p className="mt-2 text-[15px] text-muted-foreground">{company.address}</p>
        </div>
      </section>
      <section className="grid grid-cols-2 border-y border-border lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="border-t border-border px-5 py-6 sm:px-8 lg:border-t-0 lg:border-l lg:first:border-l-0">
            <p className="font-heading text-[28px] font-semibold text-navy">
              <CountUp value={item.value} suffix={item.suffix} />
              {item.unit ? ` ${item.unit}` : ""}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </section>
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <h2 className="font-heading text-[28px] font-semibold text-navy sm:text-[36px]">
            Vì sao đơn vị chọn Kim Hưng
          </h2>
          <ul className="mt-8 border-t border-border">
            {reasons.map((reason) => (
              <li key={reason.title} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[16rem_1fr] sm:gap-8">
                <p className="flex items-start gap-3 font-semibold text-navy">
                  <FigmaIcon name="check-circle" size={18} />
                  {reason.title}
                </p>
                <p className="text-[15px] leading-[1.6] text-muted-foreground">{reason.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
