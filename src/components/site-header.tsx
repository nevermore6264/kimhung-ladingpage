"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { HdButton } from "@/components/hd-button";
import { Logo } from "@/components/logo";
import { useQuote } from "@/components/quote-provider";
import { categories, navItems } from "@/lib/data";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { count } = useQuote();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-16">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] ${
                  isActive(pathname, item.href)
                    ? "text-sky"
                    : "text-muted-foreground hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-5">
          <HdButton href="/lien-he" className="hidden md:inline-flex">Phiếu{count > 0 ? ` (${count})` : ""}</HdButton>
          <Button
            className="lg:hidden"
            aria-label="Mở menu"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      <Drawer title="Kim Hưng" placement="right" open={open} onClose={() => setOpen(false)} size={320}>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              className="py-2 text-left font-heading text-[22px] text-navy"
              onClick={() => {
                setOpen(false);
                router.push(item.href);
              }}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="py-1 text-left text-[14px] text-muted-foreground"
                onClick={() => {
                  setOpen(false);
                  router.push(cat.href);
                }}
              >
                {cat.shortName}
              </button>
            ))}
          </div>
        </div>
      </Drawer>
    </header>
  );
}
