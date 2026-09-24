"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuote } from "@/components/quote-provider";
import { MediaImage } from "@/components/media-image";
import { company } from "@/lib/data";

export function ContactForm() {
  const { items, count, remove, clear } = useQuote();
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
        const payload = {
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          items: items.map((item) => ({
            slug: item.slug,
            name: item.name,
            sku: item.sku,
            qty: item.qty,
          })),
        };
        try {
          const res = await fetch("/api/bao-gia", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const json = (await res.json()) as { ok?: boolean; code?: string };
          if (!res.ok || !json.code) throw new Error("fail");
          setSent(json.code);
          clear();
          form.reset();
        } catch {
          setError("Không ghi được yêu cầu. Thử lại hoặc gọi hotline.");
        } finally {
          setPending(false);
        }
      }}
    >
      {items.length > 0 ? (
        <div className="rounded-xl border border-[#dbeafe] bg-white p-4">
          <p className="text-[13px] font-bold text-navy">
            Sản phẩm trong yêu cầu báo giá ({count})
          </p>
          <ul className="mt-3 flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-[#f8fafc]">
                  <MediaImage src={item.image} alt={item.name} sizes="48px" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-navy">
                    {item.name}
                  </span>
                  <span className="text-[12px] text-[#64748b]">
                    {item.sku} · SL {item.qty}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => remove(item.slug)}
                  className="text-[12px] font-semibold text-[#64748b] hover:text-navy"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

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
        <Input required type="email" name="email" placeholder="email@congty.vn" className="h-11" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-navy">
        Nội dung
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Nhu cầu sản phẩm, số lượng, thời gian..."
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
        {pending ? "Đang gửi" : "Gửi yêu cầu tư vấn"}
      </Button>
      {sent ? (
        <p className="text-sm text-sky-dark">
          Đã nhận yêu cầu <b>{sent}</b>. Kim Hưng sẽ liên hệ qua {company.hotline}.
        </p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
