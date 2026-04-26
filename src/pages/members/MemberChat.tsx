import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Shield, Zap } from 'lucide-react';
import { useAuth } from '../../components/AuthProvider';
import { cn } from '../../lib/utils';

export const MemberChat = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const chatHistory = [
    { id: 1, user: 'System', text: 'Neural link established. Welcome to Velocity Chat.', type: 'system' },
    { id: 2, user: 'Florida doll', text: 'Velocity Drop 💧👄 is live!', type: 'user' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">Neural Chat</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Encrypted Channel</span>
          </div>
        </div>
        <Shield className="text-neon-cyan opacity-20" size={40} />
      </div>

      <div className="flex-1 glass-card rounded-[2.5rem] border border-white/10 bg-white/5 p-6 overflow-y-auto space-y-6 mb-6">
        {chatHistory.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: msg.type === 'system' ? 0 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "max-w-[80%] p-4 rounded-2xl text-sm",
              msg.type === 'system' 
                ? "mx-auto bg-white/5 border border-white/5 text-slate-500 italic text-center" 
                : "bg-black/40 border border-neon-cyan/20 text-white"
            )}
          >
            <p className="text-[8px] font-black uppercase tracking-widest text-neon-cyan mb-1">{msg.user}</p>
            <p className="font-medium">{msg.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="TYPE NEURAL COMMAND..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-8 pr-20 text-white text-xs font-bold focus:outline-none focus:border-neon-pink/50 transition-all uppercase tracking-widest"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-neon-pink text-white rounded-xl hover:bg-white hover:text-black transition-all">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
