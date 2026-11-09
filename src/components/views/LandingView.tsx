'use client';

import React from 'react';
import Image from 'next/image';
import { GdicLogo } from '../common/GdicLogo';
import { PhoneCall, ArrowRight, Sparkles, Moon, Sun } from 'lucide-react';
import { Language } from '../../types/ivr';
import { playSuccessChime } from '../../lib/audio';

interface LandingViewProps {
  language: Language;
  onSelectLanguageAndStart: (lang: Language) => void;
  onOpenStatus: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  language,
  onSelectLanguageAndStart,
  onOpenStatus,
  isDarkMode,
  onToggleDarkMode
}) => {
  const handleStart = (lang: Language) => {
    playSuccessChime();
    onSelectLanguageAndStart(lang);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-50 dark:bg-[#081124] select-none overflow-y-auto">
      {/* Top Header matching index-page-or-landing-page.png */}
      <header className="w-full bg-[#16325B] dark:bg-[#0c1a33] text-white border-b-2 border-amber-400 px-4 py-2.5 flex items-center justify-between shadow-md flex-shrink-0">
        <h1 className="text-sm font-bold text-white tracking-wide">
          Smart IVR self-service
        </h1>

        <button
          onClick={onToggleDarkMode}
          className="p-1 rounded-lg text-amber-300 hover:text-white hover:bg-white/10 transition"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Main Center Section matching index-page-or-landing-page.png */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-sm mx-auto w-full text-center">
        {/* Green Delta Insurance Logo Box in Royal Blue */}
        <div className="w-full max-w-[260px] p-4 mb-6 rounded-2xl bg-[#16325B] dark:bg-[#0f2342] text-white shadow-xl border border-blue-900/40 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-amber-400/20 rounded-full blur-lg" />
          <GdicLogo size="lg" whiteText={true} />
        </div>

        {/* Bilingual Language Selection Prompt */}
        <div className="mb-6 space-y-0.5">
          <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
            ভাষা নির্বাচন করুন
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Select Language
          </p>
        </div>

        {/* Big Action Buttons matching index-page-or-landing-page.png */}
        <div className="w-full space-y-3">
          {/* English Button */}
          <button
            onClick={() => handleStart('en')}
            className="w-full h-13 rounded-2xl bg-white dark:bg-[#0f1a30] hover:bg-blue-50/50 dark:hover:bg-[#162a4d] border-2 border-slate-200 dark:border-blue-900/60 hover:border-[#16325B] dark:hover:border-amber-400 text-slate-900 dark:text-white font-black text-base shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center justify-center px-5 group"
          >
            <span>English</span>
          </button>

          {/* বাংলা Button */}
          <button
            onClick={() => handleStart('bn')}
            className="w-full h-13 rounded-2xl bg-white dark:bg-[#0f1a30] hover:bg-blue-50/50 dark:hover:bg-[#162a4d] border-2 border-slate-200 dark:border-blue-900/60 hover:border-[#F59E0B] text-slate-900 dark:text-white font-black text-base shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center justify-center px-5 group"
          >
            <span className="text-slate-900 dark:text-white group-hover:text-[#F59E0B] transition-colors">
              বাংলা
            </span>
          </button>
        </div>
      </div>

      {/* Footer Info & Hotline */}
      <footer className="px-4 py-3 border-t border-slate-200 dark:border-blue-950/60 text-center text-[10.5px] text-slate-400 dark:text-slate-500 space-y-1">
        <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-600 dark:text-slate-300">
          <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
          <span>Hotline: <strong className="text-[#16325B] dark:text-amber-300 font-mono">16457</strong></span>
        </div>
        <div>Visual IVR (VIVR) • Green Delta Insurance Company</div>
      </footer>
    </div>
  );
};
