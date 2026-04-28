import React from "react";
import { motion } from "motion/react";
import { Sparkles, Zap, ArrowRight, Waves } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* Cinematic Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-neon-cyan/10 blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-neon-pink/10 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="flex justify-center">
            <Sparkles className="text-neon-cyan animate-pulse" size={48} />
          </div>

          <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter leading-[0.9]">
            AI Surfer  
            <br />
            <span className="text-neon-cyan drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]">
              Marketing Agency
            </span>
          </h1>

          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Cinematic branding, automated intelligence, and neon‑ocean storytelling.  
            Built for founders who want their digital presence to feel alive.
          </p>

          <div className="flex justify-center gap-6 pt-6">
            <Link
              to="/services"
              className="px-8 py-4 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all flex items-center gap-2"
            >
              Explore Services <ArrowRight size={18} />
            </Link>

            <Link
              to="/members"
              className="px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest font-black"
            >
              Join Collective
            </Link>
          </div>
        </motion.div>

        {/* FEATURE STRIP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32"
        >
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <Zap className="text-neon-cyan mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-2">Cinematic Branding</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Neon‑ocean visuals, immersive identity, and high‑impact storytelling that moves people.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <Waves className="text-neon-pink mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-2">AI‑Driven Systems</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automated workflows, intelligent content engines, and real‑time creative generation.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <Sparkles className="text-neon-green mb-4" size={32} />
            <h3 className="text-2xl font-bold mb-2">Founder‑Focused</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Built for creators, leaders, and visionaries who want to scale with style.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
