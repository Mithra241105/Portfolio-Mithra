"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StickyNoteProps {
  children: ReactNode;
  className?: string;
  rotation?: number;
  color?: 'yellow' | 'pink' | 'blue';
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const StickyNote = ({ 
  children, 
  className, 
  rotation = 0, 
  color = 'yellow', 
  onClick,
  style 
}: StickyNoteProps) => {
  const colorMap = {
    yellow: 'bg-yellow-200',
    pink: 'bg-pink-300',
    blue: 'bg-blue-300'
  };

  return (
    <motion.div
      onClick={onClick}
      initial={{ rotate: rotation, scale: 1 }}
      whileHover={{ 
        scale: 1.1, 
        rotate: rotation > 0 ? rotation + 2 : rotation - 2, 
        y: -5,
        zIndex: 40 
      }}
      style={{
        ...style,
        boxShadow: "2px 4px 6px rgba(0,0,0,0.1), inset 0 -2px 10px rgba(0,0,0,0.05)"
      }}
      className={cn(
        "relative w-40 h-40 p-4 text-ink font-handwriting text-xl flex items-center justify-center text-center",
        colorMap[color],
        // The curled corner effect
        "after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-6 after:h-6 after:bg-black/10 after:rounded-tl-full",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Tape on top */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/40 -rotate-3 backdrop-blur-[1px]" />
      {children}
    </motion.div>
  );
};
