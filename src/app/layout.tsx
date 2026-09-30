import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { company } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kim Hưng | Que thử ma túy, máy đo nồng độ cồn, thiết bị an ninh",
    template: "%s | Kim Hưng",
  },
  description:
    "Kim Hưng phân phối que thử ma túy, máy đo nồng độ cồn và thiết bị an ninh chính hãng cho lực lượng, bệnh viện và đơn vị thầu.",
  applicationName: "Kim Hưng",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "Kim Hưng",
    locale: "vi_VN",
    type: "website",
    images: [{ url: "/images/hero.png", alt: "Kim Hưng — thiết bị xét nghiệm và an ninh" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${beVietnam.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-background font-sans text-foreground">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.legalName,
            alternateName: "Kim Hưng",
            url: siteUrl,
            email: company.email,
            telephone: "+84909115115",
            taxID: company.taxId,
            description: company.description,
            logo: `${siteUrl}/icon`,
            areaServed: "VN",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+84909115115",
              email: company.email,
              contactType: "sales",
              areaServed: "VN",
              availableLanguage: ["Vietnamese"],
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "184/1A Lê Văn Sỹ, Phường 10",
              addressLocality: "Quận Phú Nhuận",
              addressRegion: "TP. Hồ Chí Minh",
              addressCountry: "VN",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Kim Hưng",
            url: siteUrl,
            inLanguage: "vi",
            description:
              "Phân phối que thử ma túy, máy đo nồng độ cồn và thiết bị an ninh chính hãng.",
            publisher: { "@type": "Organization", name: company.legalName, url: siteUrl },
          }}
        />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
