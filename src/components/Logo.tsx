import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: string;
  withTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, size = "h-40 md:h-64", withTagline = false }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <div className={cn("relative group", size)}>
        <img 
          src="/logo.png" 
          alt="Ocean Tide Drop AI Surfer" 
          className={cn("object-contain transition-transform group-hover:scale-105 duration-500 drop-shadow-2xl w-auto max-w-full", size)}
        />
        <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity" />
      </div>
      {withTagline && (
        <div className="flex flex-col items-center">
           <span className="text-xl font-black italic tracking-tighter uppercase text-white leading-none">
             Ocean Tide Drop
           </span>
           <span className="text-[8px] font-black tracking-[0.4em] uppercase text-slate-500 mt-1">
             Hatteras Digital Collective
           </span>
        </div>
      )}
    </div>
  );
};
