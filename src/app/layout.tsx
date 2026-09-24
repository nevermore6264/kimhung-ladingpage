import type { Metadata, Viewport } from "next";
import { Inclusive_Sans, Noto_Sans } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { company } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inclusive = Inclusive_Sans({
  variable: "--font-inclusive",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const noto = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
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
      className={`${inclusive.variable} ${noto.variable} h-full antialiased`}
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
            address: {
              "@type": "PostalAddress",
              streetAddress: "184/1A Lê Văn Sỹ, Phường 10",
              addressLocality: "Quận Phú Nhuận",
              addressRegion: "TP. Hồ Chí Minh",
              addressCountry: "VN",
            },
          }}
        />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
