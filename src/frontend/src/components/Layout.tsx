import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useMyProfile } from "@/hooks/useProfile";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  Package,
  PlusCircle,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import React from "react";
import { useState } from "react";

// ── Header-level error boundary ────────────────────────────────────────────────────
class HeaderErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <header className="sticky top-0 z-50 bg-card border-b border-border h-16 flex items-center px-4">
          <span className="font-display font-bold text-xl text-foreground">
            Second<span className="text-primary">Sell</span>
          </span>
        </header>
      );
    }
    return this.props.children;
  }
}

interface LayoutProps {
  children: React.ReactNode;
}

function Header() {
  const { login, logout, isAuthenticated, isLoading, isInitializing } =
    useAuth();
  // Call hook unconditionally at top level — data may be undefined while loading
  const { data: profile } = useMyProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const encoded = encodeURIComponent(searchQuery.trim());
      window.location.href = `/?q=${encoded}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
      {/* Top bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.home_link"
          >
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight">
              Second<span className="text-primary">Sell</span>
            </span>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="nav.search_input"
                placeholder="Search for unique pre-loved pieces..."
                className="pl-9 bg-muted/60 border-border focus:bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            <Link to="/" data-ocid="nav.shop_link">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Shop
              </Button>
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/sell" data-ocid="nav.sell_link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sell
                  </Button>
                </Link>
                <Link to="/orders" data-ocid="nav.orders_link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Package className="w-4 h-4 mr-1" />
                    Orders
                  </Button>
                </Link>
                <Link to="/profile" data-ocid="nav.profile_link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <User className="w-4 h-4 mr-1" />
                    {profile?.name ?? "Profile"}
                  </Button>
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <Button
                data-ocid="nav.logout_button"
                variant="outline"
                size="sm"
                onClick={logout}
                className="ml-2"
              >
                Sign out
              </Button>
            ) : (
              <Button
                data-ocid="nav.login_button"
                size="sm"
                onClick={login}
                disabled={isLoading || isInitializing}
                className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isInitializing ? "Loading…" : "Sign in"}
              </Button>
            )}
            {isAuthenticated && (
              <Link to="/sell" data-ocid="nav.list_item_button">
                <Button
                  size="sm"
                  className="ml-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  List item
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden ml-auto p-2 rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.mobile_menu_toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="nav.mobile_search_input"
              placeholder="Search listings..."
              className="pl-9 bg-muted/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            data-ocid="nav.mobile_shop_link"
          >
            <Button variant="ghost" className="w-full justify-start">
              Shop
            </Button>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/sell"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid="nav.mobile_sell_link"
              >
                <Button variant="ghost" className="w-full justify-start">
                  Sell
                </Button>
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid="nav.mobile_orders_link"
              >
                <Button variant="ghost" className="w-full justify-start">
                  Orders
                </Button>
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid="nav.mobile_profile_link"
              >
                <Button variant="ghost" className="w-full justify-start">
                  Profile
                </Button>
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={logout}
              data-ocid="nav.mobile_logout_button"
            >
              Sign out
            </Button>
          ) : (
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={login}
              disabled={isLoading || isInitializing}
              data-ocid="nav.mobile_login_button"
            >
              {isInitializing ? "Loading…" : "Sign in"}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <ShoppingBag className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground">
              SecondSell
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            <Link
              to="/sell"
              className="hover:text-foreground transition-colors"
            >
              Sell
            </Link>
            <Link
              to="/profile"
              className="hover:text-foreground transition-colors"
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderErrorBoundary>
        <Header />
      </HeaderErrorBoundary>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
