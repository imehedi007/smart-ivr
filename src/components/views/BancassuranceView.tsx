'use client';

import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Building2, PhoneCall, ShieldCheck, Check } from 'lucide-react';
import { Language, BancassurancePartner } from '../../types/ivr';
import { BANCASSURANCE_PARTNERS_DATA } from '../../data/ivr-data';

interface BancassuranceViewProps {
  language: Language;
  onGoBack: () => void;
}

export const BancassuranceView: React.FC<BancassuranceViewProps> = ({
  language,
  onGoBack
}) => {
  const [selectedPartner, setSelectedPartner] = useState<BancassurancePartner | null>(null);

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/60 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Partner Category Capsule / Back to Partner list */}
        <div className="flex items-center justify-between mb-2.5 px-1">
          {selectedPartner ? (
            <button
              onClick={() => setSelectedPartner(null)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'All Partner Banks' : 'সকল পার্টনার ব্যাংক'}</span>
            </button>
          ) : (
            <div />
          )}

          <span className="text-[10px] font-bold text-[#0f2874] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-[#0f2874] dark:text-blue-400" />
            <span>{language === 'en' ? 'Bancassurance Channel' : 'ব্যাংকাসুরেন্স চ্যানেল'}</span>
          </span>
        </div>

        {/* 3 Partner Banks matching bancassurance-page.png */}
        {!selectedPartner ? (
          <div className="space-y-2 animate-in fade-in duration-200">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 px-1">
              {language === 'en'
                ? 'Access Green Delta insurance policies seamlessly from your preferred partner bank:'
                : 'আপনার পছন্দের পার্টনার ব্যাংকের মাধ্যমে সহজে গ্রিন ডেল্টা বীমা সেবা গ্রহণ করুন:'}
            </p>

            {BANCASSURANCE_PARTNERS_DATA.map((partner) => (
              <button
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200/80 dark:border-blue-900/30 shadow-2xs hover:shadow-xs hover:border-amber-400/50 transition-all active:scale-98 group text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Number Badge (1, 2, 3) */}
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#16325B] dark:text-blue-300 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900/40 group-hover:bg-[#16325B] group-hover:text-amber-300 transition-colors">
                    {partner.code}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#16325B] dark:group-hover:text-amber-300 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {language === 'en' ? partner.fullNameEn : partner.fullNameBn}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          /* Partner Details View */
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[#16325B] dark:text-blue-300">
                  Bancassurance Partner
                </span>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  Hotline {selectedPartner.hotline}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {language === 'en' ? selectedPartner.fullNameEn : selectedPartner.fullNameBn} ({selectedPartner.name})
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'en' ? selectedPartner.descriptionEn : selectedPartner.descriptionBn}
              </p>

              <div>
                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white mb-1.5">
                  {language === 'en' ? 'Integrated Insurance Products:' : 'সংযুক্ত বীমা প্রডাক্টসমূহ:'}
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {selectedPartner.products.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${selectedPartner.hotline}`}
                  className="w-full h-10 rounded-xl bg-[#16325B] hover:bg-[#1f4277] border-b-2 border-amber-400 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                >
                  <PhoneCall className="w-4 h-4 text-amber-300" />
                  <span>Call {selectedPartner.name} Bancassurance Desk</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 text-center text-[9.5px] text-slate-400">
        {language === 'en'
          ? 'Approved by Bangladesh Bank & Insurance Development and Regulatory Authority (IDRA)'
          : 'বাংলাদেশ ব্যাংক ও আইডিআরএ অনুমোদিত প্রাতিষ্ঠানিক পার্টনারশিপ'}
      </div>
    </div>
  );
};
