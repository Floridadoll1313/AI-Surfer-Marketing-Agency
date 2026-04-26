import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, MessageSquare } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Initialize <br /> <span className="text-neon-pink">Contact</span>
            </h1>
            <p className="text-slate-500 mb-12 font-medium">
              Ready to sync your business with the Velocity Drop ecosystem? 
              Our neural links are open 24/7.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="p-3 rounded-xl bg-neon-pink/10 text-neon-pink">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Neural Mail</p>
                  <p className="text-lg font-bold italic">hello@velocitydrop.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-3 rounded-xl bg-neon-cyan/10 text-neon-cyan">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">HQ Coordinate</p>
                  <p className="text-lg font-bold italic">Charleston, SC // West Ashley</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <MessageSquare size={120} />
            </div>
            <form className="space-y-6 relative z-10">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Identity</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 mt-2 focus:border-neon-pink/50 outline-none transition-all uppercase text-xs font-bold tracking-widest" placeholder="YOUR NAME" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Communication Link</label>
                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 mt-2 focus:border-neon-pink/50 outline-none transition-all uppercase text-xs font-bold tracking-widest" placeholder="EMAIL ADDRESS" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Message Packet</label>
                <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 mt-2 focus:border-neon-pink/50 outline-none transition-all uppercase text-xs font-bold tracking-widest" placeholder="YOUR MESSAGE..."></textarea>
              </div>
              <button className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-neon-pink transition-all flex items-center justify-center gap-3">
                <Send size={16} /> Transmit Data
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
