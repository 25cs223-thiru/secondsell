import { c as createLucideIcon, u as useAuth, d as useNavigate, k as useMyOrders, w as useUpdateOrderStatus, r as reactExports, j as jsxRuntimeExports, q as Skeleton, P as Package, B as Button, n as AnimatePresence, m as motion, C as CircleCheck, x as CircleAlert, v as Clock, l as ShoppingBag, L as Link, A as ArrowRight, s as useUserProfile, U as User, o as Separator } from "./index-DS9SGZgY.js";
import { C as CircleX, P as PriceDisplay } from "./PriceDisplay-CU7qbh0Q.js";
import { B as Badge } from "./badge-Da6mwtC-.js";
import { P as PackageCheck } from "./package-check-Shnq-bFO.js";
import { C as ChevronDown } from "./chevron-down-DDfZ2P0s.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
const Box = createLucideIcon("box", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    badgeClass: "bg-warning/15 text-warning-foreground border-warning/40 dark:bg-warning/20",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" })
  },
  paid: {
    label: "Completed",
    badgeClass: "bg-success/15 text-success-foreground border-success/40 dark:bg-success/20",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" })
  },
  shipped: {
    label: "Shipped",
    badgeClass: "bg-accent/15 text-accent border-accent/40 dark:bg-accent/20",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3 h-3" })
  },
  delivered: {
    label: "Delivered",
    badgeClass: "bg-secondary/15 text-secondary-foreground border-secondary/40 dark:bg-secondary/20",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "w-3 h-3" })
  },
  cancelled: {
    label: "Cancelled",
    badgeClass: "bg-muted text-muted-foreground border-border",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" })
  }
};
function LazyThumb({ src, alt }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const [errored, setErrored] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full", children: [
    !loaded && !errored && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: errored ? "/assets/images/placeholder.svg" : src,
        alt,
        loading: "lazy",
        onLoad: () => setLoaded(true),
        onError: () => {
          setErrored(true);
          setLoaded(true);
        },
        className: `w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`
      }
    )
  ] });
}
function useSellerName(sellerId) {
  const { data: profile } = useUserProfile(sellerId || void 0);
  if (profile == null ? void 0 : profile.name) return profile.name;
  if (!sellerId) return "Unknown Seller";
  return sellerId.length > 10 ? `${sellerId.slice(0, 10)}…` : sellerId;
}
function OrderDetailPanel({ order }) {
  const sellerName = useSellerName(order.sellerId);
  const dateStr = new Date(
    Number(order.createdAt) / 1e6
  ).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const isDelivered = order.status === "delivered" || order.status === "paid";
  const isShipped = order.status === "shipped" || order.status === "delivered" || order.status === "paid";
  const deliveryNote = isDelivered ? "Your item has been delivered." : isShipped ? "Estimated delivery in 3–7 business days." : order.status === "cancelled" ? "This order was cancelled. No charge was made." : "Awaiting seller confirmation. Estimated dispatch within 1–2 business days.";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto" },
      exit: { opacity: 0, height: 0 },
      transition: { duration: 0.25, ease: "easeInOut" },
      className: "overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border mx-4 pt-4 pb-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Order ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground break-all select-all", children: order.id })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Seller" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: sellerName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Order Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: dateStr })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Amount paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceDisplay,
                {
                  priceCents: order.priceInCents,
                  size: "md",
                  className: "font-bold text-foreground"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Delivery Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 text-sm", children: deliveryNote })
          ] })
        ] }),
        order.stripeSessionId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Payment Reference" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground break-all select-all", children: order.stripeSessionId })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function OrderCard({ order, index }) {
  var _a, _b;
  const config = STATUS_CONFIG[order.status];
  const [expanded, setExpanded] = reactExports.useState(false);
  const sellerName = useSellerName(order.sellerId);
  const dateStr = new Date(
    Number(order.createdAt) / 1e6
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const imageUrl = order.listingImage ? ((_b = (_a = order.listingImage).getDirectURL) == null ? void 0 : _b.call(_a)) ?? "/assets/images/placeholder.svg" : "/assets/images/placeholder.svg";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.28, delay: index * 0.06 },
      "data-ocid": `orders.item.${index + 1}`,
      className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle hover:shadow-card-hover transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/listings/$id",
              params: { id: order.listingId },
              className: "shrink-0",
              "data-ocid": `orders.listing_link.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden bg-muted border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyThumb, { src: imageUrl, alt: order.listingTitle }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/listings/$id",
                    params: { id: order.listingId },
                    "data-ocid": `orders.title_link.${index + 1}`,
                    className: "font-display font-semibold text-foreground hover:text-primary transition-colors line-clamp-1 block",
                    children: order.listingTitle
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
                  "Seller: ",
                  sellerName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: dateStr })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceDisplay,
                {
                  priceCents: order.priceInCents,
                  size: "md",
                  className: "font-bold shrink-0 text-foreground"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3 gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  "data-ocid": `orders.status_badge.${index + 1}`,
                  className: `text-xs flex items-center gap-1 ${config.badgeClass}`,
                  children: [
                    config.icon,
                    config.label
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/listings/$id",
                    params: { id: order.listingId },
                    "data-ocid": `orders.view_listing_link.${index + 1}`,
                    className: "text-xs text-muted-foreground hover:text-primary flex items-center gap-0.5 transition-colors",
                    children: [
                      "View listing",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpanded((v) => !v),
                    "data-ocid": `orders.toggle_details.${index + 1}`,
                    className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors touch-target",
                    "aria-expanded": expanded,
                    "aria-label": expanded ? "Hide order details" : "Show order details",
                    children: [
                      "Details",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronDown,
                        {
                          className: `w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`
                        }
                      )
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(OrderDetailPanel, { order }) })
      ]
    }
  );
}
function OrderSkeleton({ count = 4 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders.loading_state", children: Array.from({ length: count }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-20 rounded-lg shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
        ] })
      ] })
    ] }) }, i)
  )) });
}
function Banner({
  kind,
  onDismiss
}) {
  const isSuccess = kind === "success";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.25 },
      "data-ocid": isSuccess ? "orders.success_state" : "orders.error_state",
      className: `flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${isSuccess ? "bg-success/10 border-success/30 text-foreground" : "bg-warning/10 border-warning/30 text-foreground"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 shrink-0", children: isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-warning-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold font-display", children: isSuccess ? "Payment confirmed!" : "Order cancelled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: isSuccess ? "Your purchase is confirmed. The seller will arrange shipping soon." : "Your order was cancelled and no charge was made." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            "aria-label": "Dismiss notification",
            "data-ocid": "orders.dismiss_banner_button",
            className: "ml-auto shrink-0 p-1 rounded hover:opacity-70 transition-opacity",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
function EmptyOrders() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3 },
      className: "flex flex-col items-center justify-center py-20 text-center",
      "data-ocid": "orders.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-2", children: "No orders yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs mb-6", children: "When you buy something, your orders will appear here. Start browsing to find something you love." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "orders.browse_cta_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-primary text-primary-foreground hover:bg-primary/90",
            "data-ocid": "orders.browse_cta_button",
            children: [
              "Browse listings",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1.5" })
            ]
          }
        ) })
      ]
    }
  );
}
function OrdersPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const navigate = useNavigate();
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const sessionId = searchParams.get("session_id");
  const cancelled = searchParams.get("cancelled");
  const { data: orders, isLoading } = useMyOrders();
  const updateOrderStatus = useUpdateOrderStatus();
  const [banner, setBanner] = reactExports.useState(null);
  const confirmedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);
  const mutate = updateOrderStatus.mutate;
  reactExports.useEffect(() => {
    if (sessionId && !confirmedRef.current) {
      confirmedRef.current = true;
      mutate(sessionId, {
        onSettled: () => {
          setBanner("success");
          const url = new URL(window.location.href);
          url.searchParams.delete("session_id");
          window.history.replaceState({}, "", url.toString());
        }
      });
    }
  }, [sessionId, mutate]);
  reactExports.useEffect(() => {
    if (cancelled === "true") {
      setBanner("cancelled");
      const url = new URL(window.location.href);
      url.searchParams.delete("cancelled");
      window.history.replaceState({}, "", url.toString());
    }
  }, [cancelled]);
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-44 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeleton, { count: 3 })
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-20 max-w-md text-center",
        "data-ocid": "orders.auth_guard",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold mb-2", children: "Sign in to view orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Track your purchases and manage your order history." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: login,
              className: "bg-primary text-primary-foreground hover:bg-primary/90",
              "data-ocid": "orders.login_button",
              children: "Sign in"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-[calc(100vh-4rem)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-6 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display text-2xl font-bold text-foreground tracking-tight",
            "data-ocid": "orders.page",
            children: "My Orders"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your purchase history · tap an order to see full details" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-2xl space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: banner && /* @__PURE__ */ jsxRuntimeExports.jsx(Banner, { kind: banner, onDismiss: () => setBanner(null) }) }),
      orders && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-2 flex-wrap",
          "data-ocid": "orders.status_legend",
          children: [
            ["pending", "Pending"],
            ["paid", "Completed"],
            ["shipped", "Shipped"],
            ["delivered", "Delivered"],
            ["cancelled", "Cancelled"]
          ].map(([status, label]) => {
            const cfg = STATUS_CONFIG[status];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium ${cfg.badgeClass}`,
                children: [
                  cfg.icon,
                  label
                ]
              },
              status
            );
          })
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeleton, { count: 4 }) : !(orders == null ? void 0 : orders.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyOrders, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders.list", children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: i }, order.id)) })
    ] })
  ] });
}
export {
  OrdersPage as default
};
