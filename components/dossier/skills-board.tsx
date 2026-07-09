"use client";

import React from 'react';
import { skillsData } from '@/data/skills';
import { Paper } from '../investigation/paper';
import { StickyNote } from '../investigation/sticky-note';
import { CursorSpotlight } from '../investigation/cursor-spotlight';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RedString } from './red-string';

export const SkillsBoard = () => {
  return (
    <div className="relative w-full h-[150vh] max-w-7xl mx-auto overflow-hidden">
      <CursorSpotlight />
      
      {/* Back to Board Button */}
      <Link href="/" className="absolute top-8 left-8 z-50 px-4 py-2 bg-ink text-paper font-typewriter hover:bg-evidence-red transition-colors">
        ← BACK TO BOARD
      </Link>
      
      {/* Red Strings connecting the skill nodes (absolute positions) */}
      <RedString start={{x: '30%', y: '25%'}} end={{x: '65%', y: '35%'}} />
      <RedString start={{x: '65%', y: '35%'}} end={{x: '50%', y: '65%'}} />
      <RedString start={{x: '30%', y: '25%'}} end={{x: '20%', y: '60%'}} />

      {skillsData.map((skillGroup, index) => {
        // Distribute differently based on category
        if (skillGroup.category === "Programming" || skillGroup.category === "Backend") {
          return (
            <Paper 
              key={index}
              rotation={index % 2 === 0 ? -2 : 3}
              style={{
                position: 'absolute',
                top: index === 0 ? '10%' : '55%',
                left: index === 0 ? '15%' : '40%',
              }}
              className="w-80 h-auto min-h-[300px]"
            >
              <h3 className="font-typewriter text-2xl font-bold border-b-2 border-ink/40 mb-4 pb-2 uppercase">{skillGroup.category}</h3>
              <div className="flex flex-col gap-3 font-mono">
                {skillGroup.items.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-4 h-4 border border-ink flex items-center justify-center text-xs">x</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Paper>
          );
        }

        if (skillGroup.category === "Frontend" || skillGroup.category === "Tools") {
          return (
            <StickyNote 
              key={index}
              color={skillGroup.category === "Frontend" ? "pink" : "yellow"}
              rotation={index % 2 === 0 ? 5 : -7}
              style={{
                position: 'absolute',
                top: skillGroup.category === "Frontend" ? '25%' : '60%',
                left: skillGroup.category === "Frontend" ? '60%' : '15%',
              }}
              className="w-64 h-64"
            >
              <div className="flex flex-col h-full w-full">
                <h3 className="font-bold underline mb-2 text-2xl uppercase">{skillGroup.category}</h3>
                <ul className="list-disc pl-4 text-left text-xl flex-1 space-y-1">
                  {skillGroup.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </StickyNote>
          );
        }

        // Databases / AI as polaroids or smaller papers
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 40 }}
            style={{
              position: 'absolute',
              top: skillGroup.category === "AI" ? '40%' : '15%',
              left: skillGroup.category === "AI" ? '70%' : '80%',
              rotate: index % 2 === 0 ? 12 : -10
            }}
            className="bg-white p-4 pb-12 shadow-paper w-56 relative flex flex-col cursor-pointer"
          >
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 rotate-3 backdrop-blur-sm shadow-sm" />
             <div className="border-2 border-ink p-2 mb-2 bg-zinc-100 flex items-center justify-center min-h-[100px]">
               <span className="font-mono text-4xl text-ink/30 font-bold">{skillGroup.category.substring(0,2).toUpperCase()}</span>
             </div>
             <h3 className="font-handwriting text-2xl text-center uppercase font-bold">{skillGroup.category}</h3>
             <div className="font-typewriter text-sm mt-2 text-center">
               {skillGroup.items.join(', ')}
             </div>
          </motion.div>
        );
      })}
    </div>
  );
};
