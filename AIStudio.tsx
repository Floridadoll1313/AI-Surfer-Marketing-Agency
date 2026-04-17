import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  Film, 
  Sparkles, 
  Download, 
  Loader2, 
  Wand2, 
  Video, 
  Key, 
  Brain, 
  Zap, 
  Music, 
  Globe, 
  MapPin, 
  Mic, 
  Volume2, 
  Search, 
  Eye, 
  Layers,
  MonitorPlay,
  Play,
  Upload,
  Bot,
  MessageSquare
} from 'lucide-react';
import { GoogleGenAI, ThinkingLevel, Modality, Type } from "@google/genai";
import { useAuth } from '../components/AuthProvider';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

type LabTab = 'manifest' | 'observe' | 'dialogue' | 'sonic';
type ManifestType = 'image' | 'video' | 'music';
type ObserveType = 'image' | 'video';
type Persona = 'Architect' | 'Visionary' | 'Specialist' | 'Custom';

const personas = {
  Architect: "You are the Architect of the Hatteras Archipelago. Your focus is on structure, technical blueprints, and the underlying logic of the digital realm. You are precise, technical, and authoritative.",
  Visionary: "You are the Visionary of the Hatteras Archipelago. You see the future of the digital dunes. Your language is poetic, inspiring, and focused on potential and evolution.",
  Specialist: "You are the Specialist of the Hatteras Archipelago. You have deep knowledge of specific island nodes. You are practical, efficient, and direct.",
  Custom: "You are a custom intelligence unit within the Hatteras Archipelago. You use local terminology like 'dunes', 'tides', 'shoals', and 'sound' to describe digital phenomena."
};

const aspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9', '21:9', '2:3', '3:2'];
const imageSizes = ['1K', '2K', '4K'];

export const AIStudio = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<LabTab>('manifest');
  const [manifestType, setManifestType] = useState<ManifestType>('image');
  const [observeType, setObserveType] = useState<ObserveType>('image');
  
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  
  // Advanced Config
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [thinkingLevel, setThinkingLevel] = useState<ThinkingLevel | undefined>(undefined);
  const [useSearch, setUseSearch] = useState(false);
  const [useMaps, setUseMaps] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState('');
  
  // Audio State
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona>('Architect');
  const [customPersonaPrompt, setCustomPersonaPrompt] = useState('');

  const MAX_PROMPT_LENGTH = 2000;

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(selected);
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const getAI = () => {
    const key = process.env.GEMINI_API_KEY;
    return new GoogleGenAI({ apiKey: key || '' });
  };

  const handleManifest = async () => {
    if (!prompt.trim()) return;
    if (!hasApiKey) {
      await handleSelectKey();
      return;
    }
    setIsGenerating(true);
    setResultUrl(null);
    setLyrics('');
    setStatus('Syncing with Neural Core...');

    try {
      const ai = getAI();
      
      if (manifestType === 'image') {
        setStatus('Synthesizing visual matrix...');
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: { aspectRatio: aspectRatio as any, imageSize: imageSize as any }
          },
        });
        
        const part = response.candidates?.[0].content.parts.find((p: any) => p.inlineData);
        if (part) setResultUrl(`data:image/png;base64,${part.inlineData.data}`);
        
      } else if (manifestType === 'video') {
        setStatus('Rendering temporal flow...');
        let operation: any = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt,
          config: { aspectRatio: aspectRatio as any, resolution: '1080p' }
        });

        while (!operation.done) {
          setStatus('Video synthesis in progress...');
          await new Promise(r => setTimeout(r, 10000));
          operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (uri) {
          const resp = await fetch(uri, { headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY || '' } });
          const blob = await resp.blob();
          setResultUrl(URL.createObjectURL(blob));
        }

      } else if (manifestType === 'music') {
        setStatus('Orchestrating sonic frequencies...');
        const stream = await ai.models.generateContentStream({
          model: 'lyria-3-pro-preview',
          contents: prompt,
          config: { responseModalities: [Modality.AUDIO] }
        });
        
        let audioBase64 = "";
        let audioMimeType = "audio/wav";

        for await (const chunk of stream) {
          const parts = chunk.candidates?.[0]?.content?.parts;
          if (!parts) continue;
          for (const part of parts) {
            if (part.inlineData?.data) {
              if (!audioBase64 && part.inlineData.mimeType) audioMimeType = part.inlineData.mimeType;
              audioBase64 += part.inlineData.data;
            }
            if (part.text && !lyrics) setLyrics(part.text);
          }
        }

        if (audioBase64) {
          const binary = atob(audioBase64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          const blob = new Blob([bytes], { type: audioMimeType });
          setResultUrl(URL.createObjectURL(blob));
        }
      }

      setStatus('Manifestation complete');
    } catch (error) {
      console.error('Manifestation failed:', error);
      setStatus('System error: Neural link unstable');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleObserve = async () => {
    if (!selectedFile) return;
    setIsGenerating(true);
    setAnalysisResult(null);
    setStatus('Analyzing visual input...');

    try {
      const ai = getAI();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const mimeType = selectedFile.type;

        const response = await ai.models.generateContent({
          model: 'gemini-3.1-pro-preview',
          contents: [{
            role: 'user',
            parts: [
              { text: prompt || "Describe this content in extreme detail, focusing on architectural patterns and hidden data." },
              { inlineData: { data: base64Data, mimeType } }
            ]
          }]
        });

        setAnalysisResult(response.text || "Neural core returned empty analysis.");
      };
      reader.readAsDataURL(selectedFile);
      setStatus('Analysis complete');
    } catch (error) {
      console.error('Observation failed:', error);
      setStatus('Sensor failure');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDialogue = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = { role: 'user', content: prompt };
    setChatMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setIsGenerating(true);

    try {
      const ai = getAI();
      const tools = [];
      if (useSearch) tools.push({ googleSearch: {} });
      else if (useMaps) tools.push({ googleMaps: {} });

      const response = await ai.models.generateContent({
        model: thinkingLevel === ThinkingLevel.HIGH ? 'gemini-3.1-pro-preview' : 'gemini-3-flash-preview',
        contents: [...chatMessages, userMsg].map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        config: {
          systemInstruction: selectedPersona === 'Custom' ? customPersonaPrompt || personas.Custom : personas[selectedPersona],
          thinkingConfig: { thinkingLevel },
          tools: tools.length > 0 ? tools : undefined
        }
      });

      setChatMessages(prev => [...prev, { role: 'model', content: response.text || "The neural link flickered. Please restate your query." }]);
    } catch (error) {
      console.error('Dialogue failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const transcribeAudio = async (blob: Blob) => {
    setIsGenerating(true);
    setStatus('Transcribing sonic waves...');
    try {
      const ai = getAI();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [{
            role: 'user',
            parts: [
              { text: "Accurately transcribe the sonic data. Extract intent and key concepts." },
              { inlineData: { data: base64Data, mimeType: 'audio/wav' } }
            ]
          }]
        });
        setTranscription(response.text || "No acoustic data manifested.");
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Transcription failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTTS = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setStatus('Synthesizing vocal identity...');
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [{ parts: [{ text: `Say with a futuristic, calm, and technical tone: ${prompt}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }
            }
          }
        }
      });
      const part = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
      if (part) {
        const binary = atob(part.inlineData.data);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const blob = new Blob([bytes], { type: 'audio/mp3' });
        setResultUrl(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error('TTS failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Immersive Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-neon-cyan/10 rounded-3xl border border-neon-cyan/20 relative group">
            <Wand2 className="text-neon-cyan animate-pulse group-hover:scale-110 transition-transform" size={40} />
            <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <h1 className="text-6xl font-black italic tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-cyan to-white uppercase leading-none">
          Neural Labs
        </h1>
        <p className="text-slate-500 text-lg font-light tracking-[0.2em] uppercase">
          Multidimensional Intelligence Hub // V{user?.uid ? user.uid.slice(0, 4) : '3.1'}
        </p>
      </motion.div>

      {/* Lab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
          {[
            { id: 'manifest', label: 'Manifest', icon: Sparkles, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
            { id: 'observe', label: 'Observe', icon: Eye, color: 'text-neon-pink', bg: 'bg-neon-pink/10' },
            { id: 'dialogue', label: 'Dialogue', icon: MessageSquare, color: 'text-neon-green', bg: 'bg-neon-green/10' },
            { id: 'sonic', label: 'Sonic', icon: Volume2, color: 'text-neon-yellow', bg: 'bg-neon-yellow/10' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as LabTab); setResultUrl(null); }}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group",
                activeTab === tab.id ? `${tab.bg} ${tab.color} border border-white/10` : "text-slate-500 hover:text-white"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
              {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-current" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Controls Panel */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          
          <div className="glass-card p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-neon-cyan/5 blur-[80px] -z-10" />
            
            <header className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-3">
                <Brain className="text-neon-cyan" size={24} /> Configuration Matrix
              </h3>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", hasApiKey ? "bg-neon-green animate-pulse" : "bg-neon-red")} />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{hasApiKey ? 'Stable' : 'Offline'}</span>
              </div>
            </header>

            {/* Sub-tabs based on active LabTab */}
            <div className="mb-10">
              {activeTab === 'manifest' && (
                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Manifestation Mode</label>
                  <div className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
                    {(['image', 'video', 'music'] as ManifestType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => setManifestType(type)}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all relative overflow-hidden",
                          manifestType === type ? "bg-neon-cyan text-black" : "text-slate-500 hover:text-white"
                        )}
                      >
                        {type}
                        {manifestType === type && <motion.div layoutId="manifest-active" className="absolute inset-0 bg-white/10" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'observe' && (
                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Observation Mode</label>
                  <div className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
                    {(['image', 'video'] as ObserveType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => setObserveType(type)}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all relative overflow-hidden",
                          observeType === type ? "bg-neon-pink text-white" : "text-slate-500 hover:text-white"
                        )}
                      >
                        {type}
                        {observeType === type && <motion.div layoutId="observe-active" className="absolute inset-0 bg-white/10" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'dialogue' && (
                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Persona Selection</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Architect', 'Visionary', 'Specialist', 'Custom'] as Persona[]).map(p => (
                      <button
                        key={p}
                        onClick={() => setSelectedPersona(p)}
                        className={cn(
                          "py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border",
                          selectedPersona === p ? "bg-neon-green/10 border-neon-green text-neon-green" : "bg-black/40 border-white/5 text-slate-500 hover:text-white"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  {selectedPersona === 'Custom' && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                       <input 
                         type="text" 
                         value={customPersonaPrompt}
                         onChange={(e) => setCustomPersonaPrompt(e.target.value)}
                         placeholder="Define your Hatteras persona..."
                         className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-neon-green transition-all"
                       />
                       <p className="text-[8px] text-slate-600 mt-2 uppercase tracking-widest">Tip: Use island terms like 'Dunes' or 'Tides'</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* File Upload for Observe */}
            {activeTab === 'observe' && (
              <div className="mb-10">
                <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-[2.5rem] bg-black/20 hover:border-neon-pink/50 transition-all cursor-pointer group">
                  <Upload size={40} className="text-slate-600 group-hover:text-neon-pink transition-colors mb-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white">
                    {selectedFile ? selectedFile.name : `Inject ${observeType} Sensor Data`}
                  </span>
                  <input type="file" accept={observeType === 'image' ? "image/*" : "video/*"} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            )}

            {/* Prompt Matrix */}
            <div className="space-y-6">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">manifestation sequence</label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Input neural seed..."
                  className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-6 text-slate-200 placeholder:text-slate-700 outline-none focus:border-neon-cyan/50 transition-all resize-none font-light leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                  {prompt.length} / {MAX_PROMPT_LENGTH}
                </div>
              </div>
            </div>

            {/* Advanced Controls */}
            <div className="mt-10 space-y-10">
              
              {/* Aspect Ratio Matrix (only for Image/Video) */}
              {(manifestType !== 'music' || activeTab === 'observe') && activeTab !== 'dialogue' && activeTab !== 'sonic' && (
                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Aspect Ratio Matrix</label>
                  <div className="grid grid-cols-4 gap-2">
                    {aspectRatios.map(ratio => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={cn(
                          "py-2 rounded-lg text-[8px] font-black border transition-all",
                          aspectRatio === ratio ? "bg-white/10 border-neon-cyan text-neon-cyan" : "bg-black/20 border-white/5 text-slate-600 hover:text-white"
                        )}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Grid for Thinking/Search/Maps grounding */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Thinking Protocol</label>
                  <div className="flex p-1 bg-black/40 rounded-xl border border-white/5">
                    <button
                      onClick={() => setThinkingLevel(undefined)}
                      className={cn("flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all", thinkingLevel === undefined ? "bg-white/10 text-white" : "text-slate-600")}
                    >STD</button>
                    <button
                      onClick={() => setThinkingLevel(ThinkingLevel.HIGH)}
                      className={cn("flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all", thinkingLevel === ThinkingLevel.HIGH ? "bg-neon-cyan text-black" : "text-slate-600")}
                    >HIGH</button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Grounding Matrix</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUseSearch(!useSearch)}
                      className={cn("flex-1 py-1.5 rounded-xl border flex items-center justify-center gap-2 transition-all", useSearch ? "bg-neon-cyan/10 border-neon-cyan text-neon-cyan" : "bg-white/5 border-white/5 text-slate-600")}
                    ><Search size={10} /> SEARCH</button>
                    <button
                      onClick={() => setUseMaps(!useMaps)}
                      className={cn("flex-1 py-1.5 rounded-xl border flex items-center justify-center gap-2 transition-all", useMaps ? "bg-neon-pink/10 border-neon-pink text-neon-pink" : "bg-white/5 border-white/5 text-slate-600")}
                    ><MapPin size={10} /> MAPS</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Execute Button */}
            <div className="mt-12 flex gap-4">
              {activeTab === 'sonic' ? (
                <>
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={cn(
                      "flex-1 py-5 rounded-[2rem] font-black uppercase tracking-tighter flex items-center justify-center gap-3 transition-all",
                      isRecording ? "bg-neon-red text-white animate-pulse" : "bg-neon-yellow text-black hover:bg-white"
                    )}
                  >
                    <Mic size={20} />
                    {isRecording ? 'Capturing Waves...' : 'Transcribe Audio'}
                  </button>
                  <button
                    onClick={handleTTS}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex-1 py-5 rounded-[2rem] bg-white/5 border border-white/10 font-black uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                  >
                    <Volume2 size={20} />
                    Text to Speech
                  </button>
                </>
              ) : (
                <button
                  onClick={activeTab === 'manifest' ? handleManifest : activeTab === 'observe' ? handleObserve : activeTab === 'dialogue' ? handleDialogue : () => {}}
                  disabled={isGenerating || (activeTab !== 'dialogue' && !prompt.trim() && !selectedFile)}
                  className={cn(
                    "w-full py-6 rounded-[2rem] font-black uppercase tracking-tighter flex items-center justify-center gap-3 transition-all text-lg shadow-[0_0_40px_rgba(0,255,255,0.1)]",
                    activeTab === 'manifest' ? "bg-neon-cyan text-black hover:bg-white" :
                    activeTab === 'observe' ? "bg-neon-pink text-white hover:bg-white hover:text-black" :
                    "bg-neon-green text-black hover:bg-white"
                  )}
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={24} /> : activeTab === 'manifest' ? <Sparkles size={24} /> : activeTab === 'observe' ? <Eye size={24} /> : <Bot size={24} />}
                  {isGenerating ? status : `Initialize ${activeTab.toUpperCase()}`}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results / Interaction Panel */}
        <div className="lg:col-span-12 xl:col-span-7">
          <AnimatePresence mode="wait">
            {activeTab === 'dialogue' ? (
              <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-[3rem] border border-white/10 h-[800px] flex flex-col overflow-hidden relative">
                <div className="p-8 border-b border-white/10 flex items-center justify-between bg-black/20 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neon-green/10 rounded-2xl flex items-center justify-center border border-neon-green/20">
                      <Bot className="text-neon-green" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black italic uppercase text-lg text-white">Archipelago Intelligence</h4>
                      <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-black">Multi-Modal Cognition Chain</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {useSearch && <div className="p-2 bg-neon-cyan/5 rounded-lg border border-neon-cyan/20 text-neon-cyan"><Search size={14} /></div>}
                    {useMaps && <div className="p-2 bg-neon-pink/5 rounded-lg border border-neon-pink/20 text-neon-pink"><MapPin size={14} /></div>}
                    {thinkingLevel === ThinkingLevel.HIGH && <div className="p-2 bg-neon-purple/5 rounded-lg border border-neon-purple/20 text-neon-purple"><Brain size={14} /></div>}
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                  {chatMessages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
                      <Layers size={80} className="text-slate-500 mb-6" />
                      <p className="text-xl font-bold italic uppercase tracking-widest text-slate-600 pr-10 pl-10">Awaiting Neural Link</p>
                    </div>
                  )}
                  {chatMessages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={cn("flex gap-6", msg.role === 'user' ? "flex-row-reverse" : "")}>
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 shadow-lg", msg.role === 'user' ? "bg-neon-cyan text-black border-neon-cyan" : "bg-white/5 text-slate-400 border-white/10")}>
                           {msg.role === 'user' ? <UserCircle size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={cn("max-w-[85%] p-8 rounded-[2rem] text-sm leading-relaxed border", msg.role === 'user' ? "bg-neon-cyan/5 border-neon-cyan/20 text-slate-200 rounded-tr-none" : "bg-white/5 border-white/10 text-slate-300 rounded-tl-none")}>
                          <div className="markdown-body">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        </div>
                    </motion.div>
                  ))}
                  <div className="h-px" />
                </div>
                
                <form onSubmit={handleDialogue} className="p-8 bg-black/40 border-t border-white/10 flex gap-4">
                   <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Query the Archipelago Intelligence..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-neon-green transition-all text-white font-light" />
                   <button type="submit" disabled={isGenerating || !prompt.trim()} className="bg-neon-green text-black p-5 rounded-2xl hover:bg-white transition-all disabled:opacity-50"><Bot size={24} /></button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="visual" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                
                {/* Visual Manifestation Canvas */}
                <div className="relative aspect-video glass-card rounded-[3.5rem] border border-white/10 overflow-hidden flex items-center justify-center bg-black/60 group shadow-2xl">
                  {resultUrl ? (
                    <div className="w-full h-full relative">
                      {manifestType === 'image' || observeType === 'image' ? (
                        <img src={resultUrl} alt="Manifested" className="w-full h-full object-cover" />
                      ) : manifestType === 'video' || observeType === 'video' ? (
                        <video src={resultUrl} controls autoPlay loop className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-black/80">
                           <Music size={80} className="text-neon-yellow animate-bounce" />
                           <audio src={resultUrl} controls className="mt-8" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                        <a href={resultUrl} download="archipelago-manifest.png" className="p-5 bg-neon-cyan text-black rounded-full hover:scale-110 transition-transform"><Download size={32} /></a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-20 opacity-20">
                      {manifestType === 'image' ? <ImageIcon size={100} className="text-slate-500 mb-6 mx-auto" /> : manifestType === 'video' ? <Film size={100} className="text-slate-500 mb-6 mx-auto" /> : <Music size={100} className="text-slate-500 mb-6 mx-auto" />}
                      <p className="text-2xl font-black italic uppercase tracking-[0.5em]">Awaiting Resonance</p>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
                       <div className="relative">
                          <div className="w-24 h-24 border-2 border-neon-cyan/20 rounded-full animate-ping" />
                          <Loader2 className="absolute inset-0 m-auto text-neon-cyan animate-spin" size={48} />
                       </div>
                       <p className="text-neon-cyan font-black uppercase tracking-[0.4em] text-lg animate-pulse">{status}</p>
                    </div>
                  )}
                </div>

                {/* Content Output (Transcription / Analysis) */}
                <AnimatePresence>
                  {(transcription || analysisResult) && (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="glass-card p-10 rounded-[3rem] border border-white/10 bg-black/40 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-5"><Brain size={120} /></div>
                       <div className="flex items-center gap-3 mb-8">
                          {transcription ? <Mic className="text-neon-yellow" size={20} /> : <Eye className="text-neon-pink" size={20} />}
                          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">{transcription ? 'Sonic Transcription' : 'Observed Intelligence'}</h4>
                       </div>
                       <div className="markdown-body pr-4">
                          <ReactMarkdown>{transcription || analysisResult || ''}</ReactMarkdown>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const UserCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
