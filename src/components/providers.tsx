"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { ParallaxProvider } from "react-scroll-parallax";
import { QuoteProvider } from "@/components/quote-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={viVN}
        theme={{
          token: {
            colorPrimary: "#003ab9",
            borderRadius: 8,
            fontFamily: "var(--font-be-vietnam), ui-sans-serif, system-ui, sans-serif",
          },
        }}
      >
        <QuoteProvider>
          <ParallaxProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </ParallaxProvider>
        </QuoteProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
}
