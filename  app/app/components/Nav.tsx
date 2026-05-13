import { Link, NavLink } from "react-router";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "px-3 py-2 text-lg font-semibold transition-colors duration-200";

  const activeClass = "text-blue-500 underline";

  return (
    <nav className="w-full border-b border-gray-200">
      {/* Desktop */}
      <div className="hidden md:flex justify-center gap-8 p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${linkClass} ${activeClass}` : linkClass
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? `${linkClass} ${activeClass}` : linkClass
          }
        >
          Services
        </NavLink>

        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive ? `${linkClass} ${activeClass}` : linkClass
          }
        >
          Pricing
        </NavLink>

        <NavLink
          to="/mascot"
          className={({ isActive }) =>
            isActive ? `${linkClass} ${activeClass}` : linkClass
          }
        >
          Mascot
        </NavLink>
      </div>

      {/* Mobile */}
      <div className="md:hidden p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Surfer</h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl font-bold"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 p-4 border-t border-gray-200">