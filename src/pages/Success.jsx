import React from "react";
import Logo from "../components/Logo";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 flex items-center">
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* HERO */}
        <CheckCircle className="text-neon-green mx-auto mb-6" size={64} />
        <h1 className="text-6xl font-black italic tracking-tighter mb-4">
          Success
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Your membership has been activated. Welcome to the Collective.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <p className="text-slate-500">
          You may now close this window or return to the main site.
        </p>

      </div>
    </div>
  );
}
