import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket } from 'lucide-react';

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl w-full glass-card p-12 rounded-[3rem] border border-white/10 bg-white/5 text-center"
      >
        <Rocket className="text-neon-pink mx-auto mb-8" size={64} />

        <h1 className="text-4xl font-black italic uppercase mb-4">
          {slug ? slug.replace(/-/g, ' ') : 'Neural Node'}
        </h1>

        <p className="text-slate-500 mb-12 uppercase text-[10px] tracking-[0.4em]">
          Configuration Node Active
        </p>
        
        <div className="space-y-6">
          <p className="text-slate-300 font-light">
            Customizing your neural environment for this tier...
          </p>

          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-neon-pink"
              animate={{ x: [-200, 600] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>

          <Link 
            to="/pricing" 
            className="inline-flex items-center gap-2 text-neon-cyan text-[10px] font-black uppercase tracking-widest mt-8 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Tiers
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
