"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface RedStringProps {
  start: { x: string | number; y: string | number };
  end: { x: string | number; y: string | number };
}

export const RedString = ({ start, end }: RedStringProps) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ minHeight: '100%', minWidth: '100%' }}>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="var(--color-evidence-red)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 2"
        filter="url(#shadow)"
      />
      {/* Pins at the ends */}
      <circle cx={start.x} cy={start.y} r="4" fill="#a00" className="drop-shadow-md" />
      <circle cx={end.x} cy={end.y} r="4" fill="#a00" className="drop-shadow-md" />
    </svg>
  );
};
