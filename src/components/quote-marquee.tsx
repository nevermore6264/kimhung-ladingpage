export function QuoteMarquee({
  items,
}: {
  items: { quote: string; name: string; org: string }[];
}) {
  return (
    <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
      {items.map((item) => (
        <blockquote
          key={item.name}
          className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.45)]"
        >
          <p className="text-[28px] leading-none font-bold text-[#003ab9]">“</p>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-navy">{item.quote}</p>
          <footer className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-[14px] font-semibold text-navy">{item.name}</p>
            <p className="mt-1 text-[13px] leading-snug text-slate-500">{item.org}</p>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
