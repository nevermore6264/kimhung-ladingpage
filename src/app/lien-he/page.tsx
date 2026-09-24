import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { FigmaIcon } from "@/components/figma-icon";
import { company } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

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
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ" },
        ]}
      />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-20">
          <div>
            <p className="text-[13px] font-bold uppercase text-sky">Liên hệ tư vấn</p>
            <h1 className="mt-3 font-heading text-[36px] font-extrabold tracking-tight text-navy md:text-[42px]">
              Liên hệ ngay để được tư vấn miễn phí
            </h1>
            <p className="mt-4 text-[16px] leading-[1.6] text-[#64748b]">
              Đội ngũ chuyên gia của Kim Hưng sẵn sàng hỗ trợ giải đáp mọi thắc mắc
              về danh mục sản phẩm, chính sách giá sỉ và thủ tục đấu thầu.{" "}
              <a href="/dang-ky" className="font-semibold text-sky-dark underline">
                Đăng ký form tư vấn nhanh
              </a>
              .
            </p>
            <ul className="mt-8 flex flex-col gap-4 text-[15px] text-navy">
              <li className="flex items-start gap-3">
                <FigmaIcon name="phone" size={16} className="mt-1" />
                <a href={company.hotlineHref}>Hotline: {company.hotline}</a>
              </li>
              <li className="flex items-start gap-3">
                <FigmaIcon name="mail" size={16} className="mt-1" />
                <a href={company.emailHref}>Email: {company.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <FigmaIcon name="map-pin" size={16} className="mt-1" />
                <span>{company.address}</span>
              </li>
            </ul>
            <div className="mt-8 h-[240px] overflow-hidden rounded-lg border border-[#e2e8f0]">
              <iframe
                title="Bản đồ Kim Hưng"
                src={mapsSrc}
                className="size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-6 sm:p-8">
            <h2 className="mb-6 text-[20px] font-bold text-navy">Gửi yêu cầu</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
