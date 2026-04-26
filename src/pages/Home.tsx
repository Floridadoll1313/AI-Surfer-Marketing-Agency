import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Zap, Rocket, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

// Named export to match your build pattern
export const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-cyan selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
          {/* Animated Background Element */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-neon-cyan/10 blur-[120px] rounded-full"
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Waves className="text-neon-cyan animate-pulse" size={64} />
            </div>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase mb-4">
              Velocity <span className="text-neon-cyan">Drop</span> 💧👄
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-slate-400 mb-10">
              High-Speed Neural Solutions & Digital Flow
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link 
                to="/pricing" 
                className="px-10 py-5 bg-white text-black font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-neon-cyan transition-all transform hover:scale-105"
              >
                Catch the Wave
              </Link>
              <Link 
                to="/services" 
                className="px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-white/10 transition-all"
              >
                View Manifest
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Zap, title: "Neural Speed", desc: "Instant AI automation deployment." },
            { icon: Rocket, title: "Velocity Scale", desc: "Built for rapid business expansion." },
            { icon: Globe, title: "Global Sync", desc: "Worldwide digital asset availability." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5"
            >
              <feature.icon className="text-neon-pink mb-6" size={40} />
              <h3 className="text-2xl font-black uppercase italic mb-4">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
