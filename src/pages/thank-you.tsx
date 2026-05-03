import React from "react";
import { motion } from "framer-motion";
import { Heart, Waves } from "lucide-react";

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#02111f] to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Floating Icon */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="inline-block mb-8"
        >
          <Waves
            className="text-cyan-300 drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]"
            size={56}
          />
        </motion.div>

        {/* Title */}
        <h1 className="text-6xl font-black italic uppercase text-white tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]">
          Mahalo
        </h1>

        {/* Subtext */}
        <p className="text-pink-300 font-black uppercase tracking-[0.4em] text-[10px] drop-shadow-[0_0_10px_rgba(255,0,128,0.4)]">
          Transmission Complete
        </p>
      </motion.div>
    </div>
  );
};

export default ThankYou;
