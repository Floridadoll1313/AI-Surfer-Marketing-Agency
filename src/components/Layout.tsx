jsx
import { Link } from 'react-router-dom';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/logo.png" 
              alt="Ocean Tide Drop Logo" 
              className="h-10 w-auto" // Adjust height as needed
            />
            <span className="text-xl font-black italic uppercase tracking-tighter hidden md:block">
              AI <span className="text-neon-cyan">Surfer</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link to="/rodanthe" className="hover:text-neon-cyan transition-colors">Web</Link>
            <Link to="/avon" className="hover:text-neon-cyan transition-colors">Games</Link>
            {/* ... other links ... */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
