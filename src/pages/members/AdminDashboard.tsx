import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Users, 
  Activity, 
  Lock, 
  Database, 
  Terminal 
} from 'lucide-react';
import { useAuth } from '../../components/AuthProvider'; 
import { cn } from '../../lib/utils';

export const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Nodes', value: '2,927', icon: Database, color: 'text-neon-cyan' },
    { label: 'Neural Traffic', value: '88%', icon: Activity, color: 'text-neon-pink' },
    { label: 'System Health', value: 'Optimal', icon: ShieldAlert, color: 'text-neon-green' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="text-neon-pink" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Admin Override</h1>
        </div>
        <p className="text-slate-400 text-xl font-light underline decoration-neon-pink/30">Privileged Access: Velocity Drop Root.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5">
            <div className={cn("mb-4", stat.color)}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white italic">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="p-12 glass-card rounded-[3rem] border border-white/10 bg-white/5 text-center">
        <Lock className="mx-auto text-slate-700 mb-6" size={48} />
        <h3 className="text-xl font-bold text-white uppercase italic mb-2">Security Protocol Active</h3>
        <p className="text-slate-500 text-sm">System logs are restricted to Level 5 clearance.</p>
      </div>
    </div>
  );
};
