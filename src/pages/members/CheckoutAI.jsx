import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck } from 'lucide-react';

export const CheckoutAI = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-center">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <CreditCard className="mx-auto text-neon-green mb-6" size={64} />
        <h1 className="text-5xl font-black uppercase italic text-white mb-4">Checkout Node</h1>
        <p className="text-slate-400 mb-8 font-light">Secure transaction bridge powered by Stripe & Velocity Drop.</p>
        <div className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5 max-w-md mx-auto">
          <p className="text-white font-bold mb-4">Awaiting Neural Link...</p>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-neon-cyan" 
              animate={{ x: [-100, 400] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
