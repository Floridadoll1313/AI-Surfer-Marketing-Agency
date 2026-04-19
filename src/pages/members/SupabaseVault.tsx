import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Database, Lock, Shield, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../components/AuthProvider';

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
      console.error('Error fetching from Supabase:', err);
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
        .insert([
          { 
            title, 
            content, 
            user_id: user.uid // Using Firebase UID for now as a bridge
          }
        ])
        .select();

      if (error) throw error;
      
      setItems([data[0], ...items]);
      setTitle('');
      setContent('');
    } catch (err: any) {
      console.error('Error saving to Supabase:', err);
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
      console.error('Error deleting from Supabase:', err);
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <Lock className="mx-auto text-slate-800 mb-6" size={64} />
        <h2 className="text-3xl font-black italic mb-4">SUPABASE VAULT LOCKED</h2>
        <p className="text-slate-500 uppercase tracking-[0.3em] text-xs">Authentication required to access the neural archives</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Database className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter">SUPABASE NEURAL VAULT</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">
          Secure data persistence via Supabase. Storing digital assets in the deep reef.
        </p>
      </motion.div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={18} />
          <span>{error} (Check if 'vault_items' table exists in Supabase)</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="glass-card p-8 rounded-3xl border border-white/10 sticky top-32">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="text-neon-cyan" size={20} /> Archive New Asset
            </h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Asset Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan outline-none transition-colors text-white"
                  placeholder="Neural Mapping..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Data Content</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan outline-none transition-colors text-white h-32 resize-none"
                  placeholder="Encrypted payload..."
                />
              </div>
              <button
                type="submit"
                disabled={isSaving || !title || !content}
                className="w-full py-4 bg-neon-cyan text-black font-black uppercase tracking-tighter rounded-xl hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Shield size={20} />}
                Commit to Vault
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="animate-spin text-neon-cyan" size={48} />
              <p className="text-slate-500 uppercase tracking-widest text-xs">Syncing with Supabase...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl border border-white/5 text-center">
              <Database className="mx-auto text-slate-800 mb-4" size={48} />
              <p className="text-slate-500 font-light italic">No assets found in the neural vault.</p>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-3xl border border-white/10 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                  <h4 className="text-xl font-bold italic text-white group-hover:text-neon-cyan transition-colors">{item.title}</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-mono bg-black/30 p-4 rounded-xl border border-white/5">
                  {item.content}
                </p>
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] text-slate-600">
                  <span>ID: {item.id.slice(0, 8)}...</span>
                  <span>Archived: {new Date(item.created_at).toLocaleString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
