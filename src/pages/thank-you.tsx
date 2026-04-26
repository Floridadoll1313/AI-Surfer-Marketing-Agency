import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Waves } from 'lucide-react';

export const ThankYou = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-block mb-6"
        >
          <Waves className="text-neon-cyan" size={48} />
        </motion.div>
        <h1 className="text-6xl font-black italic uppercase text-white tracking-tighter mb-4">Mahalo</h1>
        <p className="text-neon-pink font-black uppercase tracking-[0.4em] text-[10px]">Transmission Complete</p>
      </div>
    </div>
  );
};
