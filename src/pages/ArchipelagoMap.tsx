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
