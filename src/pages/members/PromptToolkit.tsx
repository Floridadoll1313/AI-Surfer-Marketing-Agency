import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Copy, 
  Check, 
  Search, 
  Cpu, 
  MessageSquare, 
  Sparkles, 
  Zap, 
  Code 
} from 'lucide-react';
import { cn } from '../../lib/utils'; // FIXED: Path updated to two levels up

interface Prompt {
  id: string;
  category: 'Marketing' | 'Development' | 'Strategy' | 'Content';
  title: string;
  description: string;
  content: string;
}

const PROMPTS: Prompt[] = [
  {
    id: '1',
    category: 'Marketing',
    title: 'Ad Copy Neural Architect',
    description: 'Generates high-conversion hooks using the OTD Velocity framework.',
    content: "Act as a specialized Ad Copy Architect. Using the OTD Velocity framework, analyze [PRODUCT/SERVICE] and generate 5 psychological hooks that target high-intent digital collectors..."
  },
  {
    id: '2',
    category: 'Development',
    title: 'Full-Stack Logic Refactor',
    description: 'Analyzes React/Node code for bottlenecks and neural optimization.',
    content: "Review the following code block for architectural integrity and performance leaks. Suggest a modular refactor that prioritizes scalability within a Vite ecosystem..."
  },
  {
    id: '3',
    category: 'Strategy',
    title: 'Market Expansion Matrix',
    description: 'Deep-dive analysis for scaling digital services into new niches.',
    content: "Perform a competitive landscape analysis for [NICHE]. Identify 3 blue-ocean opportunities where neural automation can provide a 10x leverage point over traditional models..."
  }
];

export const PromptToolkit = () => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = PROMPTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Prompt Toolkit</h1>
        </div>
        <p className="text-slate-400 text-xl font-light">Engineered input sequences for maximum neural yield.</p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text"
            placeholder="Search the neural library..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:border-neon-cyan outline-none transition-all"
          />
        </div>
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto">
          {['All', 'Marketing', 'Development', 'Strategy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeCategory === cat ? "bg-neon-cyan text-black" : "text-slate-500 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPrompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            layout
            className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col relative group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                {prompt.category === 'Marketing' && <Sparkles className="text-neon-pink" size={24} />}
                {prompt.category === 'Development' && <Code className="text-neon-cyan" size={24} />}
                {prompt.category === 'Strategy' && <Brain className="text-neon-green" size={24} />}
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 border border-white/10 px-3 py-1 rounded-full">
                {prompt.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{prompt.title}</h3>
            <p className="text-slate-400 text-sm mb-8 flex-grow">{prompt.description}</p>

            <button
              onClick={() => copyToClipboard(prompt.id, prompt.content)}
              className={cn(
                "w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all",
                copiedId === prompt.id 
                  ? "bg-neon-green/20 text-neon-green border border-neon-green/30" 
                  : "bg-white/10 text-white hover:bg-neon-cyan hover:text-black"
              )}
            >
              {copiedId === prompt.id ? (
                <><Check size={14} /> Sequence Copied</>
              ) : (
                <><Copy size={14} /> Copy Sequence</>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
