import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "default",
  className,
}: {
  variant?: "default" | "footer" | "light";
  className?: string;
}) {
  const isFooter = variant === "footer";
  const isLight = variant === "light";

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg font-black text-[20px] leading-none",
          isFooter && "bg-white text-navy",
          isLight && "bg-white text-navy",
          !isFooter && !isLight && "bg-navy text-white",
        )}
      >
        KH
      </span>
      {isFooter ? (
        <span className="font-heading text-[22px] font-extrabold leading-none text-white">
          KIM HƯNG
        </span>
      ) : (
        <span className="flex flex-col gap-0.5 leading-none">
          <span
            className={cn(
              "font-heading text-[22px] font-extrabold",
              isLight ? "text-white" : "text-navy",
            )}
          >
            KIM HƯNG
          </span>
          <span
            className={cn(
              "hidden text-[9px] font-semibold tracking-[0.08em] sm:block",
              isLight ? "text-white/75" : "text-sky",
            )}
          >
            TECHNOLOGY & DIAGNOSTICS
          </span>
        </span>
      )}
    </Link>
  );
}
