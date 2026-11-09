'use client';

import React from 'react';
import { GdicLogo } from './GdicLogo';
import { Moon, Sun, Globe, Search, Activity, PhoneCall, Home, ArrowLeft } from 'lucide-react';
import { Language } from '../../types/ivr';

interface IvrHeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenStatus: () => void;
  onOpenDialpad: () => void;
  onGoHome: () => void;
  onGoBack: () => void;
  canGoBack: boolean;
  currentRoute: string;
  callDurationSeconds: number;
}

export const IvrHeader: React.FC<IvrHeaderProps> = ({
  language,
  onToggleLanguage,
  isDarkMode,
  onToggleDarkMode,
  onOpenSearch,
  onOpenStatus,
  onOpenDialpad,
  onGoHome,
  onGoBack,
  canGoBack,
  currentRoute,
  callDurationSeconds
}) => {
  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getPageTitle = () => {
    switch (currentRoute) {
      case 'main-menu':
        return language === 'en' ? 'Main Menu' : 'মেইন মেনু';
      case 'product-service':
        return language === 'en' ? 'Product & Service' : 'প্রোডাক্ট ও সেবা';
      case 'bancassurance':
        return language === 'en' ? 'Bancassurance' : 'ব্যাংকাসুরেন্স';
      case 'branch-locations':
        return language === 'en' ? 'Branch Location' : 'শাখা লোকেশন';
      case 'campaign':
        return language === 'en' ? 'New Campaign' : 'চলমান অফার';
      case 'my-policy':
        return language === 'en' ? 'Verify your number' : 'পলিসি ভেরিফিকেশন';
      case 'quotation':
        return language === 'en' ? 'Quotation Request' : 'কোটেশন রিকোয়েস্ট';
      case 'support':
        return language === 'en' ? 'Request a callback' : 'কলব্যাক অনুরোধ';
      case 'ppa':
        return language === 'en' ? 'PPA Pricing Breakdown' : 'পিপিএ প্রিমিয়াম ব্রেকডাউন';
      case 'nibedita':
        return language === 'en' ? 'Choose Coverage Type' : 'কভারেজ ধরন নির্বাচন';
      case 'pet-insurance':
        return language === 'en' ? 'Pet Insurance' : 'পোষা প্রাণী বীমা';
      case 'travel-insurance':
        return language === 'en' ? 'Travel Insurance' : 'আন্তর্জাতিক ভ্রমণ বীমা';
      case 'request-quotation':
        return language === 'en' ? 'Request for Quotation' : 'কোটেশন রিকোয়েস্ট';
      default:
        return 'Smart IVR';
    }
  };

  const getPageSubtitle = () => {
    switch (currentRoute) {
      case 'ppa':
      case 'nibedita':
      case 'pet-insurance':
      case 'travel-insurance':
      case 'request-quotation':
        return language === 'en' ? 'Product & Service' : 'প্রোডাক্ট ও সেবা';
      case 'quotation':
        return language === 'en' ? 'Motor Quotation' : 'মোটর কোটেশন';
      default:
        return language === 'en' ? 'Main Menu' : 'মেইন মেনু';
    }
  };

  return (
    <header className="relative w-full bg-[#16325B] dark:bg-[#0c1a33] text-white select-none z-30 flex-shrink-0 shadow-md">
      {/* Main Header Bar matching Current Development screenshots */}
      <div className="px-3 py-2 flex items-center justify-between">
        {/* Left Section: Back Arrow or Logo / Title */}
        <div className="flex items-center gap-2">
          {canGoBack && currentRoute !== 'main-menu' ? (
            <button
              onClick={onGoBack}
              className="p-1 -ml-1 text-white hover:text-amber-300 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : null}

          {currentRoute === 'main-menu' ? (
            <div className="flex items-center gap-2">
              <GdicLogo size="sm" whiteText />
            </div>
          ) : (
            <div>
              <h1 className="text-xs font-bold text-white tracking-tight leading-tight">
                {getPageTitle()}
              </h1>
              <div className="text-[9px] text-blue-200/80">{getPageSubtitle()}</div>
            </div>
          )}
        </div>

        {/* Right Section: Actions matching main-home-page.png */}
        <div className="flex items-center gap-1.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="w-7 h-7 rounded-full flex items-center justify-center text-blue-100 hover:text-amber-300 hover:bg-white/10 transition active:scale-95"
            title="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Keypad Dialpad Trigger */}
          <button
            onClick={onOpenDialpad}
            className="w-7 h-7 rounded-full flex items-center justify-center text-blue-100 hover:text-amber-300 hover:bg-white/10 transition active:scale-95"
            title="Keypad"
          >
            <PhoneCall className="w-3.5 h-3.5" />
          </button>

          {/* Home Icon */}
          <button
            onClick={onGoHome}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition active:scale-95 ${
              currentRoute === 'main-menu' ? 'text-amber-300' : 'text-blue-100 hover:text-white'
            }`}
            title="Home"
          >
            <Home className="w-3.5 h-3.5" />
          </button>

          {/* Dark Mode Moon/Sun */}
          <button
            onClick={onToggleDarkMode}
            className="w-7 h-7 rounded-full flex items-center justify-center text-blue-100 hover:text-amber-300 transition active:scale-95"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Language Toggle matching EN button in reference */}
          <button
            onClick={onToggleLanguage}
            className="h-6 px-2 rounded-full flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-white/10 hover:bg-white/20 border border-amber-400/40 transition active:scale-95"
          >
            <Globe className="w-3 h-3 text-amber-300" />
            <span>{language === 'en' ? 'EN' : 'বাং'}</span>
          </button>
        </div>
      </div>

      {/* Iconic Golden Yellow Accent Border Line (Matches Current Development) */}
      <div className="w-full h-[2.5px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-sm" />
    </header>
  );
};
