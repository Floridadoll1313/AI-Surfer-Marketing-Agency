import React from 'react';
import { motion } from 'motion/react';
import { Globe, Zap, Database, Bot, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      Home Page
    </div>
  )
}

const villages = [
  {
    name: 'Rodanthe',
    title: 'Web Builds',
    description: 'Frontend & Backend Architecture. High-performance digital structures.',
    icon: Globe,
    path: '/rodanthe',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Avon',
    title: 'Game Builds',
    description: 'Immersive systems and interactive experiences.',
    icon: Zap,
    path: '/avon',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    name: 'Buxton',
    title: 'Workflows',
    description: 'Active automation pipelines and business logic.',
    icon: Database,
    path: '/buxton',
    color: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Frisco',
    title: 'Automations',
    description: 'Live system feeds and autonomous agents.',
    icon: Bot,
    path: '/frisco',
    color: 'from-green-400 to-emerald-600'
  },
  {
    name: 'Hatteras',
    title: 'The Vault',
    description: 'Confidential process maps and secure SOPs.',
    icon: Lock,
    path: '/hatteras',
    color: 'from-red-500 to-rose-700'
  }
];

export const Home = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-cyan to-white">
          DIGITAL ARCHIPELAGO
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light tracking-wide">
          Navigating the currents of AI and automation. Explore the Hatteras villages to discover our specialized digital ecosystems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villages.map((village, index) => (
          <motion.div
            key={village.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={village.path}
              className="group block relative p-8 glass-card rounded-2xl border border-white/5 hover:border-neon-cyan/50 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${village.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <village.icon className="text-neon-cyan group-hover:scale-110 transition-transform duration-500" size={32} />
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-slate-500">{village.name}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors">
                  {village.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {village.description}
                </p>
                
                <div className="flex items-center gap-2 text-neon-cyan text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  Explore Village <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 p-12 glass-card rounded-3xl border border-white/5 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-neon-cyan/5 animate-pulse" />
        <h3 className="text-3xl font-black italic mb-4 relative z-10">READY TO SURF THE AI WAVE?</h3>
        <p className="text-slate-400 mb-8 relative z-10">Join the elite circle of digital architects and automate your future.</p>
        <Link 
          to="/chat"
          className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-neon-cyan text-black font-black uppercase tracking-tighter hover:bg-white transition-colors rounded-lg"
        >
          Initialize Connection <Zap size={20} fill="currentColor" />
        </Link>
      </motion.div>
    </div>
  );
};
