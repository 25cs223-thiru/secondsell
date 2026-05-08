import { PriceDisplay } from "@/components/PriceDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useMyOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { useUserProfile } from "@/hooks/useProfile";
import type { Order, OrderStatus } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Box,
  CheckCircle2,
  ChevronDown,
  Clock,
  Hash,
  MapPin,
  Package,
  PackageCheck,
  ShoppingBag,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Status config ──────────────────────────────────────────────────────────────
type StatusConfig = {
  label: string;
  badgeClass: string;
  icon: React.ReactNode;
};

const STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: "Pending",
    badgeClass:
      "bg-warning/15 text-warning-foreground border-warning/40 dark:bg-warning/20",
    icon: <Clock className="w-3 h-3" />,
  },
  paid: {
    label: "Completed",
    badgeClass:
      "bg-success/15 text-success-foreground border-success/40 dark:bg-success/20",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  shipped: {
    label: "Shipped",
    badgeClass: "bg-accent/15 text-accent border-accent/40 dark:bg-accent/20",
    icon: <Truck className="w-3 h-3" />,
  },
  delivered: {
    label: "Delivered",
    badgeClass:
      "bg-secondary/15 text-secondary-foreground border-secondary/40 dark:bg-secondary/20",
    icon: <PackageCheck className="w-3 h-3" />,
  },
  cancelled: {
    label: "Cancelled",
    badgeClass: "bg-muted text-muted-foreground border-border",
    icon: <XCircle className="w-3 h-3" />,
  },
};

// ── Lazy image with skeleton placeholder ──────────────────────────────────────
function LazyThumb({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && !errored && (
        <Skeleton className="absolute inset-0 rounded-none" />
      )}
      <img
        src={errored ? "/assets/images/placeholder.svg" : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setErrored(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

// ── Seller display name helper ────────────────────────────────────────────────
function useSellerName(sellerId: string): string {
  // Call hook unconditionally at top level — useUserProfile guards invalid principals internally
  const { data: profile } = useUserProfile(sellerId || undefined);
  if (profile?.name) return profile.name;
  if (!sellerId) return "Unknown Seller";
  return sellerId.length > 10 ? `${sellerId.slice(0, 10)}…` : sellerId;
}

// ── Order detail panel (expandable) ──────────────────────────────────────────
function OrderDetailPanel({ order }: { order: Order }) {
  const sellerName = useSellerName(order.sellerId);
  const dateStr = new Date(
    Number(order.createdAt) / 1_000_000,
  ).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isDelivered = order.status === "delivered" || order.status === "paid";
  const isShipped =
    order.status === "shipped" ||
    order.status === "delivered" ||
    order.status === "paid";

  const deliveryNote = isDelivered
    ? "Your item has been delivered."
    : isShipped
      ? "Estimated delivery in 3–7 business days."
      : order.status === "cancelled"
        ? "This order was cancelled. No charge was made."
        : "Awaiting seller confirmation. Estimated dispatch within 1–2 business days.";

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="border-t border-border mx-4 pt-4 pb-5 space-y-4">
        {/* Row grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {/* Order ID */}
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
              <Hash className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Order ID</p>
              <p className="font-mono text-xs text-foreground break-all select-all">
                {order.id}
              </p>
            </div>
          </div>

          {/* Seller */}
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Seller</p>
              <p className="font-medium text-sm text-foreground truncate">
                {sellerName}
              </p>
            </div>
          </div>

          {/* Order date */}
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Order Date</p>
              <p className="font-medium text-foreground">{dateStr}</p>
            </div>
          </div>

          {/* Item condition (if known from title context) */}
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
              <Box className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">
                Amount paid
              </p>
              <PriceDisplay
                priceCents={order.priceInCents}
                size="md"
                className="font-bold text-foreground"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Delivery note */}
        <div className="flex items-start gap-2.5 text-sm">
          <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">
              Delivery Status
            </p>
            <p className="text-foreground/80 text-sm">{deliveryNote}</p>
          </div>
        </div>

        {/* Stripe session ID if available */}
        {order.stripeSessionId && (
          <>
            <Separator />
            <div className="flex items-start gap-2.5 text-sm">
              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Payment Reference
                </p>
                <p className="font-mono text-xs text-foreground break-all select-all">
                  {order.stripeSessionId}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Order card ─────────────────────────────────────────────────────────────────
function OrderCard({ order, index }: { order: Order; index: number }) {
  const config = STATUS_CONFIG[order.status];
  const [expanded, setExpanded] = useState(false);
  const sellerName = useSellerName(order.sellerId);

  const dateStr = new Date(
    Number(order.createdAt) / 1_000_000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const imageUrl = order.listingImage
    ? ((
        order.listingImage as {
          getDirectURL?: () => string;
        }
      ).getDirectURL?.() ?? "/assets/images/placeholder.svg")
    : "/assets/images/placeholder.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.06 }}
      data-ocid={`orders.item.${index + 1}`}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle hover:shadow-card-hover transition-smooth"
    >
      {/* Main row */}
      <div className="flex items-start gap-4 p-4">
        {/* Thumbnail */}
        <Link
          to="/listings/$id"
          params={{ id: order.listingId }}
          className="shrink-0"
          data-ocid={`orders.listing_link.${index + 1}`}
        >
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted border border-border">
            <LazyThumb src={imageUrl} alt={order.listingTitle} />
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                to="/listings/$id"
                params={{ id: order.listingId }}
                data-ocid={`orders.title_link.${index + 1}`}
                className="font-display font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 block"
              >
                {order.listingTitle}
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Seller: {sellerName}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{dateStr}</p>
            </div>
            <PriceDisplay
              priceCents={order.priceInCents}
              size="md"
              className="font-bold shrink-0 text-foreground"
            />
          </div>

          <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
            <Badge
              variant="outline"
              data-ocid={`orders.status_badge.${index + 1}`}
              className={`text-xs flex items-center gap-1 ${config.badgeClass}`}
            >
              {config.icon}
              {config.label}
            </Badge>

            <div className="flex items-center gap-3">
              <Link
                to="/listings/$id"
                params={{ id: order.listingId }}
                data-ocid={`orders.view_listing_link.${index + 1}`}
                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-0.5 transition-colors"
              >
                View listing
                <ArrowRight className="w-3 h-3" />
              </Link>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                data-ocid={`orders.toggle_details.${index + 1}`}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors touch-target"
                aria-expanded={expanded}
                aria-label={
                  expanded ? "Hide order details" : "Show order details"
                }
              >
                Details
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable detail panel */}
      <AnimatePresence>
        {expanded && <OrderDetailPanel order={order} />}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function OrderSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3" data-ocid="orders.loading_state">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
        <div key={i} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-start gap-4">
            <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex justify-between items-center pt-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Banner types ──────────────────────────────────────────────────────────────
type BannerKind = "success" | "cancelled";

function Banner({
  kind,
  onDismiss,
}: {
  kind: BannerKind;
  onDismiss: () => void;
}) {
  const isSuccess = kind === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      data-ocid={isSuccess ? "orders.success_state" : "orders.error_state"}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${
        isSuccess
          ? "bg-success/10 border-success/30 text-foreground"
          : "bg-warning/10 border-warning/30 text-foreground"
      }`}
    >
      <span className="mt-0.5 shrink-0">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-success" />
        ) : (
          <AlertCircle className="w-5 h-5 text-warning-foreground" />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold font-display">
          {isSuccess ? "Payment confirmed!" : "Order cancelled"}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {isSuccess
            ? "Your purchase is confirmed. The seller will arrange shipping soon."
            : "Your order was cancelled and no charge was made."}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        data-ocid="orders.dismiss_banner_button"
        className="ml-auto shrink-0 p-1 rounded hover:opacity-70 transition-opacity"
      >
        <XCircle className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="orders.empty_state"
    >
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-5">
        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="font-display text-xl font-bold text-foreground mb-2">
        No orders yet
      </h2>
      <p className="text-muted-foreground max-w-xs mb-6">
        When you buy something, your orders will appear here. Start browsing to
        find something you love.
      </p>
      <Link to="/" data-ocid="orders.browse_cta_link">
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="orders.browse_cta_button"
        >
          Browse listings
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </Link>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const navigate = useNavigate();

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const sessionId = searchParams.get("session_id");
  const cancelled = searchParams.get("cancelled");

  const { data: orders, isLoading } = useMyOrders();
  const updateOrderStatus = useUpdateOrderStatus();

  const [banner, setBanner] = useState<BannerKind | null>(null);
  const confirmedRef = useRef(false);

  // Auth guard
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  // Handle Stripe payment confirmation redirect
  const mutate = updateOrderStatus.mutate;
  useEffect(() => {
    if (sessionId && !confirmedRef.current) {
      confirmedRef.current = true;
      mutate(sessionId, {
        onSettled: () => {
          setBanner("success");
          const url = new URL(window.location.href);
          url.searchParams.delete("session_id");
          window.history.replaceState({}, "", url.toString());
        },
      });
    }
  }, [sessionId, mutate]);

  // Handle Stripe cancel redirect
  useEffect(() => {
    if (cancelled === "true") {
      setBanner("cancelled");
      const url = new URL(window.location.href);
      url.searchParams.delete("cancelled");
      window.history.replaceState({}, "", url.toString());
    }
  }, [cancelled]);

  // Loading auth state
  if (isInitializing) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Skeleton className="h-8 w-44 mb-8" />
        <OrderSkeleton count={3} />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div
        className="container mx-auto px-4 py-20 max-w-md text-center"
        data-ocid="orders.auth_guard"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold mb-2">
          Sign in to view orders
        </h1>
        <p className="text-muted-foreground mb-6">
          Track your purchases and manage your order history.
        </p>
        <Button
          onClick={login}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="orders.login_button"
        >
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-[calc(100vh-4rem)]">
      {/* Page header band */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1
                className="font-display text-2xl font-bold text-foreground tracking-tight"
                data-ocid="orders.page"
              >
                My Orders
              </h1>
              <p className="text-sm text-muted-foreground">
                Your purchase history · tap an order to see full details
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-5">
        {/* Banners */}
        <AnimatePresence>
          {banner && <Banner kind={banner} onDismiss={() => setBanner(null)} />}
        </AnimatePresence>

        {/* Legend row */}
        {orders && orders.length > 0 && (
          <div
            className="flex items-center gap-2 flex-wrap"
            data-ocid="orders.status_legend"
          >
            {(
              [
                ["pending", "Pending"],
                ["paid", "Completed"],
                ["shipped", "Shipped"],
                ["delivered", "Delivered"],
                ["cancelled", "Cancelled"],
              ] as const
            ).map(([status, label]) => {
              const cfg = STATUS_CONFIG[status];
              return (
                <span
                  key={status}
                  className={`text-xs inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium ${cfg.badgeClass}`}
                >
                  {cfg.icon}
                  {label}
                </span>
              );
            })}
          </div>
        )}

        {/* Orders */}
        {isLoading ? (
          <OrderSkeleton count={4} />
        ) : !orders?.length ? (
          <EmptyOrders />
        ) : (
          <div className="space-y-3" data-ocid="orders.list">
            {orders.map((order, i) => (
              <OrderCard key={order.id} order={order} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
