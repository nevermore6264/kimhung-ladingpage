import { cn } from "@/lib/utils";

type IconName =
  | "phone"
  | "mail"
  | "facebook"
  | "youtube"
  | "chevron-down"
  | "chevron-right"
  | "settings"
  | "hammer"
  | "layers"
  | "check-circle"
  | "star"
  | "map-pin"
  | "map-pin-lg"
  | "shopping-cart";

export function FigmaIcon({
  name,
  size = 16,
  className,
  alt = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-hidden", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={`/icons/${name}.svg`}
        alt={alt}
        width={size}
        height={size}
        className="block size-full max-w-none brightness-0"
      />
    </span>
  );
}
