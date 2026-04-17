import React, { useState } from "react";

export default function CheckoutAI() {
  const [email, setEmail] = useState("");

  async function startCheckout() {
    const res = await fetch("/functions/create-checkout", {
      method: "POST",
      body: JSON.stringify({ email }),
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
      <button onClick={startCheckout}>Join Now</button>
    </div>
  );
}
