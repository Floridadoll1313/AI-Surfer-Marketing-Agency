import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const linkBase =
  "text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-slate-400 hover:text-white transition";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Ocean Tide Drop"
            className="h-8 w-auto md:h-10 object-contain"
          />
          <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-slate-300">
            AI Surfer Marketing
          </span>
        </div>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkBase}>
            Home
          </NavLink>
          <NavLink to="/services" className={linkBase}>
            Services
          </NavLink>
          <NavLink to="/pricing" className={linkBase}>
            Pricing
          </NavLink>
          <NavLink to="/members" className={linkBase}>
            Members
          </NavLink>
          <NavLink to="/dashboard" className={linkBase}>
            Console
          </NavLink>
        </nav>
      </div>
    </header>
  );
}