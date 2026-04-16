import React from 'react';
import { motion } from 'motion/react';
import { Zap, Gamepad2, MousePointer2, Sparkles } from 'lucide-react';

export const GameBuilds = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Zap className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter">AVON: GAME BUILDS</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">Immersive systems and interactive experiences.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Gamepad2 className="text-neon-cyan mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Interactive Mechanics</h3>
          <p className="text-slate-400 leading-relaxed">
            Developing engaging gameplay loops and intuitive controls. We specialize in 
            web-based games and interactive simulations that captivate users.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Sparkles className="text-neon-pink mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Visual Effects</h3>
          <p className="text-slate-400 leading-relaxed">
            Pushing the boundaries of web graphics with custom shaders, particle systems, 
            and smooth animations using Three.js and Canvas APIs.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/5 col-span-full">
          <MousePointer2 className="text-neon-green mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">User Engagement</h3>
          <p className="text-slate-400 leading-relaxed">
            Designing systems that keep players coming back. From progression systems to 
            multiplayer integration, we build the infrastructure for modern gaming.
          </p>
        </div>
      </div>
    </div>
  );
};
