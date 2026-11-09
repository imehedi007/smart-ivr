'use client';

import React from 'react';
import { Volume2, VolumeX, Home, LogOut, MessageSquareText } from 'lucide-react';
import { Language } from '../../types/ivr';

interface IvrBottomNavProps {
  language: Language;
  onGoHome: () => void;
  isAudioPlaying: boolean;
  isMuted?: boolean;
  onToggleAudio: () => void;
  onEndCall: () => void;
  onOpenLiveChat: () => void;
  currentRoute: string;
}

export const IvrBottomNav: React.FC<IvrBottomNavProps> = ({
  language,
  onGoHome,
  isAudioPlaying,
  isMuted = false,
  onToggleAudio,
  onEndCall,
  onOpenLiveChat,
  currentRoute
}) => {
  const isHomeActive = currentRoute === 'main-menu';
  const isVoiceActive = !isMuted;

  return (
    <div className="w-full relative z-30 select-none flex-shrink-0">
      {/* Floating Action Button for Live Chat */}
      <div className="absolute -top-13 right-3.5 z-40">
        <button
          onClick={onOpenLiveChat}
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#16325B] to-[#1E3A8A] border-2 border-amber-400 text-amber-300 shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-95 group focus:outline-none cursor-pointer"
          aria-label="Live Chat"
          title="Green Delta Live Support"
        >
          <MessageSquareText className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-xs" />
        </button>
      </div>

      {/* Main Bottom Navigation Bar with Rounded Top Corners & Shadow Backdrop */}
      <nav
        aria-label="Bottom Navigation"
        className="w-full rounded-t-[26px] bg-white/95 dark:bg-[#0c1a33]/95 backdrop-blur-md border-t border-x border-slate-200/80 dark:border-blue-900/50 shadow-[0_-8px_25px_rgba(0,0,0,0.09),0_-2px_6px_rgba(0,0,0,0.04)] dark:shadow-[0_-12px_32px_rgba(0,0,0,0.45)] px-5 pt-3 pb-2"
      >
        <div className="flex items-center justify-around max-w-[360px] mx-auto">
          {/* 1. Voice / Audio Button */}
          <button
            onClick={onToggleAudio}
            className="flex flex-col items-center justify-center gap-1 group py-0.5 px-3 rounded-xl transition active:scale-95 cursor-pointer"
            title={
              isVoiceActive && isAudioPlaying
                ? (language === 'en' ? 'Mute Voice' : 'মিউট করুন')
                : (language === 'en' ? 'Play Voice' : 'ভয়েস শুনুন')
            }
            aria-label="Toggle Voice"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                isVoiceActive && isAudioPlaying
                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/70 dark:text-amber-300 shadow-xs border border-amber-300/80 dark:border-amber-700/60'
                  : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 group-hover:bg-blue-50 group-hover:text-[#16325B] dark:group-hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-700'
              }`}
            >
              {isVoiceActive && isAudioPlaying ? (
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-3.5 bg-amber-500 rounded-full animate-eq-1" />
                  <span className="w-0.5 h-4.5 bg-amber-500 rounded-full animate-eq-2" />
                  <span className="w-0.5 h-2.5 bg-amber-500 rounded-full animate-eq-3" />
                </div>
              ) : (
                <VolumeX className="w-5 h-5 stroke-[2]" />
              )}
            </div>
            <span
              className={`text-[10px] transition-colors leading-none ${
                isVoiceActive && isAudioPlaying
                  ? 'text-amber-600 dark:text-amber-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium group-hover:text-[#16325B] dark:group-hover:text-white'
              }`}
            >
              {language === 'en' ? 'Voice' : 'ভয়েস'}
            </span>
          </button>

          {/* 2. Home Button (Center - Highlighted when on main-menu) */}
          <button
            onClick={onGoHome}
            className="flex flex-col items-center justify-center gap-1 group py-0.5 px-3 rounded-xl transition active:scale-95 cursor-pointer -mt-2.5"
            title="Main Menu"
            aria-label="Home"
          >
            <div
              className={`w-12 h-12 rounded-[20px] flex items-center justify-center transition-all ${
                isHomeActive
                  ? 'bg-gradient-to-tr from-[#16325B] to-[#1E3A8A] text-amber-300 border-2 border-amber-400 shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 group-hover:bg-blue-50 group-hover:text-[#16325B] dark:group-hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700 shadow-xs'
              }`}
            >
              <Home className={`w-6 h-6 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
            </div>
            <span
              className={`text-[10.5px] transition-colors leading-none ${
                isHomeActive
                  ? 'text-[#16325B] dark:text-amber-300 font-bold'
                  : 'text-slate-500 dark:text-slate-400 font-medium group-hover:text-[#16325B] dark:group-hover:text-white'
              }`}
            >
              {language === 'en' ? 'Home' : 'হোম'}
            </span>
          </button>

          {/* 3. Exit Button (Right - Styled Red Exit Icon) */}
          <button
            onClick={onEndCall}
            className="flex flex-col items-center justify-center gap-1 group py-0.5 px-3 rounded-xl transition active:scale-95 cursor-pointer"
            title="Exit Session"
            aria-label="Exit"
          >
            <div className="w-11 h-11 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-500 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white flex items-center justify-center transition-all border border-rose-200/80 dark:border-rose-900/50 shadow-xs">
              <LogOut className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-semibold text-rose-500 dark:text-rose-400 group-hover:text-rose-600 transition-colors leading-none">
              {language === 'en' ? 'Exit' : 'প্রস্থান'}
            </span>
          </button>
        </div>

        {/* Footer Credit Line centered with reduced font size */}
        <div className="w-full flex items-center justify-center px-3 pt-2 pb-0.5 text-[8px] text-slate-400 dark:text-slate-500 font-medium tracking-tight">
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
        </div>
      </nav>
    </div>
  );
};
