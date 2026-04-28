import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Success: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#02111f] to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-12 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,255,255,0.15)] text-center max-w-lg glass-card"
      >
        <CheckCircle
          className="mx-auto mb-6 text-cyan-300 drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]"
          size={72}
        />

        <h1 className="text-4xl font-black italic uppercase text-white tracking-wide mb-4">
          Sync Successful
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
