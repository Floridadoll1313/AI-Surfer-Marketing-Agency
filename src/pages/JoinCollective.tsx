import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, Sparkles, Check, ArrowRight, Loader2, Bot, Globe, Database, Newspaper } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const JoinCollective = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/join' }
      });
      return;
    }

    setIsRedirecting(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (err: any) {
      console.error('Subscription error:', err);
      setError(err.message || 'The neural link to the payment gateway failed. Please try again.');
      setIsRedirecting(false);
    }
  };

  const benefits = [
    { icon: Bot, title: 'Collective Intelligence', description: 'Unlimited access to the AI Studio and high-fidelity generation models.' },
    { icon: Globe, title: 'Hatteras Map Access', description: 'Unlock the full topographic data of the digital ecosystem nodes.' },
    { icon: Database, title: 'Supabase Vault', description: 'Secure, encrypted storage for your digital manifestations and secrets.' },
    { icon: Newspaper, title: 'Hatteras Daily Premium', description: 'Deep-dive neural briefings synthesized exclusively for members.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-neon-cyan/10 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-neon-cyan/5 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-neon-pink/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neon-cyan">
                <Shield size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Restricted Access</span>
              </div>
              <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.85] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-800">
                Join the<br/>
                <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Collective</span>
              </h1>
              <p className="text-slate-400 text-xl font-light tracking-wide max-w-lg leading-relaxed">
                The most advanced digital ecosystem on the coast. Secure your node and unlock the full power of the Hatteras Digital Collective.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-3"
                >
                  <div className="p-2 w-fit bg-white/5 border border-white/10 rounded-lg">
                    <benefit.icon className="text-neon-cyan" size={18} />
                  </div>
                  <h4 className="font-bold text-white uppercase tracking-tight italic">{benefit.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-neon-cyan/20 blur-[100px] opacity-20" />
            <div className="glass-card p-12 rounded-[3rem] border border-white/10 bg-black/40 relative overflow-hidden">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Architect tier</h2>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Neural Membership Plan</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-black text-neon-cyan italic">$49</div>
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">/ Month</div>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                {[
                  "Full access to AI Generation Lab",
                  "Secure Supabase Vault Storage",
                  "Member Exclusive News Node",
                  "Priority Neural Processing",
                  "Access to Member Directory & Chat",
                  "Custom Portfolio Architecture",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm text-slate-300">
                    <div className="p-1 bg-neon-green/10 rounded-full border border-neon-green/20">
                      <Check className="text-neon-green" size={12} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs text-center animate-shake">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubscribe}
                disabled={isRedirecting}
                className="w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-neon-cyan transition-all flex items-center justify-center gap-3 group"
              >
                {isRedirecting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Establishing Neural Link...
                  </>
                ) : (
                  <>
                    Initialize Membership
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                  </>
                )}
              </button>
              
              <p className="mt-8 text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                Secure payment via Stripe Matrix • Cancel Anytime
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JoinCollective;
