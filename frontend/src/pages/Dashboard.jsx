import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Eye } from 'lucide-react';
import ManagePosts from '../components/ManagePosts';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyberCyan to-cyberBlue uppercase tracking-[0.2em] cyber-text-glow">
            SYSTEM_COMMAND: OVERRIDE
          </h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-sm border border-red-500/20 transition-all font-mono font-bold text-[10px] tracking-widest uppercase"
          >
            <LogOut size={18} /> TERM_SESSION
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="cyber-glass shadow-2xl bg-[#020617]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden flex flex-col justify-between p-6 rounded-2xl">
            <div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyberCyan to-transparent"></div>
              <h2 className="text-2xl font-black mb-3 text-white uppercase tracking-tighter">PROJECT MODULES</h2>
              <p className="text-slate-400 mb-8 font-medium text-[10px] uppercase tracking-widest leading-relaxed">System component registry. Create and modify operative protocols.</p>
            </div>
            <Link to="/dashboard/projects" className="block text-center bg-cyberCyan text-black px-6 py-3 rounded-sm font-black text-xs tracking-[0.2em] uppercase w-full shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(0,243,255,0.8)] transition-all transform hover:-translate-y-1">
              OPEN MODULES
            </Link>
          </div>
          
          <div className="cyber-glass shadow-2xl bg-[#020617]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden flex flex-col justify-between p-6 rounded-2xl">
            <div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyberBlue to-transparent"></div>
              <h2 className="text-2xl font-black mb-3 text-white uppercase tracking-tighter">STORAGE REQUISITION</h2>
              <p className="text-slate-400 mb-8 font-medium text-[10px] uppercase tracking-widest leading-relaxed">Centralized data uplink. Manage encrypted documents and assets.</p>
            </div>
            <Link to="/dashboard/files" className="block text-center bg-white text-black px-6 py-3 rounded-sm font-black text-xs tracking-[0.2em] uppercase w-full shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1">
              MANAGE STORAGE
            </Link>
          </div>

          <div className="cyber-glass shadow-2xl bg-[#020617]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden flex flex-col justify-between p-6 rounded-2xl">
            <div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-matrixGreen to-transparent"></div>
              <h2 className="text-2xl font-black mb-3 text-white uppercase tracking-tighter">ABOUT ME</h2>
              <p className="text-slate-400 mb-8 font-medium text-[10px] uppercase tracking-widest leading-relaxed">Personal information. Update your profile and bio details.</p>
            </div>
            <Link to="/dashboard/profile" className="block text-center bg-matrixGreen text-white px-6 py-3 rounded-sm font-black text-xs tracking-[0.2em] uppercase w-full shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:shadow-[0_0_25px_rgba(0,255,65,0.8)] transition-all transform hover:-translate-y-1">
              EDIT PROFILE
            </Link>
          </div>

          <div className="cyber-glass shadow-2xl bg-[#020617]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden flex flex-col justify-between p-6 rounded-2xl">
            <div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
              <h2 className="text-2xl font-black mb-3 text-white uppercase tracking-tighter">ANALYTICS</h2>
              <p className="text-slate-400 mb-8 font-medium text-[10px] uppercase tracking-widest leading-relaxed">Monitor system engagement. Track visitor metrics and user interactions.</p>
              <div className="flex items-center gap-3 mb-4">
                <Eye size={20} className="text-purple-400" />
                <span className="text-3xl font-black text-white">0</span>
                <span className="text-sm text-slate-400 uppercase tracking-widest">VIEWS</span>
              </div>
            </div>
            <Link to="/dashboard/views" className="block text-center bg-purple-500 text-white px-6 py-3 rounded-sm font-black text-xs tracking-[0.2em] uppercase w-full shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all transform hover:-translate-y-1">
              VIEW ANALYTICS
            </Link>
          </div>
        </div>

        {/* Post Management Section */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <ManagePosts />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
