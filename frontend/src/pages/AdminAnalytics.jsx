import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useAnalytics } from '../hooks/useAnalytics';
import { Eye, Users, TrendingUp, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'admin@yourdomain.com';

const AdminAnalytics = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { analyticsData, visitors, loading, error, getAllVisitors, formatRelativeTime } = useAnalytics();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (!user?.email || user.email !== ADMIN_EMAIL) {
      navigate('/');
      return;
    }
    setIsAdmin(true);
    const unsubscribe = getAllVisitors();
    return () => unsubscribe?.();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6 container mx-auto text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-aiCyan/30 border-t-aiCyan rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-12 container mx-auto text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-aiCyan to-aiBlue uppercase tracking-[0.2em]">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-2">Real-time visitor tracking & analytics</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg border border-red-500/20 transition-all font-semibold text-sm tracking-widest"
          >
            <LogOut size={18} /> LOGOUT
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-sm">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Views Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="cyber-glass border border-aiCyan/30 bg-gradient-to-br from-aiCyan/10 to-transparent rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Total Views</p>
                <h2 className="text-4xl font-black text-white">
                  {analyticsData?.totalViews?.toLocaleString() || 0}
                </h2>
              </div>
              <Eye className="text-aiCyan" size={32} />
            </div>
            <p className="text-xs text-slate-500">Page views since launch</p>
          </motion.div>

          {/* Total Visitors Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cyber-glass border border-matrixGreen/30 bg-gradient-to-br from-matrixGreen/10 to-transparent rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Auth Visitors</p>
                <h2 className="text-4xl font-black text-white">
                  {visitors?.length || 0}
                </h2>
              </div>
              <Users className="text-matrixGreen" size={32} />
            </div>
            <p className="text-xs text-slate-500">Logged-in users</p>
          </motion.div>

          {/* Avg Engagement Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="cyber-glass border border-aiBlue/30 bg-gradient-to-br from-aiBlue/10 to-transparent rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Engagement</p>
                <h2 className="text-4xl font-black text-white">
                  {visitors?.length > 0 
                    ? Math.round((analyticsData?.totalViews || 0) / visitors.length)
                    : 0}
                </h2>
              </div>
              <TrendingUp className="text-aiBlue" size={32} />
            </div>
            <p className="text-xs text-slate-500">Views per visitor</p>
          </motion.div>
        </div>

        {/* Visitors Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="cyber-glass border border-white/10 bg-[#020617]/80 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="p-6 border-b border-white/5">
            <h3 className="text-xl font-bold text-white uppercase tracking-[0.1em]">
              Recent Visitors
            </h3>
            <p className="text-xs text-slate-400 mt-1">Authenticated users who visited your portfolio</p>
          </div>

          {visitors.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No visitors yet. Share your portfolio link!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-300">Name</th>
                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-300">Email</th>
                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-300">Visit Time</th>
                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((visitor, idx) => (
                    <motion.tr
                      key={visitor.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {visitor.photoURL ? (
                            <img
                              src={visitor.photoURL}
                              alt={visitor.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aiCyan to-aiBlue flex items-center justify-center text-xs font-bold">
                              {visitor.name?.charAt(0) || '?'}
                            </div>
                          )}
                          <span className="font-semibold text-white">{visitor.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 break-all">{visitor.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {visitor.visitTime?.toDate?.().toLocaleString?.() || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-matrixGreen/20 text-matrixGreen border border-matrixGreen/30">
                          Online
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Analytics Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl text-slate-300 text-sm"
        >
          <p className="font-semibold mb-2">📊 Privacy Notice</p>
          <p>Only authenticated users' data is tracked & stored. Visitor names and emails are secured and never displayed publicly.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
