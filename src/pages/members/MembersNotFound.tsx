import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export const MembersNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-6"
      >
        <div className="relative inline-block">
          <AlertTriangle size={80} className="text-neon-pink animate-pulse" />
          <div className="absolute inset-0 blur-2xl bg-neon-pink/20 -z-10" />
        </div>
        <h1 className="text-6xl font-black italic uppercase text-white tracking-tighter">404_VOID</h1>
        <p className="text-slate-500 font-light max-w-xs mx-auto uppercase text-[10px] tracking-widest">
          The requested coordinate does not exist in the Velocity Drop ecosystem.
        </p>
        <Link 
          to="/members/dashboard" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-neon-cyan transition-all"
        >
          <Home size={16} /> Return to Nexus
        </Link>
      </motion.div>
    </div>
  );
};
