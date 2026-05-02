import React from "react";
import Logo from "../../components/Logo";

export default function PricingIndex() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <h1 className="text-6xl font-black italic tracking-tighter text-center mb-4">
          Membership Pricing
        </h1>
        <p className="text-slate-400 text-center max-w-xl mx-auto">
          Choose the membership that aligns with your creative velocity.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* GAME ACCESS MEMBERSHIP */}
          <div className="glass-card p-10 rounded-3xl border border-white/10">
            <h3 className="text-3xl font-black italic mb-2">Game Access Membership</h3>
            <p className="text-slate-400 mb-6">
              Entry-level access to the game engine, streaks, waves, and progression.
            </p>
            <div className="text-5xl font-black text-neon-cyan italic mb-6">$17</div>
            <p className="text-slate-500 text-sm">Billed monthly • Cancel anytime</p>
          </div>

          {/* SURF MEMBERS SITE */}
          <div className="glass-card p-10 rounded-3xl border border-white/10">
            <h3 className="text-3xl font-black italic mb-2">Surf Members Site</h3>
            <p className="text-slate-400 mb-6">
              Full membership: dashboard, streak engine, wave history, challenges, and member content.
            </p>
            <div className="text-5xl font-black text-neon-pink italic mb-6">$37</div>
            <p className="text-slate-500 text-sm">Billed monthly • Cancel anytime</p>
          </div>

        </div>

      </div>
    </div>
  );
}