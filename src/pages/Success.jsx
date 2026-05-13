import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
=======
import Logo from "../components/Logo";
import { CheckCircle } from "lucide-react";
>>>>>>> origin/main

export default function Success() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-md w-full bg-gray-900/40 border border-cyan-500/30 p-8 rounded-3xl backdrop-blur-xl text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          Authentication Complete
        </h1>

        <p className="text-cyan-200/80 mb-10 font-medium leading-relaxed">
          Your data packet has been authenticated.  
          The Collective recognizes your arrival.
        </p>

        <Link
          to="/members/dashboard"
          className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-300 text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        >
          Enter Dashboard <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Success;
=======
    <div className="min-h-screen bg-black text-white py-24 px-4 flex items-center">
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* HERO */}
        <CheckCircle className="text-neon-green mx-auto mb-6" size={64} />
        <h1 className="text-6xl font-black italic tracking-tighter mb-4">
          Success
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Your membership has been activated. Welcome to the Collective.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <p className="text-slate-500">
          You may now close this window or return to the main site.
        </p>

      </div>
    </div>
  );
}
>>>>>>> origin/main
