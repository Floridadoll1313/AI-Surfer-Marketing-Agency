import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="checkout-result-container">
      <h1>Payment Successful 🌊</h1>
      <p>
        Your membership is active. Check your email for a receipt and next steps.
      </p>

      <div className="checkout-result-actions">
        <Link to="/">
          <button>Return Home</button>
        </Link>
      </div>
    </div>
  );
}
