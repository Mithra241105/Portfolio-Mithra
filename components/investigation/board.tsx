"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CursorSpotlight } from './cursor-spotlight';
import { IntroductionBoard } from './IntroductionBoard';
import { CrimesBoard } from './CrimesBoard';
import { CredibilityBoard } from './CredibilityBoard';

export type ActiveView = 'intro' | 'crimes' | 'credibility';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Point { x: number; y: number }
interface StringLine { start: Point; end: Point }

// ─── Animated Dotted Path ────────────────────────────────────────────────────
// 1. Waits 1 second (delay)
// 2. Draws itself from start to end over 1.5s
// 3. AFTER draw completes (at 2.5s total), begins infinite marching-ant offset loop
const YarnPath = ({ d }: { d: string }) => {
  if (!d) return null;
  return (
    <motion.path
      d={d}
      stroke="#ef4444"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="6, 6"
      style={{ filter: "drop-shadow(0 0 4px #ef4444)" }}
      initial={{ pathLength: 0, strokeDashoffset: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: 0.8,
        strokeDashoffset: [0, -48],
      }}
      transition={{
        // Delay before anything appears
        opacity: { delay: 1, duration: 0.1 },
        // Draw from center outward
        pathLength: { delay: 1, duration: 1.5, ease: 'easeInOut' },
        // Marching ants starts after draw finishes (1 + 1.5 = 2.5s total)
        strokeDashoffset: {
          delay: 2.5,
          repeat: Infinity,
          duration: 1.2,
          ease: 'linear',
        },
      }}
    />
  );
};

// ─── Chaotic Bezier builder (Crazy Wall Yarn Engine) ──────────────────────────
const buildCrazyPath = (s: Point, e: Point, i: number, view: string): string => {
  const dx = e.x - s.x;
  const dy = e.y - s.y;
  
  let cp1x = s.x;
  let cp1y = s.y;
  let cp2x = e.x;
  let cp2y = e.y;

  if (view === 'intro') {
    if (i === 0) { // Polaroid (Top-Right)
      cp1x = s.x + 100; cp1y = s.y - 150;
      cp2x = e.x - 50;  cp2y = e.y - 150;
    } else if (i === 1) { // LeetCode (Top-Left)
      cp1x = s.x - 100; cp1y = s.y - 200;
      cp2x = e.x + Math.abs(dx) * 0.5; cp2y = e.y - 100;
    } else if (i === 2) { // Aliases (Bottom-Left)
      // Throw string out wide to the left to avoid crossing the center card
      cp1x = s.x - 300; cp1y = s.y - 50;
      cp2x = e.x + 50;  cp2y = e.y - 200;
    } else if (i === 3) { // TipBox (Bottom-Right)
      // Throw string out wide to the right to avoid crossing the center card
      cp1x = s.x + 300; cp1y = s.y - 50;
      cp2x = e.x - 50;  cp2y = e.y - 200;
    } else if (i === 4) { // Arsenal (Mid-Right)
      // Loop down and to the right
      cp1x = s.x + 150; cp1y = s.y + 100;
      cp2x = e.x - 100; cp2y = e.y - 100;
    }
  } else {
    // Crimes & Credibility sub-boards (from top-center anchor)
    if (i === 0) { // Left card
      cp1x = s.x - 200; cp1y = s.y + 50;
      cp2x = e.x + 100; cp2y = e.y - 150;
    } else if (i === 1) { // Center card
      cp1x = s.x + 150; cp1y = s.y + dy * 0.4;
      cp2x = e.x - 100; cp2y = e.y - 150;
    } else if (i === 2) { // Right card
      cp1x = s.x + 200; cp1y = s.y + 50;
      cp2x = e.x - 100; cp2y = e.y - 150;
    }
  }

  // Create SVG Cubic Bezier Curve (C)
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)} ${cp2x.toFixed(1)} ${cp2y.toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
};

// ─── Get center of a DOM element as absolute page coords ──────────────────────
const getCenter = (el: HTMLElement | null, boardRect: DOMRect | null): Point | null => {
  if (!el || !boardRect) return null;
  const r = el.getBoundingClientRect();
  return {
    x: r.left - boardRect.left + r.width / 2,
    y: r.top - boardRect.top + r.height / 2,
  };
};

// ─── Main Board ───────────────────────────────────────────────────────────────
export const InvestigationBoard = () => {
  const [activeView, setActiveView] = useState<ActiveView>('intro');
  const [lines, setLines] = useState<StringLine[]>([]);

  // Board container ref (for relative coordinate calculation)
  const boardRef = useRef<HTMLDivElement>(null);

  // Pin refs — one per card
  const dossierPinRef   = useRef<HTMLDivElement>(null);
  const polaroidPinRef  = useRef<HTMLDivElement>(null);
  const leetcodePinRef  = useRef<HTMLDivElement>(null);
  const aliasPinRef     = useRef<HTMLDivElement>(null);
  const tipBoxPinRef    = useRef<HTMLDivElement>(null);
  const arsenalPinRef   = useRef<HTMLDivElement>(null);
  const githubPinRef    = useRef<HTMLDivElement>(null);
  
  const clusterRef      = useRef<HTMLDivElement>(null);
  const c1PinRef        = useRef<HTMLDivElement>(null);
  const c2PinRef        = useRef<HTMLDivElement>(null);
  const c3PinRef        = useRef<HTMLDivElement>(null);
  const c4PinRef        = useRef<HTMLDivElement>(null);
  const e1PinRef        = useRef<HTMLDivElement>(null);
  const e2PinRef        = useRef<HTMLDivElement>(null);
  const e3PinRef        = useRef<HTMLDivElement>(null);
  const e4PinRef        = useRef<HTMLDivElement>(null);
  const gdgPinRef       = useRef<HTMLDivElement>(null);
  const symposiumPinRef = useRef<HTMLDivElement>(null);

  const measureLines = useCallback(() => {
    if (!boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();

    const origin = getCenter(dossierPinRef.current, boardRect);
    const cluster = getCenter(clusterRef.current, boardRect);

    if (activeView === 'intro' && origin) {
      const targets = [
        getCenter(polaroidPinRef.current, boardRect),
        getCenter(leetcodePinRef.current, boardRect),
        getCenter(aliasPinRef.current, boardRect),
        getCenter(tipBoxPinRef.current, boardRect),
        getCenter(arsenalPinRef.current, boardRect),
      ];

      setLines(targets.filter(Boolean).map(t => ({ start: origin, end: t as Point })));
    } else if (activeView === 'crimes' && cluster) {
      const targets = [
        getCenter(c1PinRef.current, boardRect),
        getCenter(c2PinRef.current, boardRect),
        getCenter(c3PinRef.current, boardRect),
        getCenter(c4PinRef.current, boardRect),
      ];

      setLines(targets.filter(Boolean).map(t => ({ start: cluster, end: t as Point })));
    } else if (activeView === 'credibility' && cluster) {
      const targets = [
        getCenter(e1PinRef.current, boardRect),
        getCenter(e2PinRef.current, boardRect),
        getCenter(e3PinRef.current, boardRect),
        getCenter(e4PinRef.current, boardRect),
        getCenter(symposiumPinRef.current, boardRect),
      ];

      const newLines = targets.filter(Boolean).map(t => ({ start: cluster, end: t as Point }));
      
      // Connect GDG Badge directly to the GDG Field Report (sub-cluster)
      const gdgCard = getCenter(e4PinRef.current, boardRect);
      const gdgBadge = getCenter(gdgPinRef.current, boardRect);
      if (gdgCard && gdgBadge) {
        newLines.push({ start: gdgCard, end: gdgBadge });
      }

      setLines(newLines);
    }
  }, [activeView]);

  // Measure after view changes and give DOM time to paint
  useEffect(() => {
    setLines([]); // Clear old lines immediately on view switch
    const t = setTimeout(measureLines, 80);
    return () => clearTimeout(t);
  }, [activeView, measureLines]);

  // Re-measure on resize
  useEffect(() => {
    window.addEventListener('resize', measureLines);
    return () => window.removeEventListener('resize', measureLines);
  }, [measureLines]);

  const titles = {
    intro: 'Dossier | Mithra S.',
    crimes: 'Offenses | Mithra S.',
    credibility: 'Credibility | Mithra S.',
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
      <title>{titles[activeView] || 'Mithra S.'}</title>
      <CursorSpotlight />

      <div
        ref={boardRef}
        className="relative w-[98vw] h-[95vh] max-w-none rounded-lg shadow-2xl overflow-hidden select-none"
        style={{
          background: 'linear-gradient(135deg, #2d5240 0%, #1e3d2c 50%, #152a1e 100%)',
          border: '10px solid #3e2723',
          boxShadow: '0 0 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Corkboard grid texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg,   rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 48px),
              repeating-linear-gradient(90deg,  rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 48px)
            `,
          }}
        />

        {/* ── DYNAMIC CONTENT AREA ────────────────────────────────────── */}
        {/* Cards are z-20. The SVG is z-30 (above cards), and pins are z-40 (above SVG) 
            so strings lay ON TOP of the cards but UNDER the pinheads! */}
        <AnimatePresence mode="wait">
          {activeView === 'intro' && (
            <IntroductionBoard
              key="intro"
              setActiveView={setActiveView}
              dossierPinRef={dossierPinRef}
              polaroidPinRef={polaroidPinRef}
              leetcodePinRef={leetcodePinRef}
              aliasPinRef={aliasPinRef}
              tipBoxPinRef={tipBoxPinRef}
              arsenalPinRef={arsenalPinRef}
              githubPinRef={githubPinRef}
            />
          )}
          {activeView === 'crimes' && (
            <CrimesBoard
              key="crimes"
              setActiveView={setActiveView}
              clusterRef={clusterRef}
              c1PinRef={c1PinRef}
              c2PinRef={c2PinRef}
              c3PinRef={c3PinRef}
              c4PinRef={c4PinRef}
            />
          )}
          {activeView === 'credibility' && (
            <CredibilityBoard
              key="credibility"
              setActiveView={setActiveView}
              clusterRef={clusterRef}
              e1PinRef={e1PinRef}
              e2PinRef={e2PinRef}
              e3PinRef={e3PinRef}
              e4PinRef={e4PinRef}
              gdgPinRef={gdgPinRef}
              symposiumPinRef={symposiumPinRef}
            />
          )}
        </AnimatePresence>

        {/* Board label watermark */}
        <div className="absolute bottom-3 right-4 z-10 pointer-events-none select-none font-typewriter text-[10px] tracking-widest uppercase text-white/20">
          INVESTIGATION BOARD — CASE NO. 241105 — CLASSIFIED
        </div>
      </div>
    </div>
  );
};
