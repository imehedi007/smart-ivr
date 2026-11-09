'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Phone,
  Mail,
  ChevronRight,
  ExternalLink,
  Compass,
  CheckCircle2,
  Clock,
  Building
} from 'lucide-react';
import { Language, Branch } from '../../types/ivr';
import { BRANCHES_DATA } from '../../data/ivr-data';

interface BranchLocatorViewProps {
  language: Language;
  onGoBack: () => void;
}

interface RegionInfo {
  id: string;
  code: string;
  nameEn: string;
  nameBn: string;
  branchCount: number;
}

const REGION_LIST: RegionInfo[] = [
  { id: 'Dhaka', code: '1', nameEn: 'Dhaka', nameBn: 'ঢাকা', branchCount: 18 },
  { id: 'Chattogram', code: '2', nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম', branchCount: 5 },
  { id: 'Barishal', code: '3', nameEn: 'Barishal', nameBn: 'বরিশাল', branchCount: 2 },
  { id: 'Khulna', code: '4', nameEn: 'Khulna', nameBn: 'খুলনা', branchCount: 3 },
  { id: 'Mymensingh', code: '5', nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ', branchCount: 1 },
  { id: 'Rajshahi', code: '6', nameEn: 'Rajshahi', nameBn: 'রাজশাহী', branchCount: 1 },
  { id: 'Bogura', code: '7', nameEn: 'Bogura', nameBn: 'বগুড়া', branchCount: 2 },
  { id: 'Rangpur', code: '8', nameEn: 'Rangpur', nameBn: 'রংপুর', branchCount: 3 },
  { id: 'Sylhet', code: '9', nameEn: 'Sylhet', nameBn: 'সিলেট', branchCount: 2 }
];

export const BranchLocatorView: React.FC<BranchLocatorViewProps> = ({
  language,
  onGoBack
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [nearestDetected, setNearestDetected] = useState<Branch | null>(null);

  // Handle "Find my nearest branch"
  const handleFindNearest = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      // Closest is Head Office & Principal Branch
      const closest = BRANCHES_DATA[0];
      setNearestDetected(closest);
      setSelectedBranch(closest);
    }, 700);
  };

  const handleSelectRegion = (regionId: string) => {
    setSelectedRegion(regionId);
    setSelectedBranch(null);
  };

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
  };

  const currentBranches = selectedRegion
    ? BRANCHES_DATA.filter((b) => b.division.toLowerCase() === selectedRegion.toLowerCase())
    : [];

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/60 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Navigation Breadcrumb / Branch Capsule */}
        <div className="flex items-center justify-between mb-2.5 px-1">
          {selectedBranch || selectedRegion ? (
            <button
              onClick={() => {
                if (selectedBranch) {
                  setSelectedBranch(null);
                } else if (selectedRegion) {
                  setSelectedRegion(null);
                }
              }}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                {selectedBranch
                  ? selectedRegion
                    ? `${selectedRegion}`
                    : language === 'en'
                    ? 'All Regions'
                    : 'সব অঞ্চল'
                  : language === 'en'
                  ? 'All Regions'
                  : 'সকল অঞ্চল'}
              </span>
            </button>
          ) : (
            <div />
          )}

          <span className="text-[10px] font-bold text-[#0f2874] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#0f2874] dark:text-blue-400" />
            <span>{language === 'en' ? 'Nationwide Network' : 'দেশব্যাপী শাখা নেটওয়ার্ক'}</span>
          </span>
        </div>

        {/* 1. Branch Details View */}
        {selectedBranch ? (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200/90 dark:border-blue-900/40 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#16325B] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {selectedBranch.division} Region
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1.5 leading-tight">
                    {language === 'en' ? selectedBranch.nameEn : selectedBranch.nameBn}
                  </h3>
                </div>

                {selectedBranch.distanceKm && (
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-slate-400 font-medium block">Distance</span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      {selectedBranch.distanceKm} km away
                    </span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800">
                <MapPin className="w-4 h-4 text-[#16325B] dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {language === 'en' ? selectedBranch.addressEn : selectedBranch.addressBn}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 pt-1">
                {selectedBranch.phone && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span className="font-mono">{selectedBranch.phone}</span>
                    </div>
                    <a
                      href={`tel:${selectedBranch.phone}`}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition active:scale-95 shadow-xs"
                    >
                      {language === 'en' ? 'Call' : 'কল'}
                    </a>
                  </div>
                )}

                {selectedBranch.email && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-mono text-[11px] truncate max-w-[170px]">
                        {selectedBranch.email}
                      </span>
                    </div>
                    <a
                      href={`mailto:${selectedBranch.email}`}
                      className="px-2.5 py-1 rounded-lg bg-[#16325B] hover:bg-[#1E3A8A] text-white font-bold text-[11px] transition active:scale-95 shadow-xs"
                    >
                      {language === 'en' ? 'Email' : 'ইমেইল'}
                    </a>
                  </div>
                )}
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Sunday – Thursday: 9:00 AM – 5:00 PM</span>
              </div>
            </div>

            {/* Interactive Map Simulation (matching live-map-to-nearast-branch.png) */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200/90 dark:border-blue-900/40 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#F59E0B]" />
                  <span>{language === 'en' ? 'Live Route Preview' : 'লাইভ রুট ম্যাপ'}</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">GPS Active</span>
              </div>

              {/* Simulated stylized SVG city map preview */}
              <div className="w-full h-32 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-[#0a1424] border border-slate-200 dark:border-slate-800 relative overflow-hidden flex items-center justify-center">
                {/* Street grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Animated Route Line */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center gap-14">
                    {/* User Pin */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                        <Navigation className="w-3.5 h-3.5 -rotate-45" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 mt-1">You</span>
                    </div>

                    {/* Connecting dotted route */}
                    <div className="w-16 h-0.5 border-t-2 border-dashed border-[#F59E0B]" />

                    {/* Green Delta Branch Pin */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#16325B] border-2 border-[#F59E0B] text-amber-300 flex items-center justify-center shadow-lg">
                        <Building className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold text-[#16325B] dark:text-amber-300 mt-1">GDIC</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `Green Delta Insurance ${selectedBranch.nameEn} ${selectedBranch.addressEn}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 rounded-xl bg-[#16325B] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-sm transition active:scale-98 flex items-center justify-center gap-2"
              >
                <span>{language === 'en' ? 'Open in Google Maps' : 'গুগল ম্যাপে নেভিগেট করুন'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>
          </div>
        ) : selectedRegion ? (
          /* 2. Region-specific Branch List matching dhaka-branch-locations.png */
          <div className="space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-1 mb-1">
              <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wide">
                {selectedRegion} ({currentBranches.length} branches)
              </h2>
              <span className="text-[10px] text-slate-400 font-semibold">Select to view</span>
            </div>

            <div className="space-y-1.5">
              {currentBranches.map((branch, idx) => (
                <button
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200/80 dark:border-blue-900/30 shadow-2xs hover:shadow-xs hover:border-amber-400/50 transition-all active:scale-98 text-left group"
                >
                  <div className="flex items-center gap-3">
                    {/* Number Badge (1, 2, 3...) matching dhaka-branch-locations.png */}
                    <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950 text-[#16325B] dark:text-amber-300 font-black text-xs flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900">
                      {idx + 1}
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#16325B] dark:group-hover:text-amber-300 transition-colors">
                        {language === 'en' ? branch.nameEn : branch.nameBn}
                      </h3>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {language === 'en' ? branch.addressEn : branch.addressBn}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* 3. Main Division / Region Screen matching division-wise-branches.png */
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Top Button: "Find my nearest branch" */}
            <button
              onClick={handleFindNearest}
              disabled={isLocating}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#16325B] to-[#1E3A8A] text-white shadow-md border border-blue-900 flex items-center justify-between active:scale-98 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <Navigation
                    className={`w-5 h-5 ${
                      isLocating ? 'animate-spin' : 'group-hover:scale-110 transition'
                    }`}
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-bold text-white">
                    {language === 'en' ? 'Find my nearest branch' : 'আমার নিকটতম শাখা খুঁজুন'}
                  </h3>
                  <p className="text-[10.5px] text-blue-200/80">
                    {language === 'en' ? 'Uses your device location' : 'ডিভাইসের অবস্থান থেকে দূরবর্তী হিসাব'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-300 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
            </button>

            {/* Region List Header */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2 px-1">
                {language === 'en' ? 'CHOOSE A REGION' : 'অঞ্চল নির্বাচন করুন'}
              </span>

              {/* 9 Region Items with Numbers 1-9 matching division-wise-branches.png */}
              <div className="space-y-2">
                {REGION_LIST.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleSelectRegion(region.id)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200/80 dark:border-blue-900/30 shadow-2xs hover:shadow-xs hover:border-amber-400/50 transition-all active:scale-98 text-left group"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Number Badge (1 to 9) */}
                      <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#16325B] dark:text-amber-300 font-black text-xs flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900">
                        {region.code}
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#16325B] dark:group-hover:text-amber-300 transition-colors">
                          {language === 'en' ? region.nameEn : region.nameBn}
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {language === 'en'
                            ? `${region.branchCount} branches`
                            : `${region.branchCount}টি শাখা`}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-center pt-3 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
        Green Delta Insurance • 37 Branches Across Bangladesh
      </div>
    </div>
  );
};
