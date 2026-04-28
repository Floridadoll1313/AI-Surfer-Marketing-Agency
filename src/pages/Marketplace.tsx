import React from "react";
import { motion } from "motion/react";
import { Sparkles, ShoppingBag, Zap, Globe, TrendingUp } from "lucide-react";

interface MarketItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const items: MarketItem[] = [
  {
    id: "blueprints",
    title: "Blueprints",
    description: "High‑impact digital systems, frameworks, and ready‑to‑deploy workflows.",
    icon: <Zap className="w-6 h-6 text-cyan-300" />,
    href: "/blueprints",
  },
  {
    id: "workflows",
    title: "Workflows",
    description: "Automated pipelines and cinematic processes for creators and founders.",
    icon: <Globe className="w-6 h-6 text-cyan-300" />,
    href: "/workflows",
  },
  {
    id: "tools",
    title: "Tools",
    description: "Custom utilities, scripts, and AI‑powered components for your digital realm.",
    icon: <TrendingUp className="w-6 h-6 text-cyan-300" />,
    href: "/tools",
  },
  {
    id: "products",
    title: "Digital Products",
    description: "Premium assets, templates, and mythic resources for your brand.",
    icon: <ShoppingBag className="w-6 h-6 text-cyan-300" />,
    href: "/products",
  },
];

const Marketplace: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#020617] via-[#041a2f] to-black text-white">
      {/* HERO */}
      <section className="pt-28 pb-16 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent"
        >
          Ocean Tide Marketplace
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
