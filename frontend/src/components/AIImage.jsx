import React from 'react';

const AIImage = ({ src, alt, className = "" }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="relative overflow-hidden rounded-2xl aspect-square border border-slate-700/40 shadow-2xl">
        {/* Main Image */}
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>
    </div>
  );
};

export default AIImage;
