import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Search, MapPin, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // FIXED: Relative path for members subfolder
import { Link } from 'react-router-dom';

interface PublicProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  bio?: string;
  location?: string;
}

export const MemberDirectory = () => {
  const [members, setMembers] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Fetching from the public users collection
        const q = query(collection(db, 'users_public'), limit(100));
        const querySnapshot = await getDocs(q);
        const membersList = querySnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        })) as PublicProfile[];
        setMembers(membersList);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => {
    const nameMatch = member.displayName?.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = member.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || locationMatch;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative">
          <Loader2 className="animate-spin text-neon-cyan" size={48} />
          <div className="absolute inset-0 blur-xl bg-neon-cyan/20 animate-pulse" />
        </div>
        <p className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-black">
          Scanning Neural Nodes...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 min-h-screen">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-neon-cyan/10 rounded-2xl border border-neon-cyan/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <Users className="text-neon-cyan" size={32} />
          </div>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase text-white">
          Member Directory
        </h1>
        <p className="text-slate-400 text-lg font-light tracking-wide max-w-2xl mx-auto">
          Connect with other digital architects in the <span className="text-neon-cyan font-normal">Hatteras Collective</span>.
        </p>
      </motion.div>

      {/* Search Interface */}
      <div className="mb-16 relative max-w-xl mx-auto group">
        <div className="absolute inset-0 bg-neon-cyan/5 blur-2xl group-focus-within:bg-neon-cyan/10 transition-all" />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-neon-cyan transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Filter by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:border-neon-cyan outline-none transition-all text-white placeholder:text-slate-600 relative z-10"
        />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.uid}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.03 }}
              className="glass-card p-8 rounded-3xl border border-white/5 hover:border-neon-cyan/30 transition-all group relative overflow-hidden flex flex-col h-full"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl group-hover:bg-neon-cyan/10 transition-colors" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img 
                      src={member.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${member.uid}`} 
                      alt={member.displayName} 
                      className="w-16 h-16 rounded-2xl border border-white/10 object-cover bg-slate-900"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-4 border-black animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors line-clamp-1">
                      {member.displayName || 'Anonymous'}
                    </h3>
                    {member.location && (
                      <div className="flex items-center gap-1 text-slate-500 text-[9px] uppercase tracking-widest font-bold">
                        <MapPin size={10} className="text-neon-cyan" /> {member.location}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-slate-400 text-sm font-light leading-relaxed mb-8 line-clamp-3 flex-grow">
                  {member.bio || "Neural profile pending description. Architectural logic remains encrypted."}
                </p>

                <div className="flex items-center gap-3">
                  <Link 
                    to="/chat"
                    className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={12} /> Message
                  </Link>
                  <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results State */}
      {filteredMembers.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 glass-card rounded-3xl border border-white/5"
        >
          <Search className="mx-auto text-slate-800 mb-4" size={48} />
          <p className="text-slate-500 italic font-light">No neural signatures found matching those parameters.</p>
        </motion.div>
      )}
    </div>
  );
};
