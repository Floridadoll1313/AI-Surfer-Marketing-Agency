import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Anchor, Compass } from 'lucide-react';

export const Lore = () => {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Anchor className="text-neon-cyan mx-auto mb-6" size={48} />
          <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4">The Lore</h1>
          <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Origin Protocol // Velocity Drop</p>
        </motion.div>

        <div className="space-y-12 text-lg text-slate-300 font-light leading-relaxed">
          <p>
            Born from the coastal rhythm and the rapid pulse of the digital age, Velocity Drop 💧👄 was 
            conceived as a bridge between the fluid nature of the ocean and the rigid speed of neural 
            automation.
          </p>
          <div className="p-8 border-l-2 border-neon-cyan bg-white/5 rounded-r-3xl italic">
            "In the surf, timing is everything. In business, velocity is the only thing."
          </div>
          <p>
            We don't just build tools; we build the waves. Our mission is to synchronize human 
            creativity with machine speed, ensuring that no business is left behind in the swell.
          </p>
        </div>
      </div>
    </div>
  );
};
