import { ConditionBadge } from "@/components/ConditionBadge";
import { PriceDisplay } from "@/components/PriceDisplay";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useDeleteListing,
  useListing,
  useMarkListingAsSold,
} from "@/hooks/useListings";
import { useCreateCheckoutSession, useMyOrders } from "@/hooks/useOrders";
import { useUserProfile } from "@/hooks/useProfile";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Edit2,
  MessageCircle,
  Package,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Loading skeleton ──────────────────────────────────────────────────────────
function ListingDetailSkeleton() {
  return (
    <div className="bg-background" data-ocid="listing_detail.loading_state">
      <div className="bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Skeleton className="h-5 w-28 mb-6" />
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_96px] gap-3">
              <Skeleton className="aspect-[4/3] md:aspect-[16/10] rounded-xl w-full" />
              <div className="flex md:flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="shrink-0 w-20 h-20 md:w-full md:aspect-square rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid md:grid-cols-[1fr_320px] gap-10">
          <div className="space-y-5">
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-7 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Lazy image with skeleton ──────────────────────────────────────────────────
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

function LazyImage({ src, alt, className }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      {error ? (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-muted-foreground/40" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
        />
      )}
    </div>
  );
}

// ── Thumbnail lazy image ──────────────────────────────────────────────────────
function LazyThumb({
  src,
  alt,
  active,
  onClick,
  ocid,
}: {
  src: string;
  alt: string;
  active: boolean;
  onClick: () => void;
  ocid: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={`shrink-0 w-20 h-20 md:w-full md:aspect-square rounded-lg overflow-hidden border-2 transition-smooth relative ${
        active
          ? "border-accent ring-1 ring-accent/50"
          : "border-border hover:border-accent/50 opacity-70 hover:opacity-100"
      }`}
    >
      {!loaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  );
}

// ── Seller card ───────────────────────────────────────────────────────────────
interface SellerCardProps {
  sellerId: string;
  sellerName: string;
  isOwner: boolean;
}

function SellerCard({ sellerId, sellerName, isOwner }: SellerCardProps) {
  const { data: profile } = useUserProfile(sellerId);

  // Safely get avatar URL — the object-storage proxy returns an object with getDirectURL
  let avatarUrl: string | null = null;
  try {
    const raw = profile?.avatar as { getDirectURL?: () => string } | undefined;
    avatarUrl = raw?.getDirectURL?.() ?? null;
  } catch {
    avatarUrl = null;
  }

  const initials = (sellerName || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const joinedDate = profile?.joinedAt
    ? new Date(Number(profile.joinedAt) / 1_000_000)
    : null;

  const joinedLabel = joinedDate
    ? joinedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  const handleMessageSeller = () => {
    toast.info("Messaging is coming soon! Check back later.");
  };

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-4"
      data-ocid="listing_detail.seller_card"
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Seller
      </h3>

      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-border shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={sellerName}
              className="object-cover"
              loading="lazy"
            />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate leading-tight">
            {sellerName || "Unknown Seller"}
          </p>
          {profile?.bio && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      {/* Seller stats */}
      <div className="grid grid-cols-2 gap-2">
        {typeof profile?.totalListings === "number" && (
          <div className="bg-muted/60 rounded-lg px-3 py-2.5 text-center">
            <p className="text-lg font-bold text-foreground leading-none">
              {profile.totalListings}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {profile.totalListings === 1 ? "Listing" : "Listings"}
            </p>
          </div>
        )}
        {typeof profile?.totalSales === "number" && (
          <div className="bg-muted/60 rounded-lg px-3 py-2.5 text-center">
            <p className="text-lg font-bold text-foreground leading-none">
              {profile.totalSales}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {profile.totalSales === 1 ? "Sale" : "Sales"}
            </p>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="space-y-1.5">
        {joinedLabel && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-accent/70" />
            <span>Member since {joinedLabel}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-accent/70" />
          <span>Internet Identity verified</span>
        </div>
      </div>

      {/* Message seller — placeholder until feature ships */}
      {!isOwner && (
        <Button
          variant="outline"
          className="w-full border-border hover:border-accent/50 hover:bg-accent/5 text-sm"
          onClick={handleMessageSeller}
          data-ocid="listing_detail.message_seller_button"
        >
          <MessageCircle className="w-4 h-4 mr-2 text-accent" />
          Message seller
        </Button>
      )}
    </div>
  );
}

// ── Spec row ──────────────────────────────────────────────────────────────────
function SpecRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-sm py-2.5 border-b border-border/60 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <span className="text-muted-foreground w-20 shrink-0">{label}</span>
      <span className="font-medium text-foreground min-w-0 break-words flex-1">
        {value}
      </span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ListingDetailPage() {
  const { id } = useParams({ from: "/listings/$id" });
  const navigate = useNavigate();
  const { data: listing, isLoading } = useListing(id);
  const { isAuthenticated, principalId } = useAuth();
  const checkout = useCreateCheckoutSession();
  const deleteListing = useDeleteListing();
  const markAsSold = useMarkListingAsSold();
  const { data: myOrders } = useMyOrders();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const hasOrderForListing = myOrders?.some((o) => o.listingId === id) ?? false;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleBuyClick = () => {
    if (!isAuthenticated) {
      toast.error("Sign in to purchase items.");
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirmBuy = async () => {
    if (!listing) return;
    try {
      const sessionUrl = await checkout.mutateAsync(listing);
      setConfirmOpen(false);
      window.location.href = sessionUrl;
    } catch {
      toast.error("Checkout failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteListing.mutateAsync(id);
      toast.success("Listing deleted.");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to delete listing.");
    }
  };

  const handleMarkSold = async () => {
    try {
      await markAsSold.mutateAsync(id);
      toast.success("Listing marked as sold.");
    } catch {
      toast.error("Failed to update listing.");
    }
  };

  if (isLoading) return <ListingDetailSkeleton />;

  if (!listing) {
    return (
      <div
        className="container mx-auto px-4 py-24 text-center"
        data-ocid="listing_detail.error_state"
      >
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">
            Listing not found
          </h2>
          <p className="text-muted-foreground mb-8">
            This item may have been sold or removed by the seller.
          </p>
          <Link to="/" data-ocid="listing_detail.back_button">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = listing.images ?? [];
  const activeImage =
    images[activeImageIdx]?.getDirectURL?.() ??
    "/assets/images/placeholder.svg";
  const isOwner = principalId === listing.sellerId;

  return (
    <div className="bg-background" data-ocid="listing_detail.page">
      {/* Gallery zone */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          {/* Back nav */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors duration-200 group"
            data-ocid="listing_detail.back_link"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to listings
          </Link>

          {/* Full-width gallery */}
          <div className="max-w-5xl mx-auto" data-ocid="listing_detail.gallery">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_96px] lg:grid-cols-[1fr_112px] gap-3">
              {/* Main image — AnimatePresence for smooth swap */}
              <div className="aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden bg-card border border-border shadow-subtle">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIdx}
                    initial={{ opacity: 0.5, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <LazyImage src={activeImage} alt={listing.title} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-1 md:pb-0">
                  {images.map((img, i) => {
                    const thumbUrl =
                      img.getDirectURL?.() ?? "/assets/images/placeholder.svg";
                    return (
                      <LazyThumb
                        key={thumbUrl}
                        src={thumbUrl}
                        alt={`View ${i + 1}`}
                        active={i === activeImageIdx}
                        onClick={() => setActiveImageIdx(i)}
                        ocid={`listing_detail.thumbnail.${i + 1}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content zone */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_320px] gap-10 lg:gap-14">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-6 min-w-0"
            data-ocid="listing_detail.info"
          >
            {/* Title + status badges */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <ConditionBadge
                  condition={listing.condition}
                  size="md"
                  showTooltip
                />
                <Badge variant="outline" className="text-xs font-normal">
                  <Tag className="w-3 h-3 mr-1" />
                  {listing.category}
                </Badge>
                {listing.status === "sold" && (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                    Sold
                  </Badge>
                )}
              </div>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight break-words">
                {listing.title}
              </h1>
              <div className="mt-3 flex items-baseline gap-3">
                <PriceDisplay priceCents={listing.priceInCents} size="lg" />
                {listing.status === "active" && (
                  <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                    Available
                  </span>
                )}
              </div>
            </div>

            <Separator />

            {/* Item specifications */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Specifications
              </h2>
              <div className="rounded-xl border border-border bg-card/60 px-3 divide-y divide-border/60">
                <SpecRow icon={Tag} label="Category" value={listing.category} />
                <SpecRow
                  icon={CheckCircle2}
                  label="Condition"
                  value={
                    <ConditionBadge
                      condition={listing.condition}
                      size="sm"
                      showTooltip
                    />
                  }
                />
                <SpecRow
                  icon={ShoppingBag}
                  label="Price"
                  value={
                    <PriceDisplay priceCents={listing.priceInCents} size="sm" />
                  }
                />
                {listing.brand && (
                  <SpecRow icon={Tag} label="Brand" value={listing.brand} />
                )}
                {listing.size && (
                  <SpecRow icon={Ruler} label="Size" value={listing.size} />
                )}
                <SpecRow
                  icon={User}
                  label="Seller"
                  value={listing.sellerName}
                />
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                About this item
              </h2>
              <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap break-words">
                {listing.description}
              </p>
            </div>

            {/* Trust signals */}
            <div className="bg-muted/40 rounded-xl p-4 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Secure checkout via Stripe</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Package className="w-4 h-4 text-accent shrink-0" />
                <span>Verified seller identity</span>
              </div>
            </div>
          </motion.div>

          {/* Right: actions + seller */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Action card */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <div className="flex items-baseline justify-between gap-2">
                <PriceDisplay priceCents={listing.priceInCents} size="lg" />
                {listing.status === "sold" ? (
                  <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                    Sold
                  </span>
                ) : (
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    Available
                  </span>
                )}
              </div>

              {listing.status === "sold" ? (
                <div
                  className="flex items-center gap-2 text-muted-foreground bg-muted/60 rounded-lg px-4 py-3"
                  data-ocid="listing_detail.sold_state"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">Item sold</span>
                </div>
              ) : isOwner ? (
                <div className="space-y-2">
                  {hasOrderForListing && (
                    <Button
                      variant="outline"
                      className="w-full border-accent/40 text-accent hover:bg-accent/10"
                      onClick={handleMarkSold}
                      disabled={markAsSold.isPending}
                      data-ocid="listing_detail.mark_sold_button"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {markAsSold.isPending ? "Updating…" : "Mark as sold"}
                    </Button>
                  )}
                  <Link
                    to="/listings/$id/edit"
                    params={{ id: listing.id }}
                    className="block"
                    data-ocid="listing_detail.edit_button"
                  >
                    <Button variant="outline" className="w-full">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit listing
                    </Button>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                        data-ocid="listing_detail.delete_button"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete listing
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent data-ocid="listing_detail.dialog">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete this listing?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove "{listing.title}" from
                          the marketplace. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-ocid="listing_detail.cancel_button">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          data-ocid="listing_detail.confirm_button"
                        >
                          {deleteListing.isPending ? "Deleting…" : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg font-bold bg-success text-success-foreground hover:bg-success/90 shadow-elevated transition-smooth tracking-wide"
                    onClick={handleBuyClick}
                    disabled={checkout.isPending}
                    data-ocid="listing_detail.buy_button"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Buy Now
                  </Button>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>Secure checkout via Stripe</span>
                  </div>
                  {!isAuthenticated && (
                    <p className="text-xs text-muted-foreground text-center">
                      Sign in required to purchase
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Seller card */}
            <SellerCard
              sellerId={listing.sellerId}
              sellerName={listing.sellerName}
              isOwner={isOwner}
            />
          </motion.div>
        </div>
      </div>

      {/* Order confirmation dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm" data-ocid="listing_detail.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Confirm your order
            </DialogTitle>
            <DialogDescription>
              Review your order before proceeding to secure checkout.
            </DialogDescription>
          </DialogHeader>

          {/* Item preview */}
          <div className="flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-3">
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
              <img
                src={activeImage}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="font-semibold text-foreground line-clamp-2 text-sm leading-snug">
                {listing.title}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <ConditionBadge condition={listing.condition} size="sm" />
              </div>
              <p className="text-xs text-muted-foreground">
                Sold by{" "}
                <span className="font-medium text-foreground">
                  {listing.sellerName}
                </span>
              </p>
            </div>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between rounded-lg bg-card border border-border px-4 py-3">
            <span className="text-sm text-muted-foreground">Total</span>
            <PriceDisplay
              priceCents={listing.priceInCents}
              size="lg"
              className="font-bold"
            />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            You'll be redirected to Stripe's secure checkout page.
          </p>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={checkout.isPending}
              data-ocid="listing_detail.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleConfirmBuy}
              disabled={checkout.isPending}
              data-ocid="listing_detail.confirm_button"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              {checkout.isPending ? "Redirecting…" : "Proceed to checkout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
