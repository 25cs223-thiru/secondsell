import type { backendInterface, Listing, UserProfile, Order, ListingPage, StripeSessionStatus, TransformationOutput, _ImmutableObjectStorageCreateCertificateResult, _ImmutableObjectStorageRefillResult } from "../backend";
import { ListingCondition, ListingStatus, OrderStatus, UserRole } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockUserId = { _isPrincipal: true, toText: () => "aaaaa-aa" } as unknown as Principal;
const mockUserId2 = { _isPrincipal: true, toText: () => "bbbbb-bb" } as unknown as Principal;
const mockUserId3 = { _isPrincipal: true, toText: () => "ccccc-cc" } as unknown as Principal;

const mockListings: Listing[] = [
  // ── Clothing ──────────────────────────────────────────────────────────────
  {
    id: BigInt(1), status: ListingStatus.active, title: "Vintage Denim Jacket",
    createdAt: BigInt(Date.now() - 86400000 * 5), updatedAt: BigInt(Date.now() - 86400000 * 5),
    description: "Classic 90s Levi's denim jacket in medium wash. Size M. Light wear on cuffs, all buttons intact.",
    category: "Clothing", sellerId: mockUserId, sellerName: "Alex Rivera",
    priceInCents: BigInt(4500), condition: ListingCondition.good, images: [],
  },
  {
    id: BigInt(2), status: ListingStatus.active, title: "Floral Wrap Midi Dress",
    createdAt: BigInt(Date.now() - 86400000 * 3), updatedAt: BigInt(Date.now() - 86400000 * 3),
    description: "Beautiful floral print wrap dress, size S. Worn twice, dry-cleaned.",
    category: "Clothing", sellerId: mockUserId2, sellerName: "Jordan Blake",
    priceInCents: BigInt(2800), condition: ListingCondition.likeNew, images: [],
  },

  // ── Accessories ───────────────────────────────────────────────────────────
  {
    id: BigInt(3), status: ListingStatus.active, title: "Leather Watch Strap — 20mm",
    createdAt: BigInt(Date.now() - 86400000 * 7), updatedAt: BigInt(Date.now() - 86400000 * 7),
    description: "Genuine Italian leather strap, dark brown, 20mm lug width. Light patina from use.",
    category: "Accessories", sellerId: mockUserId3, sellerName: "Sam Morgan",
    priceInCents: BigInt(1500), condition: ListingCondition.good, images: [],
  },
  {
    id: BigInt(4), status: ListingStatus.active, title: "Silk Patterned Scarf",
    createdAt: BigInt(Date.now() - 86400000 * 2), updatedAt: BigInt(Date.now() - 86400000 * 2),
    description: "Luxurious 100% silk scarf with geometric print in navy and gold. 70cm × 70cm. Never worn.",
    category: "Accessories", sellerId: mockUserId, sellerName: "Alex Rivera",
    priceInCents: BigInt(3200), condition: ListingCondition.new_, images: [],
  },

  // ── Shoes ─────────────────────────────────────────────────────────────────
  {
    id: BigInt(5), status: ListingStatus.active, title: "Nike Air Max 90 — Size 10",
    createdAt: BigInt(Date.now() - 86400000 * 10), updatedAt: BigInt(Date.now() - 86400000 * 10),
    description: "Iconic Nike Air Max 90 in University Red/White. Size US 10. Worn a handful of times.",
    category: "Shoes", sellerId: mockUserId2, sellerName: "Jordan Blake",
    priceInCents: BigInt(8500), condition: ListingCondition.likeNew, images: [],
  },
  {
    id: BigInt(6), status: ListingStatus.active, title: "Chelsea Leather Ankle Boots",
    createdAt: BigInt(Date.now() - 86400000 * 14), updatedAt: BigInt(Date.now() - 86400000 * 14),
    description: "Classic black leather Chelsea boots, women's size 7. Some heel wear but uppers in great shape.",
    category: "Shoes", sellerId: mockUserId3, sellerName: "Sam Morgan",
    priceInCents: BigInt(3900), condition: ListingCondition.fair, images: [],
  },

  // ── Bags ──────────────────────────────────────────────────────────────────
  {
    id: BigInt(7), status: ListingStatus.active, title: "Canvas Tote Bag — Natural",
    createdAt: BigInt(Date.now() - 86400000 * 1), updatedAt: BigInt(Date.now() - 86400000 * 1),
    description: "Heavy-duty canvas tote, natural color with interior zip pocket. Barely used.",
    category: "Bags", sellerId: mockUserId, sellerName: "Alex Rivera",
    priceInCents: BigInt(1800), condition: ListingCondition.likeNew, images: [],
  },
  {
    id: BigInt(8), status: ListingStatus.active, title: "Leather Crossbody Messenger Bag",
    createdAt: BigInt(Date.now() - 86400000 * 8), updatedAt: BigInt(Date.now() - 86400000 * 8),
    description: "Tan full-grain leather crossbody with adjustable strap and brass hardware. Fits 13\" laptop.",
    category: "Bags", sellerId: mockUserId2, sellerName: "Jordan Blake",
    priceInCents: BigInt(11000), condition: ListingCondition.good, images: [],
  },

  // ── Jewelry ───────────────────────────────────────────────────────────────
  {
    id: BigInt(9), status: ListingStatus.active, title: "Sterling Silver Ring — Size 7",
    createdAt: BigInt(Date.now() - 86400000 * 4), updatedAt: BigInt(Date.now() - 86400000 * 4),
    description: "Delicate band ring in 925 sterling silver with a small moonstone. Size 7.",
    category: "Jewelry", sellerId: mockUserId3, sellerName: "Sam Morgan",
    priceInCents: BigInt(2200), condition: ListingCondition.good, images: [],
  },
  {
    id: BigInt(10), status: ListingStatus.active, title: "Gold-Filled Hoop Earrings",
    createdAt: BigInt(Date.now() - 86400000 * 6), updatedAt: BigInt(Date.now() - 86400000 * 6),
    description: "14k gold-filled huggie hoops, 15mm diameter. Hypoallergenic posts.",
    category: "Jewelry", sellerId: mockUserId, sellerName: "Alex Rivera",
    priceInCents: BigInt(1600), condition: ListingCondition.likeNew, images: [],
  },

  // ── Home ──────────────────────────────────────────────────────────────────
  {
    id: BigInt(11), status: ListingStatus.active, title: "Ceramic Coffee Mug Set (4 pcs)",
    createdAt: BigInt(Date.now() - 86400000 * 9), updatedAt: BigInt(Date.now() - 86400000 * 9),
    description: "Set of 4 hand-thrown ceramic mugs in matte terracotta. Each holds 12 oz. Dishwasher safe.",
    category: "Home", sellerId: mockUserId2, sellerName: "Jordan Blake",
    priceInCents: BigInt(3400), condition: ListingCondition.likeNew, images: [],
  },
  {
    id: BigInt(12), status: ListingStatus.active, title: "Woven Jute Area Rug 5×7",
    createdAt: BigInt(Date.now() - 86400000 * 20), updatedAt: BigInt(Date.now() - 86400000 * 20),
    description: "Natural jute flatweave rug, 5 ft × 7 ft. Warm earthy tone, great for living room or bedroom.",
    category: "Home", sellerId: mockUserId3, sellerName: "Sam Morgan",
    priceInCents: BigInt(5500), condition: ListingCondition.good, images: [],
  },

  // ── Books ─────────────────────────────────────────────────────────────────
  {
    id: BigInt(13), status: ListingStatus.active, title: "The Great Gatsby (Paperback)",
    createdAt: BigInt(Date.now() - 86400000 * 12), updatedAt: BigInt(Date.now() - 86400000 * 12),
    description: "F. Scott Fitzgerald classic paperback edition. Spine is tight, pages slightly yellowed.",
    category: "Books", sellerId: mockUserId, sellerName: "Alex Rivera",
    priceInCents: BigInt(700), condition: ListingCondition.fair, images: [],
  },
  {
    id: BigInt(14), status: ListingStatus.active, title: "Atomic Habits — James Clear",
    createdAt: BigInt(Date.now() - 86400000 * 2), updatedAt: BigInt(Date.now() - 86400000 * 2),
    description: "Hardcover first edition of Atomic Habits. Barely any highlights, no writing inside.",
    category: "Books", sellerId: mockUserId2, sellerName: "Jordan Blake",
    priceInCents: BigInt(1200), condition: ListingCondition.likeNew, images: [],
  },

  // ── Electronics ───────────────────────────────────────────────────────────
  {
    id: BigInt(15), status: ListingStatus.active, title: "Wireless Earbuds — Jabra Elite 7",
    createdAt: BigInt(Date.now() - 86400000 * 11), updatedAt: BigInt(Date.now() - 86400000 * 11),
    description: "Jabra Elite 7 Active earbuds with charging case. ANC, 8h battery.",
    category: "Electronics", sellerId: mockUserId3, sellerName: "Sam Morgan",
    priceInCents: BigInt(7500), condition: ListingCondition.good, images: [],
  },
  {
    id: BigInt(16), status: ListingStatus.active, title: "Kindle Paperwhite (10th Gen)",
    createdAt: BigInt(Date.now() - 86400000 * 18), updatedAt: BigInt(Date.now() - 86400000 * 18),
    description: "Amazon Kindle Paperwhite 10th gen, 8GB, waterproof. Screen is flawless.",
    category: "Electronics", sellerId: mockUserId, sellerName: "Alex Rivera",
    priceInCents: BigInt(5500), condition: ListingCondition.good, images: [],
  },

  // ── Sports ────────────────────────────────────────────────────────────────
  {
    id: BigInt(17), status: ListingStatus.active, title: "Lululemon Yoga Mat 5mm",
    createdAt: BigInt(Date.now() - 86400000 * 6), updatedAt: BigInt(Date.now() - 86400000 * 6),
    description: "Lululemon The Mat 5mm in deep navy. Non-slip texture, excellent grip.",
    category: "Sports", sellerId: mockUserId2, sellerName: "Jordan Blake",
    priceInCents: BigInt(4800), condition: ListingCondition.good, images: [],
  },
  {
    id: BigInt(18), status: ListingStatus.active, title: "Trek Mountain Bike — 21-Speed",
    createdAt: BigInt(Date.now() - 86400000 * 25), updatedAt: BigInt(Date.now() - 86400000 * 25),
    description: "Trek Marlin 6 mountain bike, 21-speed, size L. Recently serviced.",
    category: "Sports", sellerId: mockUserId3, sellerName: "Sam Morgan",
    priceInCents: BigInt(32000), condition: ListingCondition.good, images: [],
  },

  // ── Other ─────────────────────────────────────────────────────────────────
  {
    id: BigInt(19), status: ListingStatus.active, title: "Board Game — Catan (5th Ed.)",
    createdAt: BigInt(Date.now() - 86400000 * 15), updatedAt: BigInt(Date.now() - 86400000 * 15),
    description: "Settlers of Catan 5th edition. All pieces accounted for, cards unlaminated but clean.",
    category: "Other", sellerId: mockUserId, sellerName: "Alex Rivera",
    priceInCents: BigInt(2200), condition: ListingCondition.good, images: [],
  },
  {
    id: BigInt(20), status: ListingStatus.active, title: "Polaroid Now Camera — White",
    createdAt: BigInt(Date.now() - 86400000 * 7), updatedAt: BigInt(Date.now() - 86400000 * 7),
    description: "Polaroid Now instant camera in white. Works perfectly. Includes neck strap.",
    category: "Other", sellerId: mockUserId2, sellerName: "Jordan Blake",
    priceInCents: BigInt(6500), condition: ListingCondition.likeNew, images: [],
  },
];

const mockUserProfile: UserProfile = {
  bio: "Selling quality secondhand items. Fast shipping, honest descriptions.",
  username: "terranova",
  userId: mockUserId,
  createdAt: BigInt(Date.now() - 86400000 * 30),
  listingCount: BigInt(mockListings.length),
};

const mockOrders: Order[] = [
  {
    id: BigInt(1),
    status: OrderStatus.paid,
    listingId: BigInt(1),
    createdAt: BigInt(Date.now() - 86400000 * 3),
    updatedAt: BigInt(Date.now() - 86400000 * 2),
    buyerId: mockUserId,
    sellerId: mockUserId,
    stripeSessionId: "sess_mock_001",
    priceInCents: BigInt(4500),
  },
];

export const mockBackend: backendInterface = {
  assignCallerUserRole: async (_user: Principal, _role: UserRole) => undefined,
  createCheckoutSession: async (_items, _successUrl, _cancelUrl) => "sess_mock_checkout",
  createListing: async (args) => ({
    id: BigInt(99),
    status: ListingStatus.active,
    title: args.title,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
    description: args.description,
    category: args.category,
    sellerId: mockUserId,
    sellerName: "Alex Rivera",
    priceInCents: args.priceInCents,
    condition: args.condition,
    images: args.images,
    brand: args.brand,
    size: args.size,
  }),
  deleteListing: async (_id) => undefined,
  getActiveListings: async (_offset, _limit): Promise<ListingPage> => ({
    total: BigInt(mockListings.length),
    listings: mockListings,
  }),
  getCallerUserProfile: async () => mockUserProfile,
  getCallerUserRole: async () => UserRole.user,
  getListing: async (id) => mockListings.find((l) => l.id === id) ?? null,
  getMyListings: async () => mockListings,
  getMyOrders: async () => mockOrders,
  getOrder: async (id) => mockOrders.find((o) => o.id === id) ?? null,
  getStripeSessionStatus: async (_sessionId): Promise<StripeSessionStatus> => ({
    __kind__: "completed",
    completed: { userPrincipal: "aaaaa-aa", response: "ok" },
  }),
  getUserProfile: async (_userId) => mockUserProfile,
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => true,
  placeOrder: async (_listingId, _successUrl, _cancelUrl) => "sess_mock_place_order",
  markListingAsSold: async (_id) => undefined,
  saveCallerUserProfile: async (_profile) => undefined,
  searchListings: async (keyword, category, _offset, _limit): Promise<ListingPage> => {
    let results = mockListings;
    if (category) results = results.filter((l) => l.category === category);
    if (keyword) results = results.filter((l) => l.title.toLowerCase().includes(keyword.toLowerCase()));
    return { total: BigInt(results.length), listings: results };
  },
  setStripeConfiguration: async (_config) => undefined,
  transform: async (input): Promise<TransformationOutput> => ({
    status: input.response.status,
    body: input.response.body,
    headers: input.response.headers,
  }),
  updateListing: async (_args) => undefined,
  updateOrderStatusFromSession: async (_sessionId) => null,
  _immutableObjectStorageBlobsAreLive: async (hashes) => hashes.map(() => true),
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({
    method: "GET",
    blob_hash: _blobHash,
  }),
  _immutableObjectStorageRefillCashier: async (_refillInformation): Promise<_ImmutableObjectStorageRefillResult> => ({
    success: true,
    topped_up_amount: BigInt(0),
  }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
};
