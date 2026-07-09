"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '@/data/about';
import { Paper } from '../investigation/paper';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const ProfileReport = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex justify-center py-20">

      {/* Back to Board Button */}
      <Link href="/" className="absolute top-4 left-4 z-50 px-4 py-2 bg-ink text-paper font-typewriter hover:bg-evidence-red transition-colors">
        ← BACK TO BOARD
      </Link>

      <Paper
        className="w-full min-h-[800px] max-w-3xl p-12 relative"
        rotation={0}
      >
        {/* Paper Folds (CSS styling for realism) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50.5%,rgba(0,0,0,0)_51%)] bg-[length:100%_33%]" />

        {/* Coffee Stain */}
        <div className="absolute top-10 right-10 w-32 h-32 border-[6px] border-amber-900/30 rounded-full mix-blend-multiply opacity-60 blur-[2px]" />

        {/* Confidential Stamp */}
        <div className="absolute top-8 left-8 border-4 border-evidence-red text-evidence-red px-4 py-2 rotate-[-15deg] font-bold tracking-widest text-3xl uppercase opacity-80 mix-blend-multiply pointer-events-none">
          TOP SECRET
        </div>

        <div className="mt-20 font-typewriter text-ink">

          <header className="border-b-2 border-ink/30 pb-6 mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">NAME: {profileData.name.toUpperCase()}</h1>
              <div className="flex flex-col gap-2 mt-6 text-sm font-bold">
                <a href="mailto:mithra112005@gmail.com" target="_blank" rel="noreferrer" className="text-blue-800 hover:text-evidence-red underline underline-offset-4 decoration-ink/30 hover:decoration-evidence-red transition-colors w-fit">
                  [ EMAIL: mithra112005@gmail.com ]
                </a>
                <a href="https://linkedin.com/in/mithra-s-6a2643329" target="_blank" rel="noreferrer" className="text-blue-800 hover:text-evidence-red underline underline-offset-4 decoration-ink/30 hover:decoration-evidence-red transition-colors w-fit">
                  [ NETWORK: LINKEDIN ]
                </a>
                <a href="https://github.com/Mithra241105" target="_blank" rel="noreferrer" className="text-blue-800 hover:text-evidence-red underline underline-offset-4 decoration-ink/30 hover:decoration-evidence-red transition-colors w-fit">
                  [ ARCHIVE: GITHUB ]
                </a>
              </div>
            </div>

            {/* Photograph Pinned */}
            <div className="relative w-40 h-52 bg-white p-2 shadow-md rotate-3 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-sm border border-red-800" /> {/* Pin */}
              <div className="w-full h-full overflow-hidden border border-zinc-400 bg-zinc-200">
                <img
                  src="/images/profile/hero.png"
                  alt="Mithra S."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </header>

          <main className="space-y-8">
            <section>
              <h2 className="text-xl font-bold bg-ink text-paper inline-block px-2 py-1 mb-4">IDENTIFICATION</h2>
              <div className="grid grid-cols-2 gap-4">
                <p><span className="font-bold">NAME:</span> {profileData.name}</p>

                <p><span className="font-bold">ROLE:</span> {profileData.role}</p>
                <p><span className="font-bold">STATUS:</span> {profileData.status}</p>
                <p className="col-span-2"><span className="font-bold">LOCATION:</span> {profileData.currentLocation}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold bg-ink text-paper inline-block px-2 py-1 mb-4">BACKGROUND</h2>
              <div className="space-y-4">
                {profileData.bio.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed bg-yellow-200/40 inline py-1">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section className="pt-8 border-t border-ink/20">
              <h2 className="text-xl font-bold mb-4">ACTION REQUIRED</h2>
              <p className="mb-4">Review attached documentation for further assessment.</p>

              <a href="https://drive.google.com/file/d/1cmXDLTysp2ZVgSaeTd2IN9SMlGXbP9Do/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-block mt-2 px-6 py-2 border-2 border-evidence-red text-evidence-red font-bold uppercase tracking-widest hover:bg-evidence-red hover:text-paper transition-colors shadow-glow hover:shadow-none">
                [ GET LINKS ]
              </a>
            </section>
          </main>

        </div>
      </Paper>
    </div>
  );
};
