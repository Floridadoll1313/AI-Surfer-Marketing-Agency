import React from "react";
import "../styles/pricing.css";

export default function PricingPage() {
  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <h1 className="pricing-hero-title">Choose Your Path</h1>
        <p className="pricing-hero-subtitle">
          Cinematic systems, automation ecosystems, and AI‑powered creative tools —
          all aligned with your vision.
        </p>
      </section>

      {/* Stripe Pricing Table */}
      <div className="pricing-grid">
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>

        <stripe-pricing-table
          pricing-table-id="prctbl_1TQw5yRwAZCPDqtylQB0Si0N"
          publishable-key="pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi"
        ></stripe-pricing-table>
      </div>
    </div>
  );
}