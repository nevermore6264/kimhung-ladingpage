"use client";

import { useState } from "react";
import Link from "next/link";
import { AddToQuoteButton } from "@/components/add-to-quote-button";
import { MediaImage } from "@/components/media-image";
import { getProduct, type Product } from "@/lib/data";

const missions = [
  {
    id: "con",
    index: "01",
    label: "Đo nồng độ cồn",
    place: "Đường, chốt, đơn vị vận tải",
    note: "Cần in biên bản tại chỗ và ống thổi dùng một lần.",
    slugs: [
      "may-do-nong-do-con-alcolife-f5",
      "may-do-nong-do-con-prodigy-2",
      "ong-thoi-con-chinh-hang",
      "giay-in-nhiet-may-do-con",
    ],
  },
  {
    id: "matuy",
    index: "02",
    label: "Test ma túy",
    place: "Hiện trường, cơ sở, đơn vị",
    note: "Nước tiểu hoặc nước bọt. Đọc kết quả trong 5 phút.",
    slugs: [
      "que-thu-nhanh-5-chat-doa",
      "que-thu-ma-tuy-nuoc-bot-6-chat",
      "coc-test-12-chat",
    ],
  },
  {
    id: "anninh",
    index: "03",
    label: "Kiểm soát cổng",
    place: "Nhà máy, sự kiện, trụ sở",
    note: "Cổng cố định cho luồng người. Máy cầm tay cho điểm kiểm tra phụ.",
    slugs: ["cong-do-kim-loai-security-gate", "thiet-bi-ra-bom-min-cam-tay"],
  },
] as const;

export function FieldDesk() {
  const [active, setActive] = useState<(typeof missions)[number]["id"]>("con");
  const missionIndex = Math.max(
    0,
    missions.findIndex((item) => item.id === active),
  );
  const mission = missions[missionIndex];
  const kit = mission.slugs
    .map((slug) => getProduct(slug))
    .filter((item): item is Product => Boolean(item));
  const lead = kit[0];

  return (
    <section className="border-b border-border bg-[#f6f1e8]">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-20 lg:py-14">
        <div className="max-w-[22ch] sm:max-w-none">
          <h1 className="font-heading text-navy">
            <span className="block text-[13px] font-semibold tracking-[0.12em] text-sky uppercase sm:tracking-[0.16em]">
              Que thử ma túy · máy đo cồn · an ninh
            </span>
            <span className="mt-3 block text-[32px] leading-[1.05] font-semibold sm:text-[40px] md:text-[64px]">
              Chọn việc đang làm
            </span>
          </h1>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[320px_1fr]">
          <div className="relative grid border-l border-border lg:grid-rows-3" role="tablist" aria-label="Tình huống công tác">
            <span
              aria-hidden
              className="desk-mark absolute top-0 left-0 hidden h-1/3 w-[3px] bg-sky lg:block"
              style={{ transform: `translateY(${missionIndex * 100}%)` }}
            />
            {missions.map((item) => {
              const selected = item.id === mission.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(item.id)}
                  className={`btn flex w-full flex-col items-start px-5 py-5 text-left ${
                    selected ? "bg-[#fffdf8]" : "hover:bg-[#fffdf8]/70"
                  }`}
                >
                  <span className={`font-heading text-[13px] font-semibold ${selected ? "text-sky" : "text-navy/40"}`}>
                    {item.index}
                  </span>
                  <span className="mt-1 text-[20px] font-semibold text-navy">{item.label}</span>
                  <span className="mt-1 text-[13px] leading-[1.45] text-muted-foreground">{item.place}</span>
                </button>
              );
            })}
          </div>

          {lead ? (
            <div key={mission.id} className="desk-swap bg-[#fffdf8]">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="studio-surface relative min-h-[220px] overflow-hidden sm:min-h-[300px] lg:min-h-[440px]">
                  <MediaImage
                    src={lead.image}
                    alt={lead.name}
                    sizes="(max-width: 1024px) 100vw, 36vw"
                    className="object-contain p-10"
                    priority
                  />
                  <p className="absolute top-4 left-4 border border-sky px-2 py-1 text-[12px] font-semibold tracking-[0.12em] text-sky uppercase">
                    {mission.index} · đang chọn
                  </p>
                </div>
                <div className="flex min-w-0 flex-col p-4 sm:p-8">
                  <p className="text-[13px] font-semibold text-sky">{mission.note}</p>
                  <h2 className="font-heading mt-3 text-[22px] leading-[1.15] font-semibold text-navy sm:text-[28px] md:text-[34px]">
                    {lead.name}
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{lead.excerpt}</p>
                  <dl className="mt-6 divide-y divide-border border-y border-border">
                    {lead.specs.slice(0, 4).map((spec) => (
                      <div key={spec.label} className="grid gap-1 py-3 text-[14px] sm:grid-cols-[8.5rem_1fr] sm:gap-3">
                        <dt className="text-muted-foreground">{spec.label}</dt>
                        <dd className="font-medium text-navy">{spec.value}</dd>
                      </div>
                    ))}
                    <div className="grid gap-1 py-3 text-[14px] sm:grid-cols-[8.5rem_1fr] sm:gap-3">
                      <dt className="text-muted-foreground">Giấy tờ</dt>
                      <dd className="font-medium text-navy">{lead.certifications}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <AddToQuoteButton product={lead} />
                    <Link href={`/san-pham/${lead.slug}`} className="text-[14px] font-semibold text-sky hover:underline">
                      Hồ sơ sản phẩm
                    </Link>
                  </div>
                </div>
              </div>

              <div className="border-t border-border">
                <p className="px-5 py-3 text-[12px] font-semibold tracking-[0.12em] text-navy uppercase">
                  Bộ đi cùng
                </p>
                <ul>
                  {kit.map((product) => (
                    <li
                      key={product.slug}
                      className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3 border-t border-border px-4 py-3 sm:px-5"
                    >
                      <span className="relative block h-14 w-16 overflow-hidden bg-ice">
                        <MediaImage src={product.image} alt="" sizes="64px" className="object-contain p-1" />
                      </span>
                      <span className="min-w-0">
                        <Link href={`/san-pham/${product.slug}`} className="font-semibold text-navy hover:text-sky">
                          {product.shortName}
                        </Link>
                        <span className="mt-0.5 block text-[13px] leading-[1.4] text-muted-foreground">
                          {product.sku} · {product.listingExcerpt}
                        </span>
                      </span>
                      <AddToQuoteButton product={product} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
