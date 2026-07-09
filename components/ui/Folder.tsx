"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveFolderProps {
  label?: string;
  classification?: string;
  items?: React.ReactNode[];
  className?: string;
  color?: string;
  size?: number;
  rotation?: number;
}

export const InteractiveFolder = ({
  label,
  classification,
  items = [],
  className,
  color = "#E6C280",
  size = 1,
  rotation = 0,
}: InteractiveFolderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ rotate: rotation, scale: size }}
      whileHover={{ scale: size * 1.05, rotate: 0 }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={cn("relative cursor-pointer z-20 hover:z-50 transition-all will-change-transform", className)}
      style={{
        width: 260,
        height: 190,
      }}
    >
      {/* Back Cover of Folder */}
      <div
        className="absolute bottom-0 left-0 w-full h-[90%] rounded-b-md rounded-tr-md shadow-xl"
        style={{ backgroundColor: color, filter: "brightness(0.9)" }}
      >
        {/* Folder Tab */}
        <div
          className="absolute -top-6 left-0 h-6 px-4 rounded-t-md"
          style={{ backgroundColor: color, filter: "brightness(0.9)" }}
        >
           <span className="font-typewriter text-xs font-bold uppercase tracking-widest text-black/70 mix-blend-multiply whitespace-nowrap pt-1 block">{label}</span>
        </div>
      </div>

      {/* Papers / Items popping out */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[92%] h-[95%] pointer-events-none z-30">
        <AnimatePresence>
          {items.map((item, i) => {
             // Calculate staggered pop-out and fan spread
             const isHovered = isOpen;
             const staggerDelay = i * 0.04;
             const angle = items.length > 1 ? (i - (items.length - 1) / 2) * 14 : 0; 
             const yOffset = isHovered ? -55 - (i * 12) : 0;
             
             return (
              <motion.div
                key={i}
                initial={{ y: 0, rotate: 0, opacity: 0.9 }}
                animate={{
                  y: yOffset,
                  rotate: isHovered ? angle : 0,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                  delay: isHovered ? staggerDelay : 0,
                }}
                className="absolute inset-0 bg-[#F9F6EE] shadow-md border border-[#E8E2D2] p-3 origin-bottom overflow-hidden font-typewriter text-sm text-ink rounded-[2px]"
                style={{
                  transformOrigin: "bottom center",
                  boxShadow: isHovered ? "0 -4px 15px rgba(0,0,0,0.15)" : "none"
                }}
              >
                {item}
              </motion.div>
             )
          })}
        </AnimatePresence>
      </div>

      {/* Front Cover of Folder */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[90%] rounded-b-md rounded-tr-md origin-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-white/20 z-40"
        style={{ backgroundColor: color }}
        animate={{
          rotateX: isOpen ? -30 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {classification && (
          <div className="absolute top-4 right-4 border-2 border-evidence-red text-evidence-red px-2 py-0.5 rotate-[-5deg] font-bold tracking-widest text-xs uppercase opacity-70 mix-blend-multiply">
            {classification}
          </div>
        )}
        
        {/* Line detailing (folder crease) */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-black/10 mix-blend-multiply" />
        <div className="absolute left-0 top-1/2 w-full h-[1px] bg-black/5 mix-blend-multiply" />
      </motion.div>

    </motion.div>
  );
};
