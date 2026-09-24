"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { FigmaIcon } from "@/components/figma-icon";
import { Logo } from "@/components/logo";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories, company, navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const productsActive = pathname.startsWith("/san-pham");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white text-navy">
      <div>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-20">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger
                    className={cn(
                      "inline-flex items-center gap-1 text-[15px] outline-none",
                      productsActive
                        ? "font-semibold text-sky"
                        : "font-medium text-navy hover:text-sky",
                    )}
                  >
                    {item.label}
                    <FigmaIcon name="chevron-down" size={12} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-56">
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat.id}
                        render={<Link href={cat.href} />}
                      >
                        {cat.shortName}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem render={<Link href="/san-pham" />}>
                      Tất cả sản phẩm
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[15px] transition-colors",
                    isActive(pathname, item.href)
                      ? "font-semibold text-sky"
                      : "font-medium text-navy hover:text-sky",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={company.hotlineHref}
              className="hidden text-[14px] font-semibold text-navy hover:text-sky md:inline"
            >
              {company.hotline}
            </a>
            <QuoteBadge />
            <Button
              nativeButton={false}
              render={<Link href="/lien-he" />}
              className="btn hidden h-11 rounded-md bg-sky px-5 text-[14px] font-medium text-white hover:bg-sky-dark sm:inline-flex"
            >
              Liên hệ tư vấn
            </Button>

            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Mở menu"
                  />
                }
              >
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(20rem,100vw)]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-md px-2 py-2 text-[15px]",
                        isActive(pathname, item.href)
                          ? "font-bold text-sky-dark"
                          : "font-medium text-navy",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={cat.href}
                        className="px-2 py-1.5 text-sm text-muted-foreground"
                      >
                        {cat.shortName}
                      </Link>
                    ))}
                  </div>
                  <Button
                    nativeButton={false}
                    render={<Link href="/lien-he" />}
                    className="mt-4 h-11 rounded-md bg-sky font-medium text-white hover:bg-sky-dark"
                  >
                    Liên hệ tư vấn
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function QuoteBadge() {
  const { count } = useQuote();

  return (
    <Link
      href="/lien-he"
      aria-label={`Yêu cầu báo giá${count ? `, ${count} sản phẩm` : ""}`}
      className="relative flex size-11 items-center justify-center rounded-md text-navy transition-colors duration-200 hover:bg-ice"
    >
      <FigmaIcon name="shopping-cart" size={18} />
      {count > 0 ? (
        <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy px-1 text-[10px] font-medium text-white">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}
