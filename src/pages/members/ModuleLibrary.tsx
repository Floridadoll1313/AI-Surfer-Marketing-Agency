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
import { useAuth } from '../components/AuthProvider';
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

// --- Constants ---
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

// --- Sub-components ---
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 bg-white/5 text-[8px] font-black uppercase tracking-widest rounded border border-white/10 text-slate-500">
    {children}
  </span>
);

export const ModuleLibrary = () => {
  const { user } = useAuth();
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Prevent background scroll when video is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedVideo]);

  // Fetch Progress
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setCompletedQuests([]);
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
      alert("Failed to sync progress. Please try again.");
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 min-h-screen">
      {/* Header Section */}
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

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MODULES.map((module) => {
          const isCompleted = completedQuests.includes(module.id);
          return (
            <motion.div 
              key={module.id}
              whileHover={{ y: -10 }}
              className={`glass-card rounded-3xl border overflow-hidden group transition-all flex flex-col ${
                isCompleted ? 'border-neon-green/30 bg-neon-green/5' : 'border-white/10'
              }`}
            >
              {/* Thumbnail / Play Action */}
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
                  <div className="w-16 h-16 bg-neon-cyan rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                {isCompleted && (
                  <div className="absolute top-4 right-4 p-2 bg-neon-green text-black rounded-full shadow-lg">
                    <CheckCircle2 size={20} />
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <Badge>{module.level}</Badge>
                  <Badge>{module.duration}</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">{module.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light flex-grow">{module.description}</p>
                
                <button 
                  onClick={() => completeQuest(module.id)}
                  disabled={isCompleted || completingId === module.id}
                  className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${
                    isCompleted 
                      ? 'bg-neon-green/20 border border-neon-green/30 text-neon-green cursor-default' 
                      : 'bg-neon-cyan text-black hover:bg-white active:scale-95'
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
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-cyan">The Curriculum</h2>
          <div className="space-y-4">
            {[
              { t: '1. Modular Deep Dives', d: 'Fragmented complex architectural concepts into 15-minute neural modules.' },
              { t: '2. Sensory Learning', d: 'Technical documentation combined with cinematic visuals for reinforcement.' },
              { t: '3. Verified Knowledge', d: 'Modules updated in real-time as the digital collective evolves.' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                <h4 className="text-white font-bold mb-2">{item.t}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-neon-pink">Architect's Edge</h2>
          <div className="space-y-6">
            <FeatureItem icon={<Terminal size={20} />} color="pink" title="Workforce Upskilling" desc="Empower your team to master AI without expensive consultants." />
            <FeatureItem icon={<Brain size={20} />} color="cyan" title="Reduced Onboarding" desc="A centralized repository for technical onboarding and logic." />
            <FeatureItem icon={<Zap size={20} />} color="green" title="Innovation Culture" desc="Keep your business at the forefront of technological breakthroughs." />
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl aspect-video glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
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
                className="w-full h-full object-contain"
                onError={() => {
                  alert("Neural link failed: Error loading video source.");
                  setSelectedVideo(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Helper Components ---
const FeatureItem = ({ icon, color, title, desc }: { icon: React.ReactNode, color: 'pink' | 'cyan' | 'green', title: string, desc: string }) => {
  const colors = {
    pink: 'bg-neon-pink/10 border-neon-pink/20 text-neon-pink',
    cyan: 'bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan',
    green: 'bg-neon-green/10 border-neon-green/20 text-neon-green'
  };

  return (
    <div className="flex gap-4 group">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-white font-bold mb-1">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};
