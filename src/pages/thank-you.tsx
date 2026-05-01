import React from "react";
import Logo from "../components/Logo";
import { Heart } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 flex items-center">
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* HERO */}
        <Heart className="text-neon-pink mx-auto mb-6" size={64} />
        <h1 className="text-6xl font-black italic tracking-tighter mb-4">
          Thank You
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Your submission has been received. We’ll be in touch soon.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <p className="text-slate-500">
          Return to the main site anytime.
        </p>

      </div>
    </div>
  );
}
