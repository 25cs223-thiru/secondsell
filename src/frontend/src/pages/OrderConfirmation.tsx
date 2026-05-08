import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Skeleton ──────────────────────────────────────────────────────────────────
function ConfirmationSkeleton() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 space-y-6"
      data-ocid="order_confirmation.loading_state"
    >
      <Skeleton className="w-20 h-20 rounded-full" />
      <Skeleton className="h-9 w-56" />
      <Skeleton className="h-4 w-72" />
      <div className="w-full max-w-md space-y-3">
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ConfirmationError() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center"
      data-ocid="order_confirmation.error_state"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">
        Something went wrong
      </h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        We couldn't confirm your order. If you were charged, please contact
        support. Your payment reference should be in your email.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/orders" data-ocid="order_confirmation.view_orders_button">
          <Button variant="outline">
            <ShoppingBag className="w-4 h-4 mr-2" />
            View Order History
          </Button>
        </Link>
        <Link to="/" data-ocid="order_confirmation.continue_shopping_button">
          <Button>
            Continue Shopping
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ── Success content ───────────────────────────────────────────────────────────
function ConfirmationSuccess() {
  const imageUrl = "/assets/images/placeholder.svg";
  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto px-4 py-12 flex flex-col items-center"
      data-ocid="order_confirmation.success_state"
    >
      {/* Checkmark hero */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="w-20 h-20 rounded-full bg-success/15 border-4 border-success/30 flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-success" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground">
          Your purchase has been placed successfully. The seller will arrange
          shipping soon.
        </p>
      </motion.div>

      {/* Item card — generic confirmation (order details in /orders) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-card border border-border rounded-xl p-4 space-y-4 shadow-subtle mb-4"
      >
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
            <img
              src={imageUrl}
              alt="Your order"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-display font-semibold text-foreground">
              Your order has been placed successfully
            </p>
            <p className="text-sm text-muted-foreground">
              The seller will arrange shipping soon.
            </p>
          </div>
        </div>

        <Separator />

        {/* Meta grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Order Date</p>
              <p className="font-medium text-foreground">{dateStr}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-success/15 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Status</p>
              <p className="font-medium text-success">Payment Confirmed</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="w-full flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-xl px-4 py-3 mb-8"
      >
        <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
        <span>
          Payment processed securely via Stripe. You will receive a confirmation
          email shortly.
        </span>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="flex flex-col sm:flex-row gap-3 w-full"
      >
        <Link
          to="/orders"
          className="flex-1"
          data-ocid="order_confirmation.view_orders_button"
        >
          <Button variant="outline" className="w-full">
            <ShoppingBag className="w-4 h-4 mr-2" />
            View Order History
          </Button>
        </Link>
        <Link
          to="/"
          className="flex-1"
          data-ocid="order_confirmation.continue_shopping_button"
        >
          <Button className="w-full">
            Continue Shopping
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function OrderConfirmationPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const sessionId = searchParams.get("session_id");

  const updateOrderStatus = useUpdateOrderStatus();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const confirmedRef = useRef(false);

  // Auth guard
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  // Confirm the order via Stripe session ID
  // biome-ignore lint/correctness/useExhaustiveDependencies: mutate is stable
  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    if (confirmedRef.current) return;
    confirmedRef.current = true;

    updateOrderStatus.mutate(sessionId, {
      onSuccess: () => {
        setStatus("success");
        // Clean up the session_id from URL
        const url = new URL(window.location.href);
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", url.toString());
      },
      onError: () => {
        setStatus("error");
      },
    });
  }, [sessionId]);

  if (isInitializing || status === "loading") {
    return (
      <div className="bg-background min-h-[calc(100vh-4rem)]">
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-5 max-w-xl">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors group"
              data-ocid="order_confirmation.back_link"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to shop
            </Link>
          </div>
        </div>
        <ConfirmationSkeleton />
      </div>
    );
  }

  return (
    <div
      className="bg-background min-h-[calc(100vh-4rem)]"
      data-ocid="order_confirmation.page"
    >
      {/* Header band */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-5 max-w-xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors group"
            data-ocid="order_confirmation.back_link"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to shop
          </Link>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "error" ? <ConfirmationError /> : <ConfirmationSuccess />}
      </AnimatePresence>
    </div>
  );
}
