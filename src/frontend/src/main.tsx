import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { Component } from "react";

// ── Pre-mount fallback — replaced when React mounts successfully ────────────
// This gives users something to see if React never mounts at all.
const rootEl = document.getElementById("root");
if (rootEl && !rootEl.innerHTML) {
  rootEl.innerHTML = `
    <div id="pre-mount-loader" style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font-family:system-ui,sans-serif;background:#faf9f7;">
      <div style="width:40px;height:40px;border-radius:50%;border:3px solid #e5e2dc;border-top-color:#7c6d5a;animation:spin 0.8s linear infinite;"></div>
      <p style="color:#7c6d5a;font-size:14px;margin:0;">Loading SecondSell…</p>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    </div>
  `;
}

// ── Global error capture (fires before React is ready) ───────────────────────
window.addEventListener("error", (e) => {
  console.error("[SecondSell] Global error:", e.error ?? e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("[SecondSell] Unhandled promise rejection:", e.reason);
});

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient();

// ── Top-level error boundary ──────────────────────────────────────────────────
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[SecondSell] Uncaught render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "24px",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px" }}>⚠️</div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#666", maxWidth: "380px", margin: 0 }}>
            An unexpected error occurred. Please reload the page to try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: "8px",
              padding: "10px 28px",
              borderRadius: "8px",
              border: "none",
              background: "#6d28d9",
              color: "#fff",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  const rootNode = document.getElementById("root")!;
  ReactDOM.createRoot(rootNode).render(
    <ErrorBoundary>
      <InternetIdentityProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      </InternetIdentityProvider>
    </ErrorBoundary>,
  );
} catch (err) {
  console.error("[SecondSell] ReactDOM.render failed:", err);
  const rootNode = document.getElementById("root");
  if (rootNode) {
    rootNode.innerHTML = `
      <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;font-family:system-ui,sans-serif;text-align:center;background:#faf9f7;">
        <div style="font-size:48px;">⚠️</div>
        <h1 style="font-size:22px;font-weight:700;margin:0;color:#1a1714;">Failed to start</h1>
        <p style="color:#7c6d5a;max-width:380px;margin:0;">
          The app failed to load. Please reload the page to try again.
        </p>
        <button onclick="window.location.reload()" style="margin-top:8px;padding:10px 28px;border-radius:8px;border:none;background:#7c6d5a;color:#fff;font-weight:600;font-size:15px;cursor:pointer;">Reload page</button>
      </div>
    `;
  }
}
