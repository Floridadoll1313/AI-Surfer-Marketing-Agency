import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Zap, 
  Users, 
  BarChart3, 
  ArrowUpRight, 
  MessageSquare,
  Globe,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../components/AuthProvider'; // FIXED: Up two levels
import { cn } from '../../lib/utils'; // FIXED: Up two levels

const STATS = [
  { id: 1, label: 'Neural Queries', value: '1,284', change: '+12%', icon: MessageSquare, color: 'text-neon-cyan' },
  { id: 2, label: 'Active Automations', value: '12', change: '+2', icon: Zap, color: 'text-neon-pink' },
  { id: 3, label: 'Digital Collectors', value: '450', change: '+18%', icon: Users, color: 'text-neon-green' },
  { id: 4, label: 'Global Reach', value: '24', change: '+4', icon: Globe, color: 'text-white' },
];

const RECENT_ACTIVITY = [
  { id: 1, title: 'AI Surfer Deployment', time: '2 hours ago', status: 'Success' },
  { id: 2, title: 'Neural Refactor - Module V2', time: '5 hours ago', status: 'Pending' },
  { id: 3, title: 'API Integration: Shopify', time: 'Yesterday', status: 'Success' },
];

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen space-y-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="text-neon-cyan" size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Command Center</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">
            Welcome, {user?.displayName?.split(' ')[0] || 'Architect'}
          </h1>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-neon-cyan text-black rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all">
          <PlusCircle size={16} /> New Operation
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: stat.id * 0.1 }}
            className="glass-card p-6 rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5 border border-white/10", stat.color)}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-neon-green flex items-center gap-1">
                {stat.change} <ArrowUpRight size={10} />
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white italic">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BarChart3 size={120} className="text-neon-cyan" />
            </div>
            <h3 className="text-xl font-black italic uppercase text-white mb-6">Velocity Overview</h3>
            <div className="h-64 flex items-end gap-2">
              {[40, 70, 45, 90, 65, 80, 50, 85, 30, 60, 75, 95].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-gradient-to-t from-neon-cyan to-neon-pink rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-8">
          <section className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5">
            <h3 className="text-xl font-black italic uppercase text-white mb-6">Neural Activity</h3>
            <div className="space-y-6">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5 shrink-0",
                    activity.status === 'Success' ? 'bg-neon-green shadow-[0_0_8px_rgba(57,255,20,0.5)]' : 'bg-yellow-500'
                  )} />
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{activity.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
