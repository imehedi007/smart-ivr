'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Building2,
  MapPin,
  Sparkles,
  Lock,
  Calculator,
  PhoneCall,
  ChevronRight,
  Search,
  LayoutGrid,
  ListFilter
} from 'lucide-react';
import gsap from 'gsap';
import { Language, MenuItem } from '../../types/ivr';
import { MAIN_MENU_ITEMS } from '../../data/ivr-data';

interface MainMenuViewProps {
  language: Language;
  onSelectMenu: (item: MenuItem) => void;
  onOpenSearch: () => void;
  onOpenStatus: () => void;
  onEndCall: () => void;
}

export const MainMenuView: React.FC<MainMenuViewProps> = ({
  language,
  onSelectMenu,
  onOpenSearch,
  onOpenStatus,
  onEndCall
}) => {
  // Grid as primary / default view as requested
  const [layoutMode, setLayoutMode] = useState<'list' | 'grid'>('grid');
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current.children,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.03,
          ease: 'power2.out'
        }
      );
    }
  }, [layoutMode]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Lock':
        return <Lock className="w-5 h-5" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/70 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Campaign Banner Card (Matches Current Development main-home-page.png) */}
        <div className="mb-3 p-3.5 rounded-2xl bg-gradient-to-br from-[#16325B] to-[#1E3A8A] text-white shadow-md border border-blue-900/40 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />
          <div className="text-[9.5px] font-black text-amber-300 uppercase tracking-widest mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>NIBEDITA CAMPAIGN 2026</span>
          </div>
          <h2 className="font-bold text-sm tracking-tight text-white mb-0.5">
            {language === 'en' ? 'Comprehensive Women Protection' : 'নিবেদিতা নারী সুরক্ষা স্কিম'}
          </h2>
          <p className="text-[10.5px] text-blue-100/80 leading-snug line-clamp-2">
            {language === 'en'
              ? 'Health, accidental trauma, and critical illness cover with 24/7 legal aid.'
              : 'নারীদের স্বাস্থ্য, ট্রমা ও জটিল রোগের আর্থিক সুরক্ষা এবং ২৪/৭ আইনি পরামর্শ।'}
          </p>
          <div className="mt-2 flex items-center justify-between text-[10.5px]">
            <button
              onClick={() => {
                const item = MAIN_MENU_ITEMS.find((m) => m.id === 'campaign');
                if (item) onSelectMenu(item);
              }}
              className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-0.5"
            >
              <span>{language === 'en' ? 'See details >' : 'বিস্তারিত দেখুন >'}</span>
            </button>
            <span className="text-[9.5px] text-blue-200 font-medium">Valid till Dec 2026</span>
          </div>
        </div>

        {/* Clean Touch Search Input Bar (Mobile-first, NO Ctrl+K keyboard shortcut) */}
        <div className="mb-3">
          <button
            onClick={onOpenSearch}
            className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200/90 dark:border-blue-900/40 text-slate-400 dark:text-slate-400 text-xs flex items-center justify-start gap-2.5 shadow-2xs hover:border-amber-400/50 transition group active:scale-99"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors flex-shrink-0" />
            <span className="text-[11.5px] text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Search products, branches, claims...'
                : 'প্রোডাক্ট, শাখা বা ক্লেইম খুঁজুন...'}
            </span>
          </button>
        </div>

        {/* Section Header & Layout Toggle */}
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            {language === 'en' ? 'Quick Self-Service' : 'স্মার্ট আইভিআর সেবা'}
          </div>

          <div className="flex items-center bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1 rounded-md transition ${
                layoutMode === 'grid'
                  ? 'bg-white dark:bg-[#16325B] text-amber-500 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
              title="Grid View (Primary)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-1 rounded-md transition ${
                layoutMode === 'list'
                  ? 'bg-white dark:bg-[#16325B] text-amber-500 shadow-2xs font-bold'
                  : 'hover:text-slate-900'
              }`}
              title="List View"
            >
              <ListFilter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main 7 IVR Options (Primary Grid View) */}
        {layoutMode === 'grid' ? (
          <div ref={cardsContainerRef} className="grid grid-cols-2 gap-2 animate-in fade-in duration-200">
            {MAIN_MENU_ITEMS.map((item, idx) => {
              const isLastOdd = idx === MAIN_MENU_ITEMS.length - 1 && MAIN_MENU_ITEMS.length % 2 !== 0;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectMenu(item)}
                  className={`group relative flex ${
                    isLastOdd
                      ? 'col-span-2 flex-row items-center justify-between px-3.5 py-3'
                      : 'flex-col items-center justify-center p-3'
                  } rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200/80 dark:border-blue-900/30 shadow-2xs hover:shadow-xs hover:border-amber-400/60 transition-all text-center min-h-[96px] active:scale-96`}
                >
                  {isLastOdd ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#16325B] dark:text-amber-300 font-black text-xs flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900">
                          {item.code}
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#16325B] to-[#1E3A8A] text-amber-300 flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                          {renderIcon(item.icon)}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#16325B] dark:group-hover:text-amber-300 transition-colors">
                            {language === 'en' ? item.titleEn : item.titleBn}
                          </h3>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {language === 'en' ? item.subtitleEn : item.subtitleBn}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition flex-shrink-0" />
                    </>
                  ) : (
                    <>
                      {/* Number Badge (1, 2, 3...) in corner */}
                      <span className="absolute top-2 left-2 w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[10px] font-black text-[#16325B] dark:text-amber-300 flex items-center justify-center group-hover:bg-[#16325B] group-hover:text-amber-300 transition-colors border border-blue-100 dark:border-blue-900/40">
                        {item.code}
                      </span>

                      {item.badgeEn && (
                        <span
                          className={`absolute top-2 right-2 text-[8px] font-bold px-1.5 py-0.2 rounded-full ${
                            item.badgeType === 'locked'
                              ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          }`}
                        >
                          {language === 'en' ? item.badgeEn : item.badgeBn}
                        </span>
                      )}

                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#16325B] to-[#1E3A8A] text-amber-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform mb-1.5 mt-1">
                        {renderIcon(item.icon)}
                      </div>

                      <h3 className="text-[11px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#16325B] dark:group-hover:text-amber-300 transition-colors leading-tight line-clamp-1">
                        {language === 'en' ? item.titleEn : item.titleBn}
                      </h3>
                      <p className="text-[9.5px] text-slate-400 mt-0.5 line-clamp-1">
                        {language === 'en' ? item.subtitleEn : item.subtitleBn}
                      </p>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* List View Mode */
          <div ref={cardsContainerRef} className="space-y-1.5 animate-in fade-in duration-200">
            {MAIN_MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectMenu(item)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200/80 dark:border-blue-900/30 shadow-2xs hover:shadow-xs hover:border-amber-400/60 dark:hover:border-amber-400/40 transition-all duration-150 active:scale-98 group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#16325B] dark:text-blue-300 font-black text-xs flex items-center justify-center group-hover:bg-[#16325B] group-hover:text-amber-300 transition-colors flex-shrink-0 border border-blue-100 dark:border-blue-900/40 shadow-2xs">
                    {item.code}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#16325B] dark:group-hover:text-amber-300 transition-colors">
                        {language === 'en' ? item.titleEn : item.titleBn}
                      </h3>
                      {item.badgeEn && (
                        <span
                          className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded-full ${
                            item.badgeType === 'locked'
                              ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          }`}
                        >
                          {language === 'en' ? item.badgeEn : item.badgeBn}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {language === 'en' ? item.subtitleEn : item.subtitleBn}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Auxiliary Action Buttons (Matches Current Development main-home-page.png) */}
      <div className="pt-3 space-y-1.5 select-none">
        {/* Exit securely Button */}
        <button
          onClick={onEndCall}
          className="w-full h-9 rounded-xl bg-white dark:bg-[#0f1a30] hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-700 dark:text-slate-200 hover:text-red-600 border border-slate-200 dark:border-blue-900/30 text-xs font-bold shadow-2xs transition active:scale-98 flex items-center justify-center"
        >
          <span>{language === 'en' ? 'Exit securely' : 'নিরাপদে প্রস্থান করুন'}</span>
        </button>

        {/* Check connection Button */}
        <button
          onClick={onOpenStatus}
          className="w-full h-9 rounded-xl bg-white dark:bg-[#0f1a30] hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-blue-900/30 text-xs font-bold shadow-2xs transition active:scale-98 flex items-center justify-center"
        >
          <span>{language === 'en' ? 'Check connection' : 'কানেকশন চেক করুন'}</span>
        </button>
      </div>
    </div>
  );
};
