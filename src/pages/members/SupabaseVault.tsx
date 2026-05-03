import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Lock, Shield, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase'; // FIXED: Up two levels
import { useAuth } from '../../components/AuthProvider'; // FIXED: Up two levels

interface VaultItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export const SupabaseVault = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vault_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !content.trim()) return;

    try {
      setIsSaving(true);
      const { data, error } = await supabase
        .from('vault_items')
        .insert([{ 
          title, 
          content, 
          user_id: user.uid 
        }])
        .select();

      if (error) throw error;
      if (data) {
        setItems([data[0], ...items]);
        setTitle('');
        setContent('');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('vault_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setItems(items.filter(item => item.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center flex flex-col items-center justify-center min-h-screen">
        <Lock className="text-slate-800 mb-6" size={64} />
        <h2 className="text-3xl font-black italic mb-4 text-white">VAULT ENCRYPTED</h2>
        <p className="text-slate-500 uppercase tracking-widest text-xs">Establish a secure session to view archives</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Database className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Neural Vault</h1>
        </div>
        <p className="text-slate-400 text-xl font-light">Deep-layer persistence via Supabase protocol.</p>
      </motion.div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="glass-card p-8 rounded-3xl border border-white/10 sticky top-32 bg-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Plus className="text-neon-cyan" size={20} /> New Entry
            </h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-cyan outline-none"
                placeholder="Asset Label..."
              />
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white h-32 resize-none focus:border-neon-cyan outline-none"
                placeholder="Data Payload..."
              />
              <button
                type="submit"
                disabled={isSaving || !title || !content}
                className="w-full py-4 bg-neon-cyan text-black font-black uppercase rounded-xl hover:brightness-110 disabled:opacity-30 flex items-center justify-center gap-2"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Shield size={20} />}
                Commit Data
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center py-24 gap-4">
              <Loader2 className="animate-spin text-neon-cyan" size={48} />
              <p className="text-slate-500 uppercase tracking-widest text-[10px]">Retrieving fragments...</p>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-3xl border border-white/10 group bg-white/5"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold italic text-white group-hover:text-neon-cyan transition-colors">{item.title}</h4>
                  <button onClick={() => handleDelete(item.id)} className="text-slate-600 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-slate-400 text-sm font-mono bg-black/40 p-4 rounded-xl border border-white/5 break-all mb-4">
                  {item.content}
                </p>
                <div className="text-[8px] font-black uppercase tracking-widest text-slate-600">
                  REF: {item.id} | SYNC: {new Date(item.created_at).toLocaleDateString()}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
