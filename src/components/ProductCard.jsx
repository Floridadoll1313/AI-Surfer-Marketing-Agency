import React from "react";
import "./product-card.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-frame">
        <img src={product.image} alt={product.alt} className="product-image" />
      </div>

      <h2 className="product-title">{product.name}</h2>
      <p className="product-narrative">{product.narrative}</p>

      <ul className="product-features">
        {product.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <button className="product-button">
        Explore {product.name}
      </button>
    </div>
  );
}