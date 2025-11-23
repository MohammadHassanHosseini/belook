'use client';

import { motion } from 'framer-motion';

interface BelookLogoProps {
  variant?: 'gradient' | 'diamond' | 'crown' | 'minimal';
  size?: number;
}

export default function BelookLogo({ variant = 'gradient', size = 48 }: BelookLogoProps) {
  if (variant === 'gradient') {
    // گزینه 1: حرف B با Gradient (فعلی)
    return (
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.1, rotateY: 15 }}
        transition={{ duration: 0.3 }}
        style={{ perspective: 1000, width: size, height: size }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-purple-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
        
        {/* حرف B با افکت 3D */}
        <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-primary via-pink-500 to-purple-600 rounded-2xl shadow-2xl border-2 border-white/30 dark:border-white/20"
             style={{ transformStyle: 'preserve-3d' }}>
          <span className="text-2xl font-black text-white drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            B
          </span>
          {/* Diamond در گوشه */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg" />
        </div>
      </motion.div>
    );
  }

  if (variant === 'diamond') {
    // گزینه 2: الماس
    return (
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 10 }}
        className="relative flex items-center justify-center rounded-2xl shadow-2xl"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-purple-500 rounded-2xl blur-lg opacity-60" />
        <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-primary via-pink-500 to-purple-600 rounded-2xl">
          {/* الماس */}
          <div className="relative w-6 h-6 rotate-45">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-400 to-pink-400 rounded-sm shadow-lg">
              {/* برق الماس */}
              <div className="absolute inset-2 bg-white/40 rounded-sm" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'crown') {
    // گزینه 3: تاج سلطنتی
    return (
      <motion.div 
        whileHover={{ scale: 1.1, y: -2 }}
        className="relative flex items-center justify-center rounded-2xl shadow-2xl"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-purple-500 rounded-2xl blur-lg opacity-60" />
        <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-primary via-pink-500 to-purple-600 rounded-2xl">
          {/* تاج SVG */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
            <path d="M2 20h20v2H2v-2zm2-8l4 2 4-4 4 4 4-2v8H4v-8z" fill="url(#crown-gradient)" />
            <circle cx="6" cy="12" r="1.5" fill="#FCD34D" />
            <circle cx="12" cy="8" r="1.5" fill="#FCD34D" />
            <circle cx="18" cy="12" r="1.5" fill="#FCD34D" />
            <defs>
              <linearGradient id="crown-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    );
  }

  if (variant === 'minimal') {
    // گزینه 4: Minimalist
    return (
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="relative flex items-center justify-center rounded-2xl shadow-lg"
        style={{ width: size, height: size }}
      >
        <div className="relative flex items-center justify-center w-full h-full bg-white dark:bg-gray-800 rounded-2xl border border-primary/20">
          <span className="text-2xl font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
            B
          </span>
        </div>
      </motion.div>
    );
  }

  return null;
}
