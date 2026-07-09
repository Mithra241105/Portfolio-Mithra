"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CrimesBoardProps {
  setActiveView: (view: 'intro' | 'crimes' | 'credibility') => void;
  clusterRef: React.RefObject<HTMLDivElement>;
  c1PinRef: React.RefObject<HTMLDivElement>;
  c2PinRef: React.RefObject<HTMLDivElement>;
  c3PinRef: React.RefObject<HTMLDivElement>;
  c4PinRef: React.RefObject<HTMLDivElement>;
}

// Each card has a unique absolute position, rotation, and pin position
const PROJECTS = [
  {
    id: 'eduflash',
    title: 'EDUFLASH',
    crime: 'AI-powered smart learning platform converting PDFs into interactive flashcards and quizzes.',
    tech: 'React · FastAPI · RAG Pipeline',
    techTags: ['React', 'FastAPI', 'RAG Pipeline'],
    link: null,
    caseNo: 'CASE-001',
    severity: 'CRITICAL',
    colSpan: 'md:col-span-2 lg:col-span-2',
    pinClass: '-top-2 left-4',
    pinColor: 'bg-red-600',
  },
  {
    id: 'code4crops',
    title: 'CODE4CROPS',
    crime: 'Ag-logistics transport pooling and profit optimization platform for farmers.',
    tech: 'React · Node.js · Leaflet.js',
    techTags: ['React', 'Node.js', 'Leaflet.js'],
    link: 'https://github.com/Mithra241105/Code4Crops-',
    caseNo: 'CASE-002',
    severity: 'HIGH',
    colSpan: 'md:col-span-1 lg:col-span-2',
    pinClass: '-top-2 right-4',
    pinColor: 'bg-yellow-500',
  },
  {
    id: 'cognate',
    title: 'COGNATE',
    crime: 'Full-stack semantic QA platform with ML classification and vector-based question handling.',
    tech: 'Next.js · Python · FastAPI · MongoDB · ML',
    techTags: ['Next.js', 'Python', 'FastAPI', 'MongoDB', 'ML'],
    link: 'https://github.com/Mithra241105/Cognate',
    caseNo: 'CASE-003',
    severity: 'HIGH',
    colSpan: 'md:col-span-2 lg:col-span-2',
    pinClass: '-top-2 left-1/2 -translate-x-1/2',
    pinColor: 'bg-green-500',
  },
  {
    id: 'spinner',
    title: 'SPINNER',
    crime: 'Interactive Python web app that spins a colorful prize/selection wheel for classroom/meeting use.',
    tech: 'Python · Streamlit · Plotly · Pandas',
    techTags: ['Python', 'Streamlit', 'Plotly', 'Pandas'],
    link: 'https://github.com/Mithra241105/Spinner',
    caseNo: 'CASE-004',
    severity: 'MODERATE',
    colSpan: 'md:col-span-1 lg:col-span-1',
    pinClass: '-top-2 right-4',
    pinColor: 'bg-red-600',
  },
];

// Deduplicate all tech tags across projects for the Modus Operandi card
const ALL_TAGS = Array.from(
  new Set(PROJECTS.flatMap((p) => p.techTags))
);

// Push-pin SVG component
const PushPin = ({ color = '#dc2626', size = 18 }: { color?: string; size?: number }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 16 24" fill="none" className="drop-shadow-md">
    <ellipse cx="8" cy="7" rx="6" ry="6" fill={color} />
    <ellipse cx="8" cy="7" rx="3" ry="3" fill="white" opacity="0.35" />
    <rect x="7" y="12" width="2" height="10" rx="1" fill="#6b7280" />
  </svg>
);

// Tape corner component
const TapeCorner = ({ rotation = '45deg' }: { rotation?: string }) => (
  <div
    className="absolute w-12 h-4 bg-yellow-200/60 shadow-sm"
    style={{ rotate: rotation, transformOrigin: 'center' }}
  />
);


// ── Modus Operandi Card ─────────────────────────────────────────────────────
const TAG_COLORS = [
  'bg-red-900/60 text-red-200 border-red-700',
  'bg-yellow-900/60 text-yellow-200 border-yellow-700',
  'bg-blue-900/60 text-blue-200 border-blue-700',
  'bg-green-900/60 text-green-200 border-green-700',
  'bg-purple-900/60 text-purple-200 border-purple-700',
];

const ModusOperandiCard = ({
  pinRef,
}: {
  pinRef: React.RefObject<HTMLDivElement>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        className="relative z-20 cursor-pointer group h-full md:col-span-2 lg:col-span-1"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.55, type: 'spring', stiffness: 150, damping: 16 }}
        whileHover={{ scale: 1.03, zIndex: 40 }}
        onClick={() => setOpen(true)}
      >
        {/* Tape top-left */}
        <div className="absolute -top-3 left-4 z-50">
          <TapeCorner rotation="-5deg" />
        </div>
        {/* Pin */}
        <div ref={pinRef} className="absolute -top-3 left-1/2 -translate-x-1/2 z-40">
          <PushPin color="#eab308" />
        </div>

        <div className="bg-[#f5e9d0] text-black p-5 shadow-2xl w-full h-full font-mono relative transition-shadow group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
          />
          <p className="text-[8px] text-black/40 tracking-widest uppercase mb-1 border-b border-black/10 pb-1">
            EXHIBIT M / METHODS
          </p>
          <h3 className="font-bold text-xs tracking-widest text-[#5a1a00] mb-3 uppercase">
            Mode of Operating
          </h3>
          <p className="text-[9px] text-black/50 mb-3 leading-relaxed">Known tech fingerprints across all active cases:</p>
          <div className="flex flex-wrap gap-1.5">
            {ALL_TAGS.map((tag, i) => (
              <span
                key={tag}
                className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm border uppercase tracking-wider ${TAG_COLORS[i % TAG_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-[8px] text-black/30 mt-3 italic">Click to open full report</p>
        </div>
      </motion.div>

      {/* Modus Operandi Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#f5e9d0] text-black p-10 shadow-2xl w-full max-w-2xl font-mono relative border border-[#c9b98a] rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Stamp */}
              <div className="absolute top-8 left-8 border-4 border-amber-800 text-amber-800 px-3 py-1 font-bold tracking-widest text-2xl uppercase rotate-[-12deg] opacity-30 pointer-events-none mix-blend-multiply whitespace-nowrap">
                CLASSIFIED
              </div>

              <button
                className="absolute top-4 right-5 text-black/40 hover:text-red-700 font-bold text-2xl leading-none z-20"
                onClick={() => setOpen(false)}
              >
                &times;
              </button>

              <div className="relative z-10 mt-8">
                <p className="text-[9px] text-black/40 tracking-widest uppercase mb-2 border-b border-black/10 pb-2">
                  EXHIBIT M / FULL METHODS REPORT
                </p>

                <h2 className="font-typewriter text-4xl md:text-5xl font-bold tracking-tight text-[#2a1a10] mb-6 uppercase">
                  Modus Operandi
                </h2>

                <div className="mb-8">
                  <h3 className="text-[10px] text-black/50 font-bold uppercase tracking-widest mb-3 border-b border-black/10 pb-1">KNOWN TECH FINGERPRINTS</h3>
                  <p className="text-sm text-black/60 mb-4">All technologies identified across active case files — deduplicated arsenal profile:</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_TAGS.map((tag, i) => (
                      <span
                        key={tag}
                        className={`text-xs font-bold px-3 py-1.5 rounded-sm border uppercase tracking-wider ${TAG_COLORS[i % TAG_COLORS.length]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-[10px] text-black/50 font-bold uppercase tracking-widest mb-3 border-b border-black/10 pb-1">CROSS-CASE ANALYSIS</h3>
                  <div className="space-y-2 text-sm text-black/70">
                    <p>⬡ <span className="font-bold text-[#5a1a00]">React / FastAPI</span> — Primary full-stack pattern (EduFlash, Code4Crops)</p>
                    <p>⬡ <span className="font-bold text-[#5a1a00]">Python ecosystem</span> — Backend intelligence layer (Cognate, Spinner)</p>
                    <p>⬡ <span className="font-bold text-[#5a1a00]">ML / RAG / Vector</span> — AI-augmented data handling (EduFlash, Cognate)</p>
                    <p>⬡ <span className="font-bold text-[#5a1a00]">Data Visualization</span> — Plotly, Leaflet.js, Streamlit (Code4Crops, Spinner)</p>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="border border-neutral-900 text-neutral-900 text-xs font-bold tracking-widest px-6 py-3 uppercase hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  [ CLOSE REPORT ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Ongoing Investigation Card ──────────────────────────────────────────────
const OngoingInvestigationCard = ({
  pinRef,
}: {
  pinRef: React.RefObject<HTMLDivElement>;
}) => (
  <motion.div
    className="relative z-20 cursor-default group h-full md:col-span-1 lg:col-span-1"
    initial={{ opacity: 0, x: -20, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.65, type: 'spring', stiffness: 150, damping: 16 }}
    whileHover={{ scale: 1.04, zIndex: 40 }}
  >
    {/* Tape top-right */}
    <div className="absolute -top-3 right-4 z-50">
      <TapeCorner rotation="8deg" />
    </div>
    {/* Pin */}
    <div ref={pinRef} className="absolute -top-3 right-1/2 translate-x-1/2 z-40">
      <PushPin color="#22c55e" />
    </div>

    <div className="bg-[#1a1a1a] text-white p-5 shadow-2xl w-full h-full font-mono relative border border-white/10 transition-shadow group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between">
      {/* Scan-line overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)' }}
      />

      {/* Status badge */}
      <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/50 px-1.5 py-0.5 rounded-sm">
        <span className="text-[7px] text-green-400 font-bold tracking-widest uppercase flex items-center gap-1">
          <motion.span
            className="w-1 h-1 rounded-full bg-green-400 inline-block"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          OPEN
        </span>
      </div>

      <p className="text-[8px] text-white/30 tracking-widest uppercase mb-1 border-b border-white/10 pb-1">
        STATUS: ONGOING
      </p>

      {/* Redacted title */}
      <div className="mb-3 mt-2">
        <h3 className="font-bold text-xs tracking-wider text-white/90 uppercase flex items-center gap-2">
          PROJECT
          <span className="bg-white/90 text-transparent select-none px-2 rounded-sm text-xs inline-block" style={{ letterSpacing: '0.1em' }}>
            ████████
          </span>
        </h3>
      </div>

      <p className="text-[9px] text-white/50 leading-relaxed mb-3">
        Active full-stack build — details classified pending release.
      </p>

      <div className="border-t border-white/10 pt-2 flex items-center justify-between">
        <span className="text-[8px] text-white/30 tracking-widest uppercase">ETA</span>
        <span className="text-[9px] text-yellow-400 font-bold tracking-widest">TBD</span>
      </div>

      <div className="mt-2">
        <span className="text-[8px] text-white/20 tracking-wider uppercase">CASE — ONGOING / OPEN</span>
      </div>
    </div>
  </motion.div>
);



// ── Main Board ──────────────────────────────────────────────────────────────
export const CrimesBoard = ({ setActiveView, clusterRef, c1PinRef, c2PinRef, c3PinRef, c4PinRef }: CrimesBoardProps) => {
  const chalkPinRef = useRef<HTMLDivElement>(null);
  const [activeCrime, setActiveCrime] = useState<any | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Per-card pin refs for the string connectors
  const eduflashPinRef = c1PinRef;
  const code4cropsPinRef = c2PinRef;
  const cognatePinRef = c3PinRef;
  const spinnerPinRef = c4PinRef;

  // Extra cards pin refs
  const modusPinRef = useRef<HTMLDivElement>(null);
  const ongoingPinRef = useRef<HTMLDivElement>(null);

  const pinRefs = [c1PinRef, c2PinRef, c3PinRef, c4PinRef];

  return (
    <motion.div
      ref={boardRef}
      key="crimes-board"
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
          <div className="text-center mb-2">
            <h1 className="font-chalk text-4xl tracking-widest uppercase text-white/65">PROJECT ARSENALS</h1>
            <div className="w-24 border-b-2 border-dotted border-white/30 mx-auto mt-2" />
          </div>

          {/* Project Cards */}
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="bg-yellow-200 text-black p-5 shadow-xl font-mono relative cursor-pointer active:scale-95 transition-transform"
              onClick={() => setActiveCrime(project)}
            >
              <div className="absolute top-2 right-2 bg-red-700 text-white text-[7px] font-bold px-2 py-0.5 tracking-widest uppercase">{project.severity}</div>
              <p className="text-[9px] text-black/40 tracking-widest uppercase mb-1">{project.caseNo}</p>
              <h3 className="font-bold text-sm tracking-widest text-[#5a1a00] mb-2 uppercase">CRIME: {project.title}</h3>
              <p className="text-xs text-black/80 leading-relaxed mb-3">{project.crime}</p>
              <div className="border-t border-black/20 pt-2">
                <p className="text-[9px] text-black/50 font-bold uppercase tracking-wider">TECH:</p>
                <p className="text-xs text-black/70 mt-0.5">{project.tech}</p>
              </div>
              <p className="text-[8px] text-black/30 mt-2 italic">Tap to open case file</p>
            </div>
          ))}

          {/* Modus Operandi */}
          <div className="bg-[#f5e9d0] p-5 shadow-xl font-mono border border-[#d4c5a0]">
            <p className="text-[8px] text-black/40 tracking-widest uppercase mb-1 border-b border-black/10 pb-1">EXHIBIT M / METHODS</p>
            <h3 className="font-bold text-xs tracking-widest text-[#5a1a00] mb-3 uppercase">Mode of Operating</h3>
            <p className="text-[9px] text-black/50 mb-3">Known tech fingerprints across all active cases:</p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map((tag, i) => (
                <span key={tag} className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm border uppercase tracking-wider ${TAG_COLORS[i % TAG_COLORS.length]}`}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Ongoing Investigation */}
          <div className="bg-[#1a1a1a] text-white p-5 shadow-xl font-mono border border-white/10">
            <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
              <p className="text-[8px] text-white/30 tracking-widest uppercase">STATUS: ONGOING</p>
              <span className="text-[7px] text-green-400 font-bold border border-green-500/50 px-1.5 py-0.5 tracking-widest uppercase">OPEN</span>
            </div>
            <h3 className="font-bold text-xs text-white/90 uppercase mb-2 flex items-center gap-2">
              PROJECT <span className="bg-white/90 text-transparent px-2 rounded-sm text-xs">████████</span>
            </h3>
            <p className="text-[9px] text-white/50 leading-relaxed mb-3">Active full-stack build — details classified pending release.</p>
            <div className="flex items-center justify-between border-t border-white/10 pt-2">
              <span className="text-[8px] text-white/30 uppercase tracking-wider">ETA</span>
              <span className="text-[9px] text-yellow-400 font-bold">TBD</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Desktop Bento Grid Layout ── */}
      <div className="hidden md:flex flex-col items-center justify-center absolute inset-0 pt-20 px-10 pb-10">
        
        {/* ── "PROJECT ARSENALS" Chalk Title ── */}
        <div className="z-10 pointer-events-none flex flex-col items-center mb-8">
          <h1 className="font-chalk text-5xl md:text-6xl tracking-widest uppercase text-white/65 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            PROJECT ARSENALS
          </h1>
          <div className="w-[90%] border-b-[3px] border-dotted border-white/40 mt-1" />
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl flex-grow auto-rows-[minmax(200px,1fr)]">

      {/* Hidden ref target for board.tsx cluster lines */}
      <div ref={clusterRef} className="absolute top-[14%] left-1/2 -translate-x-1/2 w-1 h-1 opacity-0 pointer-events-none" />

      {/* ── Digital Crosshairs (background) ── */}
      <div className="absolute top-[28%] left-[3%] opacity-20 z-0 pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 6" />
          <path d="M 30 0 L 30 10 M 30 50 L 30 60 M 0 30 L 10 30 M 50 30 L 60 30" stroke="#ef4444" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-[10%] right-[15%] opacity-15 z-0 pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 80 80" className="animate-spin" style={{ animationDuration: '10s' }}>
          <circle cx="40" cy="40" r="35" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="25" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="10 5" />
          <circle cx="40" cy="40" r="2" fill="#ef4444" />
        </svg>
      </div>

      {/* ── Project Sticky Notes in Grid ── */}
      {PROJECTS.map((project, idx) => (
        <motion.div
          key={project.id}
          className={`relative z-20 cursor-pointer group h-full ${project.colSpan || ''}`}
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 + idx * 0.12, type: 'spring', stiffness: 180, damping: 18 }}
          whileHover={{ scale: 1.05, zIndex: 40 }}
          onClick={() => setActiveCrime(project)}
        >
          {/* Push pin */}
          <div ref={pinRefs[idx]} className={`absolute z-40 ${project.pinClass}`}>
            <PushPin color={project.pinColor === 'bg-red-600' ? '#dc2626' : project.pinColor === 'bg-yellow-500' ? '#eab308' : '#22c55e'} />
          </div>

          {/* Tape on CODE4CROPS */}
          {project.id === 'code4crops' && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
              <TapeCorner rotation="0deg" />
            </div>
          )}

          <div className="bg-yellow-200 text-black p-6 shadow-xl w-full h-full font-mono relative transition-shadow group-hover:shadow-2xl flex flex-col">
            {/* Aged paper grain */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
            />
            {/* Severity stamp */}
            <div className="absolute -top-1 -right-1 bg-red-700 text-white text-[7px] font-bold tracking-widest px-1.5 py-0.5 uppercase">
              {project.severity}
            </div>

            {/* Case number */}
            <p className="text-[10px] text-black/40 tracking-widest uppercase mb-2 border-b border-black/10 pb-1">
              {project.caseNo} / EXHIBIT {String(idx + 1).padStart(2, '0')}
            </p>

            <h3 className="font-bold text-base tracking-widest text-[#5a1a00] mb-3 uppercase">
              CRIME: {project.title}
            </h3>

            <p className="text-sm leading-relaxed text-black/80 mb-4 line-clamp-3">
              {project.crime}
            </p>

            <div className="border-t border-black/20 pt-2 mt-auto">
              <p className="text-xs text-black/50 font-bold uppercase tracking-wider">TECH:</p>
              <p className="text-xs text-black/70 mt-0.5">{project.tech}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* ── Modus Operandi Card — desktop only ── */}
      <ModusOperandiCard pinRef={modusPinRef} />

      {/* ── Ongoing Investigation Card — desktop only ── */}
      <OngoingInvestigationCard pinRef={ongoingPinRef} />

      </div>{/* end bento grid container */}
      </div>{/* end desktop-only wrapper */}

      {/* ── Modal Popup — works on both mobile and desktop ── */}
      <AnimatePresence>
        {activeCrime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveCrime(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#EFE3C5] text-black p-8 md:p-12 shadow-2xl w-full max-w-2xl font-mono relative border border-[#c9b98a] rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* RESTRICTED Stamp */}
              <div className="absolute top-8 left-8 border-4 border-red-800 text-red-800 px-3 py-1 font-bold tracking-widest text-lg md:text-2xl uppercase rotate-[-15deg] opacity-40 pointer-events-none mix-blend-multiply whitespace-nowrap z-0">
                RESTRICTED
              </div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-5 text-black/40 hover:text-red-700 font-bold text-2xl leading-none z-20"
                onClick={() => setActiveCrime(null)}
              >
                &times;
              </button>

              <div className="relative z-10 mt-10">
                <p className="text-xs text-black/40 tracking-widest uppercase mb-2 border-b border-black/10 pb-2">
                  {activeCrime.caseNo} / EVIDENCE FILE
                </p>

                <h2 className="font-typewriter text-3xl md:text-5xl font-bold tracking-tight text-[#2a1a10] mb-8 uppercase">
                  {activeCrime.title}
                </h2>

                <div className="mb-8">
                  <h3 className="text-[10px] text-black/50 font-bold uppercase tracking-widest mb-2 border-b border-black/10 pb-1">CASE SUMMARY</h3>
                  <p className="text-base md:text-lg leading-relaxed text-black/90 font-medium">
                    {activeCrime.crime}
                  </p>
                </div>

                <div className="mb-10">
                  <h3 className="text-[10px] text-black/50 font-bold uppercase tracking-widest mb-2 border-b border-black/10 pb-1">ARSENAL DEPLOYED</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeCrime.techTags?.map((tag: string, i: number) => (
                      <span key={tag} className={`text-[10px] font-bold px-2 py-1 rounded-sm border uppercase tracking-wider ${TAG_COLORS[i % TAG_COLORS.length]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  {activeCrime.link && (
                    <a href={activeCrime.link} target="_blank" rel="noopener noreferrer" className="bg-neutral-900 text-white text-xs font-bold tracking-widest px-6 py-3 uppercase hover:bg-neutral-700 transition-colors inline-flex items-center gap-2">
                      [ ACCESS SOURCE CODE : GITHUB ]
                    </a>
                  )}
                  <button onClick={() => setActiveCrime(null)} className="border border-neutral-900 text-neutral-900 text-xs font-bold tracking-widest px-6 py-3 uppercase hover:bg-neutral-900 hover:text-white transition-colors">
                    [ CLOSE FILE ]
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom classified watermark */}
      <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-widest uppercase text-white/15 pointer-events-none">
        CRIMES BOARD — SECTION 01 — CLASSIFIED
      </div>
    </motion.div>
  );
};