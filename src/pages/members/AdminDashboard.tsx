import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Activity, Settings, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Navigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---------------------------
  //   ADMIN AUTH CHECK
  // ---------------------------
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        setLoading(false);
        return;
      }

      // Admin check: email-based (adjust as needed)
      const adminEmails = [
        "shannon@oceantidedrop.com",
        "admin@oceantidedrop.com"
      ];

      if (adminEmails.includes(user.email)) {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    load();
  }, []);

  // ---------------------------
  //   LOADING STATE
  // ---------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-cyan"></div>
      </div>
    );
  }

  // ---------------------------
  //   ACCESS DENIED
  // ---------------------------
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ---------------------------
  //   ADMIN DASHBOARD UI
  // ---------------------------
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Shield className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter">ADMIN COMMAND CENTER</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">
          Welcome, Admin! System status: <span className="text-neon-green">Operational</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/10 blur-2xl" />
          <div className="flex items-center justify-between mb-4">
            <Users className="text-neon-cyan" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Users</span>
          </div>
          <div className="text-4xl font-black italic">—</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-neon-pink/10 blur-2xl" />
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-neon-pink" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Load</span>
          </div>
          <div className="text-4xl font-black italic text-neon-pink">NOMINAL</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/10 blur-2xl" />
          <div className="flex items-center justify-between mb-4">
            <Settings className="text-neon-green" size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security</span>
          </div>
          <div className="text-4xl font-black italic text-neon-green">ENFORCED</div>
        </motion.div>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-white/10">
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="text-yellow-500" size={20} />
          <h3 className="text-xl font-bold uppercase tracking-widest">System Logs</h3>
        </div>
        <div className="space-y-4 font-mono text-xs">
          <div className="flex gap-4 text-slate-500">
            <span className="text-neon-cyan">[INFO]</span>
            <span>{new Date().toISOString()}</span>
            <span>Admin session initialized for {user?.email}</span>
          </div>
          <div className="flex gap-4 text-slate-500">
            <span className="text-neon-cyan">[INFO]</span>
            <span>{new Date().toISOString()}</span>
            <span>System integrity verified.</span>
          </div>
          <div className="flex gap-4 text-slate-500">
            <span className="text-neon-pink">[SEC]</span>
            <span>{new Date().toISOString()}</span>
            <span>Access control rules enforced.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
