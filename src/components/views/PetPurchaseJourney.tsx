'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Cat,
  Dog,
  ShieldCheck,
  Check,
  CheckCircle2,
  X,
  CreditCard,
  Smartphone,
  Download,
  Lock,
  Sparkles,
  Heart,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Language } from '../../types/ivr';
import { playSuccessChime } from '../../lib/audio';

interface PetPurchaseJourneyProps {
  language: Language;
  onGoBack: () => void;
  onReturnHome?: () => void;
}

type PetType = 'cat' | 'dog';
type PlanTier = 'A' | 'B' | 'C';

interface PetPackage {
  tier: PlanTier;
  title: string;
  isBestValue?: boolean;
  totalLimit: number;
  accidentalLimit: number;
  criticalLimit: number;
  deliverySpeed: string;
  annualPremium: number;
}

export const PetPurchaseJourney: React.FC<PetPurchaseJourneyProps> = ({
  language,
  onGoBack,
  onReturnHome
}) => {
  const [petType, setPetType] = useState<PetType>('cat');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSliderIndex, setActiveSliderIndex] = useState<number>(1); // default to Plan B (Best value)

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<PetPackage | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [policyId, setPolicyId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');

  // Pet & Owner form state
  const [petName, setPetName] = useState('Mimi');
  const [petBreed, setPetBreed] = useState('Persian Cat');
  const [petAge, setPetAge] = useState('1 Year 4 Months');
  const [ownerName, setOwnerName] = useState('Md Mehedi Hasan');
  const [mobileNumber, setMobileNumber] = useState('01711234567');
  const [nidNumber, setNidNumber] = useState('19902692518000412');

  // Exact data matching Screenshot 1 (Cat Insurance)
  const catPackages: PetPackage[] = [
    {
      tier: 'A',
      title: 'PLAN A PACKAGE',
      totalLimit: 10000,
      accidentalLimit: 10000,
      criticalLimit: 10000,
      deliverySpeed: '10 Minutes',
      annualPremium: 1035
    },
    {
      tier: 'B',
      title: 'PLAN B PACKAGE',
      isBestValue: true,
      totalLimit: 20000,
      accidentalLimit: 20000,
      criticalLimit: 20000,
      deliverySpeed: '10 Minutes',
      annualPremium: 2070
    },
    {
      tier: 'C',
      title: 'PLAN C PACKAGE',
      totalLimit: 30000,
      accidentalLimit: 30000,
      criticalLimit: 30000,
      deliverySpeed: '10 Minutes',
      annualPremium: 3105
    }
  ];

  // Exact data matching Screenshot 2 (Dog Insurance)
  const dogPackages: PetPackage[] = [
    {
      tier: 'A',
      title: 'PLAN A PACKAGE',
      totalLimit: 20000,
      accidentalLimit: 20000,
      criticalLimit: 20000,
      deliverySpeed: '10 Minutes',
      annualPremium: 2070
    },
    {
      tier: 'B',
      title: 'PLAN B PACKAGE',
      isBestValue: true,
      totalLimit: 40000,
      accidentalLimit: 40000,
      criticalLimit: 40000,
      deliverySpeed: '10 Minutes',
      annualPremium: 4140
    },
    {
      tier: 'C',
      title: 'PLAN C PACKAGE',
      totalLimit: 80000,
      accidentalLimit: 80000,
      criticalLimit: 80000,
      deliverySpeed: '10 Minutes',
      annualPremium: 8280
    }
  ];

  const currentPackages = petType === 'cat' ? catPackages : dogPackages;

  const handleOpenBuyNow = (pkg: PetPackage) => {
    setSelectedPlanForPurchase(pkg);
    if (petType === 'cat') {
      setPetName('Mimi');
      setPetBreed('Persian Cat');
    } else {
      setPetName('Rocky');
      setPetBreed('Golden Retriever');
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `GDIC-PET-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setPolicyId(generatedId);
    playSuccessChime();
    setIsCheckoutOpen(false);
    setIsSuccess(true);
  };

  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const cardStep = 290;
    const index = Math.round(scrollLeft / cardStep);
    setActiveSliderIndex(Math.min(Math.max(index, 0), currentPackages.length - 1));
  };

  const scrollToPackage = (idx: number) => {
    if (!sliderRef.current) return;
    const card = document.getElementById(`pet-card-${idx}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveSliderIndex(idx);
    }
  };

  // Center on Plan B (Best value) upon petType change
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToPackage(1);
    }, 120);
    return () => clearTimeout(timer);
  }, [petType]);

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/70 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Product Category Capsule */}
        <div className="flex items-center justify-end mb-1 px-1">
          <span className="text-[10px] font-bold text-[#0f2874] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900 flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>{language === 'en' ? 'Green Delta Pet Care' : 'গ্রিন ডেল্টা পেট কেয়ার'}</span>
          </span>
        </div>

        {/* Top Pet Type Toggle Capsule matching screenshots */}
        <div className="flex justify-center my-2">
          <div className="inline-flex rounded-full bg-slate-100/90 dark:bg-slate-900 p-1 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <button
              type="button"
              onClick={() => setPetType('cat')}
              className={`flex items-center gap-2 py-1.5 px-4 text-xs font-bold rounded-full transition-all ${
                petType === 'cat'
                  ? 'bg-white dark:bg-[#16325B] text-[#0f2874] dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Cat className="w-4 h-4 text-[#0f2874] dark:text-blue-300" />
              <span>{language === 'en' ? 'Cat Insurance' : 'বিড়াল বীমা'}</span>
            </button>

            <button
              type="button"
              onClick={() => setPetType('dog')}
              className={`flex items-center gap-2 py-1.5 px-4 text-xs font-bold rounded-full transition-all ${
                petType === 'dog'
                  ? 'bg-white dark:bg-[#16325B] text-[#0f2874] dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Dog className="w-4 h-4 text-[#0f2874] dark:text-blue-300" />
              <span>{language === 'en' ? 'Dog Insurance' : 'কুকুর বীমা'}</span>
            </button>
          </div>
        </div>

        {/* Screen Header matching screenshots */}
        <div className="text-center my-3 px-2">
          <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
            {language === 'en' ? (
              <>
                Compare {petType === 'cat' ? 'Cat' : 'Dog'} Insurance{' '}
                <span className="text-[#0f2874] dark:text-blue-400">Plans</span>
              </>
            ) : (
              <>
                {petType === 'cat' ? 'বিড়াল' : 'কুকুর'} বীমা প্ল্যান{' '}
                <span className="text-[#0f2874] dark:text-blue-400">তুলনা করুন</span>
              </>
            )}
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-[340px] mx-auto leading-snug">
            {language === 'en'
              ? 'Choose the coverage limit that matches your financial preference with simple, fixed, and transparent annual premiums.'
              : 'সহজ, নির্দিষ্ট ও স্বচ্ছ বার্ষিক প্রিমিয়ামের মাধ্যমে আপনার আর্থিক সুবিধাজনক কভারেজ সীমাটি নির্বাচন করুন।'}
          </p>
        </div>

        {/* Scrollable Slider Navigation & Swipe Indicator Header */}
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>
              {language === 'en'
                ? 'Swipe cards to compare plans'
                : 'প্ল্যানগুলো দেখতে সোয়াইপ করুন'}
            </span>
          </div>

          {/* Dots Indicator & Arrow Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollToPackage(Math.max(0, activeSliderIndex - 1))}
              disabled={activeSliderIndex === 0}
              className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition shadow-2xs cursor-pointer"
              aria-label="Previous Plan"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-800">
              {currentPackages.map((pkg, idx) => (
                <button
                  key={pkg.tier}
                  type="button"
                  onClick={() => scrollToPackage(idx)}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    activeSliderIndex === idx
                      ? 'w-4 h-1.5 bg-[#0f2874] dark:bg-blue-400'
                      : 'w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to ${pkg.title}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToPackage(Math.min(currentPackages.length - 1, activeSliderIndex + 1))}
              disabled={activeSliderIndex === currentPackages.length - 1}
              className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition shadow-2xs cursor-pointer"
              aria-label="Next Plan"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Slider Cards Container */}
        <div
          ref={sliderRef}
          onScroll={handleSliderScroll}
          className="flex gap-3 overflow-x-auto pb-4 pt-3 px-1 snap-x snap-mandatory scroll-smooth no-scrollbar mb-3"
        >
          {currentPackages.map((pkg, idx) => (
            <div
              key={pkg.tier}
              id={`pet-card-${idx}`}
              className={`w-[280px] min-w-[280px] max-w-[280px] shrink-0 snap-center rounded-3xl bg-white dark:bg-[#0f1d38] p-4 sm:p-5 flex flex-col justify-between transition-all relative ${
                pkg.isBestValue
                  ? 'border-2 border-[#0f2874] dark:border-blue-500 shadow-md ring-4 ring-blue-50 dark:ring-blue-950/40'
                  : 'border border-slate-200/90 dark:border-blue-900/40 shadow-xs'
              }`}
            >
              {/* BEST VALUE Badge attached to top border matching Screenshot */}
              {pkg.isBestValue && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-3 py-0.5 rounded-full bg-[#0f2874] text-white text-[9.5px] font-black uppercase tracking-wider shadow-sm border border-blue-900 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    <span>{language === 'en' ? 'BEST VALUE' : 'সেরা পছন্দ'}</span>
                  </span>
                </div>
              )}

              <div className="space-y-3.5">
                {/* Top Plan Badge */}
                <div>
                  <span className="text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0f2874] dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
                    {pkg.title}
                  </span>
                </div>

                {/* Total Coverage Limit */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    {language === 'en' ? 'TOTAL COVERAGE LIMIT' : 'সর্বমোট কভারেজ সীমা'}
                  </span>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                    BDT {pkg.totalLimit.toLocaleString()}
                  </div>
                </div>

                {/* Accidental Injury Limit */}
                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {language === 'en' ? 'Accidental Injury Limit' : 'দুর্ঘটনাজনিত চিকিৎসা সীমা'}
                  </span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    BDT {pkg.accidentalLimit.toLocaleString()}
                  </span>
                </div>

                {/* Accidental Detail Callout Box matching Screenshot */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug">
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {language === 'en' ? 'Accidental Detail:' : 'শর্তাবলি:'}
                  </span>{' '}
                  {language === 'en'
                    ? `If actual loss is more than BDT ${pkg.accidentalLimit.toLocaleString()} in aggregate.`
                    : `বাৎসরিক মোট ক্ষতির পরিমাণ বিডিটি ${pkg.accidentalLimit.toLocaleString()} এর অধিক হলে।`}
                </div>

                {/* Critical Illness Limit */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {language === 'en' ? 'Critical Illness Limit' : 'জটিল রোগ চিকিৎসা সীমা'}
                  </span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    BDT {pkg.criticalLimit.toLocaleString()}
                  </span>
                </div>

                {/* E-Delivery Speed */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {language === 'en' ? 'E-Delivery Speed' : 'ই-ডেলিভারি সময়'}
                  </span>
                  <span className="font-black text-[#0f2874] dark:text-blue-400 font-mono">
                    {pkg.deliverySpeed}
                  </span>
                </div>
              </div>

              {/* Annual Premium & Buy Now Button matching Screenshot */}
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Annual Premium' : 'বাৎসরিক প্রিমিয়াম'}
                  </span>
                  <div className="text-base font-black text-slate-900 dark:text-white font-mono">
                    BDT {pkg.annualPremium.toLocaleString()}{' '}
                    <span className="text-[11px] font-medium text-slate-400">/year</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBuyNow(pkg)}
                  className="w-full h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-black text-xs shadow-md transition-all active:scale-98 flex items-center justify-center cursor-pointer"
                >
                  <span>{language === 'en' ? 'Buy Now' : 'এখনই কিনুন'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pet Insurance Advantage Banner */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f1d38] p-3 text-[11px] text-slate-600 dark:text-slate-300 space-y-1 shadow-2xs mb-2">
          <div className="font-bold text-[#0f2874] dark:text-blue-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {language === 'en'
                ? 'Fast 10-Minute Digital Certificate Issuance'
                : '১০ মিনিটে তাৎক্ষণিক ডিজিটাল সার্টিফিকেট প্রদান'}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-snug">
            {language === 'en'
              ? 'No mandatory prior vet health checkup required for routine plans. Covers sudden accidental injuries, surgeries, and critical sickness across all registered veterinary clinics in Bangladesh.'
              : 'রুটিন প্ল্যানে আগাম ভেটেরিনারি মেডিকেল পরীক্ষার বাধ্যবাধকতা নেই। সারাদেশের সকল নিবন্ধিত ভেটেরিনারি ক্লিনিকে জরুরি দুর্ঘটনা ও অস্ত্রোপচার কভারযোগ্য।'}
          </p>
        </div>

        {/* Checkout Modal Sheet */}
        {isCheckoutOpen && selectedPlanForPurchase && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-[420px] bg-white dark:bg-[#0c1a33] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-5 overflow-hidden animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    {petType === 'cat' ? <Cat className="w-3.5 h-3.5 text-[#0f2874]" /> : <Dog className="w-3.5 h-3.5 text-[#0f2874]" />}
                    <span>{petType === 'cat' ? 'Cat' : 'Dog'} Insurance Enrollment</span>
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {selectedPlanForPurchase.title} • BDT {selectedPlanForPurchase.annualPremium.toLocaleString()}/year
                  </p>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="my-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  {language === 'en' ? 'Select Payment Method' : 'পেমেন্ট মেথড নির্বাচন করুন'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/30 text-pink-700 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-pink-600" />
                    <span className="text-[10.5px]">bKash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 text-orange-700 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-orange-600" />
                    <span className="text-[10.5px]">Nagad</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'border-[#0f2874] bg-blue-50/50 dark:bg-blue-950/30 text-[#0f2874] font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#0f2874]" />
                    <span className="text-[10.5px]">Cards</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleConfirmPurchase} className="space-y-2.5 my-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Pet Name *' : 'পোষা প্রাণীর নাম *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Breed *' : 'জাত / প্রজাতি *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={petBreed}
                      onChange={(e) => setPetBreed(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Pet Age / DOB *' : 'বয়স *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={petAge}
                      onChange={(e) => setPetAge(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Owner Name *' : 'মালিকের নাম *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Mobile Number *' : 'মোবাইল নম্বর *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'National ID (NID) *' : 'এনআইডি *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={nidNumber}
                      onChange={(e) => setNidNumber(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-3"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {language === 'en'
                      ? `Pay BDT ${selectedPlanForPurchase.annualPremium.toLocaleString()} & Issue Cover`
                      : `BDT ${selectedPlanForPurchase.annualPremium.toLocaleString()} প্রদান ও কভার সক্রিয় করুন`}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Confirmation Modal */}
        {isSuccess && selectedPlanForPurchase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-[380px] bg-white dark:bg-[#0c1a33] rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-blue-900 text-center space-y-3.5">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/80 text-[#0f2874] dark:text-blue-300 flex items-center justify-center mx-auto border border-blue-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {language === 'en' ? 'Pet Policy Issued!' : 'পোষা প্রাণী পলিসি সফলভাবে সক্রিয় হয়েছে!'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'en' ? 'Certificate ' : 'সার্টিফিকেট নম্বর '}
                  <strong className="text-[#0f2874] dark:text-blue-300 font-mono">{policyId}</strong>{' '}
                  {language === 'en' ? `issued for ${petName} (${petBreed}).` : `${petName} (${petBreed})-এর নামে ইস্যু করা হয়েছে।`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Plan Tier:' : 'প্ল্যান:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {petType === 'cat' ? 'Cat' : 'Dog'} {selectedPlanForPurchase.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Coverage Limit:' : 'কভারেজ সীমা:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    BDT {selectedPlanForPurchase.totalLimit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Premium Paid:' : 'পরিশোধিত প্রিমিয়াম:'}</span>
                  <span className="font-bold text-emerald-600 font-mono">
                    BDT {selectedPlanForPurchase.annualPremium.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'E-Delivery Status:' : 'ই-ডেলিভারি স্ট্যাটাস:'}</span>
                  <span className="font-bold text-[#0f2874] dark:text-blue-300">
                    {language === 'en' ? 'Instant Soft Copy Emailed (10 Mins)' : 'ইমেইল ও এসএমএসে প্রেরিত (১০ মিনিট)'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full h-10 rounded-xl bg-[#0f2874] text-white font-bold text-xs shadow-md transition active:scale-98 flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'en' ? 'Download Pet Policy Certificate' : 'পেট পলিসি সার্টিফিকেট ডাউনলোড'}</span>
                </button>
                <button
                  onClick={onGoBack}
                  className="w-full h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition"
                >
                  {language === 'en' ? 'Return to Products' : 'প্রোডাক্ট তালিকায় ফিরুন'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 text-center text-[9.5px] text-slate-400 font-medium">
        {language === 'en'
          ? 'Green Delta Pet Care Insurance • Underwritten by GDIC PLC'
          : 'গ্রিন ডেল্টা পেট কেয়ার ইন্স্যুরেন্স • জিডিআইসি পিএলসি কর্তৃক নিবন্ধিত'}
      </div>
    </div>
  );
};
