import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AILoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING A.I. MATRIX...');
  const [isStarted, setIsStarted] = useState(false);
  const [logs, setLogs] = useState([]);

  const techLogs = [
    'CONNECTING TO CORE_NETWORK...',
    'ENCRYPTING SECURE CHANNEL...',
    'SCANNING IDENTITY PROTOCOLS...',
    'ACTIVATING SYNTHETIC LAYER...',
    'LOADING A.I. ENGINE...',
    'VERIFYING SYSTEM INTEGRITY...',
    'STREAMING DATA FEED...',
    'ESTABLISHING NEURAL LINK...',
    'SYNCHRONIZING PROCESSOR CLUSTER...',
    'ACCESSING CORE DATABASE...'
  ];

  useEffect(() => {
    if (!isStarted) return;

    const logInterval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, techLogs[Math.floor(Math.random() * techLogs.length)]];
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
      'INITIALIZING A.I. PROTOCOLS...',
      'LOCALIZING CORE_SENSORS...',
      'ENCRYPTING DATA STREAMS...',
      'OPTIMIZING SYNTHESIS...',
      'A.I. NETWORK ONLINE.'
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
      className="fixed inset-0 z-[9999] bg-deepSpace flex flex-col items-center justify-center overflow-hidden font-sci"
    >
      {/* Background Tech Layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none digital-grid" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aiCyan/5 to-transparent h-20 w-full animate-scanline opacity-50" />
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
            {/* Stark Industries Authorization Gate */}
            <div className="relative group transform-gpu transition-transform duration-500 hover:scale-105">
              <div className="absolute -inset-1 bg-gradient-to-r from-aiCyan to-aiBlue rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-80 h-48 cyber-glass rounded-xl flex flex-col items-center justify-center border border-white/10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aiCyan to-transparent animate-pulse" />
                
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aiCyan to-aiBlue flex items-center justify-center">
                    <span className="text-white font-black text-xl">●</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-white font-bold tracking-[0.2em] text-lg">INITIALIZING</span>
                    <span className="text-[10px] text-aiCyan/70 tracking-widest mt-1 font-sci">SYSTEM v1.0</span>
                  </div>
                </div>
              </div>
              
              <motion.div 
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-0.5 bg-aiCyan shadow-[0_0_10px_#00d4ff] z-20"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-white/40 text-[10px] tracking-[0.3em] animate-pulse font-sci">A.I. AUTHORIZATION PENDING...</div>
              <button 
                onClick={handleStart}
                className="group relative px-10 py-4 bg-transparent border border-aiCyan text-aiCyan font-bold tracking-[0.18em] overflow-hidden transition-all hover:bg-aiCyan hover:text-black font-sci"
              >
                <div className="absolute inset-0 bg-aiCyan opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative z-10">INITIALIZE A.I. CORE</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-aiCyan" />
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
            {/* System Log Background */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] select-none overflow-hidden whitespace-nowrap text-[8px] leading-tight">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="animate-pulse">{techLogs.map(l => l.replace(/SQUID/g, 'CORE')).join('  ')}</div>
              ))}
            </div>

            <div className="flex flex-col items-center w-full">
              <div className="relative mb-16">
                {/* Triple Ring HUD */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-56 h-56 rounded-full border-2 border-dashed border-aiCyan opacity-20 relative flex items-center justify-center"
                />
                
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border-r-2 border-b-2 border-aiBlue opacity-40"
                />

                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full border-t-2 border-l-2 border-aiCyan shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                />

                {/* Radar Pulse */}
                <motion.div 
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-aiCyan opacity-10"
                />

                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aiCyan to-aiBlue flex items-center justify-center animate-pulse">
                    <span className="text-white font-black">●</span>
                  </div>
                  <div className="text-4xl font-bold text-white mt-4">
                    {Math.floor(progress)}%
                  </div>
                </div>
              </div>

              <div className="space-y-8 w-full max-w-md">
                <div className="relative">
                  <div className="h-1.5 w-full bg-slate-900 overflow-hidden relative rounded-full">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-aiCyan via-aiBlue to-aiCyan"
                      style={{ width: `${progress}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan" style={{ animationDuration: '0.8s' }} />
                  </div>
                  <motion.div 
                    className="absolute top-0 h-1.5 bg-aiCyan blur-sm"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between items-start h-32">
                  <div className="flex flex-col gap-2 w-2/3">
                    <div className="text-xs text-aiCyan font-bold tracking-[0.18em] uppercase font-sci">{status}</div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-aiGold animate-pulse shadow-[0_0_5px_#ffd700]" />
                      <div className="text-[10px] text-white/40 tracking-widest uppercase font-sci">ENCRYPTING_CORE_NET...</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 w-1/3 text-right overflow-hidden">
                    {logs.map((log, i) => (
                      <motion.div 
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        key={i} 
                        className="text-[7px] text-white/30 truncate w-full font-mono uppercase font-sci"
                      >
                        {`[AI_LOG_${i+502}] ${log.replace(/NODE/g, 'CORE')}`}
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
