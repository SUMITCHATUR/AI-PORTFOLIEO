import React from 'react';
import { motion } from 'framer-motion';

const StarkLogo = ({ size = 'w-16 h-16', animated = true }) => {
  return (
    <motion.div 
      className={`${size} relative flex items-center justify-center`}
      animate={animated ? { 
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      } : {}}
      transition={animated ? { 
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      : {}}
    >
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-jarvisCyan/30 shadow-[0_0_20px_rgba(0,212,255,0.3)]" />
      
      {/* Inner Ring */}
      <div className="absolute inset-2 rounded-full border border-starkGold/50 shadow-[0_0_15px_rgba(255,215,0,0.2)]" />
      
      {/* Stark Industries Symbol - Simplified Arc Reactor */}
      <div className="relative w-1/2 h-1/2">
        {/* Core */}
        <div className="absolute inset-0 bg-starkGold rounded-full shadow-[0_0_30px_rgba(255,215,0,0.8)] animate-pulse" />
        
        {/* Inner Circle */}
        <div className="absolute inset-1/4 w-1/2 h-1/2 bg-deepSpace rounded-full" />
        
        {/* Center Light */}
        <div className="absolute inset-1/3 w-1/3 h-1/3 bg-jarvisCyan rounded-full shadow-[0_0_20px_rgba(0,212,255,1)]" />
      </div>
      
      {/* Energy Particles */}
      {animated && (
        <>
          {[0, 120, 240].map((rotation, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-jarvisCyan rounded-full"
              style={{ 
                top: '10%', 
                left: '50%',
                transform: `translateX(-50%) rotate(${rotation}deg) translateY(-20px)`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default StarkLogo;
