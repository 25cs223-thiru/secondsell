import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export const CATEGORIES: Category[] = [
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
];

// Category emoji icons for visual scanning
const CATEGORY_ICONS: Record<Category, string> = {
  Clothing: "👕",
  Accessories: "⌚",
  Shoes: "👟",
  Bags: "👜",
  Jewelry: "💍",
  Home: "🏡",
  Books: "📚",
  Electronics: "💻",
  Sports: "⚽",
  Other: "📦",
};

interface CategoryFilterProps {
  selected?: Category | null;
  onChange: (category: Category | null) => void;
  className?: string;
  /** Optional counts per category for badge display */
  counts?: Partial<Record<Category, number>>;
  /** Mobile collapsible drawer mode */
  collapsible?: boolean;
}

export function CategoryFilter({
  selected,
  onChange,
  className,
  counts,
  collapsible = false,
}: CategoryFilterProps) {
  const [open, setOpen] = useState(false);
  const activeCount = selected ? 1 : 0;

  if (collapsible) {
    return (
      <div className={cn("w-full", className)} data-ocid="category_filter">
        {/* Drawer trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-ocid="category_filter.drawer_toggle"
          className="flex items-center gap-2 w-full min-h-[44px] px-3 py-2.5 rounded-xl bg-card border border-border hover:border-primary/40 transition-smooth text-sm font-medium text-foreground"
          aria-expanded={open}
        >
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="flex-1 text-left">
            {selected ? selected : "All categories"}
          </span>
          {activeCount > 0 && (
            <Badge className="bg-primary text-primary-foreground text-xs h-5 min-w-5 px-1.5">
              {activeCount}
            </Badge>
          )}
          {open ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </button>

        {/* Drawer content */}
        {open && (
          <div className="mt-2 p-3 rounded-xl bg-card border border-border shadow-elevated">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                data-ocid="category_filter.all_tab"
                className={cn(
                  "filter-chip border touch-target",
                  !selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
                )}
                style={{ minHeight: 44 }}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onChange(cat === selected ? null : cat);
                    setOpen(false);
                  }}
                  data-ocid={`category_filter.${cat.toLowerCase()}_tab`}
                  className={cn(
                    "filter-chip border relative touch-target flex items-center gap-1.5",
                    selected === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
                  )}
                  style={{ minHeight: 44 }}
                >
                  <span>{CATEGORY_ICONS[cat]}</span>
                  <span>{cat}</span>
                  {counts?.[cat] !== undefined && (
                    <span
                      className={cn(
                        "ml-0.5 text-xs opacity-70",
                        selected === cat
                          ? "text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      ({counts[cat]})
                    </span>
                  )}
                </button>
              ))}
            </div>
            {selected && (
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                data-ocid="category_filter.clear_button"
                className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default inline mode — scrollable horizontal strip
  return (
    <div
      className={cn(
        "flex items-center gap-2 flex-nowrap overflow-x-auto scrollbar-none",
        className,
      )}
      data-ocid="category_filter"
    >
      <button
        type="button"
        onClick={() => onChange(null)}
        data-ocid="category_filter.all_tab"
        className={cn(
          "filter-chip border shrink-0 touch-target",
          !selected
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
        )}
        style={{ minHeight: 44 }}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat === selected ? null : cat)}
          data-ocid={`category_filter.${cat.toLowerCase()}_tab`}
          className={cn(
            "filter-chip border shrink-0 touch-target flex items-center gap-1",
            selected === cat
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
          )}
          style={{ minHeight: 44 }}
        >
          <span className="hidden sm:inline">{CATEGORY_ICONS[cat]}</span>
          <span>{cat}</span>
          {counts?.[cat] !== undefined && (
            <span
              className={cn(
                "text-xs opacity-70",
                selected === cat
                  ? "text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              ({counts[cat]})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
