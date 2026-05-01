import React from "react";
import Logo from "../components/Logo";

export default function Members() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <h1 className="text-6xl font-black italic tracking-tighter text-center mb-4">
          Members
        </h1>
        <p className="text-slate-400 text-center max-w-xl mx-auto">
          Access exclusive tools, intelligence, and the Collective ecosystem.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <p className="text-center text-slate-500">
          Member‑exclusive content coming online soon.
        </p>

      </div>
    </div>
  );
}
