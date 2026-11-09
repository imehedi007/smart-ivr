'use client';

import React, { useState } from 'react';
import { Sparkles, Check, CheckCircle2, ShieldCheck, Gift } from 'lucide-react';
import { Language } from '../../types/ivr';
import { playSuccessChime } from '../../lib/audio';

interface CampaignViewProps {
  language: Language;
  onGoBack: () => void;
  onNavigateToQuotation: () => void;
  onNavigateToNibedita?: () => void;
}

export const CampaignView: React.FC<CampaignViewProps> = ({
  language,
  onGoBack,
  onNavigateToQuotation,
  onNavigateToNibedita
}) => {
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = () => {
    playSuccessChime();
    setEnrolled(true);
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/60 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Product Category Capsule */}
        <div className="flex items-center justify-end mb-2.5 px-1">
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1">
            <Gift className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>{language === 'en' ? 'Seasonal Promotions' : 'সিজনাল অফার'}</span>
          </span>
        </div>

        {/* Campaign Card matching campaign.png */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/40 shadow-xs space-y-3 animate-in fade-in duration-200">
          {/* Yellow Tag matching reference screenshot */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              {language === 'en' ? 'Special Campaign 2026' : 'বিশেষ ক্যাম্পেইন ২০২৬'}
            </span>
          </div>

          <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
            {language === 'en'
              ? 'Nibedita & Digital Health Privilege Offer'
              : 'নিবেদিতা ও ডিজিটাল হেলথ প্রিভিলেজ অফার'}
          </h3>

          <div className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
            {language === 'en' ? 'Runs until 31 December 2026' : 'মেয়াদ: ৩১ ডিসেম্বর ২০২৬ পর্যন্ত'}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'Enjoy an exclusive 20% discount on first-year premiums when enrolling online or through Green Delta Smart IVR self-service.'
              : 'স্মার্ট আইভিআর বা ডিজিটাল মাধ্যমে পলিসি গ্রহণ করলে প্রথম বছরের প্রিমিয়ামে ২০% পর্যন্ত বিশেষ ছাড় উপভোগ করুন।'}
          </p>

          <div className="space-y-1.5 pt-1 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>20% instant premium concession on Comprehensive Motor</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>Free diagnostic card with up to 35% discount at Popular & Labaid</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>24/7 dedicated claim processing manager</span>
            </div>
          </div>

          {enrolled ? (
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                  {language === 'en' ? 'Discount Code Activated: GDIC2026' : 'ডিসকাউন্ট কোড সক্রিয়: GDIC2026'}
                </div>
                <p className="text-[10px] text-slate-500">
                  {language === 'en' ? 'Applied automatically to your next quote' : 'পরবর্তী কোটেশনে স্বয়ংক্রিয়ভাবে ছাড় প্রযোজ্য হবে'}
                </p>
              </div>

              {onNavigateToNibedita && (
                <button
                  onClick={onNavigateToNibedita}
                  className="w-full h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-bold text-xs shadow-md transition active:scale-98 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {language === 'en'
                      ? 'Calculate & Buy Nibedita Insurance'
                      : 'নিবেদিতা প্রিমিয়াম হিসাব ও ক্রয় করুন'}
                  </span>
                  <span>→</span>
                </button>
              )}
            </div>
          ) : (
            /* Big Golden Yellow Button (Matches campaign.png) */
            <button
              onClick={handleEnroll}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-[#16325B] font-black text-xs uppercase tracking-wider shadow-md transition active:scale-98"
            >
              {language === 'en' ? 'Claim Campaign Discount' : 'অফারের ডিসকাউন্ট কোড নিন'}
            </button>
          )}

          <div className="pt-1 text-[10px] text-slate-400 text-center">
            {language === 'en'
              ? 'Offer valid for new policy issues under standard underwriting guidelines.'
              : 'গ্রিন ডেল্টা ইন্স্যুরেন্সের স্ট্যান্ডার্ড শর্তাবলি প্রযোজ্য।'}
          </div>
        </div>
      </div>

      <div className="pt-2 text-center text-[9.5px] text-slate-400">
        Hotline: <strong className="text-amber-500 font-mono">16457</strong> • Green Delta Insurance
      </div>
    </div>
  );
};
