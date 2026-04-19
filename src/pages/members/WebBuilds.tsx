import React from 'react';
import { motion } from 'motion/react';
import { Globe, Code, Layers, Cpu, Zap } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-cyan">The Circuitry (How it Works)</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">1. Blueprint Phase</h4>
              <p className="text-slate-400 text-sm">We map out your component architecture and data flow using industry-standard patterns, ensuring a resilient foundation.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">2. Synthesis & Build</h4>
              <p className="text-slate-400 text-sm">Our architects leverage modern frameworks to synthesize code that is modular, testable, and optimized for speed.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">3. Propagation</h4>
              <p className="text-slate-400 text-sm">Deployment across global CDNs ensures your application is instantly accessible from any node in the digital world.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-pink">The Harvest (Business Value)</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-pink/10 rounded-xl flex items-center justify-center border border-neon-pink/20 shrink-0">
                <Zap size={20} className="text-neon-pink" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Conversion Optimization</h4>
                <p className="text-slate-400 text-sm">Faster load times and intuitive UX directly correlate to higher conversion rates and lower bounce rates for your business.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20 shrink-0">
                <Globe size={20} className="text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Global Scalability</h4>
                <p className="text-slate-400 text-sm">Our architectures are built to grow. As your customer base expands, your digital infrastructure handles the load without friction.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20 shrink-0">
                <Cpu size={20} className="text-neon-green" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Future-Proofing</h4>
                <p className="text-slate-400 text-sm">By using modern, maintained tech stacks, we reduce technical debt and ensure your business stays ahead of the curve.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
