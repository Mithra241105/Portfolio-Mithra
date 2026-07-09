"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LeetCodeTracker } from './LeetCodeTracker';
import { WeaponsArsenal } from './WeaponsArsenal';
import { GitHubTracker } from './GitHubTracker';

interface IntroductionBoardProps {
  setActiveView: (view: 'intro' | 'crimes' | 'credibility') => void;
  dossierPinRef: React.RefObject<HTMLDivElement | null>;
  polaroidPinRef: React.RefObject<HTMLDivElement | null>;
  leetcodePinRef: React.RefObject<HTMLDivElement | null>;
  aliasPinRef: React.RefObject<HTMLDivElement | null>;
  tipBoxPinRef: React.RefObject<HTMLDivElement | null>;
  arsenalPinRef: React.RefObject<HTMLDivElement | null>;
  githubPinRef: React.RefObject<HTMLDivElement | null>;
}

// Masking tape strip — more organic than a pin for sticky notes
const MaskingTape = ({ className = '' }: { className?: string }) => (
  <div
    className={`absolute w-16 h-5 bg-amber-200/60 border border-amber-300/40 shadow-sm pointer-events-none z-40 ${className}`}
    style={{ backdropFilter: 'blur(1px)' }}
  />
);

// Red push-pin for heavier cards
const RedPin = ({ refProp, className = '' }: { refProp?: React.RefObject<HTMLDivElement | null>; className?: string }) => (
  <div
    ref={refProp}
    className={`absolute w-4 h-4 bg-red-600 rounded-full shadow-md z-40 ${className}`}
    style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)' }}
  />
);

export const IntroductionBoard = ({
  setActiveView,
  dossierPinRef,
  polaroidPinRef,
  leetcodePinRef,
  aliasPinRef,
  tipBoxPinRef,
  arsenalPinRef,
  githubPinRef,
}: IntroductionBoardProps) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const json = JSON.stringify(Object.fromEntries(formData));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: json,
      });
      const data = await res.json();
      setFormStatus(data.success ? 'success' : 'error');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <motion.div
      key="intro-board"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute inset-0"
    >
      {/* ═══════════════════════════════════════════════════════════
          MOBILE LAYOUT — scrollable flex column (hidden on md+)
      ═══════════════════════════════════════════════════════════ */}
      <div className="md:hidden absolute inset-0 overflow-y-auto">
        <div className="flex flex-col gap-5 p-4 pb-10">

          {/* Central Dossier */}
          <div className="bg-[#e8d9b5] border border-[#c9b98a] shadow-xl p-6 w-full font-mono relative">
            <div className="absolute top-3 right-4 border-2 border-red-700 text-red-700 px-2 py-0.5 font-bold tracking-widest text-[9px] uppercase rotate-[-8deg] opacity-75 pointer-events-none mix-blend-multiply">
              TOP SECRET
            </div>
            <p className="font-mono text-[10px] text-[#7a6640] tracking-widest uppercase mb-1">Subject Dossier · No. 241105-001</p>
            <h1 className="font-bold text-[#2b1d0e] text-2xl tracking-tight leading-tight mb-4 border-b-2 border-[#b09a6b] pb-3">MITHRA S.</h1>
            <div className="space-y-2 text-sm text-[#3a2a12] mb-5">
              {[
                ['EMAIL', 'mithra112005@gmail.com'],
                ['CONTACT', '+91 87782 75042'],
                ['LOCATION', 'Avalpoondurai'],
                ['OPERATION', 'B.E. CSE @ Nandha College of Technology · Design Lead @ GDG On Campus'],
              ].map(([label, val]) => (
                <div key={label} className="flex gap-2">
                  <span className="font-bold text-[#7a3d00] w-24 shrink-0">{label}:</span>
                  <span>{val}</span>
                </div>
              ))}
              <div className="flex gap-2 items-center">
                <span className="font-bold text-[#7a3d00] w-24 shrink-0">STATUS:</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-600 inline-block animate-pulse" />
                  ACTIVE
                </span>
              </div>
            </div>
            <div className="border-t border-dashed border-[#b09a6b] pt-4">
              <p className="font-mono text-[10px] text-[#8a7250] uppercase tracking-widest mb-3 text-center">— SELECT INVESTIGATION PATH —</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setActiveView('crimes')} className="bg-red-700 text-[#ffe9c8] font-bold font-mono text-[10px] tracking-widest uppercase px-4 py-3 shadow-lg leading-tight text-center flex-1">
                  <div className="text-[8px] opacity-70 mb-1">EVIDENCE TAG #01</div>
                  INVESTIGATE CRIMES
                </button>
                <button onClick={() => setActiveView('credibility')} className="bg-[#2b4d3a] text-[#cfe8d5] font-bold font-mono text-[10px] tracking-widest uppercase px-4 py-3 shadow-lg leading-tight text-center flex-1">
                  <div className="text-[8px] opacity-70 mb-1">EVIDENCE TAG #02</div>
                  CHECK CREDIBILITY
                </button>
              </div>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="bg-white p-3 pb-8 shadow-lg w-56 mx-auto relative">
            <MaskingTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
            <div className="w-full h-52 bg-zinc-200 border border-zinc-300 overflow-hidden mb-2">
              <img src="/images/profile/HEROO1.png" alt="Mithra S." className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-black font-bold font-mono text-xs tracking-widest uppercase">SUBJECT PROFILE</p>
          </div>

          {/* LeetCode */}
          <div className="bg-yellow-100 text-black p-5 shadow-lg w-full font-mono relative">
            <MaskingTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[1deg]" />
            <p className="font-bold text-sm tracking-widest text-[#5a1a00] uppercase border-b border-black/10 pb-2 mb-3">LEETCODE STATUS</p>
            <a href="https://leetcode.com/u/Mithra24/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-800 underline tracking-widest uppercase">[ VIEW PROFILE ]</a>
          </div>

          {/* GitHub */}
          <div className="bg-yellow-100 text-black p-5 shadow-lg w-full font-mono relative">
            <MaskingTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-1deg]" />
            <p className="font-bold text-sm tracking-widest text-[#5a1a00] uppercase border-b border-black/10 pb-2 mb-3">GITHUB STATUS</p>
            <a href="https://github.com/Mithra241105" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-800 underline tracking-widest uppercase">[ VIEW ARCHIVE ]</a>
          </div>

          {/* Arsenal */}
          <div className="bg-[#fcf9eb] p-5 shadow-lg w-full font-mono relative border border-gray-200"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #a3c4f3 28px)', backgroundPosition: '0 1.2rem' }}>
            <MaskingTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[2deg]" />
            <p className="font-bold text-sm tracking-widest text-red-900 mb-3 uppercase underline underline-offset-4">RECOVERED ARSENAL</p>
            <div className="space-y-2 text-xs leading-relaxed pl-1">
              {[
                ['FRONTEND', 'React, Next.js, Tailwind, Vite'],
                ['BACKEND', 'Node.js, Express, FastAPI, MongoDB, MySQL'],
                ['LANGUAGES', 'Java, Python, C++, TypeScript'],
                ['CREATIVE', 'Photo & Video Editing'],
                ['LINGUISTIC', 'Tamil, English'],
              ].map(([label, val]) => (
                <div key={label}>
                  <span className="font-bold text-black bg-yellow-300/30 px-1">{label}:</span><br />
                  <span className="text-black/80">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Known Aliases */}
          <div className="bg-yellow-200 text-black p-5 shadow-lg w-full font-mono relative">
            <MaskingTape className="-top-3 left-8 rotate-[-2deg]" />
            <h3 className="font-bold text-sm tracking-widest text-[#5a1a00] mb-3 uppercase border-b border-black/10 pb-2">KNOWN ALIASES / LINKS</h3>
            <div className="flex flex-col gap-3 text-xs font-bold">
              {[
                ['ARCHIVE: GITHUB', 'https://github.com/Mithra241105'],
                ['NETWORK: LINKEDIN', 'https://www.linkedin.com/in/mithra-s-6a2643329/'],
                ['SECURE: LEETCODE', 'https://leetcode.com/u/Mithra24/'],
                ['FILE: MASTER_RESUME', 'https://drive.google.com/file/d/1cmXDLTysp2ZVgSaeTd2IN9SMlGXbP9Do/view?usp=sharing'],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-red-700 underline underline-offset-4 transition-colors">
                  [ {label} ]
                </a>
              ))}
            </div>
          </div>

          {/* Anonymous Tip */}
          <div className="bg-[#f4ebd0] p-5 shadow-lg w-full font-mono relative border border-[#d3c5a3]">
            <RedPin className="-top-2 right-5" />
            <h3 className="font-bold text-sm tracking-widest text-red-800 mb-3 uppercase border-b-2 border-red-800/20 pb-2">SUBMIT AN ANONYMOUS TIP</h3>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-2.5">
              <input type="hidden" name="access_key" value="0e3f216b-ac95-49e4-a6d0-e02eff5e583d" />
              <input type="text" name="name" placeholder="NAME" required className="bg-white/50 border border-[#d3c5a3] px-3 py-2 text-xs text-black placeholder:text-black/40 focus:outline-none" />
              <input type="email" name="email" placeholder="EMAIL" required className="bg-white/50 border border-[#d3c5a3] px-3 py-2 text-xs text-black placeholder:text-black/40 focus:outline-none" />
              <textarea name="message" placeholder="Send your message through here..." rows={3} required className="bg-white/50 border border-[#d3c5a3] px-3 py-2 text-xs text-black placeholder:text-black/40 focus:outline-none resize-none" />
              <button type="submit" className="bg-red-800 text-white font-bold tracking-widest text-xs py-2 hover:bg-red-900 transition-colors">SEND</button>
            </form>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          DESKTOP LAYOUT — absolute bento grid (md and above)
      ═══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block absolute inset-0">

        {/* ── AMBIENT BACKGROUND ── */}
        <div className="absolute top-[6%] left-1/2 -translate-x-1/2 z-0 pointer-events-none text-center opacity-70">
          <h2 
            className="text-5xl md:text-6xl text-white/40 rotate-[-2deg] border-b-[4px] border-dotted border-white/20 pb-2 inline-block px-8 tracking-[0.15em] mix-blend-overlay"
            style={{ fontFamily: 'var(--font-chalk), cursive' }}
          >
            OPERATION: ARCHITECT
          </h2>
        </div>

        {/* ── LEFT COLUMN ── */}

        {/* TOP-LEFT: LeetCode — masking tape */}
        <LeetCodeTracker pinRef={leetcodePinRef} />

        {/* MID-LEFT: GitHub — masking tape */}
        <GitHubTracker pinRef={githubPinRef} />

        {/* BOTTOM-LEFT: Known Aliases — red pin */}
        <motion.div
          className="absolute bottom-[4%] left-[4%] bg-yellow-200 text-black p-5 shadow-xl w-64 z-20 font-mono
                     transition-transform duration-200 hover:scale-105 hover:z-40"
          style={{ rotate: '-3deg' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <RedPin refProp={aliasPinRef} className="-top-2 left-5" />
          <h3 className="font-bold text-sm tracking-widest text-[#5a1a00] mb-3 uppercase border-b border-black/10 pb-2 mt-2">
            KNOWN ALIASES / LINKS
          </h3>
          <div className="flex flex-col gap-3 text-xs font-bold">
            <a href="https://github.com/Mithra241105" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-red-700 underline underline-offset-4 transition-colors">[ ARCHIVE: GITHUB ]</a>
            <a href="https://www.linkedin.com/in/mithra-s-6a2643329/" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-red-700 underline underline-offset-4 transition-colors">[ NETWORK: LINKEDIN ]</a>
            <a href="https://leetcode.com/u/Mithra24/" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-red-700 underline underline-offset-4 transition-colors">[ SECURE: LEETCODE ]</a>
            <a href="https://drive.google.com/file/d/1cmXDLTysp2ZVgSaeTd2IN9SMlGXbP9Do/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-red-800 hover:text-red-900 underline underline-offset-4 transition-colors font-black">[ FILE: MASTER_RESUME ]</a>
          </div>
        </motion.div>

        {/* ── CENTER CLUSTER (shifted left) ── */}

        {/* Central Dossier — red pin, z-30 beats everything */}
        <motion.div
          className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 z-30 bg-[#e8d9b5] border border-[#c9b98a] shadow-2xl p-8 w-[440px] will-change-transform
                     transition-transform duration-200 hover:scale-[1.02]"
          style={{ boxShadow: '6px 6px 20px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.05)' }}
        >
          <div className="absolute -top-5 left-6 bg-[#e8d9b5] border border-[#c9b98a] border-b-0 px-4 py-1 font-mono text-xs tracking-widest text-[#5a3e1b] uppercase">CASE FILE</div>
          <div className="absolute top-3 right-4 border-2 border-red-700 text-red-700 px-2 py-0.5 font-bold tracking-widest text-[10px] uppercase rotate-[-8deg] opacity-75 pointer-events-none mix-blend-multiply">TOP SECRET</div>
          <RedPin refProp={dossierPinRef} className="-top-2 left-1/2 -translate-x-1/2" />

          <div className="border-b-2 border-[#b09a6b] pb-4 mb-5">
            <p className="font-mono text-[11px] text-[#7a6640] tracking-widest uppercase mb-1">Subject Dossier · No. 241105-001</p>
            <h1 className="font-bold text-[#2b1d0e] text-3xl tracking-tight leading-tight">MITHRA S.</h1>
          </div>

          <div className="space-y-2 font-mono text-sm text-[#3a2a12] mb-6">
            <div className="flex gap-2"><span className="font-bold text-[#7a3d00] w-28 shrink-0">EMAIL:</span><span>mithra112005@gmail.com</span></div>
            <div className="flex gap-2"><span className="font-bold text-[#7a3d00] w-28 shrink-0">CONTACT:</span><span>+91 87782 75042</span></div>
            <div className="flex gap-2"><span className="font-bold text-[#7a3d00] w-28 shrink-0">LOCATION:</span><span>Avalpoondurai</span></div>
            <div className="flex gap-2"><span className="font-bold text-[#7a3d00] w-28 shrink-0">OPERATION:</span><span>B.E. CSE @ Nandha College of Technology · Design Lead @ GDG On Campus</span></div>
            <div className="flex gap-2 items-center">
              <span className="font-bold text-[#7a3d00] w-28 shrink-0">STATUS:</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-600 inline-block animate-pulse" />ACTIVE</span>
            </div>
          </div>

          <div className="border-t border-dashed border-[#b09a6b] pt-5">
            <p className="font-mono text-[10px] text-[#8a7250] uppercase tracking-widest mb-4 text-center">— SELECT INVESTIGATION PATH —</p>
            <div className="flex gap-4 justify-center">
              <motion.button onClick={() => setActiveView('crimes')} className="relative cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <div className="bg-red-700 text-[#ffe9c8] font-bold font-mono text-[11px] tracking-widest uppercase px-5 py-3 shadow-lg leading-tight text-center min-w-[130px]">
                  <div className="text-[8px] opacity-70 mb-1">EVIDENCE TAG #01</div>
                  INVESTIGATE<br />CRIMES
                </div>
              </motion.button>
              <motion.button onClick={() => setActiveView('credibility')} className="relative cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <div className="bg-[#2b4d3a] text-[#cfe8d5] font-bold font-mono text-[11px] tracking-widest uppercase px-5 py-3 shadow-lg leading-tight text-center min-w-[130px]">
                  <div className="text-[8px] opacity-70 mb-1">EVIDENCE TAG #02</div>
                  CHECK<br />CREDIBILITY
                </div>
              </motion.button>
            </div>
          </div>

          <p className="absolute -bottom-8 left-4 text-white/50 text-xs italic">
            *Note for investigators: &apos;Crimes&apos; = Projects, &apos;Credibility&apos; = Experience*
          </p>
        </motion.div>

        {/* Subject Profile — masking tape, close to dossier */}
        <motion.div
          className="absolute top-[42%] left-[62%] -translate-x-1/2 -translate-y-1/2 bg-white p-3 pb-10 shadow-xl z-20 w-64
                     transition-transform duration-200 hover:scale-105 hover:z-40"
          style={{ rotate: '4deg' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          {/* Masking tape instead of pin */}
          <MaskingTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
          {/* Hidden ref pin (invisible, just for layout measurement) */}
          <div ref={polaroidPinRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 opacity-0" />
          <div className="w-full h-64 bg-zinc-200 border border-zinc-300 overflow-hidden mb-3">
            <img src="/images/profile/HEROO1.png" alt="Mithra S." className="w-full h-full object-cover" />
          </div>
          <p className="text-center text-black font-bold font-mono text-sm tracking-widest uppercase">SUBJECT PROFILE</p>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}

        {/* TOP-RIGHT: Evidence Arsenal — masking tape */}
        <WeaponsArsenal pinRef={arsenalPinRef} />

        {/* BOTTOM-RIGHT: Tip Box — red pin */}
        <motion.div
          className="absolute bottom-[6%] right-[4%] bg-[#f4ebd0] p-5 shadow-2xl w-72 max-w-[18rem] z-20 border border-[#d3c5a3]
                     transition-transform duration-200 hover:scale-[1.02] hover:z-40"
          style={{ rotate: '1deg' }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <RedPin refProp={tipBoxPinRef} className="-top-2 right-5" />
          <h3 className="font-bold text-sm tracking-widest text-red-800 mb-2 uppercase border-b-2 border-red-800/20 pb-2 font-mono">
            SUBMIT AN ANONYMOUS TIP
          </h3>

          {formStatus === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-6 text-center font-mono">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 border border-green-200 shadow-sm">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-green-900 font-bold text-sm tracking-widest uppercase mb-2">Tip Received</h4>
              <p className="text-[10px] text-green-800/80 uppercase tracking-widest mb-5 leading-relaxed">Your submission has been securely logged.</p>
              <button onClick={() => setFormStatus('idle')} className="text-[9px] bg-green-800/10 text-green-900 hover:bg-green-800 hover:text-white border border-green-800/20 px-4 py-2 transition-colors uppercase font-bold tracking-widest">
                SEND ANOTHER
              </button>
            </motion.div>
          ) : (
            <>
              <p className="text-[9px] text-[#5a3e1b] font-mono tracking-widest uppercase mb-3 leading-relaxed">
                DIRECT LINE: +91 87782 75042<br />
                SECURE COMMS: mithra112005@gmail.com
              </p>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-2.5 font-mono">
                <input type="hidden" name="access_key" value="0e3f216b-ac95-49e4-a6d0-e02eff5e583d" />
                <input type="text" name="name" placeholder="NAME" required disabled={formStatus === 'submitting'}
                  className="bg-white/50 border border-[#d3c5a3] px-3 py-2 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-red-800/50 disabled:opacity-50" />
                <input type="email" name="email" placeholder="EMAIL" required disabled={formStatus === 'submitting'}
                  className="bg-white/50 border border-[#d3c5a3] px-3 py-2 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-red-800/50 disabled:opacity-50" />
                <textarea name="message" placeholder="Send your message through here..." rows={2} required disabled={formStatus === 'submitting'}
                  className="bg-white/50 border border-[#d3c5a3] px-3 py-2 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-red-800/50 resize-none disabled:opacity-50" />
                <button type="submit" disabled={formStatus === 'submitting'}
                  className="bg-red-800 text-white font-bold tracking-widest text-xs py-2 hover:bg-red-900 transition-colors mt-1 disabled:bg-red-800/50">
                  {formStatus === 'submitting' ? 'SENDING...' : 'SEND'}
                </button>
                {formStatus === 'error' && (
                  <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest text-center mt-1">Failed to send. Try again.</p>
                )}
              </form>
            </>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};
