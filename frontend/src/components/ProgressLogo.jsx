import React, { useState, useEffect } from 'react';
import { getProgressPercentage, getLeafProgress } from '../utils/localStorage';

const ProgressLogo = ({ size = 200, className = "" }) => {
  const [progress, setProgress] = useState(0);
  const [leafData, setLeafData] = useState({ filledLeaves: 0, partialLeafProgress: 0, totalLeaves: 7 });

  useEffect(() => {
    setProgress(getProgressPercentage());
    setLeafData(getLeafProgress());
  }, []);

  const { filledLeaves, partialLeafProgress, totalLeaves } = leafData;
  
  // Leaf positions in semi-circle formation
  const leafPositions = [
    { x: 40, y: 85, rotation: -45 },   // Bottom left
    { x: 70, y: 55, rotation: -25 },   // Mid left
    { x: 100, y: 35, rotation: -10 }, // Top left
    { x: 130, y: 25, rotation: 0 },   // Center top
    { x: 160, y: 35, rotation: 10 },  // Top right
    { x: 190, y: 55, rotation: 25 },  // Mid right
    { x: 220, y: 85, rotation: 45 }   // Bottom right
  ];

  const renderLeaf = (position, index) => {
    const isFilled = index < filledLeaves;
    const isPartial = index === filledLeaves && partialLeafProgress > 0;
    const fillPercentage = isPartial ? partialLeafProgress * 100 : (isFilled ? 100 : 0);
    
    return (
      <g key={index} transform={`translate(${position.x}, ${position.y}) rotate(${position.rotation})`}>
        {/* Background leaf */}
        <path
          d="M0 15 Q-8 -5 0 -15 Q8 -5 0 15 Z"
          fill="#f3f4f6"
          stroke="#e5e7eb"
          strokeWidth="1"
          className="transition-all duration-1000"
        />
        
        {/* Progress fill */}
        <defs>
          <linearGradient id={`leafGradient${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset={`${100 - fillPercentage}%`} stopColor="transparent" />
            <stop offset={`${100 - fillPercentage}%`} stopColor="#F47E7E" />
            <stop offset="100%" stopColor="#F47E7E" />
          </linearGradient>
        </defs>
        
        <path
          d="M0 15 Q-8 -5 0 -15 Q8 -5 0 15 Z"
          fill={`url(#leafGradient${index})`}
          className="transition-all duration-1000 ease-out"
        />
        
        {/* Shimmer effect for active leaf */}
        {isPartial && (
          <path
            d="M0 15 Q-8 -5 0 -15 Q8 -5 0 15 Z"
            fill="url(#shimmer)"
            opacity="0.3"
            className="animate-pulse"
          />
        )}
        
        {/* Leaf details */}
        <line
          x1="0" y1="15"
          x2="0" y2="-15"
          stroke={isFilled || isPartial ? "#F47E7E" : "#d1d5db"}
          strokeWidth="1"
          className="transition-colors duration-1000"
        />
      </g>
    );
  };

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * 0.7 }}>
      <svg 
        width={size} 
        height={size * 0.7} 
        viewBox="0 0 260 120" 
        className="drop-shadow-2xl"
      >
        <defs>
          {/* Shimmer gradient */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Render all leaves */}
        {leafPositions.map((position, index) => renderLeaf(position, index))}
        
        {/* Central glow effect */}
        <circle
          cx="130"
          cy="60"
          r="40"
          fill="none"
          stroke="#F47E7E"
          strokeWidth="2"
          opacity="0.2"
          filter="url(#glow)"
          className="animate-pulse"
        />
      </svg>
      
      {/* Progress Percentage */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-[#F47E7E] to-[#CCCCFF] text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
          {progress.toFixed(1)}%
        </div>
      </div>
      
      {/* Phase indicator */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/90 backdrop-blur-sm text-[#F47E7E] px-4 py-2 rounded-full font-bold text-sm border border-[#F47E7E]/20">
          Phase {filledLeaves > 0 ? ['I', 'II', 'III', 'IV', 'V'][filledLeaves - 1] : 'Starting'}
        </div>
      </div>
    </div>
  );
};

export default ProgressLogo;