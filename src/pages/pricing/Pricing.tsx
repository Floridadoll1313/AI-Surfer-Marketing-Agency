import React from 'react';
import { ProductCard } from '../../components/ProductCard';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      {/* HERO */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-black uppercase italic mb-4 text-neon-cyan">
          Choose Your Tier
        </h1>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-xs">
          Calibrate Your Neural Surf Engine
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <ProductCard
          title="Neural Node"
          description="Your entry into the neural field. Activate your first node."
          slug="neural-node"
          image="/images/neural-node.jpg"
        />

        <ProductCard
          title="Ocean Pro"
          description="Calibrate your oceanic resonance and unlock deeper flow."
          slug="ocean-pro"
          image="/images/ocean-pro.jpg"
        />

        <ProductCard
          title="Founders Realm"
          description="Enter the inner sanctum. Reserved for realmwalkers only."
          slug="founders-realm"
          image="/images/founders-realm.jpg"
        />
      </div>
    </div>
  );
};
