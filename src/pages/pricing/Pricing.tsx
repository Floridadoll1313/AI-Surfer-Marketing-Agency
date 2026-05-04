import React from "react";
import { ProductCard } from "../../components/ProductCard";
import { motion } from "framer-motion";
import "./pricing.css";

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 relative overflow-hidden">
      {/* NEON OCEAN AURA */}
      <motion.div
        className="absolute inset-0 opacity-40 blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(0,255,255,0.35), transparent 70%)",
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
        <h1 className="pricing-title text-neon-cyan drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]">
          Choose Your Tier
        </h1>

        <p className="pricing-subtitle uppercase tracking-[0.3em] text-xs">
          Calibrate Your Neural Surf Engine
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        className="pricing-grid max-w-6xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
          <ProductCard
            title="Dawn Patrol"
            description="Your cinematic entry point. Clean landing, AI‑assisted content, and your first automated workflows."
            slug="dawn-patrol"
            image="/images/dawn-patrol.jpg"
          />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
          <ProductCard
            title="Breakline"
            description="A multi‑page experience with deeper autom