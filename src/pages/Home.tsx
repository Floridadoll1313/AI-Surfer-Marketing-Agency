import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Zap, Database, Bot, Lock, ArrowRight, Sparkles, Wand2, 
  Users, MapPin 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

// ---------------------------
//   STATIC CONTENT
// ---------------------------

const villages = [
  { name: 'Rodanthe', title: 'Web Builds', description: 'Frontend & Backend Architecture. High-performance digital structures.', icon: Globe, path: '/rodanthe', color: 'from-cyan-500 to-blue-600' },
  { name: 'Avon', title: 'Game Builds', description: 'Immersive systems and interactive experiences.', icon: Zap, path: '/avon', color: 'from-yellow-400 to-orange-500' },
  { name: 'Buxton', title: 'Workflows', description: 'Active automation pipelines and business logic.', icon: Database, path: '/buxton', color: 'from-purple-500 to-pink-600' },
  { name: 'Frisco', title: 'Automations', description: 'Live system feeds and autonomous agents.', icon: Bot, path: '/frisco', color: 'from-green-400 to-emerald-600' },
  { name: 'Hatteras', title: 'The Vault', description: 'Confidential process maps and secure SOPs.', icon: Lock, path: '/hatteras', color: 'from-red-500 to-rose-700' }
];

const aiFeatures = [
  { name: 'Creative Studio', title: 'AI Manifestation', description: 'Generate high-quality images and cinematic videos with Gemini & Veo.', icon: Wand2, path: '/studio', color: 'from-neon-cyan to-neon-pink', badge: 'NEW' },
  { name: 'AI Surfer', title: 'Neural Navigator', description: 'Multi-turn intelligent chat with high-thinking capabilities.', icon: Sparkles, path: '/ai-surfer', color: 'from-neon-green to-neon-cyan', badge: 'BETA' }
];

// ---------------------------
//   HOME COMPONENT
// ---------------------------

export const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const adminQuery = query(collection(db, "admins"), limit(1));
      const snapshot = await getDocs(adminQuery);

      snapshot.forEach(doc => {
        if (doc.data().email === user.email) {
          setIsAdmin(true);
        }
      });
    };

    checkAdmin();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
        >
          Ocean Tide Drop AI Surfer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-4 text-lg md:text-2xl text-gray-300 max-w-2xl"
        >
          A cinematic AI-powered agency built on movement, sanctuary, and creation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8"
        >
          <Link 
            to="/services"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
          >
            Explore Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* VILLAGES */}
      <section className="px-6 py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">Villages of Hatteras Island</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {villages.map((village, i) => (
            <motion.div
              key={village.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${village.color} shadow-xl`}
            >
              <village.icon size={40} className="mb-4" />
              <h3 className="text-2xl font-bold">{village.name}</h3>
              <p className="text-gray-200 mt-2">{village.description}</p>

              <Link 
                to={village.path}
                className="inline-block mt-4 text-white font-semibold underline"
              >
                Enter
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="px-6 py-20 bg-black/40 backdrop-blur-xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">AI Systems</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {aiFeatures.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} shadow-xl`}
            >
              <div className="flex items-center gap-3">
                <feature.icon size={36} />
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                {feature.badge && (
                  <span className="px-2 py-1 text-xs bg-white/20 rounded-lg">{feature.badge}</span>
                )}
              </div>

              <p className="text-gray-200 mt-3">{feature.description}</p>

              <Link 
                to={feature.path}
                className="inline-block mt-4 text-white font-semibold underline"
              >
                Launch
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ADMIN PANEL LINK */}
      {isAdmin && (
        <div className="text-center py-10">
          <Link 
            to="/admin"
            className="px-6 py-3 bg-red-600 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Admin Dashboard
          </Link>
        </div>
      )}

    </div>
  );
};
