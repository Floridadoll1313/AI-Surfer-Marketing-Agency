import React from "react";
import Logo from "../../components/Logo";

export default function PricingIndex() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <h1 className="text-6xl font-black italic tracking-tighter text-center mb-4">
          Pricing
        </h1>
        <p className="text-slate-400 text-center max-w-xl mx-auto">
          Choose the tier that aligns with your creative velocity.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="glass-card p-10 rounded-3xl border border-white/10">
            <h3 className="text-3xl font-black italic mb-2">Architect Tier</h3>
            <p className="text-slate-400 mb-6">For founders building cinematic digital presence.</p>
            <div className="text-5xl font-black text-neon-cyan italic mb-6">$49</div>
            <p className="text-slate-500 text-sm">Billed monthly • Cancel anytime</p>
          </div>

          <div className="glass-card p-10 rounded-3xl border border-white/10">
            <h3 className="text-3xl font-black italic mb-2">Navigator Tier</h3>
            <p className="text-slate-400 mb-6">For creators scaling their ecosystem.</p>
            <div className="text-5xl font-black text-neon-pink italic mb-6">$99</div>
            <p className="text-slate-500 text-sm">Billed monthly • Cancel anytime</p>
          </div>

        </div>

      </div>
    </div>
  );
}
