import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Zap, Database, Bot, Lock, ArrowRight, Sparkles, Wand2, MessageSquare, Shield, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

const aiFeatures = [
  {
    name: 'Creative Studio',
    title: 'AI Manifestation',
    description: 'Generate high-quality images and cinematic videos with Gemini & Veo.',
    icon: Wand2,
    path: '/studio',
    color: 'from-neon-cyan to-neon-pink',
    badge: 'NEW'
  },
  {
    name: 'AI Surfer',
    title: 'Neural Navigator',
    description: 'Multi-turn intelligent chat with high-thinking capabilities.',
    icon: Sparkles,
    path: '/ai-surfer',
    color: 'from-neon-green to-neon-cyan',
    badge: 'BETA'
  }
];

export const Home = () => {
  const { isAdmin } = useAuth();
  const [featuredMembers, setFeaturedMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const q = query(collection(db, 'users_public'), limit(3));
        const querySnapshot = await getDocs(q);
        const members = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
        setFeaturedMembers(members);
      } catch (error) {
        console.error('Error fetching featured members:', error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 relative"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          animate={{ 
            textShadow: [
              "0 0 20px rgba(255,0,255,0.2)",
              "0 0 40px rgba(0,255,255,0.6)",
              "0 0 60px rgba(57,255,20,0.4)",
              "0 0 40px rgba(255,140,0,0.6)",
              "0 0 20px rgba(255,0,0,0.2)"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="animate-2"
        >
          <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-6 rainbow-text leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            NEON REEF
          </h2>
        </motion.div>
        
        <p className="text-neon-cyan text-sm font-black tracking-[0.5em] uppercase mb-8">
          Hatteras Digital Collective v3.1
        </p>
        
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light tracking-wide leading-relaxed">
          Navigating the currents of AI and automation. Explore the Hatteras villages or harness the power of the Neural Reef.
        </p>
      </motion.div>

      {/* AI Features Section */}
      <div className="mb-24">
        <div className="flex items-center gap-3 mb-8 px-4">
          <Sparkles className="text-neon-cyan" size={20} />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Neural Core Capabilities</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link 
                to={feature.path}
                className="group block relative p-10 glass-card rounded-[2rem] border border-white/10 hover:border-neon-cyan/50 transition-all duration-500 overflow-hidden hover:animate-rainbow"
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.color} opacity-5 blur-[80px] group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-neon-cyan/30 transition-colors">
                      <feature.icon className="text-neon-cyan group-hover:scale-110 transition-transform duration-500" size={32} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-3 py-1 bg-neon-cyan text-black text-[8px] font-black uppercase tracking-widest rounded-full">
                        {feature.badge}
                      </span>
                      <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-slate-500">{feature.name}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-black italic mb-4 text-white group-hover:text-neon-cyan transition-colors tracking-tighter">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 text-lg font-light leading-relaxed mb-8 max-w-md">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-neon-cyan text-xs font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    Initialize Module <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Villages Section */}
      <div className="mb-24">
        <div className="flex items-center gap-3 mb-8 px-4">
          <Globe className="text-slate-500" size={20} />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Geographic Nodes</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {villages.map((village, index) => (
            <motion.div
              key={village.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link 
                to={village.path}
                className="group block relative p-8 glass-card rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden hover:animate-rainbow"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${village.color} opacity-5 blur-3xl group-hover:opacity-15 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <village.icon className="text-slate-400 group-hover:text-neon-cyan transition-colors duration-500" size={24} />
                    <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-slate-600">{village.name}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-neon-cyan transition-colors">
                    {village.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">
                    {village.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-neon-cyan text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    Explore <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Architects Section */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="flex items-center gap-3">
            <Users className="text-slate-500" size={20} />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Featured Architects</h3>
          </div>
          <Link to="/directory" className="text-[10px] font-black uppercase tracking-widest text-neon-cyan hover:text-white transition-colors flex items-center gap-2">
            View Directory <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredMembers.length > 0 ? (
            featuredMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-white/5 hover:border-neon-cyan/30 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={member.photoURL || `https://picsum.photos/seed/${member.uid}/100/100`} 
                    alt={member.displayName}
                    className="w-12 h-12 rounded-xl border border-white/10 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors">{member.displayName}</h4>
                    {member.location && (
                      <div className="flex items-center gap-1 text-[8px] text-slate-500 uppercase tracking-widest">
                        <MapPin size={8} /> {member.location}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2 mb-4 italic">
                  "{member.bio || "Manifesting a digital future..."}"
                </p>
                <Link to="/chat" className="text-[8px] font-black uppercase tracking-widest text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  Connect via Neural Link
                </Link>
              </motion.div>
            ))
          ) : (
            [1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl" />
                  <div className="space-y-2">
                    <div className="w-24 h-3 bg-white/5 rounded" />
                    <div className="w-16 h-2 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="w-full h-8 bg-white/5 rounded" />
              </div>
            ))
          )}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32 p-16 glass-card rounded-[3rem] border border-white/5 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-neon-cyan/5 animate-pulse" />
        <div className="relative z-10">
          <h3 className="text-4xl md:text-6xl font-black italic mb-6 tracking-tighter">READY TO SURF THE AI WAVE?</h3>
          <p className="text-slate-400 mb-10 text-lg font-light tracking-wide max-w-2xl mx-auto">Join the elite circle of digital architects and automate your future in the Neon Reef.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/chat"
              className="inline-flex items-center gap-3 px-10 py-5 bg-neon-cyan text-black font-black uppercase tracking-tighter hover:bg-white transition-all rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)]"
            >
              Initialize Connection <Zap size={20} fill="currentColor" />
            </Link>
            <Link 
              to="/ai-surfer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-tighter hover:bg-white/10 transition-all rounded-xl backdrop-blur-md"
            >
              Consult AI Surfer <Sparkles size={20} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
