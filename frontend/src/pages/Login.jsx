import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      return setError('Please fill in all fields');
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-glass max-w-md w-full bg-[#020617]/80 backdrop-blur-xl border-white/5 p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyberCyan to-cyberBlue"></div>
        <h2 className="text-3xl font-black text-white mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyberCyan to-cyberBlue uppercase tracking-[0.16em] cyber-text-glow break-words">
          TEGOLYTICS ACCESS
        </h2>
        <p className="text-slate-400 text-center mb-8 text-[10px] font-bold tracking-[0.22em] uppercase">
          SECURE_SYSTEM_LOGIN
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-sm text-xs mb-6 text-center font-bold tracking-widest uppercase">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-2">AUTH_ID (UID)</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#020617]/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-cyberCyan focus:ring-1 focus:ring-cyberCyan transition-all font-mono text-sm tracking-widest"
              placeholder="root@cybercore.sys"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-2">ACCESS_KEY (PK)</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020617]/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-cyberCyan focus:ring-1 focus:ring-cyberCyan transition-all font-mono text-sm tracking-widest"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyberCyan text-black font-black py-4 px-4 rounded-sm shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all transform hover:-translate-y-1 disabled:opacity-50 uppercase tracking-[0.21em] text-[11px]"
            >
              {loading ? 'INITIALIZING_STREAM...' : 'ESTABLISH_ROOT_LINK'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
