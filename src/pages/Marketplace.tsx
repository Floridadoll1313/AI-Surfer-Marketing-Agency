import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, Filter, Sparkles, Copy, Heart, Download, ExternalLink, Wand2 } from 'lucide-react';

interface Manifestation {
  id: string;
  title: string;
  author: string;
  image: string;
  prompt: string;
  likes: number;
  category: 'Image' | 'Video' | 'Prompt';
}

const manifestations: Manifestation[] = [
  { id: '1', title: 'Neon Reef Core', author: 'OceanTide', image: 'https://picsum.photos/seed/reef/800/800', prompt: 'Futuristic coral reef with neon cyan bioluminescence, cinematic lighting, 8k', likes: 124, category: 'Image' },
  { id: '2', title: 'Neural Architect', author: 'SkyWave', image: 'https://picsum.photos/seed/architect/800/1200', prompt: 'Cyberpunk architect overlooking a digital city, holographic blueprints, purple and pink aesthetic', likes: 89, category: 'Image' },
  { id: '3', title: 'Data Stream', author: 'NeuralNode', image: 'https://picsum.photos/seed/stream/1200/800', prompt: 'Abstract representation of data flowing through a neural network, glowing lines, dark background', likes: 210, category: 'Image' },
  { id: '4', title: 'Temporal Drift', author: 'TimeSurfer', image: 'https://picsum.photos/seed/drift/800/800', prompt: 'A clock melting into a digital ocean, surrealism, neon accents', likes: 56, category: 'Prompt' },
  { id: '5', title: 'Cyber Hatteras', author: 'IslandDev', image: 'https://picsum.photos/seed/hatteras/800/800', prompt: 'The Hatteras lighthouse in a futuristic cyberpunk setting, neon lights, stormy digital sky', likes: 167, category: 'Image' },
  { id: '6', title: 'Hatteras AI', author: 'BotMaster', image: 'https://picsum.photos/seed/ai/800/800', prompt: 'A brain made of glowing islands in a vast digital sea', likes: 342, category: 'Image' },
];

export const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyPrompt = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-neon-pink/10 rounded-2xl border border-neon-pink/20">
            <ShoppingBag className="text-neon-pink" size={32} />
          </div>
        </div>
        <h1 className="text-6xl font-black italic tracking-tighter mb-4 uppercase">Neural Marketplace</h1>
        <p className="text-slate-400 text-xl font-light tracking-wide max-w-2xl mx-auto">
          Exchange manifestations, prompts, and digital assets within the collective.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text"
            placeholder="Search manifestations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:border-neon-pink outline-none transition-colors text-white"
          />
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-2">
            <Filter size={18} /> Filter
          </button>
          <button className="px-8 py-4 bg-neon-pink text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,85,0.2)]">
            Manifest New
          </button>
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {manifestations.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="break-inside-avoid glass-card rounded-3xl border border-white/10 overflow-hidden group relative"
          >
            <div className="relative aspect-auto overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-neon-pink">
                {item.category}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">By {item.author}</p>
                </div>
                <div className="flex items-center gap-1 text-neon-pink">
                  <Heart size={14} fill="currentColor" />
                  <span className="text-xs font-bold">{item.likes}</span>
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-4 mb-6">
                <p className="text-xs text-slate-400 italic font-light leading-relaxed line-clamp-2">
                  "{item.prompt}"
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => copyPrompt(item.id, item.prompt)}
                  className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-neon-pink hover:text-white hover:border-neon-pink transition-all flex items-center justify-center gap-2"
                >
                  {copiedId === item.id ? <Sparkles size={12} /> : <Copy size={12} />}
                  {copiedId === item.id ? 'Copied' : 'Copy Prompt'}
                </button>
                <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-neon-cyan transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Sections */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-cyan">The Exchange (How it Works)</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">1. Manifestation Listing</h4>
              <p className="text-slate-400 text-sm">Architects within the Collective can list their most successful AI manifestations—images, videos, or prompt templates—for others to verify and use.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">2. Provenance Tracking</h4>
              <p className="text-slate-400 text-sm">Every asset is tagged with its origin metadata, including the neural model used and the prompt structure that birthed it, ensuring transparency.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">3. Peer Verification</h4>
              <p className="text-slate-400 text-sm">A decentralized 'likes' system allows the community to verify which manifestations are highest quality, surfacing the most effective neural logic.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-pink">The Yield (Business Value)</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-pink/10 rounded-xl flex items-center justify-center border border-neon-pink/20 shrink-0">
                <ShoppingBag size={20} className="text-neon-pink" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Asset Portability</h4>
                <p className="text-slate-400 text-sm">Seamlessly move proven internal prompts and visual assets across different branches of your business or even sell them to partners.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20 shrink-0">
                <Wand2 size={20} className="text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Knowledge Monetization</h4>
                <p className="text-slate-400 text-sm">Turn your internal prompt engineering expertise into a revenue stream by listing your highest-performing instructions for others to purchase.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20 shrink-0">
                <Sparkles size={20} className="text-neon-green" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Inspirational Velocity</h4>
                <p className="text-slate-400 text-sm">Jumpstart your manifestation process by discovering existing asset patterns that have already proven successful for similar business needs.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
