export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mx-auto max-w-[1120px] px-5 pt-12 sm:px-8">
      <p className="text-[13px] font-semibold text-[#003ab9]">{eyebrow}</p>
      <h1 className="mt-2 max-w-3xl text-[32px] leading-[1.1] font-bold tracking-tight text-navy sm:text-5xl">
        {title}
      </h1>
      {lede ? <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{lede}</p> : null}
    </header>
  );
}
