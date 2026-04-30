import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // ✅ Correct path for components folder

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Ocean Tide Drop Logo"
            className="h-12 w-auto drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          />
          <span className="text-white font-black tracking-widest text-lg">
            OCEAN TIDE DROP
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-8 text-white font-semibold">
          <Link
            to="/services"
            className="hover:text-neon-cyan transition-all"
          >
            Services
          </Link>

          <Link
            to="/pricing"
            className="hover:text-neon-cyan transition-all"
          >
            Pricing
          </Link>

          <Link
            to="/members"
            className="hover:text-neon-cyan transition-all"
          >
            Members
          </Link>
        </div>
      </div>
    </nav>
  );
}