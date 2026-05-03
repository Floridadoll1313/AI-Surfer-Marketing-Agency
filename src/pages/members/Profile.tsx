import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  Camera,
  Loader2,
  Zap
} from 'lucide-react';
import { useAuth } from '../../components/AuthProvider'; // FIXED: Path updated
import { db } from '../../lib/firebase'; // FIXED: Path updated
import { doc, getDoc } from 'firebase/firestore';

export const Profile = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-neon-cyan" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
      >
        {/* Header/Banner */}
        <div className="h-32 bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 relative" />
        
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex items-end justify-between">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-black border-4 border-black overflow-hidden relative">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 text-slate-500">
                    <User size={48} />
                  </div>
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-neon-cyan text-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} />
              </button>
            </div>

            <button 
              onClick={() => logout()}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest"
            >
              <LogOut size={16} /> Termination Session
            </button>
          </div>

          <div className="space-y-1 mb-8">
            <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter">
              {user?.displayName || 'Architect Node'}
            </h1>
            <p className="text-neon-cyan text-xs font-bold tracking-[0.3em] uppercase">
              {userData?.role || 'Neural Collector'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-neon-green" /> Core Identity
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-slate-500" size={18} />
                  <div>
                    <p className="text-[8px] text-slate-500 uppercase font-bold">Encrypted Email</p>
                    <p className="text-white text-sm">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Calendar className="text-slate-500" size={18} />
                  <div>
                    <p className="text-[8px] text-slate-500 uppercase font-bold">Initialization Date</p>
                    <p className="text-white text-sm">
                      {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} className="text-neon-cyan" /> Velocity Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-[8px] text-slate-500 uppercase font-bold mb-1">Modules</p>
                  <p className="text-2xl font-black text-white italic">04</p>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-[8px] text-slate-500 uppercase font-bold mb-1">Rank</p>
                  <p className="text-2xl font-black text-neon-cyan italic">V1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
