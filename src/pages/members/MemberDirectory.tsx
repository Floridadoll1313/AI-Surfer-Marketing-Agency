import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Search, MapPin, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
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

  const filteredMembers = members.filter(member => 
    member.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.location && member.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-48 gap-4">
        <Loader2 className="animate-spin text-neon-cyan" size={48} />
        <p className="text-slate-500 uppercase tracking-widest text-xs">Scanning Neural Nodes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-neon-cyan/10 rounded-2xl border border-neon-cyan/20">
            <Users className="text-neon-cyan" size={32} />
          </div>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">Member Directory</h1>
        <p className="text-slate-400 text-lg font-light tracking-wide max-w-2xl mx-auto">
          Connect with other digital architects in the Hatteras Collective.
        </p>
      </motion.div>

      <div className="mb-12 relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/50 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:border-neon-cyan outline-none transition-colors text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.uid}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-8 rounded-3xl border border-white/5 hover:border-neon-cyan/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl group-hover:bg-neon-cyan/10 transition-colors" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={member.photoURL || `https://picsum.photos/seed/${member.uid}/100/100`} 
                  alt={member.displayName} 
                  className="w-16 h-16 rounded-2xl border border-white/10 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">
                    {member.displayName}
                  </h3>
                  {member.location && (
                    <div className="flex items-center gap-1 text-slate-500 text-[10px] uppercase tracking-widest">
                      <MapPin size={10} /> {member.location}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-slate-400 text-sm font-light leading-relaxed mb-6 line-clamp-3 h-15">
                {member.bio || "This member is still manifesting their digital story."}
              </p>

              <div className="flex items-center gap-3">
                <Link 
                  to="/chat"
                  className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={12} /> Message
                </Link>
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-500 hover:text-neon-cyan transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-24">
          <p className="text-slate-500 italic">No members found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
