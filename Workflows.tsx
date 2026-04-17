import React from 'react';
import { motion } from 'motion/react';
import { Database, GitBranch, Share2, Workflow } from 'lucide-react';

export const Workflows = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Database className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter">BUXTON: WORKFLOWS</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">Active automation pipelines and business logic.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Workflow className="text-neon-cyan mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Process Automation</h3>
          <p className="text-slate-400 leading-relaxed">
            Streamlining repetitive tasks with intelligent workflows. We connect your 
            favorite tools to create a seamless, automated ecosystem.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <GitBranch className="text-neon-pink mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Data Pipelines</h3>
          <p className="text-slate-400 leading-relaxed">
            Moving and transforming data between systems with precision. Our pipelines 
            ensure your data is always where it needs to be, in the right format.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/5 col-span-full">
          <Share2 className="text-neon-green mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">System Integration</h3>
          <p className="text-slate-400 leading-relaxed">
            Breaking down silos by connecting disparate systems. We build the bridges 
            that allow your technology stack to work as a unified whole.
          </p>
        </div>
      </div>
    </div>
  );
};
