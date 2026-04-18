import React from 'react';
import { Navbar } from './Navbar';
import { Logo } from './Logo';
import { Soundscape } from './Soundscape';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-ocean-gradient min-h-screen relative pb-32">
      <Soundscape />
      <header className="pt-8 flex justify-center sticky top-0 z-40 bg-transparent backdrop-blur-xl pb-6 border-b border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <Logo size="h-24 md:h-32" withTagline />
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
        <div className="text-slate-700 italic">Hatteras Island Digital Collective</div>
      </footer>
    </div>
  );
};
