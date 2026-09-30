import Link from "next/link";
import { AnimatedStat } from "@/components/animated-stat";
import { DepthCard } from "@/components/depth-card";
import { Drift } from "@/components/drift";
import { HdButton } from "@/components/hd-button";
import { InkMark } from "@/components/ink-mark";
import { ScrambleText } from "@/components/scramble-text";
import { SpringLift } from "@/components/spring-lift";
import { HeroMotion, ScrollStagger } from "@/components/gsap-blocks";
import { HeroOrbit, StepCluster, BandOrb, CategoryShelf } from "@/components/field-models";
import { JsonLd } from "@/components/json-ld";
import { MediaImage } from "@/components/media-image";
import { PartnerMarquee } from "@/components/partner-marquee";
import { QuoteMarquee } from "@/components/quote-marquee";
import { RotateWords } from "@/components/rotate-words";
import { TiltCard } from "@/components/tilt-card";
import {
  categories,
  company,
  faqs,
  posts,
  processSteps,
  products,
  reasons,
  services,
  stats,
  testimonials,
} from "@/lib/data";

const pains = [
  {
    title: "Giấy tờ không đủ để đưa vào hồ sơ thầu",
    text: "Thiếu CO, CQ hoặc số lưu hành thì đơn vị không chốt được hợp đồng.",
  },
  {
    title: "Máy đo cồn trễ hạn hiệu chuẩn",
    text: "Kết quả ngoài hiện trường mất giá trị khi cảm biến không được kiểm định đúng kỳ.",
  },
  {
    title: "Một báo giá cho quá nhiều chủng loại",
    text: "Que thử, máy đo và cổng dò cần người nắm đúng mã, không phải catalog chung.",
  },
  {
    title: "Vật tư không khớp máy đang dùng",
    text: "Ống thổi và giấy in sai quy cách làm hỏng cả ca làm việc.",
  },
];

export function HomePage() {
  const lead = products.find((product) => product.featured) ?? products[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-10 -left-10 size-80 bg-[radial-gradient(rgba(0,58,185,0.28)_1px,transparent_1.6px)] bg-[length:14px_14px] [mask-image:radial-gradient(ellipse_at_top_left,black_28%,transparent_72%)]" />
        <div className="pointer-events-none absolute -top-8 -right-8 size-96 bg-[radial-gradient(rgba(0,58,185,0.22)_1px,transparent_1.6px)] bg-[length:14px_14px] [mask-image:radial-gradient(ellipse_at_top_right,black_28%,transparent_72%)]" />
        <HeroOrbit />
        <HeroMotion>
        <div className="relative mx-auto grid max-w-[1120px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div data-hero>
            <h1 className="text-[34px] leading-none font-bold tracking-tight text-navy sm:text-5xl">
              Kho thiết bị <InkMark>hiện trường</InkMark>
            </h1>
            <p className="mt-4 text-[14px] font-semibold text-slate-500">
              Dòng đang phục vụ: <RotateWords />
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {company.description} Hồ sơ Bộ Y tế, CO/CQ và giao từ kho TP. Hồ Chí Minh.
            </p>
            <div className="mt-6">
              <HdButton href="/san-pham">Xem danh mục</HdButton>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {stats.slice(0, 3).map((item) => (
                <div key={item.label} className="px-2 py-3 text-center sm:px-4">
                  <p className="text-sm font-bold text-[#003ab9]">
                    <AnimatedStat value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-hero>
          <DepthCard>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.45)] sm:p-6">
            <div className="relative h-52 overflow-hidden rounded-xl bg-slate-50">
              <div data-atropos-offset="8" className="float-y absolute inset-6">
                <MediaImage src={lead.image} alt={lead.name} priority sizes="480px" className="object-contain" />
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <ScrambleText text="Sẵn kho" className="text-[12px] font-semibold text-[#003ab9]" />
                <h2 className="mt-1 text-[18px] font-bold text-navy">{lead.shortName}</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
                Chính hãng
              </span>
            </div>
            <ul className="mt-4 divide-y divide-slate-100 text-[13px]">
              {lead.specs.slice(0, 3).map((spec) => (
                <li key={spec.label} className="flex justify-between gap-4 py-2.5">
                  <span className="text-slate-500">{spec.label}</span>
                  <span className="text-right font-medium text-navy">{spec.value}</span>
                </li>
              ))}
            </ul>
            <Link href={`/san-pham/${lead.slug}`} className="mt-4 inline-flex text-[14px] font-semibold text-[#003ab9]">
              Mở hồ sơ kỹ thuật →
            </Link>
          </div>
          </DepthCard>
          </div>
        </div>
        </HeroMotion>
      </section>

      <PartnerMarquee />

      <section className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8">
        <h2 className="max-w-xl text-[32px] leading-[1.15] font-bold tracking-tight text-navy sm:text-4xl">
          Việc khó là chọn <InkMark>đúng mã</InkMark>, không phải xem thêm catalog.
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground">
          Kim Hưng gom que thử, máy đo nồng độ cồn và thiết bị an ninh vào một đầu mối có giấy tờ.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <SpringLift className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-[13px] font-semibold text-slate-500">Trước khi có một đầu mối</p>
            <h3 className="mt-2 text-[22px] font-bold text-navy">Chậm vì thiếu đúng giấy và đúng máy</h3>
            <ul className="mt-5 space-y-4">
              {pains.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold text-navy">{item.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{item.text}</p>
                </li>
              ))}
            </ul>
          </SpringLift>
          <SpringLift className="rounded-2xl border border-[#003ab9]/20 bg-[#f4f7ff] p-6">
            <p className="text-[13px] font-semibold text-[#003ab9]">Cùng Kim Hưng</p>
            <h3 className="mt-2 text-[22px] font-bold text-navy">Một phiếu, đủ hồ sơ để trình</h3>
            <ul className="mt-5 space-y-4">
              {reasons.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold text-navy">{item.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <HdButton href="/lien-he">Gửi phiếu báo giá</HdButton>
            </div>
          </SpringLift>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
          <h2 className="text-[32px] font-bold tracking-tight text-navy">Làm việc theo ba bước</h2>
          <StepCluster />
          <ScrollStagger className="mt-8 grid gap-6 md:grid-cols-3">
            {processSteps.slice(0, 3).map((step, index) => (
              <article key={step.step} data-stagger className="rounded-2xl border border-slate-200 p-6">
                <p className="text-[13px] font-bold text-[#003ab9]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-[20px] font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </ScrollStagger>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8">
        <h2 className="max-w-lg text-[32px] font-bold tracking-tight text-navy">Sau khi bàn giao vẫn còn việc</h2>
        <ScrollStagger className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} data-stagger className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-[18px] font-bold text-navy">{service.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{service.description}</p>
            </article>
          ))}
        </ScrollStagger>
      </section>

      <section className="bg-[#f8fafc] py-16">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
          <h2 className="text-[32px] font-bold tracking-tight text-navy">Đơn vị đã dùng</h2>
          <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">
            Lời từ bệnh viện, lực lượng và nhà máy.
          </p>
          <QuoteMarquee items={testimonials} />
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[32px] font-bold tracking-tight text-navy">Câu hỏi thường gặp</h2>
          <Link href="/lien-he" className="text-[14px] font-semibold text-[#003ab9]">
            Nhắn với Kim Hưng
          </Link>
        </div>
        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faqs.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-[16px] font-semibold text-navy">{item.q}</summary>
              <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#003ab9] text-white">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-xl text-[30px] leading-tight font-bold tracking-tight sm:text-4xl">
              Gửi danh mục hôm nay, nhận báo giá sỉ.
            </h2>
            <p className="mt-3 text-white/80">Hotline {company.hotline} · {company.email}</p>
          </div>
          <BandOrb />
          <div className="flex flex-wrap gap-3">
            <a href={company.hotlineHref} className="inline-flex rounded-lg bg-white px-4 py-2.5 text-[15px] font-semibold text-[#003ab9]">
              Gọi {company.hotline}
            </a>
            <Link href="/lien-he" className="inline-flex rounded-lg border border-white/40 px-4 py-2.5 text-[15px] font-semibold">
              Viết phiếu
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[32px] font-bold tracking-tight text-navy">Chọn nhóm thiết bị</h2>
          <Link href="/san-pham" className="text-[14px] font-semibold text-[#003ab9]">
            Xem tất cả
          </Link>
        </div>
        <CategoryShelf />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <TiltCard key={category.id}>
            <Link href={category.href} className="block overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <span className="relative block h-36 overflow-hidden bg-slate-50">
                <span className="absolute inset-4">
                  <Drift speed={-10} className="relative h-full w-full">
                    <MediaImage src={category.image} alt={category.name} sizes="280px" className="object-contain" />
                  </Drift>
                </span>
              </span>
              <span className="block p-4">
                <span className="block font-bold text-navy">{category.shortName}</span>
                <span className="mt-1 block text-[13px] text-muted-foreground">{category.description}</span>
              </span>
            </Link>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
          <h2 className="text-[32px] font-bold tracking-tight text-navy">Ghi chép kỹ thuật</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/tin-tuc/${post.slug}`} className="relative block h-44 overflow-hidden rounded-xl bg-slate-100">
                  <MediaImage src={post.image} alt={post.title} sizes="360px" />
                </Link>
                <h3 className="mt-3 text-[18px] font-bold text-navy">
                  <Link href={`/tin-tuc/${post.slug}`} className="hover:text-[#003ab9]">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[14px] text-muted-foreground">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

export function CtaBanner() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-10 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[24px] font-bold text-navy">Cần báo giá cho đơn vị</h2>
          <p className="mt-1 text-[14px] text-muted-foreground">{company.hotline} · {company.email}</p>
        </div>
        <HdButton href="/lien-he">Viết phiếu</HdButton>
      </div>
    </section>
  );
}
