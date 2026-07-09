import React from 'react';

export const BoardClutter = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      
      {/* ── Redacted Scrap (Top Left Corner) ── */}
      <div className="absolute top-[8%] left-[4%] w-20 h-20 bg-[#f4ebd0] opacity-80 shadow-sm border border-black/10 rotate-[-15deg] p-2 flex flex-col justify-between">
        {/* Fake text covered by redaction marker */}
        <div className="w-full h-3 bg-black/90 transform rotate-1" />
        <div className="w-[80%] h-3 bg-black/90 transform -rotate-1 ml-1" />
        <div className="w-[90%] h-3 bg-black/90 transform rotate-2" />
        <div className="w-[60%] h-3 bg-black/90 transform -rotate-1 ml-2" />
      </div>

      {/* ── Redacted Scrap (Bottom Right Corner) ── */}
      <div className="absolute bottom-[5%] right-[8%] w-16 h-24 bg-[#e8e6e1] opacity-70 shadow-sm border border-black/10 rotate-[22deg] p-2 flex flex-col justify-around">
        <div className="w-[80%] h-3 bg-black/90 ml-1" />
        <div className="w-full h-3 bg-black/90 transform rotate-1" />
        <div className="w-[90%] h-3 bg-black/90 transform -rotate-2" />
        <div className="w-full h-3 bg-black/90 transform rotate-2" />
        <div className="w-[70%] h-3 bg-black/90 ml-2" />
      </div>

    </div>
  );
};
