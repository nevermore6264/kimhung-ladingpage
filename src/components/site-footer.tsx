import Link from "next/link";
import { FigmaIcon } from "@/components/figma-icon";
import { Logo } from "@/components/logo";
import { categories, company, navItems } from "@/lib/data";

export function SiteFooter() {
  const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&z=16&output=embed`;

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-6 sm:px-8 lg:px-20">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-6">
            <Logo variant="footer" />
            <div className="flex flex-col gap-3">
              <p className="text-[15px] font-bold">{company.legalName}</p>
              <p className="text-[13px] leading-[1.5] text-white/80">
                {company.description}
              </p>
              <p className="text-[13px] text-white/80">MST: {company.taxId}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[16px] font-bold">Danh mục</h3>
            <ul className="flex flex-col gap-3 text-[14px] text-white/80">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[16px] font-bold">Sản phẩm chính</h3>
            <ul className="flex flex-col gap-3 text-[14px] text-white/80">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={cat.href} className="hover:text-white">
                    {cat.id === "que-thu-ma-tuy"
                      ? "Que thử nhanh ma túy"
                      : cat.id === "may-do-nong-do-con"
                        ? "Máy đo nồng độ cồn"
                        : cat.id === "thiet-bi-an-ninh"
                          ? "Thiết bị an ninh cổng từ"
                          : "Vật tư y tế & tiêu hao"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[16px] font-bold">Văn phòng giao dịch</h3>
            <div className="flex gap-2 text-[13px] leading-[1.4] text-white/80">
              <FigmaIcon name="map-pin" size={16} className="mt-0.5 shrink-0 brightness-0 invert" />
              <p>{company.address}</p>
            </div>
            <div className="relative mt-4 h-[140px] overflow-hidden bg-navy-mid ring-1 ring-white/10">
              <iframe
                title="Bản đồ văn phòng Kim Hưng"
                src={mapsSrc}
                className="size-full border-0 grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-2 text-[13px] text-white/80 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Công ty TNHH Đầu tư & Phát Triển Kim Hưng. All rights reserved.</p>
            <p className="flex flex-wrap items-center gap-3">
              <a href={company.facebook} aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:text-white">
                <FigmaIcon name="facebook" size={16} className="brightness-0 invert" />
              </a>
              <a href={company.youtube} aria-label="YouTube" target="_blank" rel="noreferrer" className="hover:text-white">
                <FigmaIcon name="youtube" size={16} className="brightness-0 invert" />
              </a>
              <Link href="/dang-ky" className="hover:text-white">
                Đăng ký tư vấn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
