"use client";

import { ProfileReport } from '@/components/dossier/profile-report';
import { CursorSpotlight } from '@/components/investigation/cursor-spotlight';

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto">
      {/* ── CINEMATIC DESK BACKGROUND ─────────────────────────────────── */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          background: 'radial-gradient(circle at top center, #3e2723 0%, #1c100b 60%, #0d0705 100%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
        }}
      >
        {/* Subtle grid/texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 48px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 48px)
            `,
          }}
        />
      </div>

      {/* ── INTERACTIVE SPOTLIGHT ─────────────────────────────────────── */}
      <CursorSpotlight />



      {/* ── DOSSIER CONTENT ───────────────────────────────────────────── */}
      <div className="relative z-10 w-full min-h-screen px-4 md:px-8 pt-12 pb-32 flex justify-center">
        <ProfileReport />
      </div>
    </main>
  );
}
