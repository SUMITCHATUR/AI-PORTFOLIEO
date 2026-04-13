import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, TrendingUp, Users, Calendar, BarChart3, ArrowLeft } from 'lucide-react';

const ManageViews = () => {
  const [viewData, setViewData] = useState({
    totalViews: 0,
    todayViews: 0,
    weeklyViews: 0,
    monthlyViews: 0,
    uniqueVisitors: 0
  });

  const [dailyViews, setDailyViews] = useState([
    { date: 'Mon', views: 0 },
    { date: 'Tue', views: 0 },
    { date: 'Wed', views: 0 },
    { date: 'Thu', views: 0 },
    { date: 'Fri', views: 0 },
    { date: 'Sat', views: 0 },
    { date: 'Sun', views: 0 }
  ]);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="cyber-glass shadow-2xl bg-[#020617]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden p-6 rounded-2xl">
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`}></div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">{title}</p>
          <p className="text-3xl font-black text-white mb-1">{value.toLocaleString()}</p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <Icon size={24} className="text-slate-400" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-10">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-sm border border-slate-600/20 transition-all"
          >
            <ArrowLeft size={18} />
            <span className="text-xs uppercase tracking-widest">BACK</span>
          </Link>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 uppercase tracking-[0.2em] cyber-text-glow">
            ANALYTICS DASHBOARD
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="TOTAL VIEWS" 
            value={viewData.totalViews} 
            icon={Eye} 
            color="from-purple-500 to-transparent"
            subtitle="All time"
          />
          <StatCard 
            title="TODAY" 
            value={viewData.todayViews} 
            icon={Calendar} 
            color="from-cyberCyan to-transparent"
            subtitle="Last 24 hours"
          />
          <StatCard 
            title="WEEKLY" 
            value={viewData.weeklyViews} 
            icon={TrendingUp} 
            color="from-matrixGreen to-transparent"
            subtitle="Last 7 days"
          />
          <StatCard 
            title="UNIQUE VISITORS" 
            value={viewData.uniqueVisitors} 
            icon={Users} 
            color="from-cyberBlue to-transparent"
            subtitle="Distinct users"
          />
        </div>

        {/* Chart Section */}
        <div className="cyber-glass shadow-2xl bg-[#020617]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden p-8 rounded-2xl mb-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 size={24} className="text-purple-400" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">WEEKLY OVERVIEW</h2>
          </div>
          
          <div className="flex items-end justify-between h-64 px-4">
            {dailyViews.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs text-slate-400 mb-2">{day.views}</span>
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm transition-all hover:from-purple-400 hover:to-purple-300"
                    style={{ height: `${(day.views / Math.max(...dailyViews.map(d => d.views))) * 200}px` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-500 mt-2">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="cyber-glass shadow-2xl bg-[#020617]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden p-6 rounded-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyberCyan to-transparent"></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">TOP PAGES</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-sm">
                <span className="text-sm text-slate-300">Home</span>
                <span className="text-sm font-black text-cyberCyan">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-sm">
                <span className="text-sm text-slate-300">Projects</span>
                <span className="text-sm font-black text-cyberCyan">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-sm">
                <span className="text-sm text-slate-300">About</span>
                <span className="text-sm font-black text-cyberCyan">0</span>
              </div>
            </div>
          </div>

          <div className="cyber-glass shadow-2xl bg-[#020617]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden p-6 rounded-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-matrixGreen to-transparent"></div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">DEVICES</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-sm">
                <span className="text-sm text-slate-300">Desktop</span>
                <span className="text-sm font-black text-matrixGreen">0%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-sm">
                <span className="text-sm text-slate-300">Mobile</span>
                <span className="text-sm font-black text-matrixGreen">0%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-sm">
                <span className="text-sm text-slate-300">Tablet</span>
                <span className="text-sm font-black text-matrixGreen">0%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageViews;
