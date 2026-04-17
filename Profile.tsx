import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, AlignLeft, Save, Loader2, AlertCircle, CheckCircle2, Sparkles, Wand2, Trophy } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { GoogleGenAI } from "@google/genai";

interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string;
  bio: string;
  location: string;
}

export const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [generatingAvatar, setGeneratingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [rank, setRank] = useState('Initiate');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setProfile({
            displayName: data.displayName || '',
            email: data.email || '',
            photoURL: data.photoURL || '',
            bio: data.bio || '',
            location: data.location || '',
          });
        }

        const progressRef = doc(db, 'user_progress', user.uid);
        const progressSnap = await getDoc(progressRef);
        if (progressSnap.exists()) {
          const completedCount = progressSnap.data().completedQuests?.length || 0;
          if (completedCount >= 3) setRank('Archipelago Architect');
          else if (completedCount >= 2) setRank('Neural Engineer');
          else if (completedCount >= 1) setRank('Digital Scout');
        }
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const generateAvatar = async () => {
    if (generatingAvatar) return;
    setGeneratingAvatar(true);
    setError(null);

    try {
      const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
      const ai = new GoogleGenAI({ apiKey: key || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: `A futuristic, high-tech digital architect avatar for a user named ${profile?.displayName || 'Architect'}. Neon aesthetic, cyberpunk style, professional and clean.` }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "512px"
          }
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setProfile(p => p ? { ...p, photoURL: `data:image/png;base64,${base64EncodeString}` } : null);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
          break;
        }
      }
    } catch (err: any) {
      console.error('Avatar generation failed:', err);
      setError('Neural avatar generation failed.');
    } finally {
      setGeneratingAvatar(false);
    }
  };

  const enhanceBio = async () => {
    if (!profile?.bio || enhancing) return;
    setEnhancing(true);
    setError(null);

    try {
      const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
      const ai = new GoogleGenAI({ apiKey: key || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-latest",
        contents: `Rewrite this user biography to be more professional, engaging, and fit for a "Digital Architect" in a futuristic, neon-themed archipelago. Keep it under 300 characters. Current bio: ${profile.bio}`,
        config: {
          systemInstruction: "You are a professional profile writer for the OTD AI SURFER ecosystem. Your style is sophisticated, futuristic, and inspiring."
        }
      });

      if (response.text) {
        setProfile(p => p ? { ...p, bio: response.text.trim() } : null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error('Enhancement failed:', err);
      setError('Neural enhancement failed. Please try again.');
    } finally {
      setEnhancing(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const userRef = doc(db, 'users', user.uid);
      const publicRef = doc(db, 'users_public', user.uid);
      
      const updateData = {
        displayName: profile.displayName,
        bio: profile.bio,
        location: profile.location,
        photoURL: profile.photoURL,
      };

      await setDoc(userRef, updateData, { merge: true });
      await setDoc(publicRef, {
        uid: user.uid,
        displayName: profile.displayName,
        bio: profile.bio,
        location: profile.location,
        photoURL: profile.photoURL,
      }, { merge: true });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <User className="mx-auto text-slate-800 mb-6" size={64} />
        <h2 className="text-3xl font-black italic mb-4 uppercase">Access Denied</h2>
        <p className="text-slate-500 uppercase tracking-[0.3em] text-xs">Please sign in to view your profile</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-48 gap-4">
        <Loader2 className="animate-spin text-neon-cyan" size={48} />
        <p className="text-slate-500 uppercase tracking-widest text-xs">Syncing Neural Identity...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <User className="text-neon-cyan" size={40} />
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">User Profile</h1>
        </div>
        <p className="text-slate-400 text-xl font-light tracking-wide">
          Manage your digital presence in the Neon Reef.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center">
            <div className="relative mb-6 group/avatar">
              <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full blur opacity-50 animate-pulse"></div>
              <img 
                src={profile?.photoURL || 'https://picsum.photos/seed/avatar/200/200'} 
                alt="Profile" 
                className="relative w-32 h-32 rounded-full border-2 border-white/20 object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={generateAvatar}
                disabled={generatingAvatar}
                className="absolute bottom-0 right-0 p-2 bg-black/80 border border-white/20 rounded-full text-neon-cyan hover:text-white transition-all opacity-0 group-hover/avatar:opacity-100 shadow-lg"
                title="Generate Neural Avatar"
              >
                {generatingAvatar ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
              </button>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{profile?.displayName}</h3>
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">{user.email}</p>
            
            <div className="flex items-center gap-2 px-4 py-1.5 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full mb-4">
              <Trophy size={12} className="text-neon-cyan" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neon-cyan">{rank}</span>
            </div>

            <div className="w-full h-px bg-white/5 my-4"></div>
            <p className="text-slate-400 text-sm italic font-light leading-relaxed">
              {profile?.bio || "No biography provided yet. Update your profile to share your story."}
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={handleUpdate} className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 text-sm">
                <CheckCircle2 size={18} />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  <User size={12} /> Display Name
                </label>
                <input 
                  type="text"
                  value={profile?.displayName || ''}
                  onChange={(e) => setProfile(p => p ? { ...p, displayName: e.target.value } : null)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan outline-none transition-colors text-white"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  <Mail size={12} /> Email Address (Read-only)
                </label>
                <input 
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  <MapPin size={12} /> Location
                </label>
                <input 
                  type="text"
                  value={profile?.location || ''}
                  onChange={(e) => setProfile(p => p ? { ...p, location: e.target.value } : null)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan outline-none transition-colors text-white"
                  placeholder="e.g. Hatteras Island, NC"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <AlignLeft size={12} /> Biography
                  </label>
                  <button
                    type="button"
                    onClick={enhanceBio}
                    disabled={enhancing || !profile?.bio}
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-neon-cyan hover:text-white transition-colors disabled:opacity-30"
                  >
                    {enhancing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    Neural Enhance
                  </button>
                </div>
                <textarea 
                  value={profile?.bio || ''}
                  onChange={(e) => setProfile(p => p ? { ...p, bio: e.target.value } : null)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan outline-none transition-colors text-white h-32 resize-none"
                  placeholder="Tell us about your journey in the digital archipelago..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 bg-neon-cyan text-black font-black uppercase tracking-tighter rounded-xl hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
