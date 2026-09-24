"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

export function AntdLinkButton({
  href,
  children,
  type = "primary",
  size = "large",
  block,
  ghost,
}: {
  href: string;
  children: React.ReactNode;
  type?: "primary" | "default" | "link";
  size?: "large" | "middle" | "small";
  block?: boolean;
  ghost?: boolean;
}) {
  const router = useRouter();
  return (
    <Button type={type} size={size} block={block} ghost={ghost} onClick={() => router.push(href)}>
      {children}
    </Button>
  );
}
