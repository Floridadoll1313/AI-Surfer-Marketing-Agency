import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Zap, Waves, Crown } from 'lucide-react';

const tiers = [
  {
    name: "Starter Swell",
    slug: "starter-swell",
    price: "$149",
    desc: "Perfect for testing the waters with AI automation.",
    features: ["Basic Chatbot", "3 Automation Workflows", "Email Support", "Community Access"],
    icon: Waves,
    color: "text-slate-400"
  },
  {
    name: "Velocity Pro",
    slug: "velocity-pro",
    price: "$249",
    desc: "High-speed solutions for growing digital presence.",
    features: ["Advanced AI Agents", "Unlimited Workflows", "Priority Neural Link", "Custom Integrations"],
    icon: Zap,
    color: "text-neon-cyan",
    popular: true
  },
  {
    name: "Elite Drop",
    slug: "elite-drop",
    price: "$349",
    desc: "Full-scale enterprise digital transformation.",
    features: ["White-label Solutions", "Dedicated AI Architect", "24/7 Priority Sync", "Early Access to New Features"],
    icon: Crown,
    color: "text-neon-pink"
  }
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
