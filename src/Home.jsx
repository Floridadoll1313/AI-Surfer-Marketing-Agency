import React from "react";
import { motion } from "motion/react";
import { Sparkles, Zap, ArrowRight, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // ✅ Correct logo import

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND GLOW (Tailwind + fallback classes) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cyan Glow */}
        <div className="home-bg-cyan" />

        {/* Pink Glow */}
        <div className="home-bg-pink" />
      </div>

      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Ocean Tide Drop Logo"
              className="h-12 w-auto drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]"
            />
            <span className="text-white font-black tracking-widest text-lg">
              OCEAN TIDE DROP
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center gap-8 text-white font-semibold">
            <Link to="/services" className="hover:text-neon-cyan transition-all">
              Services
            </Link>

            <Link to="/pricing" className="hover:text-neon-cyan transition-all">
              Pricing
            </Link>

            <Link to="/members" className="hover:text-neon-cyan transition-all">
              Members
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24">
        
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