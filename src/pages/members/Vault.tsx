import React from 'react';
import { motion } from 'framer-motion';
import { Lock, FolderLock, Key, HardDrive } from 'lucide-react';

export const Vault = () => {
  const assets = [
    { name: 'Velocity_Core_v1.zip', size: '1.2 GB', type: 'System' },
    { name: 'Surfer_Assets.pkg', size: '450 MB', type: 'Media' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="space-y-12"
      >
        <div className="flex items-center gap-6">
          <div className="p-4 bg-neon-pink/10 rounded-2xl border border-neon-pink/20">
            <Lock className="text-neon-pink" size={32} />
          </div>
          <div>
            <h1 className="text-5xl font-black italic uppercase text-white tracking-tighter">The Vault</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Secure Asset Storage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assets.map((asset, i) => (
            <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/10 bg-white/5 hover:border-neon-cyan/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <FolderLock className="text-slate-600 group-hover:text-neon-cyan transition-colors" size={40} />
                <span className="text-[8px] font-black px-2 py-1 rounded bg-white/5 text-slate-400">{asset.type}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{asset.name}</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-6">{asset.size}</p>
              <button className="flex items-center gap-2 text-neon-cyan text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                <Key size={12} /> Decrypt & Download
              </button>
            </div>
          ))}

          {/* Empty Slot */}
          <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center text-slate-700">
            <HardDrive size={40} className="mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest">Available Storage Node</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
