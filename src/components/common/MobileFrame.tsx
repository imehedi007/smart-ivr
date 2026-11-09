'use client';

import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  isCallActive?: boolean;
  callDurationSeconds?: number;
  isDarkMode?: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  isDarkMode
}) => {
  return (
    <div className={`h-[100dvh] max-h-[100dvh] w-full bg-slate-950/95 dark:bg-black flex items-center justify-center p-0 overflow-hidden select-none ${isDarkMode ? 'dark' : ''}`}>
      {/* Clean Mobile App Viewport - Centered on desktop, full-width on mobile, NO fake borders or hardware notches */}
      <div className={`w-full max-w-[430px] h-[100dvh] max-h-[100dvh] bg-slate-50 dark:bg-[#081124] flex flex-col relative overflow-hidden shadow-2xl md:border-x md:border-slate-800/60 ${isDarkMode ? 'dark' : ''}`}>
        {/* Dynamic Screen Content Wrapper */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
