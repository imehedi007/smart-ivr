'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { Language } from '../../types/ivr';

interface EndCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmEnd: () => void;
  language: Language;
  callDurationSeconds: number;
}

export const EndCallModal: React.FC<EndCallModalProps> = ({
  isOpen,
  onClose,
  onConfirmEnd,
  language,
  callDurationSeconds
}) => {
  if (!isOpen) return null;

  const m = Math.floor(callDurationSeconds / 60).toString().padStart(2, '0');
  const s = (callDurationSeconds % 60).toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-[380px] bg-white dark:bg-[#0c1a33] rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-6 flex flex-col items-center text-center overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-3">
          <LogOut className="w-7 h-7" />
        </div>

        <h3 className="text-base font-black text-slate-900 dark:text-white">
          {language === 'en' ? 'Cancel Smart IVR Session?' : 'স্মার্ট আইভিআর সেশন সমাপ্ত করবেন?'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[270px]">
          {language === 'en'
            ? `Your active session duration is ${m}:${s}. Are you sure you want to cancel?`
            : `আপনার সক্রিয় সেশনের সময়কাল ${m}:${s}। আপনি কি সেশনটি বাতিল করতে চান?`}
        </p>

        <div className="w-full flex items-center gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            {language === 'en' ? 'Continue' : 'চালিয়ে যান'}
          </button>
          <button
            onClick={onConfirmEnd}
            className="flex-1 h-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
          >
            {language === 'en' ? 'Cancel' : 'বাতিল'}
          </button>
        </div>
      </div>
    </div>
  );
};

