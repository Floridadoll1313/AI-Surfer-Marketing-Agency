// Cloudflare‑safe Stripe loader
// This prevents Vite/Rollup from trying to bundle @stripe/stripe-js on the server.

let stripePromise = null;

export function getStripe() {
  if (typeof window === "undefined") {
    // Prevents SSR / Cloudflare build from touching Stripe
    return null;
  }

  if (!stripePromise) {
    stripePromise = import("@stripe/stripe-js").then((m) =>
      m.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    );
  }

  return stripePromise;
}
