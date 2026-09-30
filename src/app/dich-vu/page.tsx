import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/home-page";
import { PageIntro } from "@/components/page-intro";
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
      <PageIntro
        eyebrow="Kỹ thuật đi cùng máy"
        title="Hiệu chuẩn, sửa chữa, vật tư"
        lede="Kim Hưng không chỉ giao máy. Đơn vị được hiệu chuẩn định kỳ, thay linh kiện chính hãng và cấp ống thổi, giấy in đúng chủng loại."
      />
      <section className="mx-auto grid max-w-[1120px] gap-4 px-5 py-10 sm:px-8 md:grid-cols-3">
        {services.map((service, index) => (
          <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-[13px] font-bold text-[#003ab9]">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-3 text-[20px] font-bold text-navy">{service.title}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{service.description}</p>
          </article>
        ))}
      </section>
      <CtaBanner />
    </>
  );
}
