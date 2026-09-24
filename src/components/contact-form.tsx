"use client";

import { Alert, Button, Form, Input } from "antd";
import { useState } from "react";
import { MediaImage } from "@/components/media-image";
import { useQuote } from "@/components/quote-provider";
import { company } from "@/lib/data";

export function ContactForm() {
  const { items, count, remove, clear } = useQuote();
  const [form] = Form.useForm();
  const [sent, setSent] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark
      onFinish={async (values) => {
        setError("");
        setPending(true);
        try {
          const res = await fetch("/api/bao-gia", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...values,
              items: items.map((item) => ({
                slug: item.slug,
                name: item.name,
                sku: item.sku,
                qty: item.qty,
              })),
            }),
          });
          const json = (await res.json()) as { ok?: boolean; code?: string };
          if (!res.ok || !json.code) throw new Error("fail");
          setSent(json.code);
          clear();
          form.resetFields();
        } catch {
          setError("Không ghi được yêu cầu. Thử lại hoặc gọi hotline.");
        } finally {
          setPending(false);
        }
      }}
    >
      {items.length > 0 ? (
        <div className="mb-4 border border-[#f0f0f0] bg-white p-4">
          <p className="text-sm font-semibold">Sản phẩm trong yêu cầu báo giá ({count})</p>
          <ul className="mt-3 flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-3">
                <span className="relative size-12 shrink-0 overflow-hidden bg-[#f5f5f5]">
                  <MediaImage src={item.image} alt={item.name} sizes="48px" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-[#8c8c8c]">
                    {item.sku} · SL {item.qty}
                  </span>
                </span>
                <Button type="link" size="small" onClick={() => remove(item.slug)}>
                  Xóa
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: "Nhập họ tên" }]}>
          <Input size="large" placeholder="Nguyễn Văn A" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Nhập số điện thoại" }]}
        >
          <Input size="large" placeholder="0909 115 115" />
        </Form.Item>
      </div>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email", message: "Email chưa đúng" }]}
      >
        <Input size="large" placeholder="email@congty.vn" />
      </Form.Item>
      <Form.Item name="message" label="Nội dung" rules={[{ required: true, message: "Nhập nội dung" }]}>
        <Input.TextArea rows={5} placeholder="Nhu cầu sản phẩm, số lượng, thời gian..." />
      </Form.Item>
      <Button type="primary" htmlType="submit" size="large" loading={pending} block>
        Gửi yêu cầu tư vấn
      </Button>
      {sent ? (
        <Alert
          className="mt-4"
          type="success"
          showIcon
          message={`Đã nhận yêu cầu ${sent}. Kim Hưng sẽ liên hệ qua ${company.hotline}.`}
        />
      ) : null}
      {error ? <Alert className="mt-4" type="error" showIcon message={error} /> : null}
    </Form>
  );
}
