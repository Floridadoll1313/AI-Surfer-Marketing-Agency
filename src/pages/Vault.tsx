import React from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, Key, EyeOff, Zap } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-cyan">The Encryption (How it Works)</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">1. Zero-Knowledge Proofs</h4>
              <p className="text-slate-400 text-sm">We use cryptographic protocols to verify access rights without ever exposing your raw credentials or data to the system itself.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">2. Distributed Sharding</h4>
              <p className="text-slate-400 text-sm">Your data is sharded and distributed across an encrypted mesh, making it mathematically impossible to compromise without all authorized keys.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">3. Immutable Logging</h4>
              <p className="text-slate-400 text-sm">Every access attempt and modification is logged on an immutable chain, providing a clear audit trail for compliance and security.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-pink">The Shield (Business Value)</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-pink/10 rounded-xl flex items-center justify-center border border-neon-pink/20 shrink-0">
                <ShieldCheck size={20} className="text-neon-pink" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">IP Protection</h4>
                <p className="text-slate-400 text-sm">Keep your unique business methodologies and secrets away from competitors and bad actors with high-security barriers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20 shrink-0">
                <Lock size={20} className="text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Compliance Readiness</h4>
                <p className="text-slate-400 text-sm">Our vault structures are designed to meet rigorous data protection standards (GDPR, HIPAA, SOC2), making audits effortless.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20 shrink-0">
                <Key size={20} className="text-neon-green" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Knowledge Preservation</h4>
                <p className="text-slate-400 text-sm">Protect your business's most valuable asset—its institutional knowledge—ensuring continuity even during leadership transitions.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
