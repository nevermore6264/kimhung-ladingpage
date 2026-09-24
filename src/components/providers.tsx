"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { QuoteProvider } from "@/components/quote-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={viVN}
        theme={{
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 6,
            fontFamily:
              "var(--font-noto), -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          },
        }}
      >
        <QuoteProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </QuoteProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
}
