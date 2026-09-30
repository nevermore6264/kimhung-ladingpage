import Link from "next/link";
import { cn } from "@/lib/utils";

export function HdButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group relative inline-flex font-semibold", className)}>
      <span className="absolute inset-0 translate-y-1 rounded-lg bg-black/20 transition group-hover:translate-y-1.5" />
      <span className="relative inline-flex -translate-y-1 items-center gap-2 rounded-lg bg-[#003ab9] px-4 py-2.5 text-[15px] text-white transition group-hover:-translate-y-1.5">
        {children}
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
