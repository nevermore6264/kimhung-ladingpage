import Link from "next/link";
import { Logo } from "@/components/logo";
import { categories, company, navItems } from "@/lib/data";

export function SiteFooter() {
  const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.mapsQuery)}&z=16&output=embed`;

  return (
    <footer className="border-t border-border bg-background text-navy">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-[14px] leading-[1.7] text-muted-foreground">
              {company.legalName}. MST {company.taxId}.
            </p>
            <p className="mt-3 max-w-sm text-[14px] leading-[1.7] text-muted-foreground">{company.address}</p>
            <p className="mt-4 text-[14px]">
              <a href={company.hotlineHref} className="border-b border-navy pb-0.5">
                {company.hotline}
              </a>
              <span className="mx-3 text-border">/</span>
              <a href={company.emailHref} className="border-b border-navy pb-0.5">
                {company.email}
              </a>
            </p>
          </div>

          <div>
            <p className="text-[12px] tracking-[0.16em] text-muted-foreground uppercase">Mục</p>
            <ul className="mt-4 flex flex-col gap-2 text-[15px]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] tracking-[0.16em] text-muted-foreground uppercase">Danh mục</p>
            <ul className="mt-4 flex flex-col gap-2 text-[15px]">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={cat.href} className="hover:underline">
                    {cat.shortName}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="relative mt-6 h-[140px] overflow-hidden bg-ice">
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

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-5 text-[13px] text-muted-foreground sm:flex-row sm:justify-between">
          <p>© 2026 Kim Hưng</p>
          <p className="flex gap-4">
            <a href={company.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={company.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
            <Link href="/dang-ky">Đăng ký tư vấn</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
