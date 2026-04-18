import React, { useState } from "react";

export default function CheckoutAI() {
  const [email, setEmail] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);

  async function startCheckout(priceId) {
    const res = await fetch("/functions/create-checkout", {
      method: "POST",
      body: JSON.stringify({
        email,
        priceId,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="checkout-container">
      <h1>Become a Member</h1>

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Default – $2,500 */}
      <button
        onClick={() =>
          startCheckout("price_1TJiFIEx9w41hLckIWm2Y1wh")
        }
      >
        Default – $2,500
      </button>

      {/* Premium – $4,500 */}
      <button
        onClick={() =>
          startCheckout("price_1TJiHXEx9w41hLckJSFkluMX")
        }
      >
        Premium – $4,500/mo
      </button>

      {/* Enterprise – $7,500 */}
      <button
        onClick={() =>
          startCheckout("price_1TJiHXEx9w41hLckYReN0lAd")
        }
      >
        Enterprise – $7,500/mo
      </button><button
  onClick={() =>
    startCheckout(import.meta.env.VITE_PRICE_AI_SURFER)
  }
>
  🌊 Join AI Surfer – $17/mo
</button>

    </div>
  );
}
