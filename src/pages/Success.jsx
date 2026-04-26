import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Success = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-12 rounded-[3rem] border border-white/10 bg-white/5 text-center max-w-lg"
      >
        <CheckCircle className="text-neon-green mx-auto mb-6" size={64} />
        <h1 className="text-4xl font-black italic uppercase text-white mb-4">Sync Successful</h1>
        <p className="text-slate-400 mb-8 font-medium">Your data packet has been received. Welcome to the collective.</p>
        <Link 
          to="/members/dashboard" 
          className="flex items-center justify-center gap-2 w-full py-4 bg-neon-cyan text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white transition-all"
        >
          Enter Dashboard <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
};
