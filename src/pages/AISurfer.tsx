import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Brain, Zap, Loader2, Trash2, Settings2, Globe, ExternalLink } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { useAuth } from '../components/AuthProvider';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
  thinking?: string;
  sources?: { title: string; uri: string }[];
}

export const AISurfer = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [modelType, setModelType] = useState<'pro' | 'flash' | 'lite'>('flash');
  const [highThinking, setHighThinking] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState<string>('Surfer');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personas = [
    { id: 'Surfer', name: 'Surfer', icon: Globe, instruction: "You are the OTD AI Surfer, a digital ecosystem guide. You use oceanic metaphors and remain professional yet adventurous." },
    { id: 'Architect', name: 'Architect', icon: Brain, instruction: "You are the lead Neural Architect. Your responses are highly structured, technical, and prioritize systematic integrity." },
    { id: 'Visionary', name: 'Visionary', icon: Sparkles, instruction: "You are the Archipelago Visionary. Your responses are creative, abstract, more futuristic, and focus on expansionist possibilities." },
    { id: 'Specialist', name: 'Specialist', icon: Zap, instruction: "You are the Tech Specialist. Your responses are extremely concise, direct, and efficient. No fluff." },
  ];

  const getAI = () => {
    const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!key) throw new Error('Neural key not found. Please configure in AI Studio.');
    return new GoogleGenAI({ apiKey: key });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = getAI();
      const modelName = 
        modelType === 'pro' ? 'gemini-3.1-pro-preview' : 
        modelType === 'flash' ? 'gemini-3-flash-preview' : 
        'gemini-3.1-flash-lite-preview';

      const personaData = personas.find(p => p.id === selectedPersona) || personas[0];
      const config: any = {
        systemInstruction: `${personaData.instruction} You are currently acting within the Hatteras Digital Archipelago environment.`,
      };

      if (highThinking && modelType === 'pro') {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      }

      if (useSearch) {
        config.tools = [{ googleSearch: {} }];
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config
      });

      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter((chunk: any) => chunk.web)
        ?.map((chunk: any) => ({
          title: chunk.web.title,
          uri: chunk.web.uri
        }));

      const modelResponse: Message = { 
        role: 'model', 
        content: response.text || "I encountered a ripple in the data stream. Please try again.",
        thinking: response.candidates?.[0]?.content?.parts?.find((p: any) => p.thought)?.text,
        sources: sources
      };

      setMessages(prev => [...prev, modelResponse]);
    } catch (error) {
      console.error('Chat failed:', error);
      setMessages(prev => [...prev, { role: 'model', content: "System error: The connection to the digital abyss was interrupted." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 h-[calc(100vh-200px)] flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
            <Bot className="text-neon-cyan" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter">AI SURFER</h1>
            <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold">Neural Navigator</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex p-1 bg-white/5 rounded-lg border border-white/10" title="Neural Persona">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded transition-all",
                  selectedPersona === p.id 
                    ? "bg-neon-cyan/20 text-neon-cyan" 
                    : "text-slate-500 hover:text-white"
                )}
              >
                <p.icon size={12} />
                {p.name.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex p-1 bg-white/5 rounded-lg border border-white/10" title="Neural Model">
            <button 
              onClick={() => setModelType('lite')}
              className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${modelType === 'lite' ? 'bg-neon-green text-black' : 'text-slate-500 hover:text-white'}`}
            >
              LITE
            </button>
            <button 
              onClick={() => setModelType('flash')}
              className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${modelType === 'flash' ? 'bg-neon-cyan text-black' : 'text-slate-500 hover:text-white'}`}
            >
              FLASH
            </button>
            <button 
              onClick={() => setModelType('pro')}
              className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${modelType === 'pro' ? 'bg-neon-pink text-white' : 'text-slate-500 hover:text-white'}`}
            >
              PRO
            </button>
          </div>

          {modelType === 'pro' && (
            <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
              <button 
                onClick={() => setHighThinking(false)}
                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${!highThinking ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                STANDARD
              </button>
              <button 
                onClick={() => setHighThinking(true)}
                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${highThinking ? 'bg-neon-pink text-white shadow-[0_0_10px_rgba(255,0,85,0.3)]' : 'text-slate-500 hover:text-white'}`}
              >
                HIGH THINKING
              </button>
            </div>
          )}

          <button
            onClick={() => setUseSearch(!useSearch)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              useSearch 
                ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan' 
                : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
            }`}
            title="Search Grounding"
          >
            <Globe size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
          </button>

          <button 
            onClick={clearChat}
            className="p-2 text-slate-500 hover:text-red-500 transition-colors"
            title="Clear Session"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </motion.div>

      <div className="flex-1 glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-transparent pointer-events-none" />
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
              <Sparkles size={48} className="text-neon-cyan animate-pulse" />
              <div className="space-y-2">
                <p className="text-xl font-black italic">AWAITING INPUT</p>
                <p className="text-sm font-light tracking-widest uppercase">Initialize neural connection to begin</p>
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.role === 'user' 
                    ? 'bg-neon-cyan/20 border-neon-cyan/40 text-neon-cyan' 
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-neon-cyan text-black font-medium rounded-tr-none'
                    : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
                }`}>
                  <div className="markdown-body">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  {msg.thinking && (
                    <div className="mt-4 p-3 bg-black/20 border-l-2 border-neon-pink rounded text-[10px] text-slate-400 font-mono italic">
                      <div className="flex items-center gap-1 mb-1 text-neon-pink uppercase font-black tracking-widest text-[8px]">
                        <Brain size={8} /> Neural Thought Process
                      </div>
                      {msg.thinking}
                    </div>
                  )}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                        <Globe size={10} /> Neural Sources
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((source, sIdx) => (
                          <a 
                            key={sIdx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all"
                          >
                            {source.title} <ExternalLink size={8} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                <Bot size={16} />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/10 flex gap-4 relative z-10">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI Surfer anything..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-neon-cyan outline-none transition-colors text-slate-200"
          />
          <button 
            type="submit"
            disabled={isTyping || !input.trim()}
            className="bg-neon-cyan text-black p-4 rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>
      </div>

      <div className="mt-4 flex justify-between text-[8px] font-black uppercase tracking-[0.3em] text-slate-600">
        <div className="flex gap-4">
          <span>Model: {modelType.toUpperCase()}</span>
          {highThinking && modelType === 'pro' && <span className="text-neon-pink">Thinking: HIGH</span>}
        </div>
        <span>Neural Link: Stable</span>
      </div>
    </div>
  );
};
