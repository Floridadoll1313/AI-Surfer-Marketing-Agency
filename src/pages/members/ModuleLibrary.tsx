import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Play, Clock, BarChart, CheckCircle2, Trophy, Loader2, X, Terminal, Brain, Zap, PlayCircle } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const modules = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    duration: '45 min',
    level: 'Beginner',
    thumbnail: 'https://picsum.photos/seed/ai/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Understanding the core concepts of LLMs and neural networks.'
  },
  {
    id: 'automation-workflows',
    title: 'Automation Workflows',
    duration: '1h 20min',
    level: 'Intermediate',
    thumbnail: 'https://picsum.photos/seed/automation/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Building complex multi-step automations with Zapier and Make.'
  },
  {
    id: 'custom-agents',
    title: 'Custom Agent Development',
    duration: '2h 15min',
    level: 'Advanced',
    thumbnail: 'https://picsum.photos/seed/agent/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Deploying autonomous agents with custom tools and memory.'
  }
];

export const ModuleLibrary = () => {
  const { user } = useAuth();
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      try {
        const progressRef = doc(db, 'user_progress', user.uid);
        const progressSnap = await getDoc(progressRef);
        if (progressSnap.exists()) {
          setCompletedQuests(progressSnap.data().completedQuests || []);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  const completeQuest = async (questId: string) => {
    if (!user || completingId) return;
    setCompletingId(questId);
    try {
      const progressRef = doc(db, 'user_progress', user.uid);
      const progressSnap = await getDoc(progressRef);
      
      if (!progressSnap.exists()) {
        await setDoc(progressRef, { completedQuests: [questId] });
      } else {
        await updateDoc(progressRef, {
          completedQuests: arrayUnion(questId)
        });
      }
      setCompletedQuests(prev => [...prev, questId]);
    } catch (error) {
      console.error('Error completing quest:', error);
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Trophy className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">Architect Academy</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">Master the digital collective and rank up your neural profile.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module) => {
          const isCompleted = completedQuests.includes(module.id);
          return (
            <motion.div 
              key={module.id}
              whileHover={{ y: -10 }}
              className={`glass-card rounded-3xl border overflow-hidden group transition-all ${
                isCompleted ? 'border-neon-green/30 bg-neon-green/5' : 'border-white/10'
              }`}
            >
              <div 
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(module.videoUrl)}
              >
                <img 
                  src={module.thumbnail} 
                  alt={module.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-neon-cyan rounded-full flex items-center justify-center text-black">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                {isCompleted && (
                  <div className="absolute top-4 right-4 p-2 bg-neon-green text-black rounded-full shadow-lg">
                    <CheckCircle2 size={20} />
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-white/5 text-[8px] font-black uppercase tracking-widest rounded border border-white/10 text-slate-500">
                    {module.level}
                  </span>
                  <span className="px-2 py-1 bg-white/5 text-[8px] font-black uppercase tracking-widest rounded border border-white/10 text-slate-500">
                    {module.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">{module.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">{module.description}</p>
                
                <button 
                  onClick={() => completeQuest(module.id)}
                  disabled={isCompleted || completingId === module.id}
                  className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${
                    isCompleted 
                      ? 'bg-neon-green/20 border border-neon-green/30 text-neon-green cursor-default' 
                      : 'bg-neon-cyan text-black hover:bg-white'
                  }`}
                >
                  {completingId === module.id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : isCompleted ? (
                    <>
                      <CheckCircle2 size={16} /> Quest Synchronized
                    </>
                  ) : (
                    'Initialize Quest'
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Sections */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-cyan">The Curriculum (How it Works)</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">1. Modular Deep Dives</h4>
              <p className="text-slate-400 text-sm">We've fragmented complex architectural concepts into 15-minute neural modules, allowing for rapid cognitive ingestion without information overload.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">2. Sensory Learning</h4>
              <p className="text-slate-400 text-sm">Every module utilizes multi-sensory formats—technical documentation combined with cinematic visuals to reinforce key business logic.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-white font-bold mb-2">3. Verified Knowledge</h4>
              <p className="text-slate-400 text-sm">Modules are updated in real-time as the digital collective evolves, ensuring your team is learning the absolute current state of automation tech.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-pink">The Architect's Edge (Business Value)</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-pink/10 rounded-xl flex items-center justify-center border border-neon-pink/20 shrink-0">
                <Terminal size={20} className="text-neon-pink" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Workforce Upskilling</h4>
                <p className="text-slate-400 text-sm">Empower your existing team to master modern AI and automation tools without the need for expensive external consulting.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center border border-neon-cyan/20 shrink-0">
                <Brain size={20} className="text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Reduced Onboarding</h4>
                <p className="text-slate-400 text-sm">Use the Academy as a centralized repository for technical onboarding, getting new hires up to speed on your ecosystem faster.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center border border-neon-green/20 shrink-0">
                <Zap size={20} className="text-neon-green" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Innovation Culture</h4>
                <p className="text-slate-400 text-sm">Foster a culture of continuous learning and experimentation, keeping your business at the forefront of technological breakthroughs.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video glass-card rounded-3xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-neon-cyan hover:text-black transition-all"
              >
                <X size={24} />
              </button>
              <video 
                key={selectedVideo}
                src={selectedVideo} 
                controls 
                autoPlay 
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
                onError={(e) => console.error("Video playback error in ModuleLibrary:", e)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
