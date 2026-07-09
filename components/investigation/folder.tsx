"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FolderProps {
  label: string;
  classification?: string;
  children?: ReactNode;
  className?: string;
  rotation?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Folder = ({ 
  label, 
  classification = "CONFIDENTIAL", 
  children, 
  className, 
  rotation = 0, 
  onClick,
  style 
}: FolderProps) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ rotate: rotation, scale: 1 }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0, 
        y: -10,
        zIndex: 50 
      }}
      style={{
        ...style,
        boxShadow: "var(--shadow-paper)"
      }}
      className={cn(
        "relative w-72 h-80 bg-[#E0C99E] rounded-r-md rounded-bl-md border border-[#C5AD7E] p-6 text-ink will-change-transform",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Folder Tab */}
      <div className="absolute -top-8 left-0 w-32 h-8 bg-[#E0C99E] rounded-t-md border-t border-l border-r border-[#C5AD7E] flex items-center justify-center">
        <span className="font-typewriter text-xs uppercase tracking-wider">{label}</span>
      </div>

      {/* Classification Stamp */}
      <div className="absolute top-8 right-4 border-2 border-evidence-red text-evidence-red p-1 rotate-12 font-bold tracking-widest uppercase opacity-80 mix-blend-multiply">
        {classification}
      </div>

      {/* Logo Watermark */}
      <div className="absolute top-2 right-3 w-10 h-10 rotate-[-4deg] mix-blend-multiply opacity-80 pointer-events-none">
        <img src="/images/profile/m-logo.svg" alt="Mithra Logo" className="w-full h-full" />
      </div>

      <div className="mt-16 font-typewriter space-y-4">
        {children}
      </div>
    </motion.div>
  );
};
