import React from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, Key, EyeOff } from 'lucide-react';

export const Vault = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Lock className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter">HATTERAS: THE VAULT</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">Confidential process maps and secure SOPs.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <ShieldCheck className="text-neon-cyan mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Secure SOPs</h3>
          <p className="text-slate-400 leading-relaxed">
            Standard Operating Procedures stored with military-grade encryption. 
            Ensure your business knowledge is protected and accessible only to authorized personnel.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-2xl border border-white/5">
          <Key className="text-neon-pink mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Access Control</h3>
          <p className="text-slate-400 leading-relaxed">
            Granular permissions and multi-factor authentication. You decide who 
            sees what, when, and from where.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/5 col-span-full">
          <EyeOff className="text-neon-green mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-4">Confidential Maps</h3>
          <p className="text-slate-400 leading-relaxed">
            Visualizing your most sensitive business processes in a secure environment. 
            Protect your intellectual property while maintaining operational clarity.
          </p>
        </div>
      </div>
    </div>
  );
};
