import React, { useEffect, useMemo, useState } from 'react';

const AIImage = ({ src, alt, className = "", fallbackSrc }) => {
  const computedFallback = useMemo(() => {
    if (fallbackSrc) return fallbackSrc;
    try {
      return new URL('../../profile.jpg', import.meta.url).href;
    } catch {
      return undefined;
    }
  }, [fallbackSrc]);

  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <div className={`relative group ${className}`}>
      <div className="relative overflow-hidden rounded-2xl aspect-square border border-slate-700/40 shadow-2xl">
        {/* Main Image */}
        <img 
          src={currentSrc} 
          alt={alt} 
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          loading="lazy"
          onError={() => {
            if (computedFallback && currentSrc !== computedFallback) {
              setCurrentSrc(computedFallback);
            }
          }}
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>
    </div>
  );
};

export default AIImage;
