"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { AddToQuoteButton } from "@/components/add-to-quote-button";
import { MediaImage } from "@/components/media-image";
import { useQuote } from "@/components/quote-provider";
import { getProduct, type Product } from "@/lib/data";

type MissionId = "con" | "matuy" | "anninh";

const missions: {
  id: MissionId;
  label: string;
  hint: string;
  slugs: string[];
}[] = [
  {
    id: "con",
    label: "Đo nồng độ cồn",
    hint: "Chốt, đường, đơn vị vận tải",
    slugs: [
      "may-do-nong-do-con-alcolife-f5",
      "may-do-nong-do-con-prodigy-2",
      "ong-thoi-con-chinh-hang",
      "giay-in-nhiet-may-do-con",
    ],
  },
  {
    id: "matuy",
    label: "Test ma túy",
    hint: "Nước tiểu hoặc nước bọt",
    slugs: [
      "que-thu-nhanh-5-chat-doa",
      "que-thu-ma-tuy-nuoc-bot-6-chat",
      "coc-test-12-chat",
    ],
  },
  {
    id: "anninh",
    label: "Kiểm soát cổng",
    hint: "Nhà máy, sự kiện, trụ sở",
    slugs: ["cong-do-kim-loai-security-gate", "thiet-bi-ra-bom-min-cam-tay"],
  },
];

const prompts: { text: string; mission: MissionId; slug: string }[] = [
  { text: "Đo cồn tại chốt", mission: "con", slug: "may-do-nong-do-con-alcolife-f5" },
  { text: "So sánh Alcolife và Prodigy", mission: "con", slug: "may-do-nong-do-con-prodigy-2" },
  { text: "Test ma túy nước bọt", mission: "matuy", slug: "que-thu-ma-tuy-nuoc-bot-6-chat" },
  { text: "Test ma túy nước tiểu", mission: "matuy", slug: "que-thu-nhanh-5-chat-doa" },
  { text: "Cổng dò kim loại", mission: "anninh", slug: "cong-do-kim-loai-security-gate" },
  { text: "Máy rà cầm tay", mission: "anninh", slug: "thiet-bi-ra-bom-min-cam-tay" },
];

function fold(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function loadKit(slugs: string[]) {
  return slugs
    .map((slug) => getProduct(slug))
    .filter((item): item is Product => Boolean(item));
}

export function DispatchDesk() {
  const { add } = useQuote();
  const [query, setQuery] = useState("");
  const [missionId, setMissionId] = useState<MissionId>("con");
  const [focusSlug, setFocusSlug] = useState(missions[0].slugs[0]);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);

  const folded = fold(query.trim());
  const suggestions = useMemo(() => {
    if (!folded) return prompts.slice(0, 4);
    return prompts.filter((item) => fold(item.text).includes(folded));
  }, [folded]);

  const mission = missions.find((item) => item.id === missionId) ?? missions[0];
  const kit = loadKit(mission.slugs);
  const focus = kit.find((item) => item.slug === focusSlug) ?? kit[0];
  const peer = kit.find((item) => item.slug !== focus?.slug);

  function openPrompt(prompt: (typeof prompts)[number]) {
    setMissionId(prompt.mission);
    setFocusSlug(prompt.slug);
    setQuery(prompt.text);
    setSaved(false);
    setOpen(false);
  }

  function openMission(id: MissionId) {
    const next = missions.find((item) => item.id === id) ?? missions[0];
    setMissionId(next.id);
    setFocusSlug(next.slugs[0]);
    setQuery("");
    setSaved(false);
  }

  function saveKit() {
    for (const product of kit) {
      add({
        slug: product.slug,
        name: product.name,
        sku: product.sku,
        image: product.image,
        qty: 1,
      });
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <section className="border-b border-[#2c353d] bg-[#101418] text-[#f4f0e8]">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-16 lg:py-10">
        <h1 className="max-w-[18ch] font-heading text-[32px] leading-[1.05] font-semibold sm:text-[44px] lg:text-[56px]">
          <span className="mb-3 block text-[13px] font-semibold tracking-[0.14em] text-[#e6b325] uppercase">
            Que thử ma túy · máy đo cồn · an ninh
          </span>
          Nói việc. Bộ máy hiện ra.
        </h1>

        <form
          className="relative mt-6"
          onSubmit={(event) => {
            event.preventDefault();
            const first = suggestions[0];
            if (first) openPrompt(first);
          }}
        >
          <label htmlFor="dispatch-query" className="sr-only">
            Tình huống hoặc tên thiết bị
          </label>
          <input
            id="dispatch-query"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            placeholder="Ví dụ: do con tai chot, nuoc bot, cong do"
            autoComplete="off"
            className="h-14 w-full border border-[#2c353d] bg-[#181e24] px-4 text-base text-[#f4f0e8] outline-none placeholder:text-[#8d877c] focus-visible:border-[#e6b325]"
          />
          {open && folded && suggestions.length > 0 ? (
            <ul className="absolute z-20 mt-1 w-full border border-[#2c353d] bg-[#181e24]">
              {suggestions.map((item) => (
                <li key={item.text}>
                  <button
                    type="button"
                    onClick={() => openPrompt(item)}
                    className="btn flex min-h-11 w-full items-center px-4 text-left text-[15px] hover:bg-[#101418]"
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </form>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Tình huống">
          {missions.map((item) => {
            const selected = item.id === mission.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => openMission(item.id)}
                className={`btn shrink-0 px-4 py-2 text-left ${
                  selected
                    ? "bg-[#e6b325] text-[#1c1917]"
                    : "border border-[#2c353d] text-[#f4f0e8] hover:border-[#e6b325]"
                }`}
              >
                <span className="block text-[14px] font-semibold">{item.label}</span>
                <span className={`block text-[12px] ${selected ? "text-[#1c1917]/70" : "text-[#8d877c]"}`}>
                  {item.hint}
                </span>
              </button>
            );
          })}
        </div>

        {focus ? (
          <div key={`${mission.id}-${focus.slug}`} className="desk-swap mt-6 grid gap-px bg-[#2c353d] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-[#181e24]">
              <div className="flex flex-col gap-3 border-b border-[#2c353d] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] font-semibold tracking-[0.12em] text-[#e6b325] uppercase">
                  Bộ đang lắp · {kit.length} món
                </p>
                <button
                  type="button"
                  onClick={saveKit}
                  className="btn inline-flex min-h-11 items-center gap-2 bg-[#e6b325] px-4 text-[14px] font-semibold text-[#1c1917] hover:bg-[#f0c24d]"
                >
                  {saved ? <CheckIcon className="size-4" /> : null}
                  {saved ? "Đã vào phiếu" : "Đưa cả bộ vào phiếu"}
                </button>
              </div>
              <ul>
                {kit.map((product, index) => {
                  const active = product.slug === focus.slug;
                  const hit = folded.length > 1 && fold(`${product.name} ${product.sku}`).includes(folded);
                  return (
                    <li key={product.slug} className="kit-line" style={{ animationDelay: `${index * 50}ms` }}>
                      <button
                        type="button"
                        onClick={() => setFocusSlug(product.slug)}
                        className={`grid w-full grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-3 px-4 py-3 text-left ${
                          active ? "bg-[#101418]" : "hover:bg-[#101418]/70"
                        }`}
                      >
                        <span className="relative block h-14 overflow-hidden bg-[#101418]">
                          <MediaImage src={product.image} alt="" sizes="56px" className="object-contain p-1" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[15px] font-semibold">
                            {product.shortName}
                            {hit ? <span className="ml-2 text-[12px] text-[#e6b325]">khớp</span> : null}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-[12px] text-[#8d877c]">
                            {product.sku} · {product.listingExcerpt}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col bg-[#101418] p-4 sm:p-6">
              <div className="relative mb-4 h-40 overflow-hidden bg-[#181e24] sm:h-48">
                <MediaImage
                  src={focus.image}
                  alt={focus.name}
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-contain p-6"
                  priority
                />
              </div>
              <p className="font-mono text-[12px] text-[#e6b325]">{focus.sku}</p>
              <h2 className="mt-1 font-heading text-[24px] leading-[1.15] font-semibold sm:text-[28px]">
                {focus.name}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#c9c3b8]">{focus.excerpt}</p>
              <dl className="mt-4 divide-y divide-[#2c353d] border-y border-[#2c353d]">
                {focus.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="grid gap-1 py-2.5 text-[14px] sm:grid-cols-[7.5rem_1fr]">
                    <dt className="text-[#8d877c]">{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
                <div className="grid gap-1 py-2.5 text-[14px] sm:grid-cols-[7.5rem_1fr]">
                  <dt className="text-[#8d877c]">Giấy tờ</dt>
                  <dd>{focus.certifications}</dd>
                </div>
              </dl>
              {peer ? (
                <p className="mt-4 text-[13px] leading-[1.5] text-[#c9c3b8]">
                  Cùng bộ có {peer.shortName}
                  {peer.specs[0] ? ` — ${peer.specs[0].label}: ${peer.specs[0].value}` : ""}. Bấm dòng bên trái để đổi máy đang xem.
                </p>
              ) : null}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <AddToQuoteButton product={focus} />
                <Link href={`/san-pham/${focus.slug}`} className="text-[14px] font-semibold text-[#e6b325] hover:underline">
                  Hồ sơ sản phẩm
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
