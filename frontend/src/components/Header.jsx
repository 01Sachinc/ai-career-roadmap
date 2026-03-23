import React, { useState } from 'react';
import { Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav className="glass sticky top-4 z-50 max-w-6xl mx-auto rounded-2xl px-6 py-4 flex items-center justify-between mb-12">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
          A
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">AI Career<span className="text-blue-600">Sync</span></h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Empowering Students</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
        <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
        <a href="#" className="hover:text-blue-600 transition-colors">How it works</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Exams Guide</a>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-xs font-bold text-slate-800 line-clamp-1">{user.name}</p>
              <button onClick={logout} className="text-[10px] text-red-500 hover:underline flex items-center gap-1 justify-end">
                <LogOut size={10} /> Logout
              </button>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
              <User size={20} />
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
          >
            Login <Sparkles size={14} className="text-yellow-400" />
          </button>
        )}
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </nav>
  );
};

export default Header;
