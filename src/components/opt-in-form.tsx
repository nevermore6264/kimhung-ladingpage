"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { company } from "@/lib/data";

export function OptInForm() {
  const [sent, setSent] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setPending(true);
        const form = event.currentTarget;
        const data = new FormData(form);
        try {
          const res = await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: String(data.get("name") ?? ""),
              phone: String(data.get("phone") ?? ""),
              email: String(data.get("email") ?? ""),
              company: String(data.get("company") ?? ""),
              need: String(data.get("need") ?? ""),
            }),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Không gửi được");
          setSent(json.code);
          form.reset();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Không gửi được");
        } finally {
          setPending(false);
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-navy">
          Họ và tên
          <Input required name="name" placeholder="Nguyễn Văn A" className="h-11" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-navy">
          Số điện thoại
          <Input required name="phone" placeholder="0909 115 115" className="h-11" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-navy">
        Email
        <Input type="email" name="email" placeholder="email@congty.vn" className="h-11" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-navy">
        Đơn vị
        <Input name="company" placeholder="Bệnh viện / doanh nghiệp / cơ quan" className="h-11" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-navy">
        Nhu cầu
        <textarea
          name="need"
          rows={4}
          placeholder="Que thử, máy đo cồn, thiết bị an ninh, số lượng…"
          className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </label>
      <Button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="h-11 rounded-md bg-sky font-medium text-white hover:bg-sky-dark"
      >
        {pending ? <span className="spinner" /> : null}
        {pending ? "Đang gửi" : "Đăng ký nhận tư vấn"}
      </Button>
      {sent ? (
        <p className="text-sm text-sky-dark">
          Đã nhận đăng ký <b>{sent}</b>. Kim Hưng sẽ liên hệ qua {company.hotline}.
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
