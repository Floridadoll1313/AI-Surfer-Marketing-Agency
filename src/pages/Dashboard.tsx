import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Heart, 
  Database, 
  Shield, 
  ArrowRight, 
  Zap, 
  Sparkles,
  User,
  Activity,
  CircuitBoard,
  Cpu,
  Globe,
  Waves,
  Brain,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { collection, query, where, getDocs, limit, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

export const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    messages: 0,
    stories: 0,
    vaultItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [neuralThought, setNeuralThought] = useState<string>('');
  const [isGeneratingThought, setIsGeneratingThought] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const publicRef = doc(db, 'users_public', user.uid);
        const publicSnap = await getDoc(publicRef);
        if (!publicSnap.exists()) {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            await setDoc(publicRef, {
              uid: user.uid,
              displayName: data.displayName || user.displayName,
              photoURL: data.photoURL || user.photoURL,
              bio: data.bio || '',
              location: data.location || '',
            });
          }
        }

        const qChat = query(collection(db, 'chat_messages'), where('user_id', '==', user.uid));
        const chatSnap = await getDocs(qChat);
        
        const qStories = query(collection(db, 'memorial_stories'), limit(100));
        const storiesSnap = await getDocs(qStories);

        setStats({
          messages: chatSnap.size,
          stories: storiesSnap.size,
          vaultItems: 0 
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    const generateThought = async () => {
      if (neuralThought) return;
      setIsGeneratingThought(true);
      try {
        const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const result = await genAI.models.generateContent({
          model: "gemini-1.5-flash",
          contents: [{ role: 'user', parts: [{ text: "Give a very short, futuristic, cyberpunk-style cryptic 'thought of the day' for a digital citizen on a neon island. Max 15 words." }] }]
        });
        setNeuralThought(result.text.replace(/"/g, ''));
      } catch (err) {
        console.error('Thought generation error:', err);
        setNeuralThought("The waves of code carry the secrets of the reef.");
      } finally {
        setIsGeneratingThought(false);
      }
    };

    fetchStats();
    generateThought();
  }, [user]);

  if (!user) return null;

  const quickLinks = [
    { name: 'Neural Identity', path: '/profile', icon: User, color: 'text-neon-cyan', bg: 'bg-neon-cyan/5' },
    { name: 'Member Chat', path: '/chat', icon: MessageSquare, color: 'text-neon-green', bg: 'bg-neon-green/5' },
    { name: 'Member Directory', path: '/directory', icon: Sparkles, color: 'text-neon-yellow', bg: 'bg-neon-yellow/5' },
    { name: 'Supabase Vault', path: '/supabase-vault', icon: Database, color: 'text-neon-purple', bg: 'bg-neon-purple/5' },
    { name: 'Hatteras Map', path: '/map', icon: Globe, color: 'text-neon-pink', bg: 'bg-neon-pink/5' },
    { name: 'Prompt Toolkit', path: '/toolkit', icon: Cpu, color: 'text-white', bg: 'bg-white/5' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Immersive Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Hero Section */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
                <CircuitBoard className="text-neon-cyan" size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Core System V2.1.0</span>
            </div>
            <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.9] bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-400 to-slate-800">
              Welcome Back,<br/> 
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{user.displayName}</span>
            </h1>
            <div className="flex items-center gap-4 text-slate-500 font-light tracking-widest text-sm italic">
              <Waves size={16} className="text-neon-cyan animate-bounce" />
              Pulse frequency: Stable @ 44.1kHz
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-end gap-4"
          >
            {isAdmin && (
              <Link 
                to="/admin"
                className="group relative px-8 py-3 overflow-hidden rounded-full transition-all border border-neon-green/30"
              >
                <div className="absolute inset-0 bg-neon-green/5 group-hover:bg-neon-green/20 transition-all" />
                <span className="relative z-10 text-neon-green text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Shield size={14} /> Neural Overlord Access
                </span>
              </Link>
            )}
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-600 mb-1">Last Sync</div>
              <div className="font-mono text-xs text-neon-cyan">2077.04.16 // 08:08:30</div>
            </div>
          </motion.div>
        </header>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          
          {/* Neural Thought Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-4 lg:col-span-3 glass-card p-10 rounded-[3rem] border border-white/10 relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 p-8">
              <Brain className="text-neon-cyan/20 group-hover:text-neon-cyan/40 transition-colors animate-pulse" size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <Quote className="text-neon-cyan" size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Neural Synthesis</span>
              </div>
              <AnimatePresence mode="wait">
                {isGeneratingThought ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.p 
                    key="thought"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-light italic leading-relaxed text-white pr-12"
                  >
                    "{neuralThought}"
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-8 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
              // Source: Collective Core Oracle
            </div>
          </motion.div>

          {/* Stats Column */}
          <div className="md:col-span-2 lg:col-span-1 space-y-6">
            <div className="glass-card p-6 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <MessageSquare className="text-neon-cyan mb-4" size={20} />
              <div className="text-4xl font-black mb-1 italic">{stats.messages}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Syncs Established</div>
            </div>
            <div className="glass-card p-6 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <Heart className="text-neon-pink mb-4" size={20} />
              <div className="text-4xl font-black mb-1 italic">{stats.stories}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sanctuary Keys</div>
            </div>
          </div>

          {/* System Status Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-2 lg:col-span-2 glass-card p-8 rounded-[3rem] border border-white/10 bg-black/40 flex flex-col justify-center items-center text-center overflow-hidden relative"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-x-0 top-1/2 h-px bg-neon-cyan animate-pulse translate-y-[-100px]" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-neon-cyan animate-pulse translate-y-[100px]" />
            </div>
            <Activity className="text-neon-green mb-4 animate-pulse" size={32} />
            <div className="text-2xl font-black italic uppercase text-white mb-2">Neural Link: ACTIVE</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-1 h-3 rounded-full ${i < 5 ? 'bg-neon-green' : 'bg-neon-green/20'}`} />
              ))}
            </div>
            <div className="mt-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Latency: 0.003ms // Jitter: NULL
            </div>
          </motion.div>
        </div>

        {/* Global Access Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Navigation Matrix */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2 italic">
                <Cpu size={14} className="text-neon-cyan" /> Navigation Matrix
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-8" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "group relative overflow-hidden p-8 glass-card rounded-[2rem] border border-white/5 hover:border-white/20 transition-all",
                    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                  )}
                >
                  <div className={cn("p-4 rounded-2xl mb-6 inline-flex transition-transform duration-500 group-hover:rotate-12", link.bg)}>
                    <link.icon size={24} className={link.color} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black italic text-lg text-white uppercase tracking-tighter">{link.name}</h4>
                    <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest group-hover:text-neon-cyan transition-colors">Initialize Sequence</p>
                  </div>
                  <ArrowRight className="absolute bottom-8 right-8 text-slate-700 group-hover:text-white transition-all transform -rotate-45 group-hover:rotate-0" size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 px-4 italic">Recent Logs</h3>
            <div className="glass-card p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Activity size={100} />
              </div>
              <div className="space-y-10 relative z-10">
                {[
                  { icon: Zap, color: 'text-neon-cyan', title: 'Neural Identity Sync', time: 'Just Now' },
                  { icon: Sparkles, color: 'text-neon-yellow', title: 'Directory Matrix Scan', time: '2h ago' },
                  { icon: Database, color: 'text-neon-purple', title: 'Vault Access Granted', time: 'Yesterday' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="relative">
                      <div className={cn("p-3 rounded-xl bg-black/50 border border-white/5 group-hover:border-white/20 transition-all", item.color)}>
                        <item.icon size={18} />
                      </div>
                      {i < 2 && <div className="absolute h-10 w-px bg-white/5 left-1/2 -translate-x-1/2 top-full mt-2" />}
                    </div>
                    <div>
                      <p className="text-sm text-white font-bold italic tracking-tight uppercase group-hover:text-neon-cyan transition-colors">{item.title}</p>
                      <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em] mt-1 font-mono font-black">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-12 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
                Access Full Archives
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
