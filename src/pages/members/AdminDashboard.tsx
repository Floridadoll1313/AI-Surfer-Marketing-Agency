import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Users, 
  Settings, 
  Database, 
  TrendingUp, 
  AlertCircle,
  Activity,
  Lock
} from 'lucide-react';
import { useAuth } from '../../components/AuthProvider'; // FIXED: Path updated
import { cn } from '../../lib/utils'; // FIXED: Path updated

// Named export to fix the MembersRouter build error
export const AdminDashboard = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // In a real scenario, you'd check a 'role' field in your Supabase 'profiles' table
  useEffect(() => {
    if (user) {
      // Logic to verify admin status
      setIsAdmin(true); 
    }
  }, [user]);

  const ADMIN_STATS = [
    { label: 'Total Users', value: '1,024', icon: Users, color: 'text-neon-cyan' },
    { label: 'System Load', value: '32%', icon: Activity, color: 'text-neon-green' },
    { label: 'Security Level', value: 'Maximum', icon: ShieldAlert, color: 'text-neon-pink' },
    { label: 'Database Status', value: 'Syncing', icon: Database, color: 'text-white' },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="text-center space-y-4">
          <Lock className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-2xl font-black uppercase italic text-white">Access Denied</h2>
          <p className="text-slate-500 max-w-xs">Your neural signature does not match the Admin override sequence.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen space-y-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <ShieldAlert className="text-neon-pink" size={24} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Root Access Only</span>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Admin Dashboard</h1>
      </motion.div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ADMIN_STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="flex justify-between items-center mb-4">
              <div className={cn("p-2 rounded-xl bg-white/5 border border-white/10", stat.color)}>
                <stat.icon size={20} />
              </div>
              <TrendingUp size={14} className="text-slate-600" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-white italic">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Logs */}
        <section className="glass-card p-8 rounded-[2rem] border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black italic uppercase text-white">Security Protocol Logs</h3>
            <Settings size={20} className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
                <AlertCircle size={14} className="text-yellow-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-300 font-bold">Unauthorized Ping detected from Node_882</p>
                  <p className="text-slate-600 uppercase font-black text-[8px] tracking-widest mt-1">Today at 10:42 AM</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="glass-card p-8 rounded-[2rem] border border-white/10 bg-white/5">
          <h3 className="text-xl font-black italic uppercase text-white mb-8">System Overrides</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-black uppercase text-[10px] tracking-widest hover:bg-neon-cyan hover:text-black transition-all">
              Update Schema
            </button>
            <button className="p-6 rounded-2xl bg-neon-pink/10 border border-neon-pink/20 text-neon-pink font-black uppercase text-[10px] tracking-widest hover:bg-neon-pink hover:text-white transition-all">
              Flush Cache
            </button>
            <button className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
              User Audit
            </button>
            <button className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
              API Access
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
