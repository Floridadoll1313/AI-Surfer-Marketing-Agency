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
    generate
