export default function Header() {
  return (
    <header className="w-full py-6 flex flex-col items-center">
      <img
        src="/logo.png"
        alt="Ocean Tide Drop Logo"
        className="w-24 md:w-32 lg:w-40 h-auto mx-auto mb-4"
      />

      <nav className="flex gap-8 text-lg font-medium text-white">
        <a href="#explore" className="hover:text-cyan-300 transition">Explore</a>
        <a href="#services" className="hover:text-cyan-300 transition">Services</a>
        <a href="#contact" className="hover:text-cyan-300 transition">Contact Us</a>
      </nav>
    </header>
  );
}
