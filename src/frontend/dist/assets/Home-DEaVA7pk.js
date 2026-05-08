import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, a as cn, r as reactExports, q as Skeleton, m as motion, t as Search, I as Input, X, B as Button, A as ArrowRight, p as ShieldCheck, v as Clock } from "./index-DS9SGZgY.js";
import { e as SlidersHorizontal, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, f as CategoryFilter } from "./select-mRGUXOsF.js";
import { B as Badge } from "./badge-Da6mwtC-.js";
import { C as ConditionBadge, S as Sparkles } from "./ConditionBadge-CFeXQIRf.js";
import { P as PriceDisplay } from "./PriceDisplay-CU7qbh0Q.js";
import { g as useListings } from "./useListings-CXBHvI5f.js";
import { T as Tag } from "./tag-mcpUbaJM.js";
import "./chevron-down-DDfZ2P0s.js";
import "./index-JPtkJw_u.js";
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
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
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
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode);
const conditionBorderClass = {
  new: "border-l-emerald-500",
  likeNew: "border-l-teal-500",
  good: "border-l-cyan-500",
  fair: "border-l-amber-500",
  poor: "border-l-red-500"
};
function SellerAvatar({ name, size = 20 }) {
  const initials = name.split(" ").slice(0, 2).map((w) => {
    var _a;
    return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "inline-flex items-center justify-center rounded-full bg-accent/20 text-accent font-bold shrink-0",
      style: { width: size, height: size, fontSize: size * 0.42 },
      "aria-label": `Seller: ${name}`,
      children: initials || "?"
    }
  );
}
function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  const fallback = "/assets/images/placeholder.svg";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full", children: [
    !loaded && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "absolute inset-0 rounded-none",
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: error ? fallback : src,
        alt,
        loading: "lazy",
        onLoad: () => setLoaded(true),
        onError: () => {
          setError(true);
          setLoaded(true);
        },
        className: cn(
          "w-full h-full object-cover group-hover:scale-105 transition-smooth",
          loaded ? "opacity-100" : "opacity-0"
        )
      }
    )
  ] });
}
function ListingCard({ listing, index = 1, onView }) {
  var _a, _b, _c;
  const imageUrl = ((_c = (_b = (_a = listing.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.getDirectURL) == null ? void 0 : _c.call(_b)) ?? "/assets/images/placeholder.svg";
  const borderClass = conditionBorderClass[listing.condition] ?? "border-l-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/listings/$id",
      params: { id: listing.id },
      "data-ocid": `listing.item.${index}`,
      onClick: () => onView == null ? void 0 : onView(listing),
      className: cn(
        "group block rounded-xl overflow-hidden bg-card border border-border border-l-4 shadow-subtle hover:shadow-elevated transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[44px]",
        borderClass
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LazyImage, { src: imageUrl, alt: listing.title }),
          listing.status === "sold" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card text-foreground text-sm font-semibold px-3 py-1 rounded-full", children: "Sold" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute top-2 right-2 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-smooth hover:bg-card touch-target",
              "aria-label": "Save to wishlist",
              onClick: (e) => e.preventDefault(),
              "data-ocid": `listing.wishlist_button.${index}`,
              style: { minHeight: 44, minWidth: 44 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionBadge, { condition: listing.condition }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground line-clamp-2 min-w-0 leading-snug", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PriceDisplay,
              {
                priceCents: listing.priceInCents,
                className: "font-semibold text-foreground"
              }
            ),
            listing.category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0", children: listing.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SellerAvatar, { name: listing.sellerName, size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate min-w-0", children: listing.sellerName })
          ] })
        ] })
      ]
    }
  );
}
const PAGE_SIZE = 12;
const RECENTLY_VIEWED_KEY = "secondsell_recently_viewed";
const MAX_RECENT = 6;
const SORT_LABELS = {
  newest: "Newest First",
  price_asc: "Price: Low → High",
  price_desc: "Price: High → Low"
};
function getRecentlyViewed() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function addRecentlyViewed(listing) {
  if (typeof window === "undefined") return;
  try {
    const prev = getRecentlyViewed().filter((l) => l.id !== listing.id);
    const next = [listing, ...prev].slice(0, MAX_RECENT);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
  } catch {
  }
}
function readUrlParams() {
  if (typeof window === "undefined")
    return {
      q: "",
      category: "",
      sort: "newest",
      minPrice: "",
      maxPrice: ""
    };
  const p = new URLSearchParams(window.location.search);
  return {
    q: p.get("q") ?? "",
    category: p.get("category") ?? "",
    sort: p.get("sort") ?? "newest",
    minPrice: p.get("minPrice") ?? "",
    maxPrice: p.get("maxPrice") ?? ""
  };
}
function sortListings(listings, sort) {
  const copy = [...listings];
  if (sort === "price_asc")
    return copy.sort((a, b) => Number(a.priceInCents - b.priceInCents));
  if (sort === "price_desc")
    return copy.sort((a, b) => Number(b.priceInCents - a.priceInCents));
  return copy.sort((a, b) => Number(b.createdAt - a.createdAt));
}
function buildCategoryCounts(listings) {
  const counts = {};
  for (const l of listings) {
    if (l.category) counts[l.category] = (counts[l.category] ?? 0) + 1;
  }
  return counts;
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "listings.loading_state",
      className: "rounded-xl overflow-hidden bg-card border border-border shadow-subtle",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] w-full rounded-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/5" })
          ] })
        ] })
      ]
    }
  );
}
function EmptyState({
  query,
  category,
  onReset
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      "data-ocid": "listings.empty_state",
      className: "flex flex-col items-center justify-center py-24 text-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground font-display", children: "No listings found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: query ? `No results for "${query}"${category ? ` in ${category}` : ""}.` : category ? `Nothing listed in ${category} yet.` : "Be the first to list something!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1 flex-wrap justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onReset,
              "data-ocid": "listings.empty_state.reset_button",
              children: "Clear filters"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "listings.empty_state.sell_button", children: [
            "List an item",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1.5" })
          ] }) })
        ] })
      ]
    }
  );
}
function SectionLabel({
  icon: Icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary uppercase tracking-widest font-display", children: label })
  ] });
}
function PriceRangeInput({
  min,
  max,
  onMin,
  onMax
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", "data-ocid": "price_range_filter", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none", children: "$" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: 0,
          placeholder: "Min",
          value: min,
          onChange: (e) => onMin(e.target.value),
          className: "pl-5 pr-2 h-9 w-20 text-sm",
          "data-ocid": "price_range.min_input",
          "aria-label": "Minimum price"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "–" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none", children: "$" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: 0,
          placeholder: "Max",
          value: max,
          onChange: (e) => onMax(e.target.value),
          className: "pl-5 pr-2 h-9 w-20 text-sm",
          "data-ocid": "price_range.max_input",
          "aria-label": "Maximum price"
        }
      )
    ] })
  ] });
}
const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Verified sellers",
    desc: "Every seller authenticated through Internet Identity."
  },
  {
    icon: Leaf,
    title: "Sustainable finds",
    desc: "Give pre-loved items a second life — better for the planet."
  },
  {
    icon: Sparkles,
    title: "Curated quality",
    desc: "Unique pieces you won't find on the high street."
  }
];
const POPULAR_CATEGORIES = [
  {
    cat: "Clothing",
    emoji: "👕",
    color: "bg-accent/10 text-accent border-accent/20"
  },
  {
    cat: "Electronics",
    emoji: "💻",
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    cat: "Shoes",
    emoji: "👟",
    color: "bg-chart-4/10 text-chart-4 border-chart-4/20"
  },
  {
    cat: "Books",
    emoji: "📚",
    color: "bg-chart-2/10 text-chart-2 border-chart-2/20"
  },
  {
    cat: "Bags",
    emoji: "👜",
    color: "bg-chart-5/10 text-chart-5 border-chart-5/20"
  },
  {
    cat: "Home",
    emoji: "🏡",
    color: "bg-success/10 text-success border-success/20"
  }
];
function Home() {
  const init = reactExports.useMemo(() => readUrlParams(), []);
  const [inputValue, setInputValue] = reactExports.useState(init.q);
  const [submittedQuery, setSubmittedQuery] = reactExports.useState(init.q);
  const [selectedCategory, setSelectedCategory] = reactExports.useState(
    init.category || null
  );
  const [sort, setSort] = reactExports.useState(init.sort);
  const [minPrice, setMinPrice] = reactExports.useState(init.minPrice);
  const [maxPrice, setMaxPrice] = reactExports.useState(init.maxPrice);
  const [visibleCount, setVisibleCount] = reactExports.useState(PAGE_SIZE);
  const [recentlyViewed, setRecentlyViewed] = reactExports.useState(
    () => getRecentlyViewed()
  );
  const [isMobileFilterOpen, setMobileFilterOpen] = reactExports.useState(false);
  const isFiltering = !!submittedQuery || !!selectedCategory || !!minPrice || !!maxPrice;
  const syncUrl = reactExports.useCallback(
    (q, cat, s, mn, mx) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("category", cat);
      if (s && s !== "newest") params.set("sort", s);
      if (mn) params.set("minPrice", mn);
      if (mx) params.set("maxPrice", mx);
      const qs = params.toString();
      if (typeof window !== "undefined") {
        const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    },
    []
  );
  const filter = reactExports.useMemo(() => {
    const f = {};
    if (submittedQuery) f.query = submittedQuery;
    if (selectedCategory) f.category = selectedCategory;
    if (minPrice)
      f.minPrice = BigInt(Math.round(Number.parseFloat(minPrice) * 100));
    if (maxPrice)
      f.maxPrice = BigInt(Math.round(Number.parseFloat(maxPrice) * 100));
    return f;
  }, [submittedQuery, selectedCategory, minPrice, maxPrice]);
  const { data: allListings, isLoading } = useListings(
    isFiltering ? filter : void 0
  );
  const rawListings = allListings ?? [];
  const { data: allForCounts } = useListings(void 0);
  const categoryCounts = reactExports.useMemo(
    () => buildCategoryCounts(allForCounts ?? []),
    [allForCounts]
  );
  const listings = reactExports.useMemo(() => {
    let result = [...rawListings];
    if (minPrice) {
      const minCents = BigInt(Math.round(Number.parseFloat(minPrice) * 100));
      result = result.filter((l) => l.priceInCents >= minCents);
    }
    if (maxPrice) {
      const maxCents = BigInt(Math.round(Number.parseFloat(maxPrice) * 100));
      result = result.filter((l) => l.priceInCents <= maxCents);
    }
    return sortListings(result, sort);
  }, [rawListings, sort, minPrice, maxPrice]);
  const featured = reactExports.useMemo(
    () => isFiltering ? [] : listings.slice(0, 4),
    [isFiltering, listings]
  );
  const remaining = reactExports.useMemo(
    () => isFiltering ? listings : listings.slice(4),
    [isFiltering, listings]
  );
  const visible = remaining.slice(0, visibleCount);
  const hasMore = visible.length < remaining.length;
  const filterKey = `${submittedQuery}|${selectedCategory}|${sort}|${minPrice}|${maxPrice}`;
  const filterKeyRef = reactExports.useRef(filterKey);
  reactExports.useEffect(() => {
    if (filterKeyRef.current !== filterKey) {
      filterKeyRef.current = filterKey;
      setVisibleCount(PAGE_SIZE);
    }
  }, [filterKey]);
  const activeFilterCount = (selectedCategory ? 1 : 0) + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0);
  function handleSearch(e) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    setSubmittedQuery(trimmed);
    syncUrl(trimmed, selectedCategory, sort, minPrice, maxPrice);
  }
  function handleClearSearch() {
    setInputValue("");
    setSubmittedQuery("");
    syncUrl("", selectedCategory, sort, minPrice, maxPrice);
  }
  function handleCategoryChange(cat) {
    setSelectedCategory(cat);
    syncUrl(submittedQuery, cat, sort, minPrice, maxPrice);
  }
  function handleSortChange(val) {
    const s = val;
    setSort(s);
    syncUrl(submittedQuery, selectedCategory, s, minPrice, maxPrice);
  }
  function handleMinPrice(v) {
    setMinPrice(v);
    syncUrl(submittedQuery, selectedCategory, sort, v, maxPrice);
  }
  function handleMaxPrice(v) {
    setMaxPrice(v);
    syncUrl(submittedQuery, selectedCategory, sort, minPrice, v);
  }
  function handleReset() {
    setInputValue("");
    setSubmittedQuery("");
    setSelectedCategory(null);
    setMinPrice("");
    setMaxPrice("");
    syncUrl("", null, sort, "", "");
  }
  function handleListingView(listing) {
    addRecentlyViewed(listing);
    setRecentlyViewed(getRecentlyViewed());
  }
  function handlePopularCategory(cat) {
    var _a;
    setSelectedCategory(cat);
    syncUrl(submittedQuery, cat, sort, minPrice, maxPrice);
    (_a = document.getElementById("listings-section")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-gradient-to-b from-card via-muted/20 to-background border-b border-border py-12 md:py-16",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl text-center space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -14 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.45 },
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                    "Preloved. Reimagined."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight", children: [
                    "Find your next",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "favourite thing" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base md:text-lg max-w-xl mx-auto", children: "Browse quality secondhand items from trusted sellers — clothing, electronics, books, and more." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.form,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.12 },
                onSubmit: handleSearch,
                className: "flex gap-2 max-w-lg mx-auto",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "search",
                        placeholder: "Search listings…",
                        value: inputValue,
                        onChange: (e) => setInputValue(e.target.value),
                        className: "pl-9 pr-9 bg-card h-11 rounded-lg",
                        "data-ocid": "home.search_input",
                        "aria-label": "Search listings"
                      }
                    ),
                    inputValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleClearSearch,
                        className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                        "aria-label": "Clear search",
                        "data-ocid": "home.clear_search_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "h-11 px-5 font-semibold shrink-0",
                      "data-ocid": "home.search_submit_button",
                      children: "Search"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.22 },
                className: "flex gap-3 justify-center flex-wrap",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", "data-ocid": "home.sell_cta_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", className: "font-semibold", children: [
                  "Start selling",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1.5" })
                ] }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 },
              className: "container mx-auto px-4 mt-8 max-w-3xl",
              "data-ocid": "home.popular_categories",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center", children: "Popular right now" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: POPULAR_CATEGORIES.map(({ cat, emoji, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handlePopularCategory(cat),
                    "data-ocid": `popular_category.${cat.toLowerCase()}_button`,
                    className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth hover:scale-105 ${color}`,
                    style: { minHeight: 36 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat }),
                      categoryCounts[cat] !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70", children: [
                        "(",
                        categoryCounts[cat],
                        ")"
                      ] })
                    ]
                  },
                  cat
                )) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border",
        "data-ocid": "home.trust_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto", children: TRUST_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.08 },
            className: "flex items-start gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: item.desc })
              ] })
            ]
          },
          item.title
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border",
        "data-ocid": "home.filter_header",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex md:hidden items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setMobileFilterOpen((v) => !v),
                "data-ocid": "home.mobile_filter_toggle",
                className: "flex items-center gap-2 flex-1 min-h-[44px] px-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground transition-smooth hover:border-primary/40",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedCategory ?? "All categories" }),
                  activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold", children: activeFilterCount })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: handleSortChange, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-36 h-11 text-xs shrink-0",
                  "data-ocid": "home.sort_dropdown",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(SORT_LABELS).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, "data-ocid": `sort.${s}_option`, children: SORT_LABELS[s] }, s)) })
            ] })
          ] }),
          isMobileFilterOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryFilter,
              {
                selected: selectedCategory,
                onChange: (cat) => {
                  handleCategoryChange(cat);
                  setMobileFilterOpen(false);
                },
                counts: categoryCounts,
                collapsible: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceRangeInput,
                {
                  min: minPrice,
                  max: maxPrice,
                  onMin: handleMinPrice,
                  onMax: handleMaxPrice
                }
              ),
              (minPrice || maxPrice) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    handleMinPrice("");
                    handleMaxPrice("");
                  },
                  className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategoryFilter,
              {
                selected: selectedCategory,
                onChange: handleCategoryChange,
                counts: categoryCounts,
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PriceRangeInput,
                {
                  min: minPrice,
                  max: maxPrice,
                  onMin: handleMinPrice,
                  onMax: handleMaxPrice
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: handleSortChange, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-40 h-9 text-xs",
                    "data-ocid": "home.sort_dropdown",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(SORT_LABELS).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: s,
                    "data-ocid": `sort.${s}_option`,
                    children: SORT_LABELS[s]
                  },
                  s
                )) })
              ] })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background",
        "data-ocid": "home.listings_section",
        id: "listings-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-7xl", children: [
          isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Filters:" }),
            submittedQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3 h-3" }),
              submittedQuery
            ] }),
            selectedCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
              selectedCategory
            ] }),
            (minPrice || maxPrice) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20", children: [
              "$",
              minPrice || "0",
              " – $",
              maxPrice || "∞"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleReset,
                className: "text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors",
                "data-ocid": "home.clear_filters_button",
                children: "Clear all"
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4", children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map(
            (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, k)
          ) }) : listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              query: submittedQuery,
              category: selectedCategory,
              onReset: handleReset
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            !isFiltering && featured.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { icon: Sparkles, label: "Fresh Picks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "featured.list",
                  className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4",
                  children: featured.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 16 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: i * 0.07, duration: 0.35 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ListingCard,
                        {
                          listing,
                          index: i + 1,
                          onView: handleListingView
                        }
                      )
                    },
                    listing.id
                  ))
                }
              )
            ] }),
            (isFiltering ? listings : remaining).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                !isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { icon: Tag, label: "All Listings" }),
                isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
                  listings.length,
                  " result",
                  listings.length !== 1 ? "s" : ""
                ] }),
                !isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", "data-ocid": "home.sell_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "text-xs text-muted-foreground hover:text-foreground -mt-4",
                    children: "Sell yours →"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "listings.list",
                  className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4",
                  children: visible.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 12 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: {
                        delay: i % PAGE_SIZE * 0.04,
                        duration: 0.3
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ListingCard,
                        {
                          listing,
                          index: featured.length + i + 1,
                          onView: handleListingView
                        }
                      )
                    },
                    listing.id
                  ))
                }
              ),
              hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  onClick: () => setVisibleCount((c) => c + PAGE_SIZE),
                  "data-ocid": "listings.load_more_button",
                  className: "min-w-40 font-semibold border-primary/30 hover:border-primary hover:text-primary",
                  children: "Load more listings"
                }
              ) })
            ] })
          ] })
        ] })
      }
    ),
    recentlyViewed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-t border-border",
        "data-ocid": "home.recently_viewed_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-7xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary uppercase tracking-widest font-display", children: "Recently Viewed" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem(RECENTLY_VIEWED_KEY);
                  }
                  setRecentlyViewed([]);
                },
                "data-ocid": "recently_viewed.clear_button",
                className: "text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors",
                children: "Clear"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "recently_viewed.list",
              className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4",
              children: recentlyViewed.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: -12 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.06 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCard, { listing, index: i + 1 })
                },
                listing.id
              ))
            }
          )
        ] })
      }
    )
  ] });
}
export {
  Home as default
};
