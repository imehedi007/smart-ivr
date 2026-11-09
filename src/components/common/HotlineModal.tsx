'use client';

import React, { useState } from 'react';
import { X, PhoneCall, Copy, Check, Clock, ShieldCheck, Headphones, ExternalLink } from 'lucide-react';
import { Language } from '../../types/ivr';

interface HotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenSupport?: () => void;
}

export const HotlineModal: React.FC<HotlineModalProps> = ({
  isOpen,
  onClose,
  language,
  onOpenSupport
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('16457').then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-[380px] bg-white dark:bg-[#0c1a33] rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-5 overflow-hidden animate-in zoom-in-95 duration-200 relative">
        {/* Top Gold Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white leading-none">
                {language === 'en' ? 'Hotline 16457' : 'হটলাইন ১৬৪৫৭'}
              </h3>
              <span className="text-[9.5px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {language === 'en' ? '24/7 Agent Available' : '২৪/৭ সার্বক্ষণিক সক্রিয়'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Calling Card */}
        <div className="my-5 flex flex-col items-center text-center">
          {/* Animated Pulsing Phone Icon */}
          <div className="relative w-20 h-20 flex items-center justify-center mb-3">
            <span className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-emerald-500/30 animate-ping" />
            <span className="absolute -inset-2 rounded-full border-2 border-emerald-400/40 dark:border-emerald-400/20 animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg relative z-10">
              <PhoneCall className="w-8 h-8 animate-bounce" />
            </div>
          </div>

          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {language === 'en'
              ? 'Green Delta 24/7 Dedicated Helpline'
              : 'গ্রিন ডেল্টা ডেডিকেটেড হেল্পলাইন'}
          </p>

          {/* Hotline Number Display */}
          <div className="mt-1 mb-2 px-5 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-blue-900/40 flex items-center gap-3 shadow-inner">
            <span className="text-3xl font-black text-[#16325B] dark:text-amber-300 font-mono tracking-wider">
              16457
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-amber-500 border border-slate-200 dark:border-slate-700 transition active:scale-95 cursor-pointer"
              title="Copy number"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          {copied && (
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in">
              {language === 'en' ? 'Number copied to clipboard!' : 'নম্বর কপি করা হয়েছে!'}
            </span>
          )}

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-[280px]">
            {language === 'en'
              ? 'Directly connect with our customer service representative for claims, policy inquiry, or immediate assistance.'
              : 'ক্লেইম ইন্টিমেশন, পলিসি সম্পর্কিত তথ্য বা যেকোনো সহায়তার জন্য সরাসরি আমাদের প্রতিনিধির সাথে কথা বলুন।'}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-[10.5px]">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-blue-950 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {language === 'en' ? '24/7 Hotline Support' : '২৪/৭ সার্বক্ষণিক কল'}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-blue-950 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {language === 'en' ? 'Claim Intimation' : 'ক্লেইম ইন্টিমেশন'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Main Direct Call Button */}
          <a
            href="tel:16457"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition active:scale-98 flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>
              {language === 'en' ? 'Call 16457 Now' : 'সরাসরি কল করুন (১৬৪৫৭)'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            {onOpenSupport && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSupport();
                }}
                className="flex-1 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition cursor-pointer"
              >
                {language === 'en' ? 'Request Callback' : 'কলব্যাক অনুরোধ'}
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'বন্ধ করুন'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
