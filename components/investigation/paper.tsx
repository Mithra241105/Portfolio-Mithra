"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PaperProps {
  children: ReactNode;
  className?: string;
  rotation?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Paper = ({ children, className, rotation = 0, onClick, style }: PaperProps) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ rotate: rotation, scale: 1 }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        y: -10,
        boxShadow: "var(--shadow-lifted)",
        zIndex: 40
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        ...style,
        boxShadow: "var(--shadow-paper)"
      }}
      className={cn(
        "relative bg-paper text-ink p-8 flex flex-col origin-center",
        "before:content-[''] before:absolute before:-top-4 before:left-1/2 before:-translate-x-1/2 before:w-12 before:h-4 before:bg-white/40 before:rotate-2 shadow-paper",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Tape effect on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/30 backdrop-blur-sm -rotate-2 mix-blend-overlay" />
      
      {children}
    </motion.div>
  );
};
