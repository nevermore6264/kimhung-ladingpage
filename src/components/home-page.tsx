import Link from "next/link";
import { CountUp } from "@/components/count-up";
import { JsonLd } from "@/components/json-ld";
import { FigmaIcon } from "@/components/figma-icon";
import { MediaImage } from "@/components/media-image";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionEyebrow, SectionTitle } from "@/components/section-heading";
import {
  cases,
  categories,
  certifications,
  company,
  faqs,
  partners,
  posts,
  processSteps,
  products,
  reasons,
  services,
  stats,
  testimonials,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export function HomePage() {
  const featured = products.filter((p) => p.featured);
  const [lead, ...restFeatured] = featured;
  const [featuredPost, ...otherPosts] = posts;
  const [featuredQuote, ...otherQuotes] = testimonials;
  const partnerLoop = [...partners, ...partners];

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
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-20 lg:py-24">
              <p className="text-[13px] font-semibold tracking-[0.16em] text-white/60 uppercase">
                Kim Hưng · Technology & Diagnostics
              </p>
              <h1 className="font-heading mt-6 max-w-[12ch] text-[42px] leading-[1.02] font-semibold tracking-tight md:text-[68px]">
                Thiết bị xét nghiệm và an ninh chính ngạch
              </h1>
              <p className="mt-6 max-w-[460px] text-[17px] leading-[1.7] text-white/75">
                Que thử ma túy, máy đo nồng độ cồn và cổng dò kim loại nhập khẩu
                trực tiếp — hồ sơ Bộ Y Tế, CO/CQ và bảo hành tại Việt Nam.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/san-pham"
                  className="btn inline-flex min-h-11 items-center bg-white px-6 py-3 text-[15px] font-medium text-navy hover:bg-ice"
                >
                  Xem danh mục
                </Link>
                <Link
                  href="/lien-he"
                  className="btn inline-flex min-h-11 items-center border border-white/40 px-6 py-3 text-[15px] font-medium text-white hover:bg-white/10"
                >
                  Nhận báo giá sỉ
                </Link>
              </div>
              <p className="mt-10 text-[13px] tracking-[0.08em] text-white/55 uppercase">
                {certifications.join("  ·  ")}
              </p>
            </div>
          </Reveal>
          <div className="relative min-h-[340px] sm:min-h-[460px] lg:min-h-[640px]">
            <MediaImage
              src="/images/hero.png"
              alt="Kho thiết bị và giải pháp chẩn đoán Kim Hưng"
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "px-5 py-7 sm:px-8 lg:px-10",
                  index > 0 && "lg:border-l lg:border-white/15",
                )}
              >
                <p className="font-heading text-[32px] font-semibold tracking-tight md:text-[40px]">
                  <CountUp value={item.value} suffix={item.suffix} />
                  {item.unit ? (
                    <span className="ml-2 text-[16px] font-medium text-white/70">
                      {item.unit}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-[13px] text-white/65">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-border bg-white py-6">
        <p className="sr-only">Đơn vị đã hợp tác</p>
        <div className="marquee-track flex gap-14 px-8">
          {partnerLoop.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="shrink-0 text-[13px] font-medium tracking-[0.12em] whitespace-nowrap text-navy/45 uppercase"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="px-5 py-16 sm:px-8 lg:px-20 lg:py-24">
            <SectionEyebrow>Danh mục</SectionEyebrow>
            <SectionTitle className="mt-3">Bốn nhóm thiết bị</SectionTitle>
            <ol className="mt-10 border-t border-border">
              {categories.map((cat, index) => (
                <li key={cat.id} className="border-b border-border">
                  <Link
                    href={cat.href}
                    className="group flex items-baseline gap-5 py-5"
                  >
                    <span className="w-8 shrink-0 font-heading text-[13px] text-sky">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-[22px] font-semibold text-navy group-hover:text-sky">
                        {cat.name}
                      </span>
                      <span className="mt-1 block text-[14px] text-muted-foreground">
                        {cat.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <Link
            href={categories[0].href}
            className="group relative min-h-[420px] lg:min-h-full"
          >
            <MediaImage
              src={categories[0].image}
              alt={categories[0].name}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-8 text-white">
              <span className="text-[13px] text-white/75">Danh mục nổi bật</span>
              <span className="mt-1 block font-heading text-[28px] font-semibold">
                {categories[0].name}
              </span>
            </span>
          </Link>
        </div>
      </section>

      <section className="bg-ice py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <SectionEyebrow>Sản phẩm</SectionEyebrow>
              <SectionTitle className="mt-3">Đang được đặt nhiều</SectionTitle>
            </div>
            <Link href="/san-pham" className="text-[14px] font-semibold text-sky hover:underline">
              Toàn bộ danh mục
            </Link>
          </div>
          {lead ? (
            <Link
              href={`/san-pham/${lead.slug}`}
              className="group mb-6 grid overflow-hidden bg-white lg:grid-cols-[1.1fr_0.9fr]"
            >
              <span className="studio-surface relative min-h-[280px]">
                <MediaImage
                  src={lead.image}
                  alt={lead.name}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-12 transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-col justify-center p-8 lg:p-12">
                <span className="text-[13px] font-semibold text-sky">Bán chạy</span>
                <h3 className="font-heading mt-3 text-[28px] font-semibold text-navy md:text-[36px]">
                  {lead.name}
                </h3>
                <p className="mt-4 max-w-md text-[16px] leading-[1.7] text-muted-foreground">
                  {lead.excerpt}
                </p>
                <span className="mt-8 text-[14px] font-semibold text-navy">
                  Xem thông số →
                </span>
              </span>
            </Link>
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {restFeatured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <SectionEyebrow>Hợp tác</SectionEyebrow>
          <SectionTitle className="mt-3 max-w-xl">Từ khảo sát đến hiệu chuẩn</SectionTitle>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="border-t border-navy pt-5">
                <p className="font-heading text-[13px] font-semibold text-sky">{step.step}</p>
                <h3 className="font-heading mt-3 text-[20px] font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="dich-vu" className="border-y border-border bg-ice py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-20">
          <div>
            <SectionEyebrow>Kỹ thuật</SectionEyebrow>
            <SectionTitle className="mt-3">Sau khi bàn giao</SectionTitle>
            <p className="mt-4 max-w-sm text-[15px] leading-[1.7] text-muted-foreground">
              Hiệu chuẩn, sửa chữa và vật tư tiêu hao đi cùng thiết bị, không chỉ giao hàng một lần.
            </p>
            <Link
              href="/dich-vu"
              className="btn mt-8 inline-flex min-h-11 items-center bg-navy px-5 py-3 text-[14px] font-medium text-white hover:bg-navy-mid"
            >
              Xem dịch vụ
            </Link>
          </div>
          <div className="grid gap-8">
            {services.map((service, index) => (
              <article key={service.title} className="grid gap-3 border-t border-border pt-6 sm:grid-cols-[4rem_1fr]">
                <p className="font-heading text-[13px] font-semibold text-sky">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-heading text-[20px] font-semibold text-navy">{service.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative min-h-[360px]">
            <MediaImage
              src="/images/why-us.png"
              alt="Cam kết chất lượng Kim Hưng"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
            <SectionEyebrow>Cam kết</SectionEyebrow>
            <SectionTitle className="mt-3">Vì sao đơn vị chọn Kim Hưng</SectionTitle>
            <ol className="mt-10">
              {reasons.map((reason, index) => (
                <li key={reason.title} className="border-t border-border py-5">
                  <p className="text-[13px] font-semibold text-sky">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-heading text-[18px] font-semibold text-navy">
                    {reason.title}
                  </p>
                  <p className="mt-1 text-[14px] leading-[1.6] text-muted-foreground">
                    {reason.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 text-white lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-white/55 uppercase">
            Hiện trường
          </p>
          <h2 className="font-heading mt-3 max-w-lg text-[32px] font-semibold tracking-tight md:text-[44px]">
            Đã triển khai, không chỉ giới thiệu
          </h2>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-3">
            {cases.map((item) => (
              <article key={item.title} className="bg-navy p-6 lg:p-8">
                <p className="font-heading text-[36px] font-semibold">{item.metric}</p>
                <h3 className="mt-4 font-heading text-[18px] font-semibold">{item.title}</h3>
                <p className="mt-1 text-[13px] text-white/60">{item.org}</p>
                <p className="mt-3 text-[15px] leading-[1.65] text-white/80">{item.result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <SectionEyebrow>Đối tác</SectionEyebrow>
          <blockquote className="mt-8 max-w-[920px]">
            <p className="font-heading text-[26px] leading-[1.35] font-semibold text-navy md:text-[36px]">
              “{featuredQuote.quote}”
            </p>
            <footer className="mt-6 text-[15px]">
              <span className="font-semibold text-navy">{featuredQuote.name}</span>
              <span className="text-muted-foreground"> — {featuredQuote.org}</span>
            </footer>
          </blockquote>
          <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
            {otherQuotes.map((item) => (
              <blockquote key={item.name} className="border-l-2 border-sky pl-5">
                <p className="text-[16px] leading-[1.7] text-navy">“{item.quote}”</p>
                <footer className="mt-3 text-[13px] text-muted-foreground">
                  {item.name} — {item.org}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-ice py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <SectionEyebrow>Tin tức</SectionEyebrow>
              <SectionTitle className="mt-3">Ghi chép kỹ thuật</SectionTitle>
            </div>
            <Link href="/tin-tuc" className="text-[14px] font-semibold text-sky hover:underline">
              Tất cả bài
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[featuredPost, ...otherPosts].map((post) => (
              <article key={post.slug}>
                <Link href={`/tin-tuc/${post.slug}`} className="relative block h-52 overflow-hidden">
                  <MediaImage src={post.image} alt={post.title} sizes="(max-width: 1024px) 100vw, 30vw" />
                </Link>
                <p className="mt-4 text-[13px] text-muted-foreground">{post.date}</p>
                <h3 className="font-heading mt-1 text-[18px] font-semibold text-navy">
                  <Link href={`/tin-tuc/${post.slug}`} className="hover:text-sky">
                    {post.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-20">
          <div>
            <SectionEyebrow>Hỏi đáp</SectionEyebrow>
            <SectionTitle className="mt-3">Trước khi chốt hồ sơ</SectionTitle>
            <Link
              href="/lien-he"
              className="btn mt-8 inline-flex min-h-11 items-center bg-sky px-5 py-3 text-[14px] font-medium text-white hover:bg-sky-dark"
            >
              Hỏi chuyên viên
            </Link>
          </div>
          <div className="border-t border-border">
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-border py-4">
                <summary className="cursor-pointer list-none font-heading text-[17px] font-semibold text-navy">
                  <span className="flex items-start justify-between gap-6">
                    {item.q}
                    <span className="text-sky group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-muted-foreground">{item.a}</p>
              </details>
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
    <section className="bg-navy text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-20 lg:py-20">
        <div className="max-w-[640px]">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-white/55 uppercase">
            Liên hệ
          </p>
          <h2 className="font-heading mt-3 text-[32px] font-semibold tracking-tight md:text-[44px]">
            Gửi danh mục, nhận báo giá sỉ
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={company.hotlineHref}
            className="btn inline-flex min-h-11 items-center gap-2 bg-white px-5 py-3 text-[15px] font-medium text-navy hover:bg-ice"
          >
            <FigmaIcon name="phone" size={16} />
            {company.hotline}
          </a>
          <a
            href={company.emailHref}
            className="btn inline-flex min-h-11 items-center gap-2 border border-white/40 px-5 py-3 text-[15px] font-medium text-white hover:bg-white/10"
          >
            <FigmaIcon name="mail" size={16} className="brightness-0 invert" />
            {company.email}
          </a>
        </div>
      </div>
    </section>
  );
}
