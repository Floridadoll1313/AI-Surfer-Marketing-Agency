import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Send, MessageCircle, LogIn } from 'lucide-react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../components/AuthProvider';

interface Story {
  id: string;
  name: string;
  content: string;
  created_at: any;
}

export const Memorial = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'memorial_stories'), orderBy('created_at', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const storiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Story[];
      setStories(storiesData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'memorial_stories');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content || !user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'memorial_stories'), {
        name,
        content,
        created_at: serverTimestamp()
      });
      setName('');
      setContent('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'memorial_stories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <Heart className="text-neon-pink mx-auto mb-6 animate-pulse" size={64} />
        <h1 className="text-6xl font-black italic tracking-tighter mb-4">THE SANCTUARY</h1>
        <p className="text-slate-400 text-xl font-light tracking-widest uppercase">In Memory of Johnny "Bull" Burgess Hooper</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass-card p-8 rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="text-neon-cyan" /> Share a Story
          </h3>
          {!user ? (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-6">Please log in to share a memory.</p>
              <button 
                onClick={login}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan text-black font-black uppercase tracking-tighter rounded-lg hover:bg-white transition-colors"
              >
                <LogIn size={18} /> Login with Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">Your Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-neon-cyan outline-none transition-colors"
                  placeholder="Enter your name..."
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">Your Message</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:border-neon-cyan outline-none transition-colors h-32 resize-none"
                  placeholder="Share a memory or word of comfort..."
                />
              </div>
              <button 
                disabled={loading}
                className="w-full bg-neon-pink text-white font-black uppercase tracking-tighter py-4 rounded-lg hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
              >
                Post to Legacy Wall <Send size={18} />
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
          <h3 className="text-2xl font-bold mb-6 sticky top-0 bg-deep-ocean/80 backdrop-blur-md py-2 z-10">Legacy Wall</h3>
          {stories.length === 0 ? (
            <div className="text-slate-600 italic text-center py-20">No stories shared yet. Be the first to honor Bull.</div>
          ) : (
            stories.map((story) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 rounded-2xl border border-white/5 relative group"
              >
                <div className="absolute top-4 right-4 text-[10px] text-slate-600 font-mono">
                  {new Date(story.created_at).toLocaleDateString()}
                </div>
                <div className="text-neon-cyan font-bold mb-2 text-sm uppercase tracking-widest">{story.name}</div>
                <p className="text-slate-300 leading-relaxed italic">"{story.content}"</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
