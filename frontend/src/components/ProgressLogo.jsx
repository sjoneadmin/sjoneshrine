import React from 'react';
import { getProgressPercentage } from '../data/mock';

const ProgressLogo = ({ size = 200, className = "" }) => {
  const progress = getProgressPercentage();
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background Logo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl flex items-center justify-center">
        <svg 
          width={size * 0.6} 
          height={size * 0.6} 
          viewBox="0 0 100 100" 
          className="text-gray-400"
        >
          <path
            d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="50" cy="50" r="15" fill="white" />
          <text x="50" y="55" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="bold">
            OS
          </text>
        </svg>
      </div>
      
      {/* Animated Progress Fill */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden transition-all duration-1000 ease-out"
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            #10b981 0deg,
            #059669 ${progress * 3.6}deg,
            transparent ${progress * 3.6}deg,
            transparent 360deg
          )`
        }}
      >
        <div className="absolute inset-2 rounded-full bg-white"></div>
      </div>
      
      {/* Progress Logo Fill */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          clipPath: `polygon(0 ${100 - progress}%, 100% ${100 - progress}%, 100% 100%, 0% 100%)`
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 shadow-2xl flex items-center justify-center transition-all duration-1000 ease-out">
          <svg 
            width={size * 0.6} 
            height={size * 0.6} 
            viewBox="0 0 100 100" 
            className="text-white"
          >
            <path
              d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="15" fill="rgba(255,255,255,0.9)" />
            <text x="50" y="55" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="bold">
              OS
            </text>
          </svg>
        </div>
      </div>
      
      {/* Progress Percentage */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
          {progress.toFixed(1)}%
        </div>
      </div>
      
      {/* Animated Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-emerald-300 opacity-30 animate-pulse"></div>
    </div>
  );
};

export default ProgressLogo;