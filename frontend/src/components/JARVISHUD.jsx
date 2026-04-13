import React, { useEffect, useRef } from 'react';

const JARVISHUD = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const drawHUDRings = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw rotating HUD rings
      for (let i = 0; i < 5; i++) {
        const radius = 100 + i * 80;
        const segments = 12 + i * 6;
        
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 - i * 0.05})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 15]);
        
        ctx.beginPath();
        for (let j = 0; j <= segments; j++) {
          const angle = (j / segments) * Math.PI * 2 + (time * 0.001 * (i % 2 === 0 ? 1 : -1));
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.setLineDash([]);
    };

    const drawHexagonalGrid = () => {
      const hexSize = 30;
      const hexHeight = hexSize * 2;
      const hexWidth = Math.sqrt(3) * hexSize;
      const vertDist = hexHeight * 3/4;
      
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let row = -5; row < canvas.height / vertDist + 5; row++) {
        for (let col = -5; col < canvas.width / hexWidth + 5; col++) {
          const x = col * hexWidth + (row % 2) * hexWidth / 2;
          const y = row * vertDist;
          
          // Pulsing effect
          const pulse = Math.sin(time * 0.002 + row * 0.1 + col * 0.1) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.05 + pulse * 0.1})`;
          
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + hexSize * Math.cos(angle);
            const hy = y + hexSize * Math.sin(angle);
            
            if (i === 0) {
              ctx.moveTo(hx, hy);
            } else {
              ctx.lineTo(hx, hy);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    const drawScanners = () => {
      // Vertical scanner
      const scanY = (time * 0.1) % canvas.height;
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 50, canvas.width, 100);
      
      // Horizontal scanner
      const scanX = (time * 0.15) % canvas.width;
      const hGradient = ctx.createLinearGradient(scanX - 50, 0, scanX + 50, 0);
      hGradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
      hGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.2)');
      hGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      
      ctx.fillStyle = hGradient;
      ctx.fillRect(scanX - 50, 0, 100, canvas.height);
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 8, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawHexagonalGrid();
      drawHUDRings();
      drawScanners();
      
      time += 16;
    };

    const animationId = setInterval(draw, 50);

    return () => {
      clearInterval(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-30"
    />
  );
};

export default JARVISHUD;
