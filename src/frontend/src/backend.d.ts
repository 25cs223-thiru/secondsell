import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Listing {
    id: ListingId;
    status: ListingStatus;
    title: string;
    createdAt: Timestamp;
    size?: string;
    description: string;
    sellerName?: string;
    updatedAt: Timestamp;
    category: string;
    brand?: string;
    sellerId: UserId;
    priceInCents: bigint;
    condition: ListingCondition;
    images: Array<ExternalBlob>;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    listingId: ListingId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    buyerId: UserId;
    sellerId: UserId;
    stripeSessionId: string;
    priceInCents: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface UpdateListingArgs {
    id: ListingId;
    title: string;
    size?: string;
    description: string;
    category: string;
    brand?: string;
    priceInCents: bigint;
    condition: ListingCondition;
    images: Array<ExternalBlob>;
}
export type UserId = Principal;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface ListingPage {
    total: bigint;
    nextOffset?: bigint;
    listings: Array<Listing>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type ListingId = bigint;
export interface CreateListingArgs {
    title: string;
    size?: string;
    description: string;
    category: string;
    brand?: string;
    priceInCents: bigint;
    condition: ListingCondition;
    images: Array<ExternalBlob>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    bio: string;
    username: string;
    userId: UserId;
    createdAt: Timestamp;
    avatarUrl?: ExternalBlob;
    listingCount: bigint;
}
export type OrderId = bigint;
export enum ListingCondition {
    new_ = "new",
    fair = "fair",
    good = "good",
    poor = "poor",
    likeNew = "likeNew"
}
export enum ListingStatus {
    deleted = "deleted",
    active = "active",
    sold = "sold"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createListing(args: CreateListingArgs): Promise<Listing>;
    deleteListing(id: ListingId): Promise<void>;
    getActiveListings(offset: bigint, limit: bigint): Promise<ListingPage>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getListing(id: ListingId): Promise<Listing | null>;
    getMyListings(): Promise<Array<Listing>>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(id: OrderId): Promise<Order | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    markListingAsSold(id: ListingId): Promise<void>;
    placeOrder(listingId: ListingId, successUrl: string, cancelUrl: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchListings(keyword: string, category: string | null, offset: bigint, limit: bigint): Promise<ListingPage>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateListing(args: UpdateListingArgs): Promise<void>;
    updateOrderStatusFromSession(sessionId: string): Promise<Order | null>;
}
