'use client';

import React from 'react';
import { LayoutGrid, ArrowLeft, Volume2, Home, Power, MessageSquareText } from 'lucide-react';

interface IvrBottomNavProps {
  canGoBack: boolean;
  onGoBack: () => void;
  onGoHome: () => void;
  onOpenDialpad: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onEndCall: () => void;
  onOpenLiveChat: () => void;
  currentRoute: string;
}

export const IvrBottomNav: React.FC<IvrBottomNavProps> = ({
  canGoBack,
  onGoBack,
  onGoHome,
  onOpenDialpad,
  isAudioPlaying,
  onToggleAudio,
  onEndCall,
  onOpenLiveChat,
  currentRoute
}) => {
  return (
    <div className="w-full relative z-30 select-none flex-shrink-0">
      {/* Floating Action Button for Live Chat */}
      <div className="absolute -top-12 right-3 z-40">
        <button
          onClick={onOpenLiveChat}
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#16325B] to-[#1E3A8A] border-2 border-amber-400 text-amber-300 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95 group focus:outline-none"
          aria-label="Live Chat"
          title="Green Delta Live Support"
        >
          <MessageSquareText className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
        </button>
      </div>

      {/* Main Bottom Navigation Bar */}
      <nav aria-label="Bottom Navigation" className="w-full bg-white dark:bg-[#0c1a33] border-t border-slate-200/90 dark:border-blue-900/40 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-2 pt-1 pb-1">
        <div className="flex items-center justify-between h-12 max-w-md mx-auto">
          {/* Keypad/Menu Button with Blue & Yellow Styling */}
          <div className="relative">
            <button
              onClick={onOpenDialpad}
              className="relative px-3.5 py-1.5 flex items-center justify-center text-white bg-[#16325B] hover:bg-[#1f4277] border-b-2 border-amber-400 rounded-r-xl rounded-l-md transition active:scale-95 shadow-sm group"
              title="Open Keypad"
            >
              <LayoutGrid className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-12" />
            </button>
          </div>

          {/* Back Arrow Button */}
          <button
            onClick={onGoBack}
            disabled={!canGoBack}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition active:scale-95 ${
              canGoBack
                ? 'text-[#16325B] dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            }`}
            title="Go Back"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Audio Speaker Button (Interactive Voice IVR Simulation) */}
          <button
            onClick={onToggleAudio}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition active:scale-95 ${
              isAudioPlaying
                ? 'bg-amber-100 text-amber-700 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
                : 'text-[#16325B] dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/40'
            }`}
            title={isAudioPlaying ? 'Mute IVR Speech' : 'Play IVR Voice Announcement'}
            aria-label="Toggle Voice Readout"
          >
            {isAudioPlaying ? (
              <div className="flex items-center gap-0.5">
                <span className="w-1 h-3 bg-amber-500 rounded-full animate-eq-1" />
                <span className="w-1 h-3.5 bg-amber-500 rounded-full animate-eq-2" />
                <span className="w-1 h-2 bg-amber-500 rounded-full animate-eq-3" />
              </div>
            ) : (
              <Volume2 className="w-5 h-5 stroke-[2.2]" />
            )}
          </button>

          {/* Home Button */}
          <button
            onClick={onGoHome}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition active:scale-95 ${
              currentRoute === 'main-menu'
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                : 'text-[#16325B] dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/40'
            }`}
            title="Main Menu"
            aria-label="Main Menu"
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* End Call / Disconnect Button */}
          <button
            onClick={onEndCall}
            className="w-10 h-10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition active:scale-95"
            title="End Session"
            aria-label="End Session"
          >
            <Power className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Footer Credit Line matching screenshots */}
        <div className="w-full flex items-center justify-between px-3 pt-0 pb-0.5 text-[8.5px] text-slate-400 dark:text-slate-500 font-medium tracking-tight">
          <a
            href="https://www.linkedin.com/in/ali-imranmehedi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1 group"
            title="Smart IVR Concept by Imran Mehedi"
          >
            <span>Smart IVR Concept by</span>
            <span className="font-semibold text-slate-500 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 underline decoration-slate-300 dark:decoration-slate-700 group-hover:decoration-amber-500 underline-offset-2">
              Imran Mehedi
            </span>
          </a>
          <span className="text-amber-500/80 dark:text-amber-400/80 font-semibold">Green Delta Insurance</span>
        </div>
      </nav>
    </div>
  );
};
