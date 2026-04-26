import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Zap, Database, Bot, Lock, ArrowRight, Sparkles, Wand2, 
  Users, MapPin 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';   // ✅ Supabase import
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
  const [isAdmin, setIsAdmin
