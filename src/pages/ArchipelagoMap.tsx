import React from "react";
import Logo from "../components/Logo";

export default function ArchipelagoMap() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <h1 className="text-6xl font-black italic tracking-tighter text-center mb-4">
          Archipelago Map
        </h1>
        <p className="text-slate-400 text-center max-w-2xl mx-auto">
          Navigate the mythic coastline of the Ocean Tide Drop universe — each island a node of intelligence, creativity, and digital power.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <div className="text-center text-slate-500 leading-relaxed max-w-3xl mx-auto">
          <p>
            The archipelago is evolving. Soon you’ll be able to explore interactive islands, unlock hidden nodes, and traverse the neon‑ocean frontier.
          </p>
        </div>

      </div>
    </div>
  );
}
