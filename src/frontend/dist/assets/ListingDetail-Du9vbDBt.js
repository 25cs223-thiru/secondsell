import { c as createLucideIcon, h as useParams, d as useNavigate, u as useAuth, i as useCreateCheckoutSession, k as useMyOrders, r as reactExports, j as jsxRuntimeExports, l as ShoppingBag, L as Link, B as Button, e as ArrowLeft, n as AnimatePresence, m as motion, o as Separator, C as CircleCheck, U as User, p as ShieldCheck, P as Package, f as ue, q as Skeleton, s as useUserProfile } from "./index-DS9SGZgY.js";
import { C as ConditionBadge } from "./ConditionBadge-CFeXQIRf.js";
import { P as PriceDisplay } from "./PriceDisplay-CU7qbh0Q.js";
import { P as Pen, A as AlertDialog, a as AlertDialogTrigger, T as Trash2, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction, D as Dialog, i as DialogContent, j as DialogHeader, k as DialogTitle, l as DialogDescription, m as DialogFooter, n as Avatar, o as AvatarFallback, M as MessageCircle } from "./dialog-lb7NEuEQ.js";
import { B as Badge } from "./badge-Da6mwtC-.js";
import { b as useListing, d as useDeleteListing, e as useMarkListingAsSold } from "./useListings-CXBHvI5f.js";
import { T as Tag } from "./tag-mcpUbaJM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode);
function ListingDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", "data-ocid": "listing_detail.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_96px] gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] md:aspect-[16/10] rounded-xl w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex md:flex-col gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "shrink-0 w-20 h-20 md:w-full md:aspect-square rounded-lg"
          },
          i
        )) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1fr_320px] gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-1/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" })
      ] })
    ] }) })
  ] });
}
function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full", children: [
    !loaded && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-muted animate-pulse" }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground/40" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt,
        loading: "lazy",
        onLoad: () => setLoaded(true),
        onError: () => {
          setError(true);
          setLoaded(true);
        },
        className: `w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`
      }
    )
  ] });
}
function LazyThumb({
  src,
  alt,
  active,
  onClick,
  ocid
}) {
  const [loaded, setLoaded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: `shrink-0 w-20 h-20 md:w-full md:aspect-square rounded-lg overflow-hidden border-2 transition-smooth relative ${active ? "border-accent ring-1 ring-accent/50" : "border-border hover:border-accent/50 opacity-70 hover:opacity-100"}`,
      children: [
        !loaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-muted animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt,
            loading: "lazy",
            onLoad: () => setLoaded(true),
            className: `w-full h-full object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`
          }
        )
      ]
    }
  );
}
function SellerCard({ sellerId, sellerName, isOwner }) {
  var _a;
  const { data: profile } = useUserProfile(sellerId);
  let avatarUrl = null;
  try {
    const raw = profile == null ? void 0 : profile.avatar;
    avatarUrl = ((_a = raw == null ? void 0 : raw.getDirectURL) == null ? void 0 : _a.call(raw)) ?? null;
  } catch {
    avatarUrl = null;
  }
  const initials = (sellerName || "?").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const joinedDate = (profile == null ? void 0 : profile.joinedAt) ? new Date(Number(profile.joinedAt) / 1e6) : null;
  const joinedLabel = joinedDate ? joinedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : null;
  const handleMessageSeller = () => {
    ue.info("Messaging is coming soon! Check back later.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-4",
      "data-ocid": "listing_detail.seller_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Seller" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-12 w-12 border-2 border-border shrink-0", children: [
            avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: avatarUrl,
                alt: sellerName,
                className: "object-cover",
                loading: "lazy"
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-semibold text-sm", children: initials })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate leading-tight", children: sellerName || "Unknown Seller" }),
            (profile == null ? void 0 : profile.bio) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 mt-0.5", children: profile.bio })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          typeof (profile == null ? void 0 : profile.totalListings) === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/60 rounded-lg px-3 py-2.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground leading-none", children: profile.totalListings }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: profile.totalListings === 1 ? "Listing" : "Listings" })
          ] }),
          typeof (profile == null ? void 0 : profile.totalSales) === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/60 rounded-lg px-3 py-2.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground leading-none", children: profile.totalSales }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: profile.totalSales === 1 ? "Sale" : "Sales" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          joinedLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 shrink-0 text-accent/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Member since ",
              joinedLabel
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 shrink-0 text-accent/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Internet Identity verified" })
          ] })
        ] }),
        !isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full border-border hover:border-accent/50 hover:bg-accent/5 text-sm",
            onClick: handleMessageSeller,
            "data-ocid": "listing_detail.message_seller_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 mr-2 text-accent" }),
              "Message seller"
            ]
          }
        )
      ]
    }
  );
}
function SpecRow({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm py-2.5 border-b border-border/60 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-20 shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground min-w-0 break-words flex-1", children: value })
  ] });
}
function ListingDetailPage() {
  var _a, _b;
  const { id } = useParams({ from: "/listings/$id" });
  const navigate = useNavigate();
  const { data: listing, isLoading } = useListing(id);
  const { isAuthenticated, principalId } = useAuth();
  const checkout = useCreateCheckoutSession();
  const deleteListing = useDeleteListing();
  const markAsSold = useMarkListingAsSold();
  const { data: myOrders } = useMyOrders();
  const [activeImageIdx, setActiveImageIdx] = reactExports.useState(0);
  const hasOrderForListing = (myOrders == null ? void 0 : myOrders.some((o) => o.listingId === id)) ?? false;
  const [confirmOpen, setConfirmOpen] = reactExports.useState(false);
  const handleBuyClick = () => {
    if (!isAuthenticated) {
      ue.error("Sign in to purchase items.");
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
      ue.error("Checkout failed. Please try again.");
    }
  };
  const handleDelete = async () => {
    try {
      await deleteListing.mutateAsync(id);
      ue.success("Listing deleted.");
      navigate({ to: "/" });
    } catch {
      ue.error("Failed to delete listing.");
    }
  };
  const handleMarkSold = async () => {
    try {
      await markAsSold.mutateAsync(id);
      ue.success("Listing marked as sold.");
    } catch {
      ue.error("Failed to update listing.");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ListingDetailSkeleton, {});
  if (!listing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container mx-auto px-4 py-24 text-center",
        "data-ocid": "listing_detail.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-3", children: "Listing not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "This item may have been sold or removed by the seller." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "listing_detail.back_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            "Back to shop"
          ] }) })
        ] })
      }
    );
  }
  const images = listing.images ?? [];
  const activeImage = ((_b = (_a = images[activeImageIdx]) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? "/assets/images/placeholder.svg";
  const isOwner = principalId === listing.sellerId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", "data-ocid": "listing_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors duration-200 group",
          "data-ocid": "listing_detail.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" }),
            "Back to listings"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", "data-ocid": "listing_detail.gallery", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_96px] lg:grid-cols-[1fr_112px] gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden bg-card border border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0.5, scale: 0.99 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.2, ease: "easeOut" },
            className: "w-full h-full",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyImage, { src: activeImage, alt: listing.title })
          },
          activeImageIdx
        ) }) }),
        images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-1 md:pb-0", children: images.map((img, i) => {
          var _a2;
          const thumbUrl = ((_a2 = img.getDirectURL) == null ? void 0 : _a2.call(img)) ?? "/assets/images/placeholder.svg";
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            LazyThumb,
            {
              src: thumbUrl,
              alt: `View ${i + 1}`,
              active: i === activeImageIdx,
              onClick: () => setActiveImageIdx(i),
              ocid: `listing_detail.thumbnail.${i + 1}`
            },
            thumbUrl
          );
        }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto grid md:grid-cols-[1fr_320px] gap-10 lg:gap-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: "easeOut" },
          className: "space-y-6 min-w-0",
          "data-ocid": "listing_detail.info",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ConditionBadge,
                  {
                    condition: listing.condition,
                    size: "md",
                    showTooltip: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-normal", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 mr-1" }),
                  listing.category
                ] }),
                listing.status === "sold" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/10 text-destructive border-destructive/20", children: "Sold" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight break-words", children: listing.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { priceCents: listing.priceInCents, size: "lg" }),
                listing.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full", children: "Available" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1", children: "Specifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/60 px-3 divide-y divide-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SpecRow, { icon: Tag, label: "Category", value: listing.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SpecRow,
                  {
                    icon: CircleCheck,
                    label: "Condition",
                    value: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ConditionBadge,
                      {
                        condition: listing.condition,
                        size: "sm",
                        showTooltip: true
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SpecRow,
                  {
                    icon: ShoppingBag,
                    label: "Price",
                    value: /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { priceCents: listing.priceInCents, size: "sm" })
                  }
                ),
                listing.brand && /* @__PURE__ */ jsxRuntimeExports.jsx(SpecRow, { icon: Tag, label: "Brand", value: listing.brand }),
                listing.size && /* @__PURE__ */ jsxRuntimeExports.jsx(SpecRow, { icon: Ruler, label: "Size", value: listing.size }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SpecRow,
                  {
                    icon: User,
                    label: "Seller",
                    value: listing.sellerName
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "About this item" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap break-words", children: listing.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-4 flex flex-wrap gap-x-6 gap-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-accent shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secure checkout via Stripe" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-accent shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Verified seller identity" })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.1, ease: "easeOut" },
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PriceDisplay, { priceCents: listing.priceInCents, size: "lg" }),
                listing.status === "sold" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full", children: "Sold" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full", children: "Available" })
              ] }),
              listing.status === "sold" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-muted-foreground bg-muted/60 rounded-lg px-4 py-3",
                  "data-ocid": "listing_detail.sold_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Item sold" })
                  ]
                }
              ) : isOwner ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                hasOrderForListing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full border-accent/40 text-accent hover:bg-accent/10",
                    onClick: handleMarkSold,
                    disabled: markAsSold.isPending,
                    "data-ocid": "listing_detail.mark_sold_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2" }),
                      markAsSold.isPending ? "Updating…" : "Mark as sold"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/listings/$id/edit",
                    params: { id: listing.id },
                    className: "block",
                    "data-ocid": "listing_detail.edit_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4 mr-2" }),
                      "Edit listing"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      className: "w-full text-destructive hover:bg-destructive/10 hover:text-destructive",
                      "data-ocid": "listing_detail.delete_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                        "Delete listing"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "listing_detail.dialog", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this listing?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                        'This will permanently remove "',
                        listing.title,
                        '" from the marketplace. This action cannot be undone.'
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "listing_detail.cancel_button", children: "Cancel" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AlertDialogAction,
                        {
                          onClick: handleDelete,
                          className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                          "data-ocid": "listing_detail.confirm_button",
                          children: deleteListing.isPending ? "Deleting…" : "Delete"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "w-full h-14 text-lg font-bold bg-success text-success-foreground hover:bg-success/90 shadow-elevated transition-smooth tracking-wide",
                    onClick: handleBuyClick,
                    disabled: checkout.isPending,
                    "data-ocid": "listing_detail.buy_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 mr-2" }),
                      "Buy Now"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-accent shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secure checkout via Stripe" })
                ] }),
                !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Sign in required to purchase" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SellerCard,
              {
                sellerId: listing.sellerId,
                sellerName: listing.sellerName,
                isOwner
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "listing_detail.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: "Confirm your order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Review your order before proceeding to secure checkout." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 rounded-xl border border-border bg-muted/30 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: activeImage,
            alt: listing.title,
            className: "w-full h-full object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground line-clamp-2 text-sm leading-snug", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionBadge, { condition: listing.condition, size: "sm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Sold by",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: listing.sellerName })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-card border border-border px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PriceDisplay,
          {
            priceCents: listing.priceInCents,
            size: "lg",
            className: "font-bold"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "You'll be redirected to Stripe's secure checkout page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setConfirmOpen(false),
            disabled: checkout.isPending,
            "data-ocid": "listing_detail.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "bg-accent text-accent-foreground hover:bg-accent/90",
            onClick: handleConfirmBuy,
            disabled: checkout.isPending,
            "data-ocid": "listing_detail.confirm_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
              checkout.isPending ? "Redirecting…" : "Proceed to checkout"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ListingDetailPage as default
};
