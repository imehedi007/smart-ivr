'use client';

import React, { useState } from 'react';
import { Search, X, ChevronRight, ShieldCheck, Flame, Building2, MapPin, Sparkles, Lock, Calculator, PhoneCall } from 'lucide-react';
import { Language } from '../../types/ivr';
import { MAIN_MENU_ITEMS, INSURANCE_PRODUCTS_DATA, BANCASSURANCE_PARTNERS_DATA, BRANCHES_DATA } from '../../data/ivr-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigate: (route: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const results: {
    title: string;
    subtitle: string;
    category: string;
    route: string;
    icon: React.ReactNode;
  }[] = [];

  if (q.length > 0) {
    // 1. Search main menu items
    MAIN_MENU_ITEMS.forEach((item) => {
      if (
        item.titleEn.toLowerCase().includes(q) ||
        item.titleBn.includes(q) ||
        item.subtitleEn.toLowerCase().includes(q) ||
        item.subtitleBn.includes(q)
      ) {
        results.push({
          title: language === 'en' ? item.titleEn : item.titleBn,
          subtitle: language === 'en' ? item.subtitleEn : item.subtitleBn,
          category: language === 'en' ? 'Main Menu' : 'মূল মেনু',
          route: item.route,
          icon: <ShieldCheck className="w-4 h-4 text-[#16325B] dark:text-amber-400" />
        });
      }
    });

    // 2. Search insurance products
    INSURANCE_PRODUCTS_DATA.forEach((prod) => {
      const isMatch =
        prod.nameEn.toLowerCase().includes(q) ||
        prod.nameBn.includes(q) ||
        prod.subtitleEn.toLowerCase().includes(q) ||
        prod.descriptionEn.toLowerCase().includes(q) ||
        (prod.id === 'personal-accident' && (q.includes('ppa') || q.includes('accident') || q.includes('69'))) ||
        (prod.id === 'motor-insurance' && (q.includes('car') || q.includes('vehicle') || q.includes('motor') || q.includes('bike'))) ||
        (prod.id === 'nibedita' && (q.includes('nibedita') || q.includes('women') || q.includes('eco') || q.includes('54.50') || q.includes('নিবেদিতা') || q.includes('নারী'))) ||
        (prod.id === 'pet-insurance' && (q.includes('pet') || q.includes('cat') || q.includes('dog') || q.includes('biral') || q.includes('kukur') || q.includes('বিড়াল') || q.includes('কুকুর'))) ||
        (prod.id === 'travel-insurance' && (q.includes('travel') || q.includes('visa') || q.includes('schengen') || q.includes('flight') || q.includes('tour') || q.includes('ভ্রমণ')));

      if (isMatch) {
        let targetRoute = 'product-service';
        if (prod.id === 'personal-accident') targetRoute = 'ppa';
        if (prod.id === 'motor-insurance') targetRoute = 'quotation';
        if (prod.id === 'nibedita') targetRoute = 'nibedita';
        if (prod.id === 'pet-insurance') targetRoute = 'pet-insurance';
        if (prod.id === 'travel-insurance') targetRoute = 'travel-insurance';

        results.push({
          title: language === 'en' ? prod.nameEn : prod.nameBn,
          subtitle: language === 'en' ? prod.subtitleEn : prod.subtitleBn,
          category: language === 'en' ? 'Insurance Product' : 'বীমা সেবা',
          route: targetRoute,
          icon: <Flame className="w-4 h-4 text-amber-500" />
        });
      }
    });

    // 3. Search bancassurance partners
    BANCASSURANCE_PARTNERS_DATA.forEach((partner) => {
      if (
        partner.name.toLowerCase().includes(q) ||
        partner.fullNameEn.toLowerCase().includes(q) ||
        partner.fullNameBn.includes(q)
      ) {
        results.push({
          title: language === 'en' ? partner.fullNameEn : partner.fullNameBn,
          subtitle: `Bancassurance Partner (${partner.name})`,
          category: language === 'en' ? 'Partner Bank' : 'পার্টনার ব্যাংক',
          route: 'bancassurance',
          icon: <Building2 className="w-4 h-4 text-blue-500" />
        });
      }
    });

    // 4. Search branches
    BRANCHES_DATA.forEach((br) => {
      if (
        br.nameEn.toLowerCase().includes(q) ||
        br.nameBn.includes(q) ||
        br.addressEn.toLowerCase().includes(q) ||
        br.division.toLowerCase().includes(q)
      ) {
        results.push({
          title: language === 'en' ? br.nameEn : br.nameBn,
          subtitle: language === 'en' ? br.addressEn : br.addressBn,
          category: language === 'en' ? 'Branch Location' : 'শাখা লোকেশন',
          route: 'branch-locations',
          icon: <MapPin className="w-4 h-4 text-emerald-500" />
        });
      }
    });
  }

  const handleSelectResult = (route: string) => {
    onNavigate(route);
    onClose();
  };

  const popularSearches = [
    { label: 'Travel Schengen', route: 'travel-insurance' },
    { label: 'Pet Insurance', route: 'pet-insurance' },
    { label: 'Nibedita Women', route: 'nibedita' },
    { label: 'PPA BDT 69 Cover', route: 'ppa' },
    { label: 'Motor Insurance', route: 'quotation' },
    { label: 'Dhaka Branches', route: 'branch-locations' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-[420px] mt-8 bg-white dark:bg-[#0c1a33] rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-4 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#16325B] dark:text-amber-400 absolute left-3.5" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Search products, branches, claims...'
                : 'বীমা সেবা, শাখা বা ক্লেইম খুঁজুন...'
            }
            className="w-full h-11 pl-10 pr-10 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16325B] dark:focus:ring-amber-400/50"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="mt-3 max-h-[380px] overflow-y-auto no-scrollbar space-y-1.5">
          {q.length > 0 ? (
            results.length > 0 ? (
              results.map((res, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectResult(res.route)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 border border-transparent hover:border-blue-200 dark:hover:border-blue-900 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      {res.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#16325B] dark:group-hover:text-amber-300">
                          {res.title}
                        </h4>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold uppercase">
                          {res.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{res.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition" />
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                No insurance matches found for &quot;{query}&quot;
              </div>
            )
          ) : (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                {language === 'en' ? 'Popular Insurance Searches' : 'জনপ্রিয় অনুসন্ধান'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularSearches.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectResult(s.route)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10.5px] font-medium hover:bg-amber-100 hover:text-amber-900 dark:hover:bg-amber-950/60 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 transition"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
