import React from 'react';
import { motion } from 'motion/react';
import { Globe, Code, Layers, Cpu } from 'lucide-react';

export const WebBuilds = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Globe className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter">RODANTHE: WEB BUILDS</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">Frontend & Backend Architecture. High-performance digital structures.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Code className="text-neon-cyan mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Modern Frontend</h3>
          <p className="text-slate-400 leading-relaxed">
            We build lightning-fast, responsive interfaces using React, Next.js, and Tailwind CSS. 
            Our focus is on performance, accessibility, and cutting-edge design.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Layers className="text-neon-pink mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Scalable Backend</h3>
          <p className="text-slate-400 leading-relaxed">
            Robust server-side logic and database management. We utilize Node.js, Python, and 
            cloud-native technologies to ensure your application can scale with your growth.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/5 col-span-full">
          <Cpu className="text-neon-green mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">AI Integration</h3>
          <p className="text-slate-400 leading-relaxed">
            Seamlessly integrating Large Language Models and custom AI agents into your web 
            applications to provide intelligent features and automated user experiences.
          </p>
        </div>
      </div>
    </div>
  );
};
