import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if mouse is over a button, link, or clickable element
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Morphing Shape Cursor */}
      <motion.div
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          rotate: isHovering ? 90 : 0,
          borderColor: isHovering ? '#00f3ff' : '#0070ff',
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 150 }}
        className="absolute w-10 h-10 border relative flex items-center justify-center"
        style={{
          borderRadius: "2px",
          boxShadow: isHovering ? '0 0 15px rgba(0, 243, 255, 0.4)' : 'none'
        }}
      >
         {/* Targeting Reticle */}
         <div className={`w-4 h-4 border ${isHovering ? 'border-cyberCyan animate-pulse' : 'border-cyberBlue opacity-50'}`} 
              style={{ borderRadius: '1px' }} />
      </motion.div>

      {/* Target Dot */}
      <motion.div 
         animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }}
         className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
      />
    </div>
  );
};

export default CustomCursor;
