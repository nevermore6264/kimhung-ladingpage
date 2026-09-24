"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DownOutlined, MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Dropdown } from "antd";
import { AntdLinkButton } from "@/components/antd-link-button";
import { Logo } from "@/components/logo";
import { useQuote } from "@/components/quote-provider";
import { categories, company, navItems } from "@/lib/data";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f0f0f0] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.dropdown ? (
              <Dropdown
                key={item.href}
                menu={{
                  items: [
                    ...categories.map((cat) => ({
                      key: cat.id,
                      label: <Link href={cat.href}>{cat.shortName}</Link>,
                    })),
                    { key: "all", label: <Link href="/san-pham">Tất cả sản phẩm</Link> },
                  ],
                }}
              >
                <Button type="text" className={pathname.startsWith("/san-pham") ? "text-[#1677ff]" : undefined}>
                  {item.label} <DownOutlined />
                </Button>
              </Dropdown>
            ) : (
              <Button
                key={item.href}
                type="text"
                className={isActive(pathname, item.href) ? "font-semibold text-[#1677ff]" : undefined}
                onClick={() => router.push(item.href)}
              >
                {item.label}
              </Button>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a href={company.hotlineHref} className="hidden text-sm font-medium md:inline">
            {company.hotline}
          </a>
          <QuoteBadge />
          <AntdLinkButton href="/lien-he" size="middle">
            Liên hệ tư vấn
          </AntdLinkButton>
          <Button
            className="lg:hidden"
            aria-label="Mở menu"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      <Drawer title="Menu" placement="right" open={open} onClose={() => setOpen(false)} size={320}>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              type={isActive(pathname, item.href) ? "primary" : "text"}
              block
              onClick={() => {
                setOpen(false);
                router.push(item.href);
              }}
            >
              {item.label}
            </Button>
          ))}
          <div className="mt-3 flex flex-col gap-1 border-t border-[#f0f0f0] pt-3">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                type="text"
                block
                onClick={() => {
                  setOpen(false);
                  router.push(cat.href);
                }}
              >
                {cat.shortName}
              </Button>
            ))}
          </div>
        </div>
      </Drawer>
    </header>
  );
}

function QuoteBadge() {
  const { count } = useQuote();
  const router = useRouter();

  return (
    <Badge count={count} size="small" color="#1677ff">
      <Button
        aria-label={`Yêu cầu báo giá${count ? `, ${count} sản phẩm` : ""}`}
        icon={<ShoppingCartOutlined />}
        onClick={() => router.push("/lien-he")}
      />
    </Badge>
  );
}
