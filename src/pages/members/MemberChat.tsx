import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, User, LogIn, Lock } from 'lucide-react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../components/AuthProvider';

interface Message {
  id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: any;
}

export const MemberChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user, login } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'chat_messages'), 
      orderBy('created_at', 'desc'),
      limit(50)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      // Reverse to show in chronological order (oldest at top, newest at bottom)
      setMessages(messagesData.reverse());
    }, (error) => {
      // Only handle error if user is still logged in to avoid noise during logout
      if (user) {
        handleFirestoreError(error, OperationType.LIST, 'chat_messages');
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, 'chat_messages'), {
        user_id: user.uid,
        username: user.displayName || 'Anonymous',
        content: newMessage,
        created_at: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'chat_messages');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 h-[calc(100vh-250px)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <MessageSquare className="text-neon-cyan" size={32} />
          <h1 className="text-4xl font-black italic tracking-tighter">MEMBER CHAT</h1>
        </div>
        {user ? (
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-white/10">
            <User size={16} className="text-neon-cyan" />
            <span className="text-xs font-bold uppercase tracking-widest">{user.displayName}</span>
          </div>
        ) : (
          <button 
            onClick={login}
            className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
          >
            <LogIn size={16} /> Login to Chat
          </button>
        )}
      </motion.div>

      <div className="flex-1 glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {!user ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 italic">
              <Lock className="mb-4 opacity-20" size={48} />
              <p>Authentication required to view and send messages.</p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.user_id === user.uid ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{msg.username}</span>
                    <span className="text-[8px] text-slate-700 font-mono">
                      {msg.created_at?.toDate ? msg.created_at.toDate().toLocaleTimeString() : '...'}
                    </span>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
                    msg.user_id === user.uid 
                      ? 'bg-neon-cyan text-black font-medium rounded-tr-none' 
                      : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {user && (
          <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-white/10 flex gap-4">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 focus:border-neon-cyan outline-none transition-colors"
            />
            <button 
              type="submit"
              className="bg-neon-cyan text-black p-3 rounded-xl hover:bg-white transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
