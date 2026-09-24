"use client";

import Marquee from "react-fast-marquee";
import { partners } from "@/lib/data";

export function PartnerMarquee() {
  return (
    <section className="border-b border-border bg-ice py-4" aria-label="Đơn vị đã làm việc">
      <Marquee pauseOnHover gradient={false} speed={36}>
        {partners.map((name) => (
          <span key={name} className="mx-8 text-[14px] font-medium tracking-wide text-navy">
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
