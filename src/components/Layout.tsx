import React from 'react';
import { Navbar } from './Navbar';
import { Logo } from './Logo';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-ocean-gradient min-h-screen relative pb-32">
      <header className="pt-12 flex justify-center sticky top-0 z-40 bg-transparent backdrop-blur-sm pb-4">
        <Logo size="w-64" withTagline />
      </header>
      <main className="px-6">
        {children}
      </main>
      <Navbar />
      <footer className="mt-20 py-12 border-t border-white/5 flex flex-col items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-slate-500 font-bold">
        <div className="flex justify-between w-full max-w-6xl px-8">
          <span>© 2026 Ocean Tide Drop</span>
          <span className="text-neon-cyan">Status: Optimized</span>
        </div>
        <div className="text-slate-700 italic">Hatteras Island Digital Archipelago</div>
      </footer>
    </div>
  );
};
