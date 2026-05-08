import { CATEGORIES, CategoryFilter } from "@/components/CategoryFilter";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useListings } from "@/hooks/useListings";
import type { Category, Listing, ListingFilter } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Leaf,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 12;
const RECENTLY_VIEWED_KEY = "secondsell_recently_viewed";
const MAX_RECENT = 6;

type SortOption = "newest" | "price_asc" | "price_desc";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest First",
  price_asc: "Price: Low → High",
  price_desc: "Price: High → Low",
};

// ── Recently viewed helpers ───────────────────────────────────────────────────
function getRecentlyViewed(): Listing[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Listing[];
  } catch {
    return [];
  }
}

function addRecentlyViewed(listing: Listing) {
  if (typeof window === "undefined") return;
  try {
    const prev = getRecentlyViewed().filter((l) => l.id !== listing.id);
    const next = [listing, ...prev].slice(0, MAX_RECENT);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

// ── URL param helpers ─────────────────────────────────────────────────────────
function readUrlParams() {
  if (typeof window === "undefined")
    return {
      q: "",
      category: "",
      sort: "newest" as SortOption,
      minPrice: "",
      maxPrice: "",
    };
  const p = new URLSearchParams(window.location.search);
  return {
    q: p.get("q") ?? "",
    category: p.get("category") ?? "",
    sort: (p.get("sort") ?? "newest") as SortOption,
    minPrice: p.get("minPrice") ?? "",
    maxPrice: p.get("maxPrice") ?? "",
  };
}

// ── Sort utility ──────────────────────────────────────────────────────────────
function sortListings(listings: Listing[], sort: SortOption): Listing[] {
  const copy = [...listings];
  if (sort === "price_asc")
    return copy.sort((a, b) => Number(a.priceInCents - b.priceInCents));
  if (sort === "price_desc")
    return copy.sort((a, b) => Number(b.priceInCents - a.priceInCents));
  return copy.sort((a, b) => Number(b.createdAt - a.createdAt));
}

// ── Category count from listings ──────────────────────────────────────────────
function buildCategoryCounts(
  listings: Listing[],
): Partial<Record<Category, number>> {
  const counts: Partial<Record<Category, number>> = {};
  for (const l of listings) {
    if (l.category) counts[l.category] = (counts[l.category] ?? 0) + 1;
  }
  return counts;
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      data-ocid="listings.loading_state"
      className="rounded-xl overflow-hidden bg-card border border-border shadow-subtle"
    >
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex items-center gap-1.5 pt-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({
  query,
  category,
  onReset,
}: {
  query: string;
  category: Category | null;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      data-ocid="listings.empty_state"
      className="flex flex-col items-center justify-center py-24 text-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <Tag className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-lg font-semibold text-foreground font-display">
          No listings found
        </p>
        <p className="text-sm text-muted-foreground max-w-xs">
          {query
            ? `No results for "${query}"${category ? ` in ${category}` : ""}.`
            : category
              ? `Nothing listed in ${category} yet.`
              : "Be the first to list something!"}
        </p>
      </div>
      <div className="flex gap-2 mt-1 flex-wrap justify-center">
        <Button
          variant="outline"
          onClick={onReset}
          data-ocid="listings.empty_state.reset_button"
        >
          Clear filters
        </Button>
        <Link to="/sell">
          <Button data-ocid="listings.empty_state.sell_button">
            List an item
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-sm font-bold text-primary uppercase tracking-widest font-display">
        {label}
      </span>
    </div>
  );
}

// ── Price range input ─────────────────────────────────────────────────────────
function PriceRangeInput({
  min,
  max,
  onMin,
  onMax,
}: {
  min: string;
  max: string;
  onMin: (v: string) => void;
  onMax: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2" data-ocid="price_range_filter">
      <div className="relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
          $
        </span>
        <Input
          type="number"
          min={0}
          placeholder="Min"
          value={min}
          onChange={(e) => onMin(e.target.value)}
          className="pl-5 pr-2 h-9 w-20 text-sm"
          data-ocid="price_range.min_input"
          aria-label="Minimum price"
        />
      </div>
      <span className="text-xs text-muted-foreground">–</span>
      <div className="relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
          $
        </span>
        <Input
          type="number"
          min={0}
          placeholder="Max"
          value={max}
          onChange={(e) => onMax(e.target.value)}
          className="pl-5 pr-2 h-9 w-20 text-sm"
          data-ocid="price_range.max_input"
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
}

// ── Trust items ───────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Verified sellers",
    desc: "Every seller authenticated through Internet Identity.",
  },
  {
    icon: Leaf,
    title: "Sustainable finds",
    desc: "Give pre-loved items a second life — better for the planet.",
  },
  {
    icon: Sparkles,
    title: "Curated quality",
    desc: "Unique pieces you won't find on the high street.",
  },
];

// ── Popular categories featured strip ─────────────────────────────────────────
const POPULAR_CATEGORIES: { cat: Category; emoji: string; color: string }[] = [
  {
    cat: "Clothing",
    emoji: "👕",
    color: "bg-accent/10 text-accent border-accent/20",
  },
  {
    cat: "Electronics",
    emoji: "💻",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    cat: "Shoes",
    emoji: "👟",
    color: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  },
  {
    cat: "Books",
    emoji: "📚",
    color: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
  {
    cat: "Bags",
    emoji: "👜",
    color: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  },
  {
    cat: "Home",
    emoji: "🏡",
    color: "bg-success/10 text-success border-success/20",
  },
];

// ── Home page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const init = useMemo(() => readUrlParams(), []);

  const [inputValue, setInputValue] = useState(init.q);
  const [submittedQuery, setSubmittedQuery] = useState(init.q);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    (init.category as Category) || null,
  );
  const [sort, setSort] = useState<SortOption>(init.sort);
  const [minPrice, setMinPrice] = useState(init.minPrice);
  const [maxPrice, setMaxPrice] = useState(init.maxPrice);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [recentlyViewed, setRecentlyViewed] = useState<Listing[]>(() =>
    getRecentlyViewed(),
  );
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  const isFiltering =
    !!submittedQuery || !!selectedCategory || !!minPrice || !!maxPrice;

  // ── URL sync ──────────────────────────────────────────────────────────────
  const syncUrl = useCallback(
    (
      q: string,
      cat: Category | null,
      s: SortOption,
      mn: string,
      mx: string,
    ) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("category", cat);
      if (s && s !== "newest") params.set("sort", s);
      if (mn) params.set("minPrice", mn);
      if (mx) params.set("maxPrice", mx);
      const qs = params.toString();
      if (typeof window !== "undefined") {
        const newUrl = qs
          ? `${window.location.pathname}?${qs}`
          : window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    },
    [],
  );

  // ── Data fetch ────────────────────────────────────────────────────────────
  const filter = useMemo<ListingFilter>(() => {
    const f: ListingFilter = {};
    if (submittedQuery) f.query = submittedQuery;
    if (selectedCategory) f.category = selectedCategory;
    if (minPrice)
      f.minPrice = BigInt(Math.round(Number.parseFloat(minPrice) * 100));
    if (maxPrice)
      f.maxPrice = BigInt(Math.round(Number.parseFloat(maxPrice) * 100));
    return f;
  }, [submittedQuery, selectedCategory, minPrice, maxPrice]);

  const { data: allListings, isLoading } = useListings(
    isFiltering ? filter : undefined,
  );

  const rawListings = allListings ?? [];

  // ── Category counts ───────────────────────────────────────────────────────
  const { data: allForCounts } = useListings(undefined);
  const categoryCounts = useMemo(
    () => buildCategoryCounts(allForCounts ?? []),
    [allForCounts],
  );

  // ── Sort + client-side price filter ───────────────────────────────────────
  const listings = useMemo(() => {
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

  // ── Featured (no filter) ──────────────────────────────────────────────────
  const featured = useMemo(
    () => (isFiltering ? [] : listings.slice(0, 4)),
    [isFiltering, listings],
  );
  const remaining = useMemo(
    () => (isFiltering ? listings : listings.slice(4)),
    [isFiltering, listings],
  );
  const visible = remaining.slice(0, visibleCount);
  const hasMore = visible.length < remaining.length;

  // Reset paging when filters change
  const filterKey = `${submittedQuery}|${selectedCategory}|${sort}|${minPrice}|${maxPrice}`;
  const filterKeyRef = useRef(filterKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (filterKeyRef.current !== filterKey) {
      filterKeyRef.current = filterKey;
      setVisibleCount(PAGE_SIZE);
    }
  }, [filterKey]);

  // ── Active filter count for mobile drawer badge ───────────────────────────
  const activeFilterCount =
    (selectedCategory ? 1 : 0) + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0);

  // ── Handlers ─────────────────────────────────────────────────────────────
  function handleSearch(e: React.FormEvent) {
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

  function handleCategoryChange(cat: Category | null) {
    setSelectedCategory(cat);
    syncUrl(submittedQuery, cat, sort, minPrice, maxPrice);
  }

  function handleSortChange(val: string) {
    const s = val as SortOption;
    setSort(s);
    syncUrl(submittedQuery, selectedCategory, s, minPrice, maxPrice);
  }

  function handleMinPrice(v: string) {
    setMinPrice(v);
    syncUrl(submittedQuery, selectedCategory, sort, v, maxPrice);
  }

  function handleMaxPrice(v: string) {
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

  function handleListingView(listing: Listing) {
    addRecentlyViewed(listing);
    setRecentlyViewed(getRecentlyViewed());
  }

  function handlePopularCategory(cat: Category) {
    setSelectedCategory(cat);
    syncUrl(submittedQuery, cat, sort, minPrice, maxPrice);
    document
      .getElementById("listings-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col" data-ocid="home.page">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        className="bg-gradient-to-b from-card via-muted/20 to-background border-b border-border py-12 md:py-16"
        data-ocid="home.hero_section"
      >
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
              <Sparkles className="w-3 h-3" />
              Preloved. Reimagined.
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Find your next{" "}
              <span className="text-primary">favourite thing</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Browse quality secondhand items from trusted sellers — clothing,
              electronics, books, and more.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            onSubmit={handleSearch}
            className="flex gap-2 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search listings…"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-9 pr-9 bg-card h-11 rounded-lg"
                data-ocid="home.search_input"
                aria-label="Search listings"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                  data-ocid="home.clear_search_button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              className="h-11 px-5 font-semibold shrink-0"
              data-ocid="home.search_submit_button"
            >
              Search
            </Button>
          </motion.form>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className="flex gap-3 justify-center flex-wrap"
          >
            <Link to="/sell" data-ocid="home.sell_cta_button">
              <Button size="lg" variant="outline" className="font-semibold">
                Start selling
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Popular categories strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="container mx-auto px-4 mt-8 max-w-3xl"
          data-ocid="home.popular_categories"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center">
            Popular right now
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {POPULAR_CATEGORIES.map(({ cat, emoji, color }) => (
              <button
                key={cat}
                type="button"
                onClick={() => handlePopularCategory(cat)}
                data-ocid={`popular_category.${cat.toLowerCase()}_button`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth hover:scale-105 ${color}`}
                style={{ minHeight: 36 }}
              >
                <span>{emoji}</span>
                <span>{cat}</span>
                {categoryCounts[cat] !== undefined && (
                  <span className="opacity-70">({categoryCounts[cat]})</span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Trust bar ───────────────────────────────────────────────── */}
      <section
        className="bg-card border-b border-border"
        data-ocid="home.trust_section"
      >
        <div className="container mx-auto px-4 py-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky filter header ─────────────────────────────────────── */}
      <div
        className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border"
        data-ocid="home.filter_header"
      >
        <div className="container mx-auto px-4 py-3">
          {/* Mobile: collapsible drawer toggle + sort */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileFilterOpen((v) => !v)}
              data-ocid="home.mobile_filter_toggle"
              className="flex items-center gap-2 flex-1 min-h-[44px] px-3 rounded-xl bg-card border border-border text-sm font-medium text-foreground transition-smooth hover:border-primary/40"
            >
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span>{selectedCategory ?? "All categories"}</span>
              {activeFilterCount > 0 && (
                <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger
                className="w-36 h-11 text-xs shrink-0"
                data-ocid="home.sort_dropdown"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(SORT_LABELS) as SortOption[]).map((s) => (
                  <SelectItem key={s} value={s} data-ocid={`sort.${s}_option`}>
                    {SORT_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile filter drawer */}
          {isMobileFilterOpen && (
            <div className="md:hidden mt-2">
              <CategoryFilter
                selected={selectedCategory}
                onChange={(cat) => {
                  handleCategoryChange(cat);
                  setMobileFilterOpen(false);
                }}
                counts={categoryCounts}
                collapsible={false}
              />
              <div className="mt-3 flex items-center gap-3">
                <PriceRangeInput
                  min={minPrice}
                  max={maxPrice}
                  onMin={handleMinPrice}
                  onMax={handleMaxPrice}
                />
                {(minPrice || maxPrice) && (
                  <button
                    type="button"
                    onClick={() => {
                      handleMinPrice("");
                      handleMaxPrice("");
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Desktop: full inline strip */}
          <div className="hidden md:flex items-center gap-3">
            <CategoryFilter
              selected={selectedCategory}
              onChange={handleCategoryChange}
              counts={categoryCounts}
              className="flex-1"
            />
            <div className="flex items-center gap-2 shrink-0">
              <PriceRangeInput
                min={minPrice}
                max={maxPrice}
                onMin={handleMinPrice}
                onMax={handleMaxPrice}
              />
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger
                  className="w-40 h-9 text-xs"
                  data-ocid="home.sort_dropdown"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      data-ocid={`sort.${s}_option`}
                    >
                      {SORT_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Listings ─────────────────────────────────────────────────── */}
      <section
        className="bg-background"
        data-ocid="home.listings_section"
        id="listings-section"
      >
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Active filter pills */}
          {isFiltering && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Filters:</span>
              {submittedQuery && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20">
                  <Search className="w-3 h-3" />
                  {submittedQuery}
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20">
                  <Tag className="w-3 h-3" />
                  {selectedCategory}
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20">
                  ${minPrice || "0"} – ${maxPrice || "∞"}
                </span>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                data-ocid="home.clear_filters_button"
              >
                Clear all
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map(
                (k) => (
                  <SkeletonCard key={k} />
                ),
              )}
            </div>
          ) : listings.length === 0 ? (
            <EmptyState
              query={submittedQuery}
              category={selectedCategory}
              onReset={handleReset}
            />
          ) : (
            <>
              {/* Featured fresh picks — no filter only */}
              {!isFiltering && featured.length > 0 && (
                <div className="mb-10">
                  <SectionLabel icon={Sparkles} label="Fresh Picks" />
                  <div
                    data-ocid="featured.list"
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                  >
                    {featured.map((listing: Listing, i: number) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.35 }}
                      >
                        <ListingCard
                          listing={listing}
                          index={i + 1}
                          onView={handleListingView}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main grid */}
              {(isFiltering ? listings : remaining).length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-1">
                    {!isFiltering && (
                      <SectionLabel icon={Tag} label="All Listings" />
                    )}
                    {isFiltering && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {listings.length} result
                        {listings.length !== 1 ? "s" : ""}
                      </p>
                    )}
                    {!isFiltering && (
                      <Link to="/sell" data-ocid="home.sell_link">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground hover:text-foreground -mt-4"
                        >
                          Sell yours →
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div
                    data-ocid="listings.list"
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                  >
                    {visible.map((listing: Listing, i: number) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: (i % PAGE_SIZE) * 0.04,
                          duration: 0.3,
                        }}
                      >
                        <ListingCard
                          listing={listing}
                          index={featured.length + i + 1}
                          onView={handleListingView}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-10 flex justify-center">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        data-ocid="listings.load_more_button"
                        className="min-w-40 font-semibold border-primary/30 hover:border-primary hover:text-primary"
                      >
                        Load more listings
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Recently Viewed ──────────────────────────────────────────── */}
      {recentlyViewed.length > 0 && (
        <section
          className="bg-muted/30 border-t border-border"
          data-ocid="home.recently_viewed_section"
        >
          <div className="container mx-auto px-4 py-10 max-w-7xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-widest font-display">
                  Recently Viewed
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem(RECENTLY_VIEWED_KEY);
                  }
                  setRecentlyViewed([]);
                }}
                data-ocid="recently_viewed.clear_button"
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Clear
              </button>
            </div>
            <div
              data-ocid="recently_viewed.list"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
            >
              {recentlyViewed.map((listing: Listing, i: number) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ListingCard listing={listing} index={i + 1} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
