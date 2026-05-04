import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Waves, Zap, Flame, Crown } from 'lucide-react';

const tiers = [
  {
    name: "Dawn Patrol",
    slug: "dawn-patrol",
    price: "$97",
    desc: "Your cinematic entry point. Clean landing, AI‑assisted content, and your first automated workflows.",
    features: [
      "Cinematic landing page",
      "AI‑assisted content engine",
      "Starter automations",
      "Brand color tuning",
    ],
    icon: Waves,
    color: "text-slate-300",
  },
  {
    name: "Breakline",
    slug: "breakline",
    price: "$197",
    desc: "A multi‑page experience with deeper automations and a tuned content engine that moves with your brand.",
    features: [
      "Multi‑page site",
      "Advanced automations",
      "Content engine tuning",
      "Brand story expansion",
    ],
    icon: Zap,
    color: "text-neon-cyan",
    popular: true,
  },
  {
    name: "Hatteras Island",
    slug: "hatteras-island",
    price: "$297",
    desc: "High‑touch creative systems, evolving brand identity, and ongoing cinematic refinement.",
    features: [
      "Ongoing creative direction",
      "Cinematic brand evolution",
      "AI content pipelines",
      "Monthly experiments",
    ],
    icon: Flame,
    color: "text-neon-pink",
  },
  {
    name: "Cape Point",
    slug: "cape-point",
    price: "$497",
    desc: "Full‑stack automation, AI‑driven content pipelines, and mythic brand architecture built for scale.",
    features: [
      "Full automation suite",
      "AI‑driven content pipelines",
      "Mythic brand architecture",
      "Founder‑first creative systems",
    ],
    icon: Crown,
    color: "text-yellow-300",
  },
];

const PricingDetail = () => {
  const { slug } = useParams();
  const tier = tiers.find(t => t.slug === slug);

  if (!tier) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Wave Not Found</h1>
        <Link to="/pricing" className="text-neon-cyan hover:text-neon-pink transition-all duration-300">
          Return to Pricing
        </Link>
      </div>
    );
  }

  const Icon = tier.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-950 text-white flex flex-col items-center justify-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full backdrop-blur-md bg-white/5 border border-slate-700 rounded-2xl p-10 shadow-lg hover:shadow-neon-cyan/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-4xl font-bold ${tier.color}`}>{tier.name}</h1>
          <Icon className={`w-10 h-10 ${tier.color}`} />
        </div>

        <p className="text-slate-300 mb-6">{tier.desc}</p>
        <p className="text-5xl font-bold mb-8">{tier.price}</p>

        <ul className="space-y-4 mb-10">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-center text-slate-200">
              <Check className="w-5 h-5 text-neon-cyan mr-2" /> {feature}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="block text-center py-3 rounded-xl bg-neon-cyan text-black font-semibold hover:bg-neon-pink transition-all duration-300"
        >
          Begin Your Drop
        </Link>
      </motion.div>
    </div>
  );
};

export default PricingDetail;