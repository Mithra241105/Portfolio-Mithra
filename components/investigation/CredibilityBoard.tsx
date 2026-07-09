"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CredibilityBoardProps {
  setActiveView: (view: 'intro' | 'crimes' | 'credibility') => void;
  clusterRef: React.RefObject<HTMLDivElement | null>;
  e1PinRef: React.RefObject<HTMLDivElement | null>;
  e2PinRef: React.RefObject<HTMLDivElement | null>;
  e3PinRef: React.RefObject<HTMLDivElement | null>;
  e4PinRef: React.RefObject<HTMLDivElement | null>;
  gdgPinRef: React.RefObject<HTMLDivElement | null>;
  symposiumPinRef: React.RefObject<HTMLDivElement | null>;
}

const EXPERIENCE = [
  {
    id: 'iit-ropar',
    org: 'IIT ROPAR (NPTEL)',
    sub: 'VLED Lab — Winter Research Intern',
    period: 'Jan – Mar 2026',
    type: 'REMOTE',
    detail: 'Software engineering internship under the NPTEL program. Contributed to frontend tooling and research-oriented lab systems.',
    badge: 'VERIFIED',
    positionClasses: 'top-[12%] left-[6%] rotate-[-2deg]',
    pinClass: '-top-2 left-4',
  },
  {
    id: 'idm-techpark',
    org: 'IDM TECHPARK',
    sub: 'MERN Stack Web Dev Intern',
    period: 'Jun – Jul 2025',
    type: 'ON-SITE',
    detail: 'Engineered full-stack features using React and Express APIs. Delivered client-facing dashboards and REST API integrations.',
    badge: 'CONFIRMED',
    positionClasses: 'bottom-[15%] left-1/2 -translate-x-1/2 rotate-[1deg]',
    pinClass: '-top-2 left-1/2 -translate-x-1/2',
  },
  {
    id: 'eans',
    org: 'EANS TECHNOLOGIES',
    sub: 'Backend Developer Intern',
    period: 'Jun – Jul 2025',
    type: 'ON-SITE',
    detail: 'Backend systems development using Python and MySQL. Focused on user management modules, authentication, and database design.',
    badge: 'CONFIRMED',
    positionClasses: 'top-[12%] right-[8%] rotate-[2deg]',
    pinClass: '-top-2 right-4',
  },
  {
    id: 'gdg',
    org: 'Google Developers Group (NCT)',
    sub: 'Design & Creative Lead',
    period: 'SEP 2025 - PRESENT',
    type: 'ON-CAMPUS',
    detail: 'Designed high-fidelity UI creatives, branding materials, and event posters using Figma and Adobe Photoshop. Spearheaded visual communication strategies that increased campus technical workshop participation.',
    badge: 'ACTIVE',
    positionClasses: 'top-[18%] left-[40%] rotate-[2deg]',
    pinClass: '-top-2 left-1/2 -translate-x-1/2',
  },
];

export const CredibilityBoard = ({ 
  setActiveView, 
  clusterRef, 
  e1PinRef, 
  e2PinRef, 
  e3PinRef,
  e4PinRef,
  gdgPinRef,
  symposiumPinRef
}: CredibilityBoardProps) => {
  const [activeCredibility, setActiveCredibility] = useState<any | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);

  const pinRefs = [e1PinRef, e2PinRef, e3PinRef, e4PinRef];

  return (
    <motion.div
      key="credibility-board"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="absolute inset-0 w-full h-full"
    >
      {/* Back button */}
      <button
        onClick={() => setActiveView('intro')}
        className="absolute top-5 left-5 z-50 font-mono text-xs text-white/50 hover:text-white transition-colors tracking-widest uppercase cursor-pointer border border-white/20 hover:border-white/50 px-3 py-1.5"
      >
        ← BACK TO DOSSIER
      </button>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE LAYOUT — scrollable card stack (hidden on md+)
      ═══════════════════════════════════════════════════════════ */}
      <div className="md:hidden absolute inset-0 overflow-y-auto pt-16">
        <div className="flex flex-col gap-5 p-4 pb-12">

          {/* Board Title */}
          <div className="text-center">
            <h1 className="font-mono text-white/70 text-xs tracking-[0.4em] uppercase">CREDIBILITY BOARD</h1>
            <div className="w-16 border-b border-white/20 mx-auto mt-2" />
          </div>

          {/* Experience Cards */}
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="bg-[#fdf6e3] border border-[#d4c5a0] p-5 shadow-xl font-mono relative" onClick={() => setActiveCredibility(exp)}>
              <div className="absolute top-2 right-2 bg-green-800 text-white text-[7px] font-bold px-2 py-0.5 tracking-widest uppercase">{exp.badge}</div>
              <p className="text-[9px] text-black/40 tracking-widest uppercase mb-1">{exp.type} · {exp.period}</p>
              <h3 className="font-bold text-sm text-[#2b1d0e] mb-1 uppercase">{exp.org}</h3>
              <p className="text-xs text-[#5a3a00] mb-3">{exp.sub}</p>
              <p className="text-xs text-black/70 leading-relaxed">{exp.detail}</p>
              <p className="text-[8px] text-black/30 mt-3 italic">Tap to expand</p>
            </div>
          ))}

          {/* Certifications */}
          <div className="bg-white p-4 shadow-lg border border-gray-200">
            <p className="font-mono text-[9px] text-black/40 tracking-widest uppercase mb-3 border-b border-black/10 pb-2">CERTIFICATIONS / EVIDENCE</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setSelectedEvidence('/images/IMAGE2.jpeg')}>
                <img src="/images/IMAGE2.jpeg" alt="NPTEL" className="w-32 h-24 object-cover border border-gray-200 rounded-sm" />
                <p className="font-mono text-[9px] font-bold text-black/70 uppercase text-center">NPTEL ELITE+GOLD</p>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setSelectedEvidence('/images/gcp.png')}>
                <img src="/images/gcp.png" alt="GCP" className="w-32 h-24 object-cover border border-gray-200 rounded-sm" />
                <p className="font-mono text-[9px] font-bold text-black/70 uppercase text-center">GOOGLE CLOUD BOOST</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Secondary Evidence: ID Badge ── */}
      <motion.div 
        className="hidden md:flex absolute top-[15%] left-[25%] bg-white border-2 border-gray-200 rounded-md w-40 shadow-lg z-20 flex-col items-center cursor-pointer hover:z-40"
        style={{ rotate: '5deg' }}
        whileHover={{ scale: 1.05, rotate: 0 }}
      >
        {/* Red Pin — top center */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md z-30" />
        {/* Badge Hole */}
        <div className="w-8 h-1.5 bg-gray-300 rounded-full mt-2 mb-2" />
        <div className="w-full bg-blue-800 text-white text-center py-1.5">
          <p className="text-[10px] font-bold tracking-widest uppercase">IIT ROPAR</p>
        </div>
        <div className="p-3 text-center w-full">
          <p className="text-[8px] text-gray-500 font-bold mb-2">VLED LAB</p>
          <img src="/images/IMAGE2.jpeg" alt="Visitor" className="object-contain w-full h-24 rounded-sm border border-gray-300 mx-auto mb-2" />
          <p className="text-[10px] font-bold text-black uppercase tracking-wider mb-2">VISITOR ACCESS</p>
          {/* Fake Barcode */}
          <div className="w-full h-5 bg-black/80 flex justify-between px-1">
             <div className="w-0.5 h-full bg-white opacity-90" />
             <div className="w-1 h-full bg-white opacity-90" />
             <div className="w-0.5 h-full bg-white opacity-90" />
             <div className="w-1.5 h-full bg-white opacity-90" />
             <div className="w-0.5 h-full bg-white opacity-90" />
             <div className="w-2 h-full bg-white opacity-90" />
          </div>
        </div>
      </motion.div>

      {/* ── Secondary Evidence: GDG Organizer Pass ── */}
      <motion.div 
        className="hidden md:block absolute top-[25%] left-[58%] bg-white rounded-md w-32 shadow-lg overflow-hidden border border-gray-300 z-20 cursor-pointer hover:z-40"
        style={{ rotate: '-4deg' }}
        whileHover={{ scale: 1.05, rotate: 0 }}
      >
        {/* Red Pin */}
        <div ref={gdgPinRef} className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md z-30" />
        
        {/* Lanyard Hole */}
        <div className="w-6 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-1" />
        
        {/* Color Bar */}
        <div className="w-full flex h-1.5 mb-2">
          <div className="flex-1 bg-[#4285F4]" />
          <div className="flex-1 bg-[#EA4335]" />
          <div className="flex-1 bg-[#FBBC05]" />
          <div className="flex-1 bg-[#34A853]" />
        </div>

        <div className="px-2 pb-2 text-center">
          <p className="text-[8px] font-bold text-gray-500 uppercase mb-1 tracking-wider">GDG On Campus NCT</p>
          <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 mx-auto mb-1 flex items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-gradient-to-br from-[#4285F4]/20 to-[#34A853]/20 flex items-center justify-center">
               <span className="text-[#4285F4] font-bold text-xs">GDG</span>
             </div>
          </div>
          <p className="text-[10px] font-black text-black leading-tight uppercase tracking-widest mb-1">STAFF / ORGANIZER</p>
          <p className="text-[7px] text-[#EA4335] font-bold uppercase tracking-widest mb-2">Design & Creative Lead</p>
          <p className="text-[9px] font-bold text-gray-800 uppercase mb-2">Mithra S.</p>
          
          {/* Barcode */}
          <div className="w-full h-4 bg-black/80 flex justify-between px-0.5">
             <div className="w-0.5 h-full bg-white opacity-90" />
             <div className="w-1 h-full bg-white opacity-90" />
             <div className="w-0.5 h-full bg-white opacity-90" />
             <div className="w-1.5 h-full bg-white opacity-90" />
             <div className="w-0.5 h-full bg-white opacity-90" />
             <div className="w-2 h-full bg-white opacity-90" />
          </div>
        </div>
      </motion.div>

      {/* ── Secondary Evidence: Symposium Award ── */}
      <motion.div 
        className="hidden md:block absolute bottom-[25%] right-[28%] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white p-4 rounded-sm shadow-xl border-l-4 border-yellow-500 w-60 z-20 cursor-pointer hover:z-40"
        style={{ rotate: '4deg' }}
        whileHover={{ scale: 1.05, rotate: 0 }}
      >
        {/* Red Pin */}
        <div ref={symposiumPinRef} className="absolute -top-2 right-4 w-4 h-4 bg-red-600 rounded-full shadow-md z-30" />
        
        {/* Foil Seal */}
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 shadow-sm border border-yellow-700/50 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-yellow-800/20" />
        </div>

        <p className="text-[8px] text-yellow-500 font-bold tracking-widest uppercase mb-1">CERTIFICATE OF EXCELLENCE</p>
        <h3 className="font-bold text-sm text-white mb-2 leading-snug">3rd Prize: Technical Paper Presentation</h3>
        <p className="text-[9px] text-gray-400 leading-relaxed font-mono uppercase tracking-wider">
          Awarded for outstanding technical communication and research.
        </p>
      </motion.div>

      {/* Visual Anchor */}
      <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div ref={clusterRef} className="bg-[#1e3d2c] text-white font-mono text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 border-2 border-[#152a1e] shadow-xl flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-black mb-1 opacity-50" />
          EVIDENCE CLUSTER
        </div>
      </div>

      {/* Scattered Evidence Cards (Aged Paper) — desktop only */}
      {EXPERIENCE.map((exp, idx) => (
        <motion.div
          key={exp.id}
          className={`hidden md:block absolute z-20 cursor-pointer group ${exp.positionClasses}`}
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 + idx * 0.12, type: 'spring', stiffness: 180, damping: 18 }}
          whileHover={{ scale: 1.05, zIndex: 40 }}
          onClick={() => setActiveCredibility(exp)}
        >
          {/* Randomized red pin */}
          <div ref={pinRefs[idx]} className={`absolute w-4 h-4 bg-red-600 rounded-full shadow-md z-40 ${exp.pinClass}`} />

          <div
            className="w-80 shadow-xl font-mono relative transition-shadow group-hover:shadow-2xl"
            style={{ background: '#EFE3C5', border: '1px solid #c9b98a' }}
          >
            {/* Green badge */}
            <div className="bg-green-800 text-[#cfe8d5] text-[10px] tracking-widest px-4 py-1.5 font-bold uppercase flex justify-between items-center">
              <span>FIELD REPORT</span>
              <span className="opacity-70">{exp.badge}</span>
            </div>

            <div className="p-5">
              {/* Type pill */}
              <span className="inline-block text-[9px] bg-black/10 text-black/50 px-2 py-0.5 tracking-widest uppercase mb-2">
                {exp.type}
              </span>

              {/* Org name */}
              <h3 className="font-bold text-base text-[#3a1a00] tracking-wide uppercase leading-tight mb-1">
                {exp.org}
              </h3>
              <p className="text-[11px] text-[#5a3e1b] font-bold mb-2 leading-snug">{exp.sub}</p>

              {/* Period */}
              <p className="text-[10px] text-black/40 tracking-widest uppercase mb-3 border-b border-black/10 pb-2">
                {exp.period}
              </p>

              <p className="text-sm leading-relaxed text-black/75 line-clamp-3">
                {exp.detail}
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Modal Popup for Active Credibility */}
      <AnimatePresence>
        {activeCredibility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveCredibility(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#EFE3C5] border border-[#c9b98a] text-black p-10 shadow-2xl w-[90vw] md:w-[700px] max-w-full font-mono relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tape strip */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/60 shadow-sm" />
              
              {/* Close Button */}
              <button 
                className="absolute top-4 right-5 text-black/40 hover:text-red-700 font-bold text-2xl leading-none"
                onClick={() => setActiveCredibility(null)}
              >
                &times;
              </button>

              <div className="absolute -top-2 -right-2 bg-green-800 text-white text-xs font-bold tracking-widest px-3 py-1.5 uppercase shadow-md">
                {activeCredibility.badge}
              </div>

              <div className="mb-3">
                 <span className="inline-block text-[11px] bg-black/10 text-black/60 px-3 py-1.5 tracking-widest uppercase mb-2">
                  {activeCredibility.type}
                </span>
              </div>

              <h2 className="font-bold text-3xl md:text-4xl tracking-widest text-[#3a1a00] mb-2 uppercase">
                {activeCredibility.org}
              </h2>
              
              <p className="text-base md:text-lg text-[#5a3e1b] font-bold mb-5">
                {activeCredibility.sub}
              </p>

              <p className="text-sm text-black/50 tracking-widest uppercase mb-5 border-b border-black/10 pb-3">
                ACTIVE PERIOD: {activeCredibility.period}
              </p>

              <p className="text-base md:text-lg leading-relaxed text-black/80 mb-8">
                {activeCredibility.detail}
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveCredibility(null)}
                  className="bg-[#3a1a00] text-[#EFE3C5] text-xs font-bold tracking-widest px-6 py-2 uppercase hover:bg-green-800 transition-colors"
                >
                  [ CLOSE FILE ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Commendation Polaroid 1 (Bottom Left) ── */}
      <motion.div
        className="hidden md:block absolute bottom-[10%] left-[10%] bg-white p-3 pb-8 shadow-xl z-20 w-64 cursor-pointer hover:z-40"
        style={{ rotate: '-5deg' }}
        initial={{ opacity: 0, scale: 0.8, x: -30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.7, type: 'spring' }}
        whileHover={{ scale: 1.05, rotate: 0 }}
      >
        <img 
          src="/images/Poster.jpeg" 
          alt="NPTEL Award" 
          className="w-full h-auto aspect-[4/3] md:aspect-[3/2] object-cover rounded-sm mb-3 border border-neutral-200 bg-zinc-100 cursor-zoom-in hover:opacity-80 transition-opacity" 
          onClick={() => setSelectedEvidence('/images/Poster.jpeg')}
        />
        <div className="text-center text-sm font-bold font-mono text-zinc-800 mb-2 leading-snug">
          NPTEL ELITE+GOLD:<br/>JAVA
        </div>
        <p className="text-center text-black font-bold font-mono text-[10px] tracking-widest uppercase pt-2 border-t border-black/10">COMMENDATION #1</p>
      </motion.div>

      {/* ── Commendation Polaroid 2 (Bottom Right) ── */}
      <motion.div
        className="hidden md:block absolute bottom-[10%] right-[10%] bg-white p-3 pb-8 shadow-xl z-20 w-64 cursor-pointer hover:z-40"
        style={{ rotate: '5deg' }}
        initial={{ opacity: 0, scale: 0.8, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring' }}
        whileHover={{ scale: 1.05, rotate: 0 }}
      >
        <img 
          src="/images/gcp.png" 
          alt="GCP Award" 
          className="w-full h-auto aspect-[4/3] md:aspect-[3/2] object-cover rounded-sm mb-3 border border-neutral-200 bg-zinc-100 cursor-zoom-in hover:opacity-80 transition-opacity" 
          onClick={() => setSelectedEvidence('/images/gcp.png')}
        />
        <div className="text-center text-sm font-bold font-mono text-zinc-800 mb-2 leading-snug">
          GOOGLE CLOUD<br/>BOOST
        </div>
        <p className="text-center text-black font-bold font-mono text-[10px] tracking-widest uppercase pt-2 border-t border-black/10">COMMENDATION #2</p>
      </motion.div>

      {/* Bottom classified watermark */}
      <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-widest uppercase text-white/15 pointer-events-none">
        CREDIBILITY BOARD — SECTION 02 — CLASSIFIED
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedEvidence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvidence(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedEvidence}
              alt="Expanded Evidence"
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl border border-neutral-700"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
