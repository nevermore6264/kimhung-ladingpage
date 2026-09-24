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
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-sky uppercase">
            Kỹ thuật đi cùng máy
          </p>
          <h1 className="mt-3 max-w-[16ch] font-heading text-[32px] leading-[1.05] font-semibold text-navy sm:text-[44px]">
            Hiệu chuẩn, sửa chữa, vật tư
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-muted-foreground">
            Kim Hưng không chỉ giao máy. Đơn vị được hiệu chuẩn định kỳ, thay linh kiện chính hãng và cấp ống thổi, giấy in đúng chủng loại.
          </p>
          <ul className="mt-10 border-t border-border">
            {services.map((service) => (
              <li key={service.title} className="grid gap-4 border-b border-border py-6 sm:grid-cols-[3rem_16rem_1fr] sm:items-start">
                <FigmaIcon
                  name={service.icon as "settings" | "hammer" | "layers"}
                  size={24}
                />
                <h2 className="font-heading text-[20px] font-semibold text-navy">{service.title}</h2>
                <p className="text-[15px] leading-[1.6] text-muted-foreground">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
