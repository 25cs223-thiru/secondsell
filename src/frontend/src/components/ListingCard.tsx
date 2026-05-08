import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { ConditionBadge } from "./ConditionBadge";
import { PriceDisplay } from "./PriceDisplay";

interface ListingCardProps {
  listing: Listing;
  index?: number;
  onView?: (listing: Listing) => void;
}

// ── Condition left-border color map ──────────────────────────────────────────
const conditionBorderClass: Record<string, string> = {
  new: "border-l-emerald-500",
  likeNew: "border-l-teal-500",
  good: "border-l-cyan-500",
  fair: "border-l-amber-500",
  poor: "border-l-red-500",
};

// ── Seller avatar with initials fallback ──────────────────────────────────────
function SellerAvatar({ name, size = 20 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-accent/20 text-accent font-bold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-label={`Seller: ${name}`}
    >
      {initials || "?"}
    </span>
  );
}

// ── Lazy image with skeleton ──────────────────────────────────────────────────
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const fallback = "/assets/images/placeholder.svg";

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <Skeleton
          className="absolute inset-0 rounded-none"
          aria-hidden="true"
        />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={cn(
          "w-full h-full object-cover group-hover:scale-105 transition-smooth",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

export function ListingCard({ listing, index = 1, onView }: ListingCardProps) {
  const imageUrl =
    listing.images?.[0]?.getDirectURL?.() ?? "/assets/images/placeholder.svg";
  const borderClass =
    conditionBorderClass[listing.condition] ?? "border-l-border";

  return (
    <Link
      to="/listings/$id"
      params={{ id: listing.id }}
      data-ocid={`listing.item.${index}`}
      onClick={() => onView?.(listing)}
      className={cn(
        "group block rounded-xl overflow-hidden bg-card border border-border border-l-4 shadow-subtle hover:shadow-elevated transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[44px]",
        borderClass,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <LazyImage src={imageUrl} alt={listing.title} />
        {listing.status === "sold" && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="bg-card text-foreground text-sm font-semibold px-3 py-1 rounded-full">
              Sold
            </span>
          </div>
        )}
        {/* Wishlist */}
        <button
          type="button"
          className="absolute top-2 right-2 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-smooth hover:bg-card touch-target"
          aria-label="Save to wishlist"
          onClick={(e) => e.preventDefault()}
          data-ocid={`listing.wishlist_button.${index}`}
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <Heart className="w-4 h-4 text-muted-foreground" />
        </button>
        {/* Condition badge */}
        <div className="absolute bottom-2 left-2">
          <ConditionBadge condition={listing.condition} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <p className="font-medium text-sm text-foreground line-clamp-2 min-w-0 leading-snug">
          {listing.title}
        </p>
        <div className="flex items-center justify-between gap-1">
          <PriceDisplay
            priceCents={listing.priceInCents}
            className="font-semibold text-foreground"
          />
          {listing.category && (
            <Badge variant="secondary" className="text-xs shrink-0">
              {listing.category}
            </Badge>
          )}
        </div>
        {/* Seller row */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <SellerAvatar name={listing.sellerName} size={18} />
          <p className="text-xs text-muted-foreground truncate min-w-0">
            {listing.sellerName}
          </p>
        </div>
      </div>
    </Link>
  );
}
