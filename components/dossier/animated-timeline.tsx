"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experienceData } from '@/data/experience';
import { Paper } from '../investigation/paper';
import { CursorSpotlight } from '../investigation/cursor-spotlight';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const AnimatedTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale the red string vertically based on scroll
  const stringHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-32 px-4 md:px-0">
      <CursorSpotlight />

      {/* Back to Board Button */}
      <Link href="/" className="fixed top-8 left-8 z-50 px-4 py-2 bg-ink text-paper font-typewriter hover:bg-evidence-red transition-colors shadow-md">
        ← BACK TO BOARD
      </Link>

      <div className="text-center mb-32 relative z-10">
        <h1 className="text-5xl font-typewriter font-bold text-paper drop-shadow-md">CAREER TIMELINE</h1>
        <p className="text-paper/70 font-mono mt-4 tracking-widest">RECORD OF SUBJECT&apos;S ACTIVITIES</p>
      </div>

      <div className="relative w-full">
        {/* The background string track */}
        <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-evidence-red/20 -translate-x-1/2 shadow-[0_0_10px_rgba(201,30,30,0.2)]" />
        
        {/* The animated drawing string */}
        <motion.div 
          className="absolute left-12 md:left-1/2 top-0 w-1 bg-evidence-red -translate-x-1/2 shadow-glow origin-top z-10"
          style={{ height: stringHeight }}
        />

        {experienceData.map((exp, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={exp.id} className="relative flex flex-col md:flex-row items-center justify-between mb-32 w-full group">
              
              {/* Timeline Node/Pin */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className="absolute left-12 md:left-1/2 w-6 h-6 rounded-full bg-evidence-red border-4 border-paper shadow-md -translate-x-1/2 z-20"
              />

              {/* Connecting thread to paper (horizontal) */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "calc(50% - 1.5rem)", opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={cn(
                  "absolute hidden md:block h-0.5 bg-evidence-red/60 z-0 top-1/2 -translate-y-1/2",
                  isEven ? "right-1/2" : "left-1/2"
                )}
              />

              {/* Spacer for alternating layout */}
              <div className={cn("hidden md:block w-[45%]", !isEven && "order-1")} />

              {/* The Experience Paper */}
              <motion.div
                initial={{ 
                  opacity: 0, 
                  x: isEven ? -50 : 50,
                  rotate: isEven ? -5 : 5
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  rotate: isEven ? -2 : 2
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.6 }}
                className={cn("w-full pl-24 md:pl-0 md:w-[45%] z-30", !isEven && "order-2")}
              >
                <Paper className="p-8 w-full" rotation={0}>
                  {/* Classification Stamp */}
                  <div className="absolute top-4 right-4 border-2 border-evidence-red text-evidence-red px-2 py-1 rotate-12 font-bold tracking-widest text-xs uppercase opacity-70 mix-blend-multiply">
                    {exp.classification}
                  </div>

                  <h3 className="font-typewriter text-2xl font-bold mb-1">{exp.role}</h3>
                  <h4 className="font-sans font-bold text-ink/70 mb-4">{exp.company}</h4>
                  
                  <div className="flex justify-between items-center border-b-2 border-ink/20 pb-4 mb-4 font-mono text-sm">
                    <span className="bg-yellow-200/50 px-2">{exp.duration}</span>
                    <span>{exp.location}</span>
                  </div>

                  <ul className="list-disc pl-4 font-mono text-sm space-y-2">
                    {exp.responsibilities.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </Paper>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
