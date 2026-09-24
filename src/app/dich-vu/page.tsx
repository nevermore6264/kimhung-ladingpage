import { Breadcrumbs } from "@/components/breadcrumbs";
import { FigmaIcon } from "@/components/figma-icon";
import { CtaBanner } from "@/components/home-page";
import { services } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Dịch vụ",
  description:
    "Kiểm định, hiệu chuẩn máy đo nồng độ cồn, sửa chữa cảm biến và cung cấp ống thổi, giấy in nhiệt chính hãng.",
  path: "/dich-vu",
});

export default function DichVuPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Dịch vụ" },
        ]}
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <p className="text-[13px] font-bold uppercase text-sky">
            Dịch vụ kỹ thuật chuyên nghiệp
          </p>
          <h1 className="mt-3 font-heading text-[36px] font-extrabold tracking-tight text-navy md:text-[42px]">
            Dịch vụ đo lường & hiệu chuẩn
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.6] text-[#64748b]">
            Kim Hưng không chỉ phân phối thiết bị mà còn đồng hành kỹ thuật dài hạn:
            hiệu chuẩn định kỳ, sửa chữa linh kiện chính hãng và cung ứng vật tư tiêu hao.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex h-full flex-col gap-5 rounded-lg border border-border bg-white p-8"
              >
                <span className="flex size-12 items-center justify-center rounded-md bg-ice">
                  <FigmaIcon
                    name={service.icon as "settings" | "hammer" | "layers"}
                    size={24}
                  />
                </span>
                <h2 className="text-[20px] font-bold text-navy">{service.title}</h2>
                <p className="text-[14px] leading-[1.5] text-[#64748b]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
