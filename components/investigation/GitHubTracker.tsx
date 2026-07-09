"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GitHubData {
  public_repos: number;
  total_commits: string;
  year_joined: string;
  name: string;
}

export const GitHubTracker = ({ pinRef }: { pinRef: React.RefObject<HTMLDivElement> }) => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Mithra241105');
        if (!res.ok) throw new Error('GitHub API failed');
        const json = await res.json();
        if (isMounted) {
          setData({
            public_repos: json.public_repos,
            total_commits: '500+', // Mocked as API doesn't provide total commits easily
            year_joined: json.created_at ? json.created_at.substring(0, 4) : '2023',
            name: json.name || 'Mithra241105',
          });
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          // Fallback mock data
          setData({ public_repos: 18, total_commits: '500+', year_joined: '2023', name: 'Mithra241105' });
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 left-[5%] z-20 bg-yellow-100 text-black p-6 shadow-xl w-[280px] font-mono
                 transition-transform duration-200 hover:scale-105 hover:z-40"
      style={{ rotate: '1deg' }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.65, type: 'spring' }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
    >
      {/* Masking tape — instead of a pin */}
      <div
        ref={pinRef}
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-200/60 border border-amber-300/40 shadow-sm z-40 rotate-[2deg] pointer-events-none"
      />

      <h3 className="font-bold text-sm tracking-widest text-[#5a1a00] uppercase border-b border-black/10 pb-2 mb-4">
        GITHUB STATUS
      </h3>

      {loading && (
        <div className="text-[11px] text-black/50 tracking-widest uppercase animate-pulse">
          ▌ Accessing Archive...
        </div>
      )}

      {data && !loading && (
        <div className="flex flex-col gap-2 text-sm leading-relaxed">
          <div className="flex justify-between items-center">
            <span className="text-black/50 uppercase tracking-wider text-xs">USER</span>
            <span className="font-bold text-[#5a1a00] text-xs">{data.name}</span>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-2">
            <span className="text-black/50 uppercase tracking-wider text-xs">PUBLIC REPOS</span>
            <span className="font-bold text-base">{data.public_repos}</span>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-2">
            <span className="text-black/50 uppercase tracking-wider text-xs">COMMITS PUSHED</span>
            <span className="font-bold text-base">{data.total_commits}</span>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-2">
            <span className="text-black/50 uppercase tracking-wider text-xs">YEAR JOINED</span>
            <span className="font-bold text-base">{data.year_joined}</span>
          </div>
          <a
            href="https://github.com/Mithra241105"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-blue-800 hover:text-red-700 underline underline-offset-4 mt-2 transition-colors tracking-widest uppercase text-center block"
          >
            [ LINK: VIEW ARCHIVE ]
          </a>
        </div>
      )}
    </motion.div>
  );
};
