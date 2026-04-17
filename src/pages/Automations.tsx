import React from 'react';
import { motion } from 'motion/react';
import { Bot, Terminal, Activity, Zap } from 'lucide-react';

export const Automations = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Bot className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter">FRISCO: AUTOMATIONS</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">Live system feeds and autonomous agents.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Terminal className="text-neon-cyan mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Autonomous Agents</h3>
          <p className="text-slate-400 leading-relaxed">
            Deploying AI agents that can perform complex tasks independently. From 
            customer support to data analysis, our agents work 24/7.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Activity className="text-neon-pink mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Live Monitoring</h3>
          <p className="text-slate-400 leading-relaxed">
            Real-time tracking of your automated systems. Get instant alerts and 
            detailed logs to ensure everything is running smoothly.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/5 col-span-full">
          <Zap className="text-neon-green mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Instant Execution</h3>
          <p className="text-slate-400 leading-relaxed">
            Triggering actions based on complex events and conditions. Our automation 
            engine provides the speed and reliability your business demands.
          </p>
        </div>
      </div>
    </div>
  );
};
