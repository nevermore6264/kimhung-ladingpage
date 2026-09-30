import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "default",
  className,
}: {
  variant?: "default" | "footer" | "light";
  className?: string;
}) {
  const light = variant === "light";

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <span className="live-dot" aria-hidden />
      <span className={cn("text-[18px] font-semibold tracking-[-0.04em]", light ? "text-white" : "text-navy")}>
        Kim Hưng
      </span>
    </Link>
  );
}
