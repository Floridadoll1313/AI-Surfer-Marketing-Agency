import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Code, Cpu, Globe, Terminal, Zap } from 'lucide-react';

export const Services = () => {
  const serviceList = [
    { 
      title: "Neural Automation", 
      icon: Bot, 
      desc: "Custom AI agents designed to handle repetitive logic workflows." 
    },
    { 
      title: "High-Velocity Web", 
      icon: Globe, 
      desc: "Next-gen React & Vite storefronts built for extreme performance." 
    },
    { 
      title: "API Ecosystems", 
      icon: Code, 
      desc: "Robust FastAPI backends and Supabase integration for scaling data." 
    },
    { 
      title: "Smart Automations", 
      icon: Cpu, 
      desc: "Connecting your digital presence with cross-platform synchronization." 
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan mb-6">
            <Zap size={14} className="fill-current" />
            <span className="text-[10px] font-black uppercase tracking-widest">Service Manifest</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-6">
            Digital <span className="text-neon-cyan">Flow</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-light text-lg">
            We build the neural pathways for modern digital commerce. Velocity-driven, AI-integrated.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5 hover:border-neon-cyan/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-black transition-all">
                  <service.icon size={32} />
                </div>
                <Terminal size={16} className="text-slate-700" />
              </div>
              <h3 className="text-3xl font-black italic uppercase mb-4">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
