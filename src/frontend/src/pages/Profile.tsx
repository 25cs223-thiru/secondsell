import type { ExternalBlob } from "@/backend";
import { ConditionBadge } from "@/components/ConditionBadge";
import { ImageUploader } from "@/components/ImageUploader";
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
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useDeleteListing,
  useMarkListingAsSold,
  useMyListings,
} from "@/hooks/useListings";
import {
  useMyProfile,
  useSaveProfile,
  useUserProfile,
} from "@/hooks/useProfile";
import type { Listing, UserProfile } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  Edit2,
  LogOut,
  MessageCircle,
  Package,
  PackageCheck,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_CONFIG: Partial<
  Record<string, { label: string; className: string }>
> = {
  active: {
    label: "Active",
    className: "bg-accent/15 text-accent border-accent/30",
  },
  sold: {
    label: "Sold",
    className: "bg-secondary/15 text-secondary-foreground border-secondary/30",
  },
  deleted: {
    label: "Deleted",
    className: "bg-muted text-muted-foreground border-border",
  },
};

function StatusBadge({ status }: { status: Listing["status"] }) {
  const config = STATUS_CONFIG[status as string] ?? {
    label: String(status),
    className: "bg-muted text-muted-foreground border-border",
  };
  const { label, className } = config;
  return (
    <span
      className={`inline-flex items-center rounded-full border text-xs font-medium px-2 py-0.5 ${className}`}
    >
      {label}
    </span>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────
interface StatPillProps {
  count: number;
  label: string;
  icon: React.ReactNode;
  variant: "active" | "sold" | "neutral";
}

function StatPill({ count, label, icon, variant }: StatPillProps) {
  const variantClasses = {
    active: "bg-accent/10 text-accent border-accent/25 hover:bg-accent/15",
    sold: "bg-primary/10 text-primary border-primary/25 hover:bg-primary/15",
    neutral: "bg-muted text-muted-foreground border-border hover:bg-muted/80",
  };
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium transition-smooth ${variantClasses[variant]}`}
    >
      <span className="opacity-80">{icon}</span>
      <span className="font-bold tabular-nums">{count}</span>
      <span className="text-xs font-normal opacity-80">{label}</span>
    </div>
  );
}

// ── My listing card ───────────────────────────────────────────────────────────
interface MyListingCardProps {
  listing: Listing;
  index: number;
  onEdit: (listing: Listing) => void;
  onDelete: (listing: Listing) => void;
  onMarkSold: (listing: Listing) => void;
}

function MyListingCard({
  listing,
  index,
  onEdit,
  onDelete,
  onMarkSold,
}: MyListingCardProps) {
  const imageUrl =
    listing.images?.[0]?.getDirectURL?.() ?? "/assets/images/placeholder.svg";

  return (
    <div
      data-ocid={`my_listing.item.${index}`}
      className="group bg-card border border-border rounded-xl overflow-hidden shadow-subtle hover:shadow-elevated transition-smooth"
    >
      <Link
        to="/listings/$id"
        params={{ id: listing.id }}
        className="block relative aspect-[4/5] overflow-hidden bg-muted"
      >
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <StatusBadge status={listing.status} />
        </div>
        <div className="absolute bottom-2 left-2">
          <ConditionBadge condition={listing.condition} />
        </div>
        {listing.status === "sold" && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <div className="flex items-center gap-1.5 bg-card/90 border border-border rounded-full px-3 py-1.5 shadow-subtle">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-foreground">
                Sold
              </span>
            </div>
          </div>
        )}
      </Link>

      <div className="p-3 space-y-2">
        <p className="font-medium text-sm text-foreground line-clamp-2 leading-snug">
          {listing.title}
        </p>
        <PriceDisplay
          priceCents={listing.priceInCents}
          size="sm"
          className="font-semibold"
        />

        <div className="flex items-center gap-1.5 pt-0.5">
          {listing.status !== "sold" && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-8 text-xs"
                onClick={() => onEdit(listing)}
                data-ocid={`my_listing.edit_button.${index}`}
              >
                <Edit2 className="w-3 h-3 mr-1" />
                Edit
              </Button>
              {listing.status === "active" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs border-accent/40 text-accent hover:bg-accent/10"
                  onClick={() => onMarkSold(listing)}
                  data-ocid={`my_listing.mark_sold_button.${index}`}
                >
                  <PackageCheck className="w-3 h-3 mr-1" />
                  Sold
                </Button>
              )}
            </>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
            onClick={() => onDelete(listing)}
            aria-label="Delete listing"
            data-ocid={`my_listing.delete_button.${index}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Profile skeleton ──────────────────────────────────────────────────────────
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Skeleton className="w-24 h-24 rounded-full shrink-0" />
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <Skeleton className="h-7 w-44 mx-auto sm:mx-0" />
              <Skeleton className="h-4 w-72 mx-auto sm:mx-0" />
              <Skeleton className="h-4 w-56 mx-auto sm:mx-0" />
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                <Skeleton className="h-9 w-28 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["a", "b", "c", "d"].map((k) => (
            <div key={k} className="space-y-2">
              <Skeleton className="aspect-[4/5] rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Edit profile modal ────────────────────────────────────────────────────────
interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: UserProfile;
}

function EditProfileModal({ open, onClose, profile }: EditProfileModalProps) {
  const saveProfile = useSaveProfile();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio ?? "");
  const [avatarImages, setAvatarImages] = useState<ExternalBlob[]>(
    profile.avatar ? [profile.avatar] : [],
  );

  useEffect(() => {
    if (open) {
      setName(profile.name);
      setBio(profile.bio ?? "");
      setAvatarImages(profile.avatar ? [profile.avatar] : []);
    }
  }, [open, profile]);

  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      await saveProfile.mutateAsync({
        ...profile,
        name: name.trim(),
        bio: bio.trim() || undefined,
        avatar: avatarImages[0] ?? undefined,
      });
      toast.success("Profile updated!");
      onClose();
    } catch {
      toast.error("Failed to save profile.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="edit_profile.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Avatar upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Profile photo</Label>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 shrink-0 ring-2 ring-border">
                {avatarImages[0]?.getDirectURL?.() && (
                  <AvatarImage
                    src={avatarImages[0].getDirectURL()}
                    alt={name}
                  />
                )}
                <AvatarFallback className="bg-primary/10 text-primary font-display font-bold text-lg">
                  {name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <ImageUploader
                  images={avatarImages}
                  onChange={setAvatarImages}
                  maxImages={1}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ep-name">Display name</Label>
            <Input
              id="ep-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={60}
              data-ocid="edit_profile.name_input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ep-bio">Bio / About</Label>
            <Textarea
              id="ep-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell buyers a little about yourself — your style, what you sell, shipping speed…"
              rows={4}
              maxLength={280}
              className="resize-none"
              data-ocid="edit_profile.bio_input"
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/280
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="edit_profile.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim() || saveProfile.isPending}
            data-ocid="edit_profile.save_button"
          >
            {saveProfile.isPending ? "Saving…" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Profile header (shared by own + public views) ─────────────────────────────
interface ProfileHeaderProps {
  profile: UserProfile | null | undefined;
  activeCount: number;
  soldCount: number;
  isOwnProfile: boolean;
  onEditClick?: () => void;
  onLogout?: () => void;
}

function ProfileHeader({
  profile,
  activeCount,
  soldCount,
  isOwnProfile,
  onEditClick,
  onLogout,
}: ProfileHeaderProps) {
  const displayName = profile?.name ?? "Seller";
  const avatarUrl = profile?.avatar?.getDirectURL?.();
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const joinedDate = profile?.joinedAt
    ? new Date(Number(profile.joinedAt) / 1_000_000).toLocaleDateString(
        "en-US",
        { month: "long", year: "numeric" },
      )
    : null;

  return (
    <section
      className="bg-card border-b border-border shadow-subtle"
      data-ocid="profile.header"
    >
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with edit overlay (own profile) */}
          <div className="relative shrink-0 group">
            <Avatar className="w-24 h-24 ring-2 ring-border ring-offset-2 ring-offset-card">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-display font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {isOwnProfile && (
              <button
                type="button"
                onClick={onEditClick}
                aria-label="Edit profile photo"
                className="absolute inset-0 rounded-full flex items-center justify-center bg-foreground/40 opacity-0 group-hover:opacity-100 transition-smooth cursor-pointer"
                data-ocid="profile.avatar_edit_button"
              >
                <Camera className="w-5 h-5 text-card" />
              </button>
            )}
          </div>

          {/* Info column */}
          <div className="flex-1 min-w-0 space-y-3 text-center sm:text-left">
            {/* Name + actions row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl font-display font-bold text-foreground truncate">
                {displayName}
              </h1>
              {isOwnProfile ? (
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-8"
                    onClick={onEditClick}
                    data-ocid="profile.edit_button"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 h-8 text-muted-foreground hover:text-destructive"
                    onClick={onLogout}
                    data-ocid="profile.logout_button"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 h-8 self-center sm:self-auto"
                  data-ocid="profile.message_seller_button"
                  onClick={() =>
                    toast.info("Messaging coming soon!", {
                      description: "Direct messages will be available shortly.",
                    })
                  }
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Message Seller
                </Button>
              )}
            </div>

            {/* Bio — always visible */}
            {profile?.bio ? (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg break-words">
                {profile.bio}
              </p>
            ) : isOwnProfile ? (
              <button
                type="button"
                onClick={onEditClick}
                className="flex items-center gap-1.5 text-sm text-muted-foreground/60 italic hover:text-accent transition-smooth group"
                data-ocid="profile.bio_placeholder_button"
              >
                <span>Add a bio to introduce yourself to buyers</span>
                <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-smooth" />
              </button>
            ) : (
              <p className="text-sm text-muted-foreground/60 italic">
                This seller hasn't added a bio yet.
              </p>
            )}

            {/* Stat pills + member since */}
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start pt-1">
              <StatPill
                count={activeCount}
                label="Active"
                icon={<ShoppingBag className="w-3.5 h-3.5" />}
                variant="active"
              />
              <StatPill
                count={soldCount}
                label="Sold"
                icon={<PackageCheck className="w-3.5 h-3.5" />}
                variant="sold"
              />
              {joinedDate && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground px-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Member since {joinedDate}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main page — own profile ───────────────────────────────────────────────────
type ListingTab = "all" | "active" | "sold";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: listings = [], isLoading: listingsLoading } = useMyListings();
  const deleteListing = useDeleteListing();
  const markAsSold = useMarkListingAsSold();

  const [editOpen, setEditOpen] = useState(false);
  const [tab, setTab] = useState<ListingTab>("all");
  const [deletingListing, setDeletingListing] = useState<Listing | null>(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading || profileLoading) return <ProfileSkeleton />;

  // Auth gate — show sign-in prompt instead of a blank page
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center gap-5 px-4 text-center"
        data-ocid="profile.auth_gate"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Sign in to view your profile
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xs">
            Manage your listings, track orders, and update your seller profile.
          </p>
        </div>
        <Button onClick={login} data-ocid="profile.login_button">
          Sign in with Internet Identity
        </Button>
      </div>
    );
  }

  const activeListings = listings.filter((l) => l.status === "active");
  const soldListings = listings.filter((l) => l.status === "sold");
  const filteredListings =
    tab === "active"
      ? activeListings
      : tab === "sold"
        ? soldListings
        : listings;

  const handleDelete = async () => {
    if (!deletingListing) return;
    try {
      await deleteListing.mutateAsync(deletingListing.id);
      toast.success("Listing deleted.");
    } catch {
      toast.error("Failed to delete listing.");
    } finally {
      setDeletingListing(null);
    }
  };

  const handleMarkSold = async (listing: Listing) => {
    try {
      await markAsSold.mutateAsync(listing.id);
      toast.success(`"${listing.title}" marked as sold!`);
    } catch {
      toast.error("Failed to update listing.");
    }
  };

  const handleEdit = (listing: Listing) => {
    navigate({ to: "/listings/$id/edit", params: { id: listing.id } });
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="profile.page">
      {/* Profile header */}
      <ProfileHeader
        profile={profile}
        activeCount={activeListings.length}
        soldCount={soldListings.length}
        isOwnProfile={true}
        onEditClick={() => setEditOpen(true)}
        onLogout={logout}
      />

      {/* Listings section */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-display font-semibold text-foreground whitespace-nowrap">
                My Listings
              </h2>
              <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as ListingTab)}
                data-ocid="profile.listings_tabs"
              >
                <TabsList className="h-8">
                  <TabsTrigger
                    value="all"
                    className="text-xs px-3"
                    data-ocid="profile.tab.all"
                  >
                    All ({listings.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="text-xs px-3"
                    data-ocid="profile.tab.active"
                  >
                    Active ({activeListings.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="sold"
                    className="text-xs px-3"
                    data-ocid="profile.tab.sold"
                  >
                    Sold ({soldListings.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Button
              asChild
              size="sm"
              className="gap-1.5 shrink-0"
              data-ocid="profile.new_listing_button"
            >
              <Link to="/sell">
                <Plus className="w-4 h-4" />
                New listing
              </Link>
            </Button>
          </div>

          {/* Loading skeletons */}
          {listingsLoading && (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              data-ocid="profile.listings.loading_state"
            >
              {["a", "b", "c", "d"].map((k) => (
                <div key={k} className="space-y-2">
                  <Skeleton className="aspect-[4/5] rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!listingsLoading && filteredListings.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-20 space-y-4 bg-muted/30 rounded-2xl border border-dashed border-border"
              data-ocid="profile.listings.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-display font-semibold text-foreground">
                  {tab === "sold"
                    ? "No sold listings yet"
                    : tab === "active"
                      ? "No active listings"
                      : "No listings yet"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {tab === "sold"
                    ? "Items you sell will appear here."
                    : "Start selling your second-hand items today."}
                </p>
              </div>
              {tab !== "sold" && (
                <Button
                  asChild
                  className="gap-1.5"
                  data-ocid="profile.empty_state.create_listing_button"
                >
                  <Link to="/sell">
                    <Plus className="w-4 h-4" />
                    List your first item
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* Listings grid */}
          {!listingsLoading && filteredListings.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredListings.map((listing, i) => (
                <MyListingCard
                  key={listing.id}
                  listing={listing}
                  index={i + 1}
                  onEdit={handleEdit}
                  onDelete={setDeletingListing}
                  onMarkSold={handleMarkSold}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Edit profile modal */}
      {profile && (
        <EditProfileModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          profile={profile}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deletingListing}
        onOpenChange={(v) => !v && setDeletingListing(null)}
      >
        <AlertDialogContent data-ocid="profile.delete_listing.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deletingListing?.title}" will be permanently removed. Buyers
              won't be able to find it anymore.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="profile.delete_listing.cancel_button">
              Keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="profile.delete_listing.confirm_button"
            >
              {deleteListing.isPending ? "Deleting…" : "Delete listing"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Public seller profile page ─────────────────────────────────────────────────
export function SellerProfilePage() {
  const { userId } = useParams({ strict: false }) as { userId?: string };
  const { data: profile, isLoading: profileLoading } = useUserProfile(userId);

  // We don't have seller-specific listings endpoint by userId, so we show
  // a placeholder message for seller's active listings count from profile stats.
  const activeCount = profile?.totalListings ?? 0;
  const soldCount = profile?.totalSales ?? 0;

  if (profileLoading) return <ProfileSkeleton />;

  if (!profile) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="seller_profile.not_found"
      >
        <div className="text-center space-y-3 py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-display font-semibold text-foreground">
            Seller not found
          </p>
          <p className="text-sm text-muted-foreground">
            This profile doesn't exist or has been removed.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link to="/">Browse listings</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="seller_profile.page">
      <ProfileHeader
        profile={profile}
        activeCount={activeCount}
        soldCount={soldCount}
        isOwnProfile={false}
      />

      {/* Seller's listings section */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-semibold text-foreground">
              Listings by {profile.name}
            </h2>
            <Badge variant="secondary" className="text-xs">
              {activeCount} active
            </Badge>
          </div>

          {/* Empty listings notice */}
          <div
            className="flex flex-col items-center justify-center py-16 space-y-3 bg-muted/30 rounded-2xl border border-dashed border-border"
            data-ocid="seller_profile.listings.empty_state"
          >
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-display font-semibold text-foreground">
                Browse all listings
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Search the marketplace to find items from this seller.
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="gap-1.5"
              data-ocid="seller_profile.browse_button"
            >
              <Link to="/">
                <ShoppingBag className="w-4 h-4" />
                Browse marketplace
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
