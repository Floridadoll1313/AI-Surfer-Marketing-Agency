import React from 'react';
import { motion } from 'motion/react';
import { Video, Play, Clock, BarChart } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'AI Fundamentals',
    duration: '45 min',
    level: 'Beginner',
    thumbnail: 'https://picsum.photos/seed/ai/800/450',
    description: 'Understanding the core concepts of LLMs and neural networks.'
  },
  {
    id: 2,
    title: 'Automation Workflows',
    duration: '1h 20min',
    level: 'Intermediate',
    thumbnail: 'https://picsum.photos/seed/automation/800/450',
    description: 'Building complex multi-step automations with Zapier and Make.'
  },
  {
    id: 3,
    title: 'Custom Agent Development',
    duration: '2h 15min',
    level: 'Advanced',
    thumbnail: 'https://picsum.photos/seed/agent/800/450',
    description: 'Deploying autonomous agents with custom tools and memory.'
  }
];

export const ModuleLibrary = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Video className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter">ACADEMY</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">Master the digital archipelago with our curated video lessons.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module) => (
          <motion.div 
            key={module.id}
            whileHover={{ y: -10 }}
            className="glass-card rounded-2xl border border-white/10 overflow-hidden group cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={module.thumbnail} 
                alt={module.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-neon-cyan rounded-full flex items-center justify-center text-black">
                  <Play fill="currentColor" size={24} />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-2 py-1 bg-black/80 backdrop-blur-md text-[8px] font-black uppercase tracking-widest rounded border border-white/10">
                  {module.duration}
                </span>
                <span className="px-2 py-1 bg-neon-cyan text-black text-[8px] font-black uppercase tracking-widest rounded">
                  {module.level}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">{module.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{module.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <Clock size={12} /> {module.duration}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <BarChart size={12} /> {module.level}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
