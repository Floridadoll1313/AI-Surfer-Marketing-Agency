<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Map as MapIcon, Info, Zap, Sparkles, Navigation } from 'lucide-react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';
import '../styles/archipelago-map.css';
=======
import React from "react";
import Logo from "../components/Logo";
>>>>>>> origin/main

export default function ArchipelagoMap() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <h1 className="text-6xl font-black italic tracking-tighter text-center mb-4">
          Archipelago Map
        </h1>
        <p className="text-slate-400 text-center max-w-2xl mx-auto">
          Navigate the mythic coastline of the Ocean Tide Drop universe — each island a node of intelligence, creativity, and digital power.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <div className="text-center text-slate-500 leading-relaxed max-w-3xl mx-auto">
          <p>
            The archipelago is evolving. Soon you’ll be able to explore interactive islands, unlock hidden nodes, and traverse the neon‑ocean frontier.
          </p>
        </div>

      </div>
    </div>
  );
}
<<<<<<< HEAD

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

    svg.append('defs')
      .append('filter')
      .attr('id', 'glow')
      .append('feGaussianBlur')
      .attr('stdDeviation', '3.5')
      .attr('result', 'coloredBlur');

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
      .on('mouseleave', (event, d) => {
        setSelectedIsland(null);
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
      .attr('fill', '#000')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .style('filter', 'url(#glow)');

    islandGroups.append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y - 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text(d => d.name);

  }, [navigate]);

  return (
    <div className="archipelago-container">
      <svg ref={svgRef} className="archipelago-svg" viewBox="0 0 800 900" />
      
      <AnimatePresence>
        {selectedIsland && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="island-info-card"
          >
            <h3 
              className="text-2xl font-bold mb-2 island-title" 
              style={{ '--island-color': selectedIsland.color } as React.CSSProperties}
            >
              {selectedIsland.name}
            </h3>
            <p className="text-gray-300 mb-4">{selectedIsland.description}</p>
            <div className="flex items-center text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              <span>Click to travel</span>
              <Navigation className="ml-2 w-4 h-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
=======
>>>>>>> origin/main
