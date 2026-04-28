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
                  <p className="text-lg font-bold italic">hello@oceantidedrop.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="p-3 rounded-xl bg-neon-pink/10 text-neon-pink">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">HQ Location</p>
                  <p className="text-lg font-bold italic">West Ashley, Charleston, SC</p>
                </div>
              </div>
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-slate-400">
                Your Name
              </label>
              <input 
                type="text"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-neon-pink outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-slate-400">
                Email
              </label>
              <input 
                type="email"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-neon-pink outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-slate-400">
                Message
              </label>
              <textarea 
                rows={5}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-neon-pink outline-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-neon-pink text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all"
            >
              <Send size={18} />
              Send Message
            </button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
