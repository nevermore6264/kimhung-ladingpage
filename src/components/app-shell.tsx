import { BootScreen } from "@/components/boot-screen";
import { PageMotion } from "@/components/page-motion";
import { RouteProgress } from "@/components/route-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BootScreen />
      <RouteProgress />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-sky focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Bỏ qua đến nội dung chính
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <PageMotion>{children}</PageMotion>
      </main>
      <SiteFooter />
    </>
  );
}
