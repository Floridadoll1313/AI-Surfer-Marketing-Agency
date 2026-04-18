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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-cyan">The Engine (How it Works)</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">1. Mechanics Design</h4>
              <p className="text-slate-400 text-sm">We define the core interactions—physics, input handling, and state management—to create a responsive and satisfying loop.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">2. Sensory Layer</h4>
              <p className="text-slate-400 text-sm">Our artists and developers layer on visuals and spatial audio, using GPU-accelerated rendering for buttery-smooth performance.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">3. Deployment Mesh</h4>
              <p className="text-slate-400 text-sm">Games are optimized for cross-browser and cross-device compatibility, ensuring equal performance on desktop and mobile.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-pink">The Impact (Business Value)</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-pink/10 rounded-xl flex items-center justify-center border border-neon-pink/20 shrink-0">
                <Gamepad2 size={20} className="text-neon-pink" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Brand Immersion</h4>
                <p className="text-slate-400 text-sm">Interactive experiences build deeper emotional connections with your brand than static content ever could.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20 shrink-0">
                <Sparkles size={20} className="text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Gamified Loyalty</h4>
                <p className="text-slate-400 text-sm">By turning tasks into games, you increase user retention, daily active usage (DAU), and overall platform stickiness.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20 shrink-0">
                <Zap size={20} className="text-neon-green" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Interactive Education</h4>
                <p className="text-slate-400 text-sm">Use game builds to teach complex concepts or train employees in a risk-free, engaging virtual environment.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
