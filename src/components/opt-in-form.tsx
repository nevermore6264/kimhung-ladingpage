"use client";

import { Alert, Button, Form, Input } from "antd";
import { useState } from "react";
import { company } from "@/lib/data";

export function OptInForm() {
  const [form] = Form.useForm();
  const [sent, setSent] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={async (values) => {
        setError("");
        setPending(true);
        try {
          const res = await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Không gửi được");
          setSent(json.code);
          form.resetFields();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Không gửi được");
        } finally {
          setPending(false);
        }
      }}
    >
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
      <Form.Item name="email" label="Email" rules={[{ type: "email", message: "Email chưa đúng" }]}>
        <Input size="large" placeholder="email@congty.vn" />
      </Form.Item>
      <Form.Item name="company" label="Đơn vị">
        <Input size="large" placeholder="Bệnh viện / doanh nghiệp / cơ quan" />
      </Form.Item>
      <Form.Item name="need" label="Nhu cầu">
        <Input.TextArea rows={4} placeholder="Que thử, máy đo cồn, thiết bị an ninh, số lượng…" />
      </Form.Item>
      <Button type="primary" htmlType="submit" size="large" loading={pending} block>
        Đăng ký nhận tư vấn
      </Button>
      {sent ? (
        <Alert
          className="mt-4"
          type="success"
          showIcon
          message={`Đã nhận đăng ký ${sent}. Kim Hưng sẽ liên hệ qua ${company.hotline}.`}
        />
      ) : null}
      {error ? <Alert className="mt-4" type="error" showIcon message={error} /> : null}
    </Form>
  );
}
