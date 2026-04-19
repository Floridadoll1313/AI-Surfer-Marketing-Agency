import React from 'react';
import { motion } from 'motion/react';
import { Database, GitBranch, Share2, Workflow, Zap } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-cyan">The Pipeline (How it Works)</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">1. Ingestion & Triggers</h4>
              <p className="text-slate-400 text-sm">We define the pulse—webhooks, API polls, or event listeners—that tell the workflow when to wake up.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">2. Processing Logic</h4>
              <p className="text-slate-400 text-sm">Data flows through a series of nodes where it's filtered, augmented, and transformed according to your specific business rules.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">3. Action Routing</h4>
              <p className="text-slate-400 text-sm">The finalized data is propagated to your destination systems—CRMs, notification hubs, or long-term storage.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-pink">The Stream (Business Value)</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-pink/10 rounded-xl flex items-center justify-center border border-neon-pink/20 shrink-0">
                <Workflow size={20} className="text-neon-pink" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Operational Efficiency</h4>
                <p className="text-slate-400 text-sm">By automating linear tasks, you free up your team to focus on high-impact strategic work rather than data entry.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20 shrink-0">
                <Database size={20} className="text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Data Integrity</h4>
                <p className="text-slate-400 text-sm">Automated pipelines eliminate human error, ensuring your reports and dashboards are always fueled by accurate, real-time data.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20 shrink-0">
                <Share2 size={20} className="text-neon-green" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Accelerated Velocity</h4>
                <p className="text-slate-400 text-sm">Information moves through your organization faster, allowing you to respond to market changes and customer needs in real-time.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
