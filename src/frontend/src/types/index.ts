import type { ExternalBlob, ListingStatus } from "@/backend";

// ── Condition ────────────────────────────────────────────────────────────────
// String union matching all backend ListingCondition enum string values
export type Condition = "new" | "likeNew" | "good" | "fair" | "poor";

// ── Category ─────────────────────────────────────────────────────────────────
export type Category =
  | "Clothing"
  | "Accessories"
  | "Shoes"
  | "Bags"
  | "Jewelry"
  | "Home"
  | "Books"
  | "Electronics"
  | "Sports"
  | "Other";

// ── Listing ───────────────────────────────────────────────────────────────────
export interface Listing {
  id: string; // stringified bigint for URL routing
  title: string;
  description: string;
  priceInCents: bigint;
  condition: Condition;
  category: Category;
  images: ExternalBlob[];
  sellerId: string; // stringified Principal
  sellerName: string;
  status: ListingStatus;
  createdAt: bigint;
  updatedAt: bigint;
  size?: string;
  brand?: string;
}

export interface CreateListingArgs {
  title: string;
  description: string;
  priceInCents: bigint;
  condition: Condition;
  category: Category;
  images: ExternalBlob[];
  brand?: string;
  size?: string;
}

export interface UpdateListingArgs {
  id: string;
  title?: string;
  description?: string;
  priceInCents?: bigint;
  condition?: Condition;
  category?: Category;
  images?: ExternalBlob[];
  brand?: string;
  size?: string;
}

// ── User Profile ──────────────────────────────────────────────────────────────
export interface UserProfile {
  name: string;
  bio?: string;
  avatar?: ExternalBlob;
  joinedAt?: bigint;
  totalListings?: number;
  totalSales?: number;
  rating?: number;
}

// ── Order ─────────────────────────────────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage?: ExternalBlob;
  buyerId: string;
  sellerId: string;
  priceInCents: bigint;
  status: OrderStatus;
  createdAt: bigint;
  stripeSessionId?: string;
}

// ── Search / Filter ───────────────────────────────────────────────────────────
export interface ListingFilter {
  category?: Category;
  condition?: Condition;
  minPrice?: bigint;
  maxPrice?: bigint;
  query?: string;
}
