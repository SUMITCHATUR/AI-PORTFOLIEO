import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SideHUD = ({ lowMotion, onToggleMotion }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[80] font-mono hidden lg:block">
      {/* Side Symbols - Hexagons */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-8 opacity-30">
        {[0, 1, 2].map(i => (
          <motion.div 
            key={i}
            animate={lowMotion ? { opacity: 0.3 } : { 
              opacity: [0.3, 0.6, 0.3],
              borderColor: ['#00d4ff', '#0080ff', '#00d4ff']
            }}
            transition={lowMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, delay: i * 0.5 }}
            className="w-4 h-5 border border-jarvisCyan"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          />
        ))}
      </div>

      {/* Connection HUD & Toggle */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col items-end gap-1">
        <div className="flex flex-col items-end opacity-20 mb-4 text-right">
          <div className="text-[8px] text-jarvisCyan tracking-[0.3em] font-black uppercase">J.A.R.V.I.S. Monitor</div>
          <div className="h-0.5 w-24 bg-gradient-to-l from-jarvisCyan to-transparent mb-2" />
          <div className="text-[7px] text-white tracking-widest uppercase">Network: STARK_NET</div>
          <div className="text-[7px] text-white tracking-widest uppercase">Core: JARVIS_MAIN</div>
          <div className="text-[7px] text-white tracking-widest uppercase">Uplink: ACTIVE</div>
        </div>

        {/* Interactive Toggle Trigger */}
        <div className="pointer-events-auto group cursor-pointer flex flex-col items-end gap-2" onClick={onToggleMotion}>
          <div className="text-[8px] text-slate-500 group-hover:text-jarvisCyan transition-colors tracking-widest uppercase font-black">
            Perf_Mode: <span className={lowMotion ? "text-starkGold" : "text-jarvisCyan"}>{lowMotion ? "LITE" : "FULL"}</span>
          </div>
          <div className="w-10 h-1 bg-slate-800 relative overflow-hidden rounded-full">
             <motion.div 
              animate={{ left: lowMotion ? '0%' : '50%' }}
              className="absolute top-0 w-1/2 h-full bg-jarvisCyan shadow-[0_0_10px_#00d4ff]"
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideHUD;
