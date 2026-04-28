import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Heart, DollarSign, Phone, MessageSquare, LogOut, Shield, Sparkles, Wand2, User, LayoutDashboard, Map as MapIcon, ShoppingBag, Newspaper, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from './AuthProvider';

const publicNav = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Members', path: '/members', icon: Users },      // NEW
  { name: 'Bulls', path: '/bulls', icon: Heart },          // NEW
  { name: 'Pricing', path: '/pricing', icon: DollarSign },
  { name: 'Contact', path: '/contact', icon: Phone },
];

const memberItems = [
  { name: 'Studio', path: '/studio', icon: Wand2, color: 'text-neon-cyan' },
  { name: 'Surfer', path: '/ai-surfer', icon: Sparkles, color: 'text-neon-green' },
  { name: 'Toolkit', path: '/toolkit', icon: Wand2, color: 'text-white' },
  { name: 'Chat', path: '/chat', icon: MessageSquare, color: 'text-neon-cyan' },
  { name: 'Directory', path: '/directory', icon: Users, color: 'text-neon-yellow' },
  { name: 'Map', path: '/map', icon: MapIcon, color: 'text-neon-pink' },
  { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag, color: 'text-neon-pink' },
  { name: 'Daily', path: '/news', icon: Newspaper, color: 'text-neon-green' },
  { name: 'S‑Vault', path: '/supabase-vault', icon: Database, color: 'text-neon-purple' },
];

export const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAdmin, isMember } = useAuth();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass-card rounded-full flex items-center gap-4 border border-white/10 shadow-2xl">

      {/* PUBLIC NAVIGATION */}
      {publicNav.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "p-2 rounded-full transition-all duration-300 group relative",
              isActive ? "bg-neon-cyan/20 text-neon-cyan" : "text-slate-400 hover:text-white"
            )}
          >
            <Icon size={20} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
              {item.name}
            </span>
          </Link>
        );
      })}

      {/* ADMIN */}
      {isAdmin && (
        <Link
          to="/admin"
          className={cn(
            "p-2 rounded-full transition-all duration-300 group relative",
            location.pathname === '/admin' ? "bg-neon-green/20 text-neon-green" : "text-slate-400 hover:text-neon-green"
          )}
        >
          <Shield size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 font-black">
            ADMIN
          </span>
        </Link>
      )}

      {/* MEMBER NAVIGATION */}
      {user && isMember && (
        <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
          {memberItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "p-2 rounded-full transition-all duration-300 group relative",
                  isActive ? cn(item.color.replace('text-', 'bg-') + '/20', item.color) : "text-slate-500 hover:text-white"
                )}
              >
                <Icon size={18} />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 font-bold uppercase tracking-widest">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* DASHBOARD + PROFILE + LOGOUT */}
      {user && (
        <div className="flex items-center gap-2 border-l border-white/10 pl-4 ml-2">
          <Link
            to="/dashboard"
            className={cn(
              "p-2 rounded-full transition-all duration-300 group relative",
              location.pathname === '/dashboard' ? "bg-neon-cyan/20 text-neon-cyan" : "text-slate-400 hover:text-neon-cyan"
            )}
          >
            <LayoutDashboard size={20} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 font-black uppercase">
              DASHBOARD
            </span>
          </Link>

          <Link
            to="/profile"
            className={cn(
              "p-2 rounded-full transition-all duration-300 group relative",
              location.pathname === '/profile' ? "bg-neon-cyan/20 text-neon-cyan" : "text-slate-400 hover:text-neon-cyan"
            )}
          >
            <User size={20} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 font-black uppercase">
              PROFILE
            </span>
          </Link>

          <button
            onClick={logout}
            className="p-2 rounded-full text-slate-400 hover:text-red-500 transition-all duration-300 group relative"
          >
            <LogOut size={20} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 font-black uppercase">
              LOGOUT
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};
