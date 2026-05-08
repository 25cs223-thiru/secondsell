import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import OrderConfirmationPage from "@/pages/OrderConfirmation";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ── Lazy pages ────────────────────────────────────────────────────────────────
const HomePage = lazy(() => import("@/pages/Home"));
const ListingDetailPage = lazy(() => import("@/pages/ListingDetail"));
const SellPage = lazy(() => import("@/pages/Sell"));
const EditListingPage = lazy(() => import("@/pages/EditListing"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const SellerProfilePage = lazy(() =>
  import("@/pages/Profile").then((m) => ({ default: m.SellerProfilePage })),
);
const OrdersPage = lazy(() => import("@/pages/Orders"));

// ── Loading fallback ──────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
          <div key={k} className="space-y-2">
            <Skeleton className="aspect-[4/5] rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Router error fallback ─────────────────────────────────────────────────────────
function RouterError() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div style={{ fontSize: "40px" }}>⚠️</div>
      <p style={{ fontWeight: 600, fontSize: "18px", margin: 0 }}>
        Page failed to load
      </p>
      <p style={{ color: "#888", margin: 0 }}>
        Something went wrong while loading this page.
      </p>
      <button
        type="button"
        onClick={() => window.location.replace("/")}
        style={{
          marginTop: "8px",
          padding: "8px 24px",
          borderRadius: "6px",
          border: "none",
          background: "#6d28d9",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Go to home
      </button>
    </div>
  );
}

// ── Root layout route ─────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
  errorComponent: RouterError,
});

// ── Routes ────────────────────────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const listingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings/$id",
  component: ListingDetailPage,
});

const sellRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sell",
  component: SellPage,
});

const editListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings/$id/edit",
  component: EditListingPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const sellerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/$userId",
  component: SellerProfilePage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: OrdersPage,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: OrderConfirmationPage,
});
// ── Router ────────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  listingDetailRoute,
  sellRoute,
  editListingRoute,
  profileRoute,
  sellerProfileRoute,
  ordersRoute,
  orderConfirmationRoute,
]);

const router = createRouter({ routeTree, defaultErrorComponent: RouterError });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
