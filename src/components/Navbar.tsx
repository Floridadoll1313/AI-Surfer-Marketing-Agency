import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, Zap, Database, Bot, Lock, Heart, Video, MessageSquare, LogOut, Shield } from 'lucide-react';
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
  { name: 'Chat', path: '/chat', icon: MessageSquare },
  { name: 'Memorial', path: '/memorial', icon: Heart },
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
