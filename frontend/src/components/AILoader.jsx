import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AILoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING SYSTEM...');
  const [isStarted, setIsStarted] = useState(false);
  const [logs, setLogs] = useState([]);

  const luxuryLogs = [
    'ESTABLISHING SECURE CONNECTION...',
    'LOADING PREMIUM ASSETS...',
    'INITIALIZING CINEMATIC ENGINE...',
    'CALIBRATING LUXURY INTERFACE...',
    'ACTIVATING DYNAMIC LIGHTING...',
    'SYNCHRONIZING VISUAL EFFECTS...',
    'OPTIMIZING USER EXPERIENCE...',
    'FINALIZING PREMIUM ENVIRONMENT...',
    'PREPARING IMMERSIVE INTERFACE...',
    'SYSTEM READY FOR LAUNCH...'
  ];

  useEffect(() => {
    if (!isStarted) return;

    const logInterval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, luxuryLogs[Math.floor(Math.random() * luxuryLogs.length)]];
        return next.slice(-8);
      });
    }, 400);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          clearInterval(logInterval);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return prev + 0.8;
      });
    }, 30);

    const statusList = [
      'INITIALIZING PREMIUM INTERFACE...',
      'LOADING CINEMATIC ELEMENTS...',
      'ACTIVATING LUXURY FEATURES...',
      'OPTIMIZING VISUAL EXPERIENCE...',
      'SYSTEM FULLY OPERATIONAL.'
    ];
    
    let statusIdx = 0;
    const statusInterval = setInterval(() => {
      statusIdx = (statusIdx + 1) % statusList.length;
      setStatus(statusList[statusIdx]);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(logInterval);
      clearInterval(statusInterval);
    };
  }, [onComplete, isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    // Song deleted as per request
  };

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center overflow-hidden font-body"
    >
      {/* Luxury Background Layer */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 animate-gradient" />
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-20 w-full animate-pulse opacity-30" />
      </div>

      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div 
            key="entry"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 flex flex-col items-center gap-12"
          >
            {/* Luxury Authorization Gate */}
            <div className="relative group transform-gpu transition-transform duration-500 hover:scale-105">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accentLight rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative w-96 h-56 glass-card rounded-2xl flex flex-col items-center justify-center border border-accent/20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
                
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accentDark flex items-center justify-center animate-glow">
                    <span className="text-white font-black text-2xl">◈</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-textPrimary font-display text-2xl tracking-wide">SUMIT JAIN</span>
                    <span className="text-xs text-accent/70 tracking-widest mt-2 font-body uppercase">Portfolio v2.0</span>
                  </div>
                </div>
              </div>
              
              <motion.div 
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-0.5 bg-accent shadow-[0_0_15px_rgba(139,92,246,0.6)] z-20"
              />
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="text-textMuted text-xs tracking-[0.3em] animate-pulse font-body">Premium Experience Loading...</div>
              <button 
                onClick={handleStart}
                className="group relative px-12 py-5 bg-transparent border border-accent text-accent font-display text-lg tracking-wide overflow-hidden transition-all hover:bg-accent hover:text-primary font-body"
              >
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative z-10">ENTER PORTFOLIO</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-accentLight" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl px-8 flex flex-col items-center gap-12 font-sci"
          >
            {/* Luxury Loading Interface */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] select-none overflow-hidden whitespace-nowrap text-[8px] leading-tight">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="animate-pulse">{luxuryLogs.join('  ')}</div>
              ))}
            </div>

            <div className="flex flex-col items-center w-full">
              <div className="relative mb-20">
                {/* Luxury Triple Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 rounded-full border-2 border-dashed border-accent/30 opacity-40 relative flex items-center justify-center"
                />
                
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 rounded-full border-r-2 border-b-2 border-accentLight/50"
                />

                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-12 rounded-full border-t-2 border-l-2 border-accent shadow-glow-accent"
                />

                {/* Cinematic Pulse */}
                <motion.div 
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-accent/20"
                />

                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accentDark flex items-center justify-center animate-cinematic-pulse">
                    <span className="text-primary font-black text-2xl">◈</span>
                  </div>
                  <div className="text-5xl font-display text-textPrimary mt-6">
                    {Math.floor(progress)}%
                  </div>
                </div>
              </div>

              <div className="space-y-10 w-full max-w-2xl">
                <div className="relative">
                  <div className="h-2 w-full bg-secondary overflow-hidden relative rounded-full">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-accent via-accentLight to-accent animate-gradient"
                      style={{ width: `${progress}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-shimmer" style={{ animationDuration: '1.2s' }} />
                  </div>
                  <motion.div 
                    className="absolute top-0 h-2 bg-accent/60 blur-md"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between items-start h-40">
                  <div className="flex flex-col gap-4 w-2/3">
                    <div className="text-sm text-accent font-display tracking-wide uppercase font-body">{status}</div>
                    <div className="flex gap-3 items-center">
                      <div className="w-2 h-2 bg-accent animate-cinematic-pulse shadow-glow-sm" />
                      <div className="text-xs text-textSecondary tracking-widest uppercase font-body">Loading Premium Experience...</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 w-1/3 text-right overflow-hidden">
                    {logs.map((log, i) => (
                      <motion.div 
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        key={i} 
                        className="text-[8px] text-textMuted truncate w-full font-mono uppercase font-body"
                      >
                        {`[SYSTEM_${i+502}] ${log}`}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AILoader;
