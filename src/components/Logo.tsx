import React from 'react';
import { cn } from '../lib/utils';

export const Logo = ({ size = 'w-48', withTagline = false }: { size?: string, withTagline?: boolean }) => {
  return (
    <div className={cn("flex flex-col items-center transition-all duration-500 hover:scale-105", size)}>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-green rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center">
          <span className="flex items-center space-x-5">
            <span className="pr-6 text-gray-100 font-black italic tracking-tighter text-2xl">OTD AI SURFER</span>
          </span>
        </div>
      </div>
      {withTagline && (
        <div className="mt-4 text-[10px] tracking-[0.4em] text-neon-cyan/60 uppercase font-black">
          Digital Ecosystem Architect
        </div>
      )}
    </div>
  );
};
