import { OrderStatus as BackendOrderStatus } from "@/backend";
import type { Order as BackendOrder } from "@/backend";
import type { Listing, Order } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

// ── Map backend OrderStatus enum → frontend OrderStatus string ────────────────
function mapOrderStatus(s: BackendOrderStatus): Order["status"] {
  switch (s) {
    case BackendOrderStatus.pending:
      return "pending";
    case BackendOrderStatus.paid:
      return "paid"; // backend 'paid' = frontend 'paid'
    case BackendOrderStatus.delivered:
      return "delivered";
    default:
      return "pending";
  }
}

// ── Map backend Order → frontend Order ────────────────────────────────────────
function mapOrder(b: BackendOrder, listing?: Listing | null): Order {
  return {
    id: String(b.id),
    listingId: String(b.listingId),
    listingTitle: listing?.title ?? "",
    listingImage: listing?.images?.[0] ?? undefined,
    buyerId: b.buyerId.toString(),
    sellerId: b.sellerId.toString(),
    priceInCents: b.priceInCents,
    status: mapOrderStatus(b.status),
    createdAt: b.createdAt,
    stripeSessionId: b.stripeSessionId || undefined,
  };
}

// ── My orders (with listing data enrichment) ──────────────────────────────────
export function useMyOrders() {
  const { actor, isFetching } = useBackend();
  return useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const results = await actor.getMyOrders();
        // Enrich each order with listing title + image
        const enriched = await Promise.all(
          (results ?? []).map(async (b) => {
            try {
              const listing = await actor.getListing(b.listingId);
              // Inline map to avoid circular dependency with mapListing
              const mapped: Listing | null = listing
                ? ({
                    id: String(listing.id),
                    title: listing.title,
                    description: listing.description,
                    priceInCents: listing.priceInCents,
                    condition: "good" as Listing["condition"],
                    category: "Other" as Listing["category"],
                    images: listing.images,
                    sellerId: listing.sellerId.toString(),
                    sellerName: listing.sellerName ?? "",
                    status: listing.status,
                    createdAt: listing.createdAt,
                    updatedAt: listing.updatedAt,
                  } as Listing)
                : null;
              return mapOrder(b, mapped);
            } catch {
              return mapOrder(b, null);
            }
          }),
        );
        return enriched;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Single order (enriched) ───────────────────────────────────────────────────
export function useOrder(id: string | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      const result = await actor.getOrder(BigInt(id));
      if (!result) return null;
      try {
        const listing = await actor.getListing(result.listingId);
        const mapped: Listing | null = listing
          ? ({
              id: String(listing.id),
              title: listing.title,
              description: listing.description,
              priceInCents: listing.priceInCents,
              condition: "good" as Listing["condition"],
              category: "Other" as Listing["category"],
              images: listing.images,
              sellerId: listing.sellerId.toString(),
              sellerName: listing.sellerName ?? "",
              status: listing.status,
              createdAt: listing.createdAt,
              updatedAt: listing.updatedAt,
            } as Listing)
          : null;
        return mapOrder(result, mapped);
      } catch {
        return mapOrder(result, null);
      }
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// ── Create checkout session ───────────────────────────────────────────────────
export function useCreateCheckoutSession() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (listing: Listing): Promise<string> => {
      if (!actor) throw new Error("Not connected");
      const item = {
        productName: listing.title,
        currency: "usd",
        quantity: BigInt(1),
        priceInCents: listing.priceInCents,
        productDescription: listing.description.slice(0, 200),
      };
      const successUrl = `${window.location.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/listings/${listing.id}`;
      return actor.createCheckoutSession([item], successUrl, cancelUrl);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

// ── Update order status ───────────────────────────────────────────────────────
export function useUpdateOrderStatus() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatusFromSession(sessionId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}
