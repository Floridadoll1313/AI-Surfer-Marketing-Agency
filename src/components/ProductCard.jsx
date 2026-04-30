import React from "react";

export default function ProductCard({ product }) {
  return (
    <div
      className="
        glass-card
        p-8 rounded-3xl border border-white/10
        flex flex-col gap-6
        hover:border-neon-cyan hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]
        transition-all
      "
    >
      {/* IMAGE */}
      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10">
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>

      {/* NARRATIVE */}
      <p className="text-slate-400 text-sm leading-relaxed">
        {product.narrative}
      </p>

      {/* FEATURES */}
      <ul className="space-y-2 text-slate-300 text-sm">
        {product.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-neon-cyan">•</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* BUTTON */}
      <button
        className="
          mt-4 py-3 rounded-full
          bg-neon-cyan text-black font-bold
          uppercase tracking-[0.25em] text-xs
          hover:bg-white transition
        "
      >
        Explore {product.name}
      </button>
    </div>
  );
}