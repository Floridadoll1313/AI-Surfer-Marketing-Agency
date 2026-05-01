import React from "react";
import Logo from "../components/Logo";

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <h1 className="text-6xl font-black italic tracking-tighter text-center mb-4">
          Marketplace
        </h1>
        <p className="text-slate-400 text-center max-w-xl mx-auto">
          Digital tools, templates, and cinematic assets crafted for founders.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <div className="text-center text-slate-500">
          <p>Marketplace items coming online soon.</p>
        </div>

      </div>
    </div>
  );
}
