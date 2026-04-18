import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Newspaper, RefreshCw, Sparkles, Zap, TrendingUp, Globe, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ReactMarkdown from 'react-markdown';

export const News = () => {
  const [briefing, setBriefing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateBriefing = async () => {
    setIsRefreshing(true);
    try {
      // Fetch some recent activity for context
      const chatSnap = await getDocs(query(collection(db, 'chat_messages'), orderBy('created_at', 'desc'), limit(5)));
      const storiesSnap = await getDocs(query(collection(db, 'memorial_stories'), orderBy('created_at', 'desc'), limit(5)));
      
      const chatContext = chatSnap.docs.map(doc => doc.data().content).join('\n');
      const storiesContext = storiesSnap.docs.map(doc => doc.data().content).join('\n');

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-latest",
        contents: `Generate a "Daily Briefing" for the Hatteras Digital Archipelago. 
        Context from recent activity:
        Recent Chat: ${chatContext}
        Recent Stories: ${storiesContext}
        
        Style: Sophisticated, futuristic, architectural, and slightly oceanic. 
        Sections: 
        1. Neural Status (Overall ecosystem health)
        2. Archipelago Highlights (Key events or discussions)
        3. Manifestation Trends (What people are building)
        4. Architect's Wisdom (A short inspiring quote)
        
        Keep it concise and formatted in Markdown.`,
        config: {
          systemInstruction: "You are the Chief Editor of Hatteras Daily, the official news node of the Digital Archipelago."
        }
      });

      setBriefing(response.text);
    } catch (error) {
      console.error('Briefing generation failed:', error);
      setBriefing("### Neural Link Interrupted\n\nThe connection to the news node was lost. Please refresh to re-synchronize.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    generateBriefing();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-neon-green/10 rounded-2xl border border-neon-green/20">
            <Newspaper className="text-neon-green" size={32} />
          </div>
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">Hatteras Daily</h1>
            <p className="text-[10px] tracking-[0.4em] text-slate-500 uppercase font-bold">Neural News Node</p>
          </div>
        </div>
        <button 
          onClick={generateBriefing}
          disabled={isRefreshing}
          className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-neon-green transition-all disabled:opacity-50"
        >
          <RefreshCw className={isRefreshing ? 'animate-spin' : ''} size={24} />
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-2 bg-neon-cyan/10 rounded-lg"><Globe className="text-neon-cyan" size={20} /></div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Global Sync</div>
            <div className="text-lg font-bold">99.9%</div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-2 bg-neon-pink/10 rounded-lg"><Zap className="text-neon-pink" size={20} /></div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Data Flow</div>
            <div className="text-lg font-bold">Optimal</div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-2 bg-neon-green/10 rounded-lg"><TrendingUp className="text-neon-green" size={20} /></div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Growth</div>
            <div className="text-lg font-bold">+12.4%</div>
          </div>
        </div>
      </div>

      <div className="glass-card p-12 rounded-[40px] border border-white/10 relative overflow-hidden min-h-[600px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 blur-3xl pointer-events-none" />
        
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-6 py-24">
            <Loader2 className="animate-spin text-neon-green" size={48} />
            <p className="text-slate-500 uppercase tracking-[0.3em] text-xs animate-pulse">Synthesizing Daily Briefing...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-invert max-w-none"
          >
            <div className="flex items-center gap-2 mb-8 text-neon-green">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Generated Intelligence</span>
            </div>
            <div className="markdown-body">
              <ReactMarkdown>{briefing || ''}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-600 text-[10px] uppercase tracking-[0.2em]">
          Archipelago News Node • Updated {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
