import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Map as MapIcon, Info, Zap, Sparkles, Navigation } from 'lucide-react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';

interface Island {
  id: string;
  name: string;
  x: number;
  y: number;
  path: string;
  description: string;
  color: string;
}

const islands: Island[] = [
  { id: 'rodanthe', name: 'Rodanthe', x: 200, y: 100, path: '/web-builds', description: 'The hub of Web Architecture and digital structures.', color: '#00ffff' },
  { id: 'waves', name: 'Waves', x: 250, y: 200, path: '/automations', description: 'Where data flows are automated and synchronized.', color: '#39ff14' },
  { id: 'salvo', name: 'Salvo', x: 300, y: 300, path: '/workflows', description: 'Complex neural workflows and process mapping.', color: '#ff00ff' },
  { id: 'avon', name: 'Avon', x: 350, y: 450, path: '/dashboard', description: 'The central gathering point for all digital architects.', color: '#ffff00' },
  { id: 'buxton', name: 'Buxton', x: 450, y: 600, path: '/ai-studio', description: 'The manifestation chamber for AI-driven creations.', color: '#ff0055' },
  { id: 'frisco', name: 'Frisco', x: 350, y: 700, path: '/game-builds', description: 'Interactive simulations and digital playgrounds.', color: '#7b2ff7' },
  { id: 'hatteras', name: 'Hatteras', x: 250, y: 750, path: '/vault', description: 'The secure archive of the archipelago secrets.', color: '#ffffff' },
];

export const ArchipelagoMap = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 900;

    svg.selectAll('*').remove();

    // Background glow
    svg.append('defs')
      .append('filter')
      .attr('id', 'glow')
      .append('feGaussianBlur')
      .attr('stdDeviation', '3.5')
      .attr('result', 'coloredBlur');

    // Draw connecting "Neural Lines"
    const lineGenerator = d3.line<Island>()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveCatmullRom.alpha(0.5));

    svg.append('path')
      .datum(islands)
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(0, 255, 255, 0.1)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('class', 'neural-path');

    // Draw Islands
    const islandGroups = svg.selectAll('.island')
      .data(islands)
      .enter()
      .append('g')
      .attr('class', 'island')
      .attr('cursor', 'pointer')
      .on('mouseenter', (event, d) => {
        setSelectedIsland(d);
        d3.select(event.currentTarget).select('circle')
          .transition()
          .duration(300)
          .attr('r', 15)
          .attr('stroke-width', 4);
      })
      .on('mouseleave', (event) => {
        d3.select(event.currentTarget).select('circle')
          .transition()
          .duration(300)
          .attr('r', 10)
          .attr('stroke-width', 2);
      })
      .on('click', (event, d) => {
        navigate(d.path);
      });

    islandGroups.append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 10)
      .attr('fill', 'black')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .style('filter', 'url(#glow)');

    islandGroups.append('text')
      .attr('x', d => d.x + 20)
      .attr('y', d => d.y + 5)
      .text(d => d.name.toUpperCase())
      .attr('fill', 'rgba(255, 255, 255, 0.5)')
      .attr('font-size', '10px')
      .attr('font-weight', '900')
      .attr('letter-spacing', '0.2em');

  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col lg:flex-row gap-12 items-start">
      <div className="flex-1 space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Navigation className="text-neon-cyan" size={40} />
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">Neural Topography</h1>
          </div>
          <p className="text-slate-400 text-xl font-light tracking-wide">
            Navigate the Hatteras Digital Archipelago. Each node represents a core module of our ecosystem.
          </p>
        </motion.div>

        <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden h-[600px] flex items-center justify-center bg-black/40">
          <svg 
            ref={svgRef} 
            viewBox="0 0 800 900" 
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-6 lg:mt-24">
        <AnimatePresence mode="wait">
          {selectedIsland ? (
            <motion.div
              key={selectedIsland.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl" 
                style={{ backgroundColor: selectedIsland.color }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: selectedIsland.color }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Node Selected</span>
                </div>
                <h3 className="text-2xl font-black italic mb-4" style={{ color: selectedIsland.color }}>
                  {selectedIsland.name}
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
                  {selectedIsland.description}
                </p>
                <button 
                  onClick={() => navigate(selectedIsland.path)}
                  className="w-full py-3 rounded-xl font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                  Initialize Neural Link
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-8 rounded-3xl border border-white/5 text-center"
            >
              <Info className="mx-auto text-slate-800 mb-4" size={32} />
              <p className="text-slate-600 text-xs uppercase tracking-widest font-bold">Hover over a node to scan data</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Archipelago Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-600">Active Nodes</span>
              <span className="text-neon-cyan">7/7</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-600">Neural Sync</span>
              <span className="text-neon-green">99.9%</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-600">Data Flow</span>
              <span className="text-neon-pink">Stable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
