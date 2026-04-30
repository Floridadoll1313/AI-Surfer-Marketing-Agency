import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Waves, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingOverview = () => {
  const tiers = [
    {
      name: "Starter Swell",
      price: "$149",
      desc: "Perfect for testing the waters with AI automation.",
      features: ["Basic Chatbot", "3 Automation Workflows", "Email Support", "Community Access"],
      icon: Waves,
      color: "text-slate-400"
    },
    {
      name: "Velocity Pro",
      price: "$249",
      desc: "High-speed solutions for growing digital presence.",
      features: ["Advanced AI Agents", "Unlimited Workflows", "Priority Neural Link", "Custom Integrations"],
      icon: Zap,
      color: "text-neon-cyan",
      popular: true
    },
    {
      name: "Elite Drop",
      price: "$349",
      desc: "Full-scale enterprise digital transformation.",
      features: ["White-label Solutions", "Dedicated AI Architect", "24/7 Priority Sync", "Early Access to New Features"],
      icon: Crown,
      color: "text-neon-pink"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-950 text-white flex flex-col items-center justify-center py-20 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-10 text-center neon-text"
      >
        Choose Your Wave
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-10 w-full max-w-6xl">
        {tiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`relative rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-slate-700 hover:border-neon-cyan transition-all duration-300 shadow-lg hover:shadow-neon-cyan/50`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-semibold ${tier.color}`}>{tier.name}</h2>
              <tier.icon className={`w-8 h-8 ${tier.color}`} />
            </div>

            <p className="text-slate-300 mb-6">{tier.desc}</p>
            <p className="text-4xl font-bold mb-6">{tier.price}</p>

            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center text-slate-200">
                  <Check className="w-5 h-5 text-neon-cyan mr-2" /> {feature}
                </li>
              ))}
            </ul>

            <Link
              to={`/pricing/${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block text-center py-3 rounded-xl bg-neon-cyan text-black font-semibold hover:bg-neon-pink transition-all duration-300"
            >
              Ride This Wave
            </Link>

            {tier.popular && (
              <div className="absolute top-4 right-4 bg-neon-cyan text-black text-xs font-bold px-3 py-1 rounded-full">
                Popular
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingOverview;
