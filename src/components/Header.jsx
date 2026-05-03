import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-md navbar-glow">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">

        {/* 🌊 Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-wide text-cyan-300 drop-shadow-lg">
            Ocean Tide Drop AI
          </span>
        </Link>

        {/* 🌊 Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-lg">
          <NavLink
            to="/"
            className="hover:text-cyan-300 transition"
          >
            Home
          </NavLink>

          <NavLink
            to="/pricing"
            className="hover:text-cyan-300 transition"
          >
            Pricing
          </NavLink>

          <NavLink
            to="/members"
            className="hover:text-cyan-300 transition"
          >
            Members
          </NavLink>

          <NavLink
            to="/services"
            className="hover:text-cyan-300 transition"
          >
            Services
          </NavLink>

          <NavLink
            to="/contact"
            className="hover:text-cyan-300 transition"
          >
            Contact
          </NavLink>
        </nav>

        {/* 🌊 Mobile Menu Placeholder (optional future expansion) */}
        <div className="md:hidden text-cyan-300 text-xl">
          ☰
        </div>
      </div>
    </header>
  );
}