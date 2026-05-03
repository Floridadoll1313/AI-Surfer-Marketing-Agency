import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Wand2, 
  Layers, 
  Save, 
  Play, 
  Plus, 
  Trash2,
  Settings2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../components/AuthProvider'; // FIXED: Path updated to two levels up
import { cn } from '../../lib/utils'; // FIXED: Path updated to two levels up

interface AIModule {
  id: string;
  name: string;
  type: 'Chatbot' | 'Automation' | 'Analysis';
  status: 'Active' | 'Draft';
}

export const AIStudio = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState<AIModule[]>([
    { id: '1', name: 'Velocity Agent Alpha', type: 'Chatbot', status: 'Active' },
    { id: '2', name: 'Content Surge Stream', type: 'Automation', status: 'Draft' },
  ]);

  const [activeTab, setActiveTab] = useState<'build' | 'deploy' | 'monitor'>('build');

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen space-y-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="text-neon-cyan" size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Neural Workspace</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">AI Studio</h1>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-neon-cyan transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <Plus size={16} /> Create New Module
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-4">
          {[
            { id: 'build', label: 'Neural Builder', icon: Wand2 },
            { id: 'deploy', label: 'Deployment Hub', icon: Layers },
            { id: 'monitor', label: 'Logic Monitor', icon: Settings2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all uppercase text-[10px] font-black tracking-widest",
                activeTab === tab.id 
                  ? "bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan" 
                  : "bg-white/5 border-white/10 text-slate-500 hover:text-white"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Interface */}
        <div className="lg:col-span-3 space-y-8">
          <section className="glass-card p-8 rounded-[2rem] border border-white/10 bg-white/5 min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center text-neon-cyan border border-neon-cyan/30">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase italic">Project: Velocity_Alpha_01</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Status: Ready for Synthesis</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-white/5 text-slate-400 rounded-xl hover:text-white transition-colors">
                  <Save size={20} />
                </button>
                <button className="p-3 bg-neon-green/20 text-neon-green rounded-xl hover:bg-neon-green hover:text-black transition-all">
                  <Play size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-white/10">
                <Plus size={40} />
              </div>
              <div>
                <p className="text-white font-bold uppercase tracking-widest">Empty Workspace</p>
                <p className="text-slate-500 text-xs mt-2">Drag components here to begin neural mapping</p>
              </div>
            </div>
          </section>

          {/* Module List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod) => (
              <div key={mod.id} className="p-6 rounded-3xl bg-black/40 border border-white/5 flex items-center justify-between group hover:border-neon-cyan/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    mod.status === 'Active' ? "bg-neon-green shadow-[0_0_8px_#39ff14]" : "bg-slate-700"
                  )} />
                  <div>
                    <p className="text-white font-bold text-sm">{mod.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">{mod.type}</p>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-500 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
