"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from './particles';
import { useTypewriter } from '@/hooks/use-typewriter';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [lampOn, setLampOn] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  
  // Sequence timing
  useEffect(() => {
    // Turn lamp on after 1.5s
    const lampTimer = setTimeout(() => setLampOn(true), 1500);
    // Show terminal after 3s
    const terminalTimer = setTimeout(() => setShowTerminal(true), 3000);
    
    return () => {
      clearTimeout(lampTimer);
      clearTimeout(terminalTimer);
    };
  }, []);

  const terminalLines = [
    "ACCESS GRANTED",
    "Decrypting Database...",
    "Loading Investigation...",
    "Opening Case File...",
    "CASE FILE #241105",
    "Subject Located",
    "MITHRA S",
    "System Ready"
  ];

  const fullText = terminalLines.join('\n');
  
  const { displayedText, isComplete } = useTypewriter(fullText, 40, 3500); // starts typing shortly after terminal fades in

  return (
    <div className="fixed inset-0 z-50 bg-bg-primary overflow-hidden flex flex-col items-center justify-center font-mono">
      {/* Ambient Audio (fails gracefully if missing) */}
      <audio autoPlay loop src="/sounds/office-ambience.mp3" className="hidden" />

      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute top-8 right-8 z-50 text-paper/50 hover:text-paper transition-colors uppercase tracking-widest text-xs"
      >
        Skip Intro
      </button>

      {/* Lamp Light Effect */}
      <AnimatePresence>
        {lampOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Spotlight gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(239,227,197,0.15),transparent_60%)]" />
            <Particles />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-20 w-full max-w-2xl p-8 rounded-sm bg-bg-primary/80 border border-paper/10 text-shadow-glow"
          >
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-evidence-red/80" />
              <div className="w-3 h-3 rounded-full bg-gold/80" />
              <div className="w-3 h-3 rounded-full bg-paper/20" />
            </div>
            
            <div className="text-paper/90 whitespace-pre-line text-sm md:text-base leading-relaxed h-[250px]">
              {displayedText}
              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-paper/80 ml-1 translate-y-1"
              />
            </div>

            {/* Begin Button */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-8 flex justify-center"
                >
                  <button
                    onClick={onComplete}
                    className="px-6 py-3 border border-paper/30 text-paper hover:bg-paper hover:text-bg-primary transition-all duration-300 uppercase tracking-[0.2em] text-xs"
                  >
                    Click to Begin Investigation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
