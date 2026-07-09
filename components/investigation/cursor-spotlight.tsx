"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CursorSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out the movement
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-50 mix-blend-overlay opacity-50"
      style={{
        background: `radial-gradient(600px circle at calc(${springX}px) calc(${springY}px), rgba(255, 245, 220, 0.15), transparent 40%)`
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};
