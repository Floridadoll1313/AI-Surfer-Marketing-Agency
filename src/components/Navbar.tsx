import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, Zap, Database, Bot, Lock, Heart, Video, MessageSquare, LogOut, Shield, Sparkles, Wand2, User, LayoutDashboard, Users, Map as MapIcon, ShoppingBag, Newspaper } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from './AuthProvider';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Rodanthe', path: '/rodanthe', icon: Globe },
  { name: 'Avon', path: '/avon', icon: Zap },
  { name: 'Buxton', path: '/buxton', icon: Database },
  { name: 'Frisco', path: '/frisco', icon: Bot },
  { name: 'Hatteras', path: '/hatteras', icon: Lock },
  { name: 'Academy', path: '/academy', icon: Video },
  { name: 'Studio', path: '/studio', icon: Wand2 },
  { name: 'Surfer', path: '/ai-surfer', icon: Sparkles },
  { name: 'Toolkit', path: '/toolkit', icon: Wand2 },
  { name: 'Chat', path: '/chat', icon: MessageSquare },
  { name: 'Memorial', path: '/memorial', icon: Heart },
  { name: 'S-Vault', path: '/supabase-vault', icon: Database },
];

export const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass-card rounded-full flex items-center gap-4 border border-white/10 shadow-2xl">
      {navItems.map((item) => {
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
      {isAdmin && (
        <Link
          to="/admin"
          className={cn(
            "p-2 rounded-full transition-all duration-300 group relative",
            location.pathname === '/admin' ? "bg-neon-green/20 text-neon-green" : "text-slate-400 hover:text-neon-green"
          )}
        >
          <Shield size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Admin
          </span>
        </Link>
      )}
      {user && (
        <Link
          to="/dashboard"
          className={cn(
            "p-2 rounded-full transition-all duration-300 group relative",
            location.pathname === '/dashboard' ? "bg-neon-cyan/20 text-neon-cyan" : "text-slate-400 hover:text-neon-cyan"
          )}
        >
          <LayoutDashboard size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Dashboard
          </span>
        </Link>
      )}
      {user && (
        <Link
          to="/directory"
          className={cn(
            "p-2 rounded-full transition-all duration-300 group relative",
            location.pathname === '/directory' ? "bg-neon-yellow/20 text-neon-yellow" : "text-slate-400 hover:text-neon-yellow"
          )}
        >
          <Users size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Directory
          </span>
        </Link>
      )}
      {user && (
        <Link
          to="/map"
          className={cn(
            "p-2 rounded-full transition-all duration-300 group relative",
            location.pathname === '/map' ? "bg-neon-cyan/20 text-neon-cyan" : "text-slate-400 hover:text-neon-cyan"
          )}
        >
          <MapIcon size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Archipelago Map
          </span>
        </Link>
      )}
      {user && (
        <Link
          to="/marketplace"
          className={cn(
            "p-2 rounded-full transition-all duration-300 group relative",
            location.pathname === '/marketplace' ? "bg-neon-pink/20 text-neon-pink" : "text-slate-400 hover:text-neon-pink"
          )}
        >
          <ShoppingBag size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Marketplace
          </span>
        </Link>
      )}
      {user && (
        <Link
          to="/news"
          className={cn(
            "p-2 rounded-full transition-all duration-300 group relative",
            location.pathname === '/news' ? "bg-neon-green/20 text-neon-green" : "text-slate-400 hover:text-neon-green"
          )}
        >
          <Newspaper size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Hatteras Daily
          </span>
        </Link>
      )}
      {user && (
        <Link
          to="/profile"
          className={cn(
            "p-2 rounded-full transition-all duration-300 group relative",
            location.pathname === '/profile' ? "bg-neon-cyan/20 text-neon-cyan" : "text-slate-400 hover:text-neon-cyan"
          )}
        >
          <User size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Profile
          </span>
        </Link>
      )}
      {user && (
        <button
          onClick={logout}
          className="p-2 rounded-full text-slate-400 hover:text-red-500 transition-all duration-300 group relative"
        >
          <LogOut size={20} />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Logout
          </span>
        </button>
      )}
    </nav>
  );
};
