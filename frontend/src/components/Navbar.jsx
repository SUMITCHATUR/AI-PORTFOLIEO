import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsOpen(false);
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Certificates', path: '/#certificates' },
    { name: 'Achievements', path: '/#achievements' },
    { name: 'Notes', path: '/#notes' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 top-0 left-0"
    >
      <div className="cyber-glass m-4 px-6 py-4 flex justify-between items-center bg-[#020617]/80 border-cyberCyan/10">
        <Link to="/" className="group flex flex-col items-center gap-1">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex items-center justify-center w-12 h-12 rounded-full border border-aiCyan/25 bg-[#021026]/95 shadow-[0_0_24px_rgba(0,212,255,0.14)] overflow-hidden"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aiCyan/10 via-transparent to-aiBlue/10 opacity-70 blur-2xl animate-float-slow" />
            <div className="absolute inset-0 rounded-full border border-aiCyan/20 opacity-80" />
            <svg viewBox="0 0 120 120" className="relative z-10 w-10 h-10">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#8be7ff" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
              <text x="50%" y="58%" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="36" fill="none" stroke="url(#logoGradient)" strokeWidth="3" letterSpacing="-1">TL</text>
              <path d="M30 32h16" stroke="url(#logoGradient)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M48 32v14" stroke="url(#logoGradient)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M58 34h12" stroke="url(#logoGradient)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M70 34v12" stroke="url(#logoGradient)" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="24" cy="24" r="1.5" fill="#ffffff" opacity="0.9" />
              <circle cx="74" cy="36" r="1.5" fill="#8be7ff" opacity="0.9" />
            </svg>
          </motion.div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-slate-300/70">TEGOLYTICS</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            link.path.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.path.replace('/', '')} 
                className="text-slate-300 hover:text-aiCyan transition-colors font-medium text-sm tracking-[0.12em] uppercase"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-slate-300 hover:text-aiCyan transition-colors font-medium text-sm tracking-[0.12em] uppercase"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user && (
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-cyberCyan transition-colors"
              title="Terminate Session"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-aiCyan" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-4 right-4 cyber-glass bg-[#020617]/95 flex flex-col items-center space-y-6 py-8 md:hidden shadow-2xl border-cyberCyan/20"
        >
          {links.map((link) => (
            link.path.startsWith('/#') ? (
              <a 
                key={link.name} 
                href={link.path.replace('/', '')}
                onClick={() => setIsOpen(false)}
                className="text-slate-200 text-lg hover:text-cyberCyan transition-colors font-black tracking-widest"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-slate-200 text-lg hover:text-cyberCyan transition-colors font-black tracking-widest"
              >
                {link.name}
              </Link>
            )
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="w-full py-3 text-aiCyan font-semibold flex items-center justify-center gap-2 border border-aiCyan/20 rounded-xl bg-aiCyan/5 mt-4"
            >
              <LogOut size={18} /> TERM_SESSION
            </button>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
