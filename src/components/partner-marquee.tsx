import { partners } from "@/lib/data";

const loop = [...partners, ...partners];

export function PartnerMarquee() {
  return (
    <section className="border-y border-slate-200 bg-white" aria-label="Đơn vị đã làm việc">
      <div className="mx-auto flex max-w-[1120px] items-center gap-5 px-5 py-5 sm:px-8">
        <p className="w-24 shrink-0 text-[13px] font-semibold leading-snug text-slate-500 sm:w-28">
          Đã giao cho
        </p>
        <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex hover:[animation-play-state:paused]">
            {loop.map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="mx-1.5 inline-flex shrink-0 whitespace-nowrap rounded-full border border-slate-200 bg-[#f8fafc] px-3.5 py-1.5 text-[13px] font-medium text-navy"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
