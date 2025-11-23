'use client';

import { motion } from 'framer-motion';

/**
 * لوگوی یونیک بی لوک با SVG
 * طراحی ترکیبی از B + Diamond + Circle
 */
export default function UniqueLogo() {
  return (
    <motion.div 
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
      className="relative group"
      style={{ width: 48, height: 48 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-purple-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
      
      {/* SVG Container */}
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 48 48" 
        className="relative drop-shadow-2xl"
      >
        {/* Background Circle با Gradient */}
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          
          <linearGradient id="letter-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="100%" stopColor="#FFF" opacity="0.9" />
          </linearGradient>

          <linearGradient id="diamond-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Filter برای Shadow */}
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* دایره پس‌زمینه */}
        <circle 
          cx="24" 
          cy="24" 
          r="22" 
          fill="url(#bg-gradient)"
          filter="url(#shadow)"
        />

        {/* حلقه داخلی */}
        <circle 
          cx="24" 
          cy="24" 
          r="20" 
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* حرف B استایل شده */}
        <text
          x="24"
          y="32"
          fontSize="24"
          fontWeight="900"
          textAnchor="middle"
          fill="url(#letter-gradient)"
          fontFamily="system-ui"
        >
          B
        </text>

        {/* الماس کوچک در بالا */}
        <g transform="translate(34, 8)">
          <rect 
            x="0" 
            y="0" 
            width="6" 
            height="6" 
            fill="url(#diamond-gradient)"
            transform="rotate(45 3 3)"
            filter="url(#shadow)"
          />
          <rect 
            x="1.5" 
            y="1.5" 
            width="3" 
            height="3" 
            fill="white"
            opacity="0.5"
            transform="rotate(45 3 3)"
          />
        </g>

        {/* نقاط تزئینی */}
        <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="38" cy="38" r="1.5" fill="white" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </motion.div>
  );
}
