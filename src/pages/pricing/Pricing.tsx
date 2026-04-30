import React from "react";
import ProductCard from "../../components/ProductCard";
import { products } from "./products";

export default function Pricing() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            Choose Your Path
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Four cinematic surf‑themed tiers designed to match your momentum,
            your ambition, and the myth you're building.
          </p>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

      </div>
    </main>
  );
}
