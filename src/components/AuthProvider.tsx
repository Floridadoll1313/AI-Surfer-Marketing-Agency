import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Using standard framer-motion for build stability
import { 
  Play, 
  CheckCircle2, 
  Trophy, 
  Loader2, 
  X 
} from 'lucide-react';

// Attempting the most likely correct path for your project structure
import { useAuth } from '../../components/AuthProvider'; 
import { db } from '../../lib/firebase'; 
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

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
      console.error('Update error:', error);
    } finally {
      setCompletingId(null);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-neon-cyan" size={40} /></div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Trophy className="text-neon-cyan" size={40} />
        <h1 className="text-4xl font-black italic uppercase text-white">Architect Academy</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MODULES.map((module) => {
          const isCompleted = completedQuests.includes(module.id);
          return (
            <div key={module.id} className="glass-card rounded-3xl border border-white/10 overflow-hidden bg-white/5">
              <div className="relative aspect-video cursor-pointer" onClick={() => setSelectedVideo(module.videoUrl)}>
                <img src={module.thumbnail} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="text-neon-cyan" size={48} fill="currentColor" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">{module.title}</h3>
                <button 
                  onClick={() => completeQuest(module.id)}
                  disabled={isCompleted || completingId === module.id}
                  className={`w-full py-3 rounded-xl font-black uppercase text-[10px] transition-all ${
                    isCompleted ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-cyan text-black hover:bg-white'
                  }`}
                >
                  {completingId === module.id ? 'Syncing...' : isCompleted ? 'Completed' : 'Complete Module'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden">
              <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black">
                <X size={20} />
              </button>
              <video src={selectedVideo} controls autoPlay className="w-full h-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
