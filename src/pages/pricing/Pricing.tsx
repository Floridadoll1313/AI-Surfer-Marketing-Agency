import React from 'react';
import ProductCard from '../../components/ProductCard'; // ✅ FIXED — default import
import { motion } from 'framer-motion';
import '../../components/product-card.css';

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 relative overflow-hidden">
      {/* NEON OCEAN AURA */}
      <motion.div
        className="absolute inset-0 opacity-40 blur-[140px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, rgba(0,255,255,0.35), transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-5xl font-black uppercase italic mb-4 text-neon-cyan drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]">
          Choose Your Tier
        </h1>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-xs">
          Calibrate Your Neural Surf Engine
        </p>
      </motion.div>

      {/* GRID WITH STAGGERED ANIMATION */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.25 },
          },
        }}
      >
        {/* CARD 1 */}
        <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
          <ProductCard
            title="Neural Node"
            description="Your entry into the neural field. Activate your first node."
            slug="neural-node"
            image="/images/neural-node.jpg"
          />
        </motion.div>

        {/* CARD 2 */}
        <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
          <ProductCard
            title="Ocean Pro"
            description="Calibrate your oceanic resonance and unlock deeper flow."
            slug="ocean-pro"
            image="/images/ocean-pro.jpg"
          />
        </motion.div>

        {/* CARD 3 */}
        <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
          <ProductCard
            title="Founders Realm"
            description="Enter the inner sanctum. Reserved for realmwalkers only."
            slug="founders-realm"
            image="/images/founders-realm.jpg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Pricing;