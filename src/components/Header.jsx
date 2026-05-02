import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full py-6 flex flex-col items-center">
      <img
        src="/logo.png"
        alt="Ocean Tide Drop Logo"
        className="w-32 md:w-40 lg:w-48 max-w-full h-auto mx-auto block mb-4"
      />

      <nav className="flex gap-8 text-lg font-medium text-white">
        <Link to="/" className="hover:text-cyan-300 transition">Explore</Link>
        <Link to="/services" className="hover:text-cyan-300 transition">Services</Link>
        <Link to="/contact" className="hover:text-cyan-300 transition">Contact Us</Link>
      </nav>
    </header>
  );
}
