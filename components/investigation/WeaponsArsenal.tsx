import React from 'react';
import { motion } from 'framer-motion';

export const WeaponsArsenal = ({ pinRef }: { pinRef: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <motion.div
      className="absolute top-[8%] right-[4%] z-20 w-64 max-w-[16rem] shadow-xl
                 transition-transform duration-200 hover:scale-105 hover:z-40"
      style={{ rotate: '-2deg' }}
      initial={{ opacity: 0, scale: 0.85, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 0.6, type: 'spring' }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
    >
      {/* Torn Paper Effect Container */}
      <div 
        className="bg-[#fcf9eb] relative pb-6 pt-8 px-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #a3c4f3 28px)',
          backgroundPosition: '0 1.2rem',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 95% 100%, 90% 93%, 85% 98%, 80% 95%, 75% 100%, 70% 94%, 65% 99%, 60% 92%, 55% 100%, 50% 95%, 45% 99%, 40% 93%, 35% 100%, 30% 96%, 25% 100%, 20% 94%, 15% 99%, 10% 95%, 5% 100%, 0% 96%)',
        }}
      >
        {/* Masking tape — lighter feel for this notepad */}
        <div ref={pinRef} className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-200/60 border border-amber-300/40 shadow-sm z-40 rotate-[1deg] pointer-events-none" />

        {/* Vertical red margin line */}
        <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-red-400/40" />

        <div className="pl-4 font-mono text-black/90">
          <h3 className="font-bold text-sm tracking-widest text-red-900 mb-4 uppercase underline decoration-red-900/30 underline-offset-4">
            EVIDENCE LOG: RECOVERED ARSENAL
          </h3>
          
          <div className="space-y-3 text-xs leading-relaxed">
            <div>
              <span className="font-bold text-black bg-yellow-300/30 px-1">FRONTEND:</span><br />
              <span className="text-black/80">React, Next.js, Tailwind, Vite</span>
            </div>
            <div>
              <span className="font-bold text-black bg-yellow-300/30 px-1">BACKEND:</span><br />
              <span className="text-black/80">Node.js, Express, FastAPI, MongoDB, MySQL</span>
            </div>
            <div>
              <span className="font-bold text-black bg-yellow-300/30 px-1">LANGUAGES:</span><br />
              <span className="text-black/80">Java, Python, C++, TypeScript</span>
            </div>
            <div>
              <span className="font-bold text-black bg-yellow-300/30 px-1">CREATIVE:</span><br />
              <span className="text-black/80">Photo &amp; Video Editing</span>
            </div>
            <div>
              <span className="font-bold text-black bg-yellow-300/30 px-1">LINGUISTIC:</span><br />
              <span className="text-black/80">Tamil, English</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
