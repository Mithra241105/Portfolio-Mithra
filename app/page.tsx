"use client";

import { useState, useEffect } from 'react';
import { IntroSequence } from '@/components/cinematic/intro-sequence';
import { InvestigationBoard } from '@/components/investigation/board';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [introComplete, setIntroComplete] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem('case_file_intro_complete');
    if (hasSeenIntro === 'true') {
      setIntroComplete(true);
    } else {
      setIntroComplete(false);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('case_file_intro_complete', 'true');
    setIntroComplete(true);
  };

  // Wait for client side hydration to prevent layout shift
  if (introComplete === null) {
    return <div className="min-h-screen bg-bg-primary" />;
  }

  return (
    <main className="w-screen h-screen bg-neutral-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {!introComplete ? (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-50"
          >
            <IntroSequence onComplete={handleIntroComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="board"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <InvestigationBoard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
