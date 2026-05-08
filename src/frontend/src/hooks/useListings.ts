import { ListingCondition } from "@/backend";
import type {
  CreateListingArgs as BackendCreateArgs,
  Listing as BackendListing,
  UpdateListingArgs as BackendUpdateArgs,
} from "@/backend";
import type {
  CreateListingArgs,
  Listing,
  ListingFilter,
  UpdateListingArgs,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

// ── Allowed category values ──────────────────────────────────────────────────
const VALID_CATEGORIES = new Set([
  "Clothing",
  "Accessories",
  "Shoes",
  "Bags",
  "Jewelry",
  "Home",
  "Books",
  "Electronics",
  "Sports",
  "Other",
]);

// ── Map backend ListingCondition enum → frontend Condition string ─────────────
function mapCondition(c: ListingCondition): Listing["condition"] {
  // Use string comparison as a fallback — the backend returns string-valued
  // enum keys ("new", "likeNew", etc.) but `ListingCondition.new` is
  // undefined in the generated code because `new` is a JS reserved word.
  const str = String(c) as string;
  if (str === "new" || c === ListingCondition.new_) return "new";
  if (str === "likeNew" || c === ListingCondition.likeNew) return "likeNew";
  if (str === "good" || c === ListingCondition.good) return "good";
  if (str === "fair" || c === ListingCondition.fair) return "fair";
  if (str === "poor" || c === ListingCondition.poor) return "poor";
  return "good"; // safe default
}

// ── Map frontend Condition string → backend ListingCondition enum ─────────────
function toBackendCondition(c: string): ListingCondition {
  switch (c) {
    case "new":
      return ListingCondition.new_;
    case "likeNew":
      return ListingCondition.likeNew;
    case "good":
      return ListingCondition.good;
    case "fair":
      return ListingCondition.fair;
    case "poor":
      return ListingCondition.poor;
    default:
      return ListingCondition.good;
  }
}

// ── Map backend Listing → frontend Listing ────────────────────────────────────
function mapListing(b: BackendListing): Listing {
  try {
    const category: Listing["category"] = VALID_CATEGORIES.has(b.category)
      ? (b.category as Listing["category"])
      : "Other";
    return {
      id: String(b.id),
      title: b.title ?? "",
      description: b.description ?? "",
      priceInCents: b.priceInCents ?? BigInt(0),
      condition: mapCondition(b.condition),
      category,
      images: Array.isArray(b.images) ? b.images : [],
      sellerId: b.sellerId?.toString?.() ?? "",
      sellerName: b.sellerName ?? "",
      status: b.status,
      createdAt: b.createdAt ?? BigInt(0),
      updatedAt: b.updatedAt ?? BigInt(0),
      brand: b.brand || undefined,
      size: b.size || undefined,
    };
  } catch {
    // Never let a single malformed listing crash the whole query
    return {
      id: String(b?.id ?? Math.random()),
      title: b?.title ?? "Unknown",
      description: "",
      priceInCents: BigInt(0),
      condition: "good",
      category: "Other",
      images: [],
      sellerId: "",
      sellerName: "",
      status: "active" as BackendListing["status"],
      createdAt: BigInt(0),
      updatedAt: BigInt(0),
    };
  }
}

// ── All active listings ───────────────────────────────────────────────────────
export function useListings(filter?: ListingFilter) {
  const { actor, isFetching } = useBackend();
  return useQuery<Listing[]>({
    queryKey: ["listings", filter],
    queryFn: async () => {
      if (!actor) return [];
      try {
        if (filter?.query || filter?.category) {
          const page = await actor.searchListings(
            filter.query ?? "",
            filter.category ?? null,
            BigInt(0),
            BigInt(100),
          );
          return (page.listings ?? []).map(mapListing);
        }
        const page = await actor.getActiveListings(BigInt(0), BigInt(100));
        return (page.listings ?? []).map(mapListing);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

// ── Single listing ────────────────────────────────────────────────────────────
export function useListing(id: string | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<Listing | null>({
    queryKey: ["listing", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      try {
        const result = await actor.getListing(BigInt(id));
        return result ? mapListing(result) : null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// ── My listings ───────────────────────────────────────────────────────────────
export function useMyListings() {
  const { actor, isFetching } = useBackend();
  return useQuery<Listing[]>({
    queryKey: ["myListings"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const results = await actor.getMyListings();
        return (results ?? []).map(mapListing);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Create listing ────────────────────────────────────────────────────────────
export function useCreateListing() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: CreateListingArgs): Promise<Listing> => {
      if (!actor) throw new Error("Not connected");
      const backendArgs: BackendCreateArgs = {
        title: args.title,
        description: args.description,
        priceInCents: args.priceInCents,
        condition: toBackendCondition(args.condition),
        category: args.category,
        images: args.images,
        brand: args.brand || undefined,
        size: args.size || undefined,
      };
      const result = await actor.createListing(backendArgs);
      return mapListing(result);
    },
    onSuccess: () => {
      // Invalidate immediately, then refetch after a short delay to account
      // for IC state replication lag across replicas.
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["myListings"] });
      setTimeout(() => {
        qc.refetchQueries({ queryKey: ["listings"] });
        qc.refetchQueries({ queryKey: ["myListings"] });
      }, 1500);
    },
  });
}

// ── Update listing ────────────────────────────────────────────────────────────
export function useUpdateListing() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: UpdateListingArgs) => {
      if (!actor) throw new Error("Not connected");
      const backendArgs: BackendUpdateArgs = {
        id: BigInt(args.id),
        title: args.title ?? "",
        description: args.description ?? "",
        priceInCents: args.priceInCents ?? BigInt(0),
        condition: toBackendCondition(args.condition ?? "good"),
        category: args.category ?? "",
        images: args.images ?? [],
        brand: args.brand || undefined,
        size: args.size || undefined,
      };
      return actor.updateListing(backendArgs);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["listing", vars.id] });
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["myListings"] });
    },
  });
}

// ── Delete listing ────────────────────────────────────────────────────────────
export function useDeleteListing() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteListing(BigInt(id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["myListings"] });
    },
  });
}

// ── Mark as sold ──────────────────────────────────────────────────────────────
export function useMarkListingAsSold() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.markListingAsSold(BigInt(id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["myListings"] });
    },
  });
}
