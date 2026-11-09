'use client';

import React, { useState } from 'react';
import { X, Delete, Phone, PhoneCall } from 'lucide-react';
import { playDtmfTone } from '../../lib/audio';
import { Language } from '../../types/ivr';

interface DialpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectOptionByCode: (code: string) => void;
  onReplayPrompt: () => void;
}

const KEYS = [
  { key: '1', sub: 'GDIC', labelEn: 'Product & Service', labelBn: 'প্রোডাক্ট ও সেবা' },
  { key: '2', sub: 'ABC', labelEn: 'Bancassurance', labelBn: 'ব্যাংকাসুরেন্স' },
  { key: '3', sub: 'DEF', labelEn: 'Branch Location', labelBn: 'শাখা লোকেশন' },
  { key: '4', sub: 'GHI', labelEn: 'New Campaign', labelBn: 'চলমান অফার' },
  { key: '5', sub: 'JKL', labelEn: 'My Policy', labelBn: 'আমার পলিসি' },
  { key: '6', sub: 'MNO', labelEn: 'Quotation Request', labelBn: 'কোটেশন রিকোয়েস্ট' },
  { key: '7', sub: 'PQRS', labelEn: 'Support & Callback', labelBn: 'গ্রাহক সহায়তা' },
  { key: '8', sub: 'TUV', labelEn: 'Insurance Calculator', labelBn: 'বীমা ক্যালকুলেটর' },
  { key: '9', sub: 'WXYZ', labelEn: 'Find Nearest Branch', labelBn: 'নিকটতম শাখা' },
  { key: '*', sub: 'Replay', labelEn: 'Repeat Prompt', labelBn: 'পুনরায় শুনুন' },
  { key: '0', sub: '+', labelEn: 'Hotline 16457', labelBn: 'হটলাইন ১৬৪৫৭' },
  { key: '#', sub: 'Home', labelEn: 'Main Menu', labelBn: 'মেইন মেনু' }
];

export const DialpadModal: React.FC<DialpadModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectOptionByCode,
  onReplayPrompt
}) => {
  const [dialed, setDialed] = useState<string>('');

  if (!isOpen) return null;

  const handleKeyPress = (key: string) => {
    playDtmfTone(key);
    setDialed((prev) => (prev.length < 10 ? prev + key : prev));

    if (key === '*') {
      onReplayPrompt();
      return;
    }

    if (key === '#') {
      onSelectOptionByCode('home');
      onClose();
      return;
    }

    // Direct routing for IVR numbers 1-7
    const num = parseInt(key, 10);
    if (!isNaN(num) && num >= 1 && num <= 7) {
      setTimeout(() => {
        onSelectOptionByCode(key);
        onClose();
      }, 250);
    }
  };

  const handleBackspace = () => {
    setDialed((prev) => prev.slice(0, -1));
  };

  const currentHint = KEYS.find((k) => k.key === dialed.slice(-1));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-[420px] bg-white dark:bg-[#0c1a33] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-5 overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-[#16325B] dark:text-amber-400">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black tracking-wide uppercase text-slate-800 dark:text-white">
                {language === 'en' ? 'Smart IVR Keypad' : 'স্মার্ট আইভিআর কিপ্যাড'}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                {language === 'en' ? 'Touch dial tones (DTMF)' : 'সরাসরি সংখ্যা চেপে নেভিগেট করুন'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dialed Display & Action Hint */}
        <div className="my-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-blue-900/30 flex items-center justify-between min-h-[56px]">
          <div className="flex flex-col">
            <div className="text-xl font-mono font-bold tracking-widest text-[#16325B] dark:text-amber-400">
              {dialed || <span className="text-slate-300 dark:text-slate-600 text-sm">Press 1 – 7</span>}
            </div>
            {currentHint && (
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                {language === 'en' ? currentHint.labelEn : currentHint.labelBn}
              </span>
            )}
          </div>

          {dialed && (
            <button
              onClick={handleBackspace}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
            >
              <Delete className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Keypad Grid (3 columns) */}
        <div className="grid grid-cols-3 gap-2.5 my-2">
          {KEYS.map((k) => (
            <button
              key={k.key}
              onClick={() => handleKeyPress(k.key)}
              className="h-14 rounded-2xl bg-slate-100/80 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-[#162b4d] active:bg-[#16325B] active:text-amber-300 border border-slate-200/60 dark:border-blue-900/30 flex flex-col items-center justify-center transition-all duration-150 active:scale-95 group"
            >
              <span className="text-xl font-black text-slate-800 dark:text-white group-active:text-amber-300">
                {k.key}
              </span>
              {k.sub && (
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest group-hover:text-[#16325B] dark:group-hover:text-amber-300">
                  {k.sub}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Dialpad Quick Legend */}
        <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
          Press <strong>#</strong> for Main Menu • Press <strong>*</strong> to Replay Audio
        </div>
      </div>
    </div>
  );
};
