import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Waves, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingOverview = () => {
  const tiers = [
    {
      name: "Starter Swell",
      price: "17",
      desc: "Perfect for testing the waters with AI automation.",
      features: ["Basic Chatbot", "3 Automation Workflows", "Email Support", "Community Access"],
      icon: Waves,
      color: "text-slate-400"
    },
    {
      name: "Velocity Pro",
      price: "249",
      desc: "High-speed solutions for growing digital presence.",
      features: ["Advanced AI Agents", "Unlimited Workflows", "Priority Neural Link", "Custom Integration"],
      icon: Zap,
      color: "text-neon-cyan",
      popular: true
    },
    {
      name: "Elite Drop",
      price: "349",
      desc: "Full-scale enterprise digital transformation.",
      features: ["White-label Solutions", "Dedicated AI Architect", "24/7 Priority Sync", "Early Feature Access"],
      icon: Crown,
      color: "text-neon-pink"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4">
          The <span className="text-neon-cyan">Pricing</span>
        </h1>
        <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">Choose Your Entry Velocity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-10 rounded-[3rem] border ${tier.popular ? 'border-neon-cyan/50 bg-white/10' : 'border-white/10 bg-white/5'} relative flex flex-col`}
          >
            {tier.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-cyan text-black text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest">
                Most Popular
              </span>
            )}
            <tier.icon className={`mb-6 ${tier.color}`} size={40} />
            <h3 className="text-2xl font-black uppercase italic mb-2">{tier.name}</h3>
            <div className="mb-6">
              <span className="text-5xl font-black italic">${tier.price}</span>
              <span className="text-slate-500 text-xs uppercase tracking-widest ml-2">/ month</span>
            </div>
            <p className="text-slate-400 text-sm mb-8 font-medium">{tier.desc}</p>
            
            <ul className="space-y-4 mb-10 flex-1">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                  <Check size={14} className="text-neon-green" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to={`/pricing/${tier.name.toLowerCase().replace(' ', '-')}`}
              className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all text-center ${tier.popular ? 'bg-neon-cyan text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}
            >
              Initialize Plan
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
