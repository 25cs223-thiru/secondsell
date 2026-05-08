import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceCents: bigint;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({
  priceCents,
  className,
  size = "md",
}: PriceDisplayProps) {
  const dollars = Number(priceCents) / 100;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: dollars % 1 === 0 ? 0 : 2,
  }).format(dollars);

  return (
    <span
      className={cn(
        "font-display tabular-nums",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-2xl font-bold",
        className,
      )}
    >
      {formatted}
    </span>
  );
}
