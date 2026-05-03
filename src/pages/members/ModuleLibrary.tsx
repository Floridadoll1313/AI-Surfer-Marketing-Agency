import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  CheckCircle2, 
  Trophy, 
  Loader2, 
  X, 
  Terminal, 
  Brain, 
  Zap 
} from 'lucide-react';
import { useAuth } from '../../components/AuthProvider'; // FIXED: Up two levels
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // FIXED: Up two levels

// --- Types ---
interface Module {
  id: string;
  title: string;
  duration: string;
  level: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

const MODULES: Module[] = [
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
    document.body.style.overflow = selectedVideo ? 'hidden' : 'unset';
  }, [selectedVideo]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
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
    if (!user || completingId || completedQuests.includes(questId)) return;
    
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
    <div className="max-w-6xl mx-auto py-12 px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <Trophy className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Architect Academy</h1>
        </div>
        <p className="text-slate-400 text-xl font-light">Master the digital collective and rank up your neural profile.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MODULES.map((module) => {
          const isCompleted = completedQuests.includes(module.id);
          return (
            <motion.div 
              key={module.id}
              whileHover={{ y: -10 }}
              className={`glass-card rounded-3xl border overflow-hidden transition-all flex flex-col bg-white/5 ${
                isCompleted ? 'border-neon-green/30' : 'border-white/10'
              }`}
            >
              <div 
                className="relative aspect-video cursor-pointer group"
                onClick={() => setSelectedVideo(module.videoUrl)}
              >
                <img src={module.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="text-neon-cyan" size={48} fill="currentColor" />
                </div>
                {isCompleted && (
                  <div className="absolute top-4 right-4 p-2 bg-neon-green text-black rounded-full">
                    <CheckCircle2 size={20} />
                  </div>
                )}
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 text-white">{module.title}</h3>
                <p className="text-slate-400 text-sm mb-8 flex-grow">{module.description}</p>
                
                <button 
                  onClick={() => completeQuest(module.id)}
                  disabled={isCompleted || completingId === module.id}
                  className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
                    isCompleted 
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/30' 
                      : 'bg-neon-cyan text-black hover:bg-white'
                  }`}
                >
                  {completingId === module.id ? <Loader2 className="animate-spin mx-auto" /> : isCompleted ? 'Quest Synced' : 'Initialize Quest'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedVideo(null)} className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-neon-cyan hover:text-black transition-all">
                <X size={24} />
              </button>
              <video src={selectedVideo} controls autoPlay className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
