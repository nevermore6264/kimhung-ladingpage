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
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-20">
          <div>
            <p className="text-[13px] font-bold uppercase text-sky">Về chúng tôi</p>
            <h1 className="mt-3 font-heading text-[28px] font-extrabold tracking-tight text-navy sm:text-[36px] md:text-[42px]">
              Công ty TNHH Đầu tư & Phát triển Kim Hưng
            </h1>
            <p className="mt-5 text-[16px] leading-[1.6] text-[#64748b]">
              {company.description} Với hơn 10 năm kinh nghiệm, chúng tôi đồng hành
              cùng cơ sở y tế, lực lượng chức năng và doanh nghiệp trên toàn quốc.
            </p>
            <p className="mt-4 text-[15px] text-[#64748b]">MST: {company.taxId}</p>
            <p className="mt-2 text-[15px] text-[#64748b]">{company.address}</p>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-2xl shadow-[0_24px_50px_-28px_rgba(16,42,67,0.4)]">
            <MediaImage
              src="/images/why-us.png"
              alt="Đội ngũ và kho hàng Kim Hưng"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      <section className="bg-ice py-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 px-5 sm:px-8 lg:grid-cols-4 lg:px-20">
          {stats.map((item) => (
            <div key={item.label}>
              <p className="font-heading text-[28px] font-extrabold text-navy">
                <CountUp value={item.value} suffix={item.suffix} />
                {item.unit ? ` ${item.unit}` : ""}
              </p>
              <p className="mt-1 text-[13px] text-[#64748b]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <h2 className="text-[28px] font-extrabold text-navy">
            Tại Sao Nên Chọn Kim Hưng?
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {reasons.map((reason) => (
              <li key={reason.title} className="flex gap-4 rounded-lg border border-[#e2e8f0] p-6">
                <FigmaIcon name="check-circle" size={20} />
                <div>
                  <p className="font-bold text-navy">{reason.title}</p>
                  <p className="mt-1 text-sm text-[#64748b]">{reason.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
