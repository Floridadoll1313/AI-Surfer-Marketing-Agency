import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wand2, 
  Terminal, 
  Type, 
  Image as ImageIcon, 
  Sparkles, 
  Copy, 
  Check, 
  Zap, 
  Brain,
  ArrowRight,
  ClipboardList,
  UserCircle,
  Plus,
  X
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

type ModelType = 'text' | 'code' | 'image';

interface Template {
  title: string;
  description: string;
  prompt: string;
  persona: string;
}

const modelTypes = [
  { id: 'text', name: 'Text Generation', icon: Type, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
  { id: 'code', name: 'Code Architecture', icon: Terminal, color: 'text-neon-pink', bg: 'bg-neon-pink/10' },
  { id: 'image', name: 'Visual Manifestation', icon: ImageIcon, color: 'text-neon-green', bg: 'bg-neon-green/10' },
] as const;

const personaPresets = [
  { name: 'The Architect', description: 'Structured, technical, systematic' },
  { name: 'The Visionary', description: 'Creative, abstract, expansionist' },
  { name: 'The Specialist', description: 'Concise, direct, efficient' },
  { name: 'The Old Salt', description: 'Hatteras-wise, nautical, direct' },
  { name: 'The Reef Guardian', description: 'Protective, ecological, deep-core' },
  { name: 'The Storm Chaser', description: 'Bold, high-energy, risk-taking' },
];

export const PromptToolkit = () => {
  const [input, setInput] = useState('');
  const [selectedType, setSelectedType] = useState<ModelType>('text');
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(['The Architect', 'The Visionary', 'The Specialist']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customPersona, setCustomPersona] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const togglePersona = (personaName: string) => {
    if (selectedPersonas.includes(personaName)) {
      if (selectedPersonas.length > 1) {
        setSelectedPersonas(selectedPersonas.filter(p => p !== personaName));
      }
    } else {
      if (selectedPersonas.length < 3) {
        setSelectedPersonas([...selectedPersonas, personaName]);
      } else {
        // Replace the oldest one? Or just prevent? 
        // Let's replace the first one for fluidity
        setSelectedPersonas([...selectedPersonas.slice(1), personaName]);
      }
    }
  };

  const addCustomPersona = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPersona.trim()) {
      togglePersona(customPersona.trim());
      setCustomPersona('');
      setShowCustomInput(false);
    }
  };

  const generateTemplates = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setTemplates([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const personaList = selectedPersonas.map((p, i) => `${i+1}. "${p}"`).join('\n');
      const prompt = `You are a world-class Prompt Engineer. 
      Generate exactly ${selectedPersonas.length} distinct, professional prompt templates based on the following core idea: "${input}"
      The user is targeting a ${selectedType} generation model.

      Target these specific personas for each template:
      ${personaList}

      Style your response as a valid JSON array of ${selectedPersonas.length} objects with these exact keys: 
      title (short, descriptive name), description (short explanation of why this style works), persona (the logic/role name), prompt (the full optimized prompt).

      Return ONLY the JSON array.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text);
      setTemplates(data);
    } catch (error) {
      console.error('Failed to generate templates:', error);
      // Fallback templates logic...
      setTemplates(selectedPersonas.map(p => ({
        title: `${p} Blueprint`,
        description: `Modelled after the ${p} perspective.`,
        persona: p,
        prompt: `System: Acting as ${p}.\nTask: Process "${input}" into a high-fidelity output.\nConstraints: Maintain persona-specific tone and structure.`
      })));
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-neon-cyan/10 rounded-3xl border border-neon-cyan/20 animate-pulse">
            <Wand2 className="text-neon-cyan" size={40} />
          </div>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-cyan to-white">
          PROMPT ENGINEERING TOOLKIT
        </h1>
        <p className="text-slate-400 text-lg font-light tracking-wide max-w-2xl mx-auto">
          Refine your core ideas into multi-dimensional neural instructions. 
          Architect the perfect input for our Archipelago nodes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-white to-neon-pink opacity-50" />
            
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
              <Brain size={14} className="text-neon-cyan" /> Core Idea Matrix
            </label>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What is the seed of your manifestation? (e.g., 'An island made of glass and coral')"
              className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-6 text-slate-200 placeholder:text-slate-700 outline-none focus:border-neon-cyan/50 transition-all resize-none font-light leading-relaxed mb-8"
            />

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">
                  Node Target Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {modelTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 group gap-2",
                        selectedType === type.id 
                          ? cn("border-white/30", type.bg) 
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      )}
                    >
                      <type.icon size={20} className={cn(selectedType === type.id ? type.color : "text-slate-500")} />
                      <span className={cn(
                        "text-[9px] font-bold tracking-[0.1em] uppercase",
                        selectedType === type.id ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                      )}>
                        {type.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                    <UserCircle size={14} className="text-neon-pink" /> 
                    Persona Matrix ({selectedPersonas.length}/3)
                  </label>
                  <button 
                    onClick={() => setShowCustomInput(!showCustomInput)}
                    className="text-[10px] font-bold text-neon-pink hover:text-white transition-colors"
                  >
                    {showCustomInput ? <X size={14} /> : <Plus size={14} />}
                  </button>
                </div>

                {showCustomInput ? (
                  <form onSubmit={addCustomPersona} className="flex gap-2 mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <input 
                      type="text"
                      value={customPersona}
                      onChange={(e) => setCustomPersona(e.target.value)}
                      placeholder="Custom Persona (e.g. 'Cyberpunk Poet')"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs outline-none focus:border-neon-pink transition-colors"
                      autoFocus
                    />
                    <button 
                      type="submit"
                      className="bg-neon-pink text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      Inject
                    </button>
                  </form>
                ) : null}

                <div className="grid grid-cols-2 gap-2">
                  {personaPresets.map((persona) => (
                    <button
                      key={persona.name}
                      onClick={() => togglePersona(persona.name)}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all duration-300",
                        selectedPersonas.includes(persona.name)
                          ? "bg-neon-pink/10 border-neon-pink/40 text-neon-pink shadow-[0_0_15px_rgba(255,0,255,0.1)]"
                          : "bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300"
                      )}
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest mb-1">{persona.name}</div>
                      <div className="text-[8px] opacity-60 leading-tight">{persona.description}</div>
                    </button>
                  ))}
                  {/* Display custom selected personas if they aren't in presets */}
                  {selectedPersonas.filter(p => !personaPresets.some(preset => preset.name === p)).map(p => (
                    <button
                      key={p}
                      onClick={() => togglePersona(p)}
                      className="p-3 rounded-xl border text-left bg-neon-pink/10 border-neon-pink/40 text-neon-pink shadow-[0_0_15px_rgba(255,0,255,0.1)]"
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest mb-1 truncate">{p}</div>
                      <div className="text-[8px] opacity-60 leading-tight">Custom Neural Persona</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={generateTemplates}
              disabled={isGenerating || !input.trim() || selectedPersonas.length === 0}
              className="w-full mt-10 py-5 bg-neon-cyan text-black font-black uppercase tracking-tighter flex items-center justify-center gap-3 rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(0,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isGenerating ? (
                <>
                  <Zap className="animate-spin" size={20} />
                  Architecting...
                </>
              ) : (
                <>
                  Generate Manifestation Blueprints
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5 text-[10px] text-slate-500 tracking-[0.05em] leading-relaxed">
            <h4 className="font-black text-slate-400 mb-2 uppercase tracking-widest">Engineering Tip</h4>
            "Specific personas dictate the neural weights of the response. Use 'The Storyteller' for evocative descriptions or 'The Critic' to find structural weaknesses."
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!isGenerating && templates.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6 px-4">
                  <ClipboardList className="text-neon-cyan" size={20} />
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Neural Design Blueprints</h3>
                </div>
                
                {templates.map((template, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-8 rounded-[2.5rem] border border-white/10 group hover:border-neon-cyan/50 transition-all duration-500 relative"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-cyan mb-1 italic">
                          {template.persona}
                        </div>
                        <h3 className="text-2xl font-black italic tracking-tighter text-white">
                          {template.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => copyToClipboard(template.prompt, idx)}
                        className="p-3 bg-white/5 rounded-xl border border-white/10 text-slate-400 hover:text-neon-cyan transition-all"
                      >
                        {copiedIndex === idx ? <Check size={18} className="text-neon-green" /> : <Copy size={18} />}
                      </button>
                    </div>

                    <p className="text-slate-500 text-sm font-light mb-6 border-l-2 border-white/10 pl-4 py-1 italic">
                      {template.description}
                    </p>

                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5 font-mono text-xs leading-relaxed text-slate-300 relative group-hover:border-neon-cyan/20 transition-colors">
                      <div className="absolute top-2 right-4 text-[8px] uppercase tracking-widest text-slate-600 font-bold">Instruction Set</div>
                      {template.prompt}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center py-20 space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 border-2 border-neon-cyan/20 rounded-full animate-ping" />
                  <Sparkles className="absolute inset-0 m-auto text-neon-cyan animate-pulse" size={40} />
                </div>
                <div className="text-center">
                  <p className="text-neon-cyan font-black uppercase tracking-[0.4em] text-sm animate-pulse">Syncing with Neural Core</p>
                  <p className="text-slate-600 text-xs mt-2 font-light">Architecting optimal manifestation sequences...</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center px-12 border-2 border-dashed border-white/5 rounded-[3rem]">
                <div className="p-6 bg-white/5 rounded-full mb-6">
                  <ArrowRight className="text-slate-700 -rotate-45" size={48} />
                </div>
                <h3 className="text-slate-500 font-black uppercase tracking-widest mb-2">Awaiting Synchronization</h3>
                <p className="text-slate-600 text-sm font-light max-w-sm">
                  Initialize a Core Idea and configure your Persona Matrix to generate blueprints.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
