'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  Info,
  CheckCircle2,
  Download,
  Share2,
  User,
  Phone,
  CreditCard,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Lock,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Language } from '../../types/ivr';
import { playSuccessChime } from '../../lib/audio';

interface PpaPurchaseJourneyProps {
  language: Language;
  onGoBack: () => void;
  onReturnHome?: () => void;
}

export const PpaPurchaseJourney: React.FC<PpaPurchaseJourneyProps> = ({
  language,
  onGoBack,
  onReturnHome
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [policyId, setPolicyId] = useState('');
  const [showBenefitSchedule, setShowBenefitSchedule] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');

  // Form State
  const [applicantName, setApplicantName] = useState('Md Mehedi Hasan');
  const [mobileNumber, setMobileNumber] = useState('01711234567');
  const [nidNumber, setNidNumber] = useState('19902692518000412');
  const [nomineeName, setNomineeName] = useState('Nusrat Jahan');
  const [nomineeRelation, setNomineeRelation] = useState('Spouse');

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `GDIC-PPA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setPolicyId(generatedId);
    playSuccessChime();
    setIsCheckoutOpen(false);
    setIsSuccess(true);
  };

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2.5 sm:px-4 sm:py-3.5 bg-slate-50/80 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Product Category Capsule */}
        <div className="flex items-center justify-end mb-2 px-1">
          <span className="text-[10px] font-bold text-[#0f2874] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900">
            {language === 'en' ? 'PPA Policy Plan' : 'পিপিএ পলিসি প্ল্যান'}
          </span>
        </div>

        {/* Screen Header - Exact match to screenshot */}
        <div className="text-center my-3 px-2">
          <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
            {language === 'en' ? (
              <>
                PPA Annual Premium <span className="text-[#0f2874] dark:text-blue-400">Pricing Breakdown</span>
              </>
            ) : (
              <>
                পিপিএ বার্ষিক প্রিমিয়াম <span className="text-[#0f2874] dark:text-blue-400">হিসাব ও বিবরণী</span>
              </>
            )}
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-[340px] mx-auto leading-snug">
            {language === 'en'
              ? 'Enjoy fixed budget-friendly accidental security with straightforward annual gross premium'
              : 'স্বল্প খরচে নির্ভরযোগ্য বাৎসরিক দুর্ঘটনা সুরক্ষা ও সহজ প্রিমিয়াম প্যাকেজ'}
          </p>
        </div>

        {/* Unified Outer Container matching screenshot styling */}
        <div className="rounded-3xl bg-white dark:bg-[#0c1830] border border-slate-200/90 dark:border-blue-900/40 p-3.5 sm:p-4 shadow-xs space-y-3.5 mb-3">
          {/* Card 1: Peoples Personal Accident & Eligibility (Left Card in screenshot) */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 sm:p-4 bg-white dark:bg-[#0f1d38] space-y-3.5">
            {/* Top Badge & Term */}
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0f2874] text-white">
                {language === 'en' ? 'PPA POLICY' : 'পিপিএ পলিসি'}
              </span>
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400">
                {language === 'en' ? 'Term: 1 Year (Renewable)' : 'মেয়াদ: ১ বছর (নবায়নযোগ্য)'}
              </span>
            </div>

            {/* Title & Cover Amount */}
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {language === 'en' ? 'Peoples Personal Accident' : 'জনগণের ব্যক্তিগত দুর্ঘটনা বীমা'}
              </h2>
              <div className="text-[11px] font-black tracking-wider text-[#0f2874] dark:text-blue-400 uppercase mt-0.5">
                {language === 'en' ? 'BDT 100,000 MAXIMUM COVER' : 'সর্বোচ্চ ১,০০,০০০ টাকা কভারেজ'}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                {language === 'en'
                  ? 'Green Delta PPA provides compensation payments for accidental death and permanent disabilities. Best value personal accident coverage for individuals.'
                  : 'গ্রিন ডেল্টা পিপিএ অপ্রত্যাশিত দুর্ঘটনাজনিত মৃত্যু এবং স্থায়ী পঙ্গুত্বে সর্বোচ্চ আর্থিক ক্ষতিপূরণ প্রদান করে। ব্যক্তি পর্যায়ের সেরা দুর্ঘটনা সুরক্ষা।'}
              </p>
            </div>

            {/* Interactive Benefit Schedule Drawer */}
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowBenefitSchedule(!showBenefitSchedule)}
                className="w-full px-3 py-2 text-[10.5px] font-bold text-[#0f2874] dark:text-blue-300 flex items-center justify-between hover:bg-slate-100/60 transition"
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {language === 'en'
                      ? 'View Compensation Payout Schedule'
                      : 'ক্ষতিপূরণ কভারেজ বিবরণী দেখুন'}
                  </span>
                </span>
                {showBenefitSchedule ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showBenefitSchedule && (
                <div className="px-3 pb-2.5 pt-1 border-t border-slate-200/60 dark:border-slate-800 text-[10.5px] space-y-1.5 animate-in fade-in">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                    <span>Accidental Death</span>
                    <span className="font-bold font-mono text-emerald-600">100% (BDT 100,000)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                    <span>Permanent Total Disability (PTD)</span>
                    <span className="font-bold font-mono text-emerald-600">100% (BDT 100,000)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                    <span>Loss of Two Limbs / Both Eyes</span>
                    <span className="font-bold font-mono text-emerald-600">100% (BDT 100,000)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
                    <span>Loss of One Limb / One Eye</span>
                    <span className="font-bold font-mono text-amber-600">50% (BDT 50,000)</span>
                  </div>
                </div>
              )}
            </div>

            {/* ELIGIBILITY REQUIREMENTS */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                {language === 'en' ? 'ELIGIBILITY REQUIREMENTS' : 'যোগ্যতার শর্তাবলী'}
              </span>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {language === 'en' ? 'Eligible Age Range' : 'বয়সসীমা'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? '18 – 65 years' : '১৮ – ৬৫ বছর'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {language === 'en' ? 'Policy Duration' : 'পলিসি মেয়াদ'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? '1 Year (Annual Renewable)' : '১ বছর (বার্ষিক নবায়নযোগ্য)'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {language === 'en' ? 'Coverage Type' : 'কভারেজ ধরন'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Individual' : 'ব্যক্তিগত'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {language === 'en' ? 'Nationality' : 'জাতীয়তা'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Bangladeshi Citizens' : 'বাংলাদেশী নাগরিক'}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Notice Card matching screenshot */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                {language === 'en'
                  ? 'Coverage ceases upon reaching the policy year-end. Renewal must be completed to maintain continuous protection.'
                  : 'পলিসির মেয়াদান্তে কভারেজ শেষ হবে। অবিচ্ছিন্ন সুরক্ষার জন্য বাৎসরিক নবায়ন সম্পন্ন করতে হবে।'}
              </span>
            </div>

            {/* Worldwide Accidental Benefit Card with Solid Blue Circle Check */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/40 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 text-[11px] font-semibold text-[#0f2874] dark:text-blue-300">
              <div className="w-5 h-5 rounded-full bg-[#0f2874] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>
                {language === 'en'
                  ? 'Coverage applies worldwide for accidental death and permanent disability as per policy terms.'
                  : 'পলিসি শর্তানুযায়ী দুর্ঘটনাজনিত মৃত্যু ও স্থায়ী পঙ্গুত্বে বিশ্বব্যাপী ২৪/৭ সুরক্ষা কার্যকর।'}
              </span>
            </div>
          </div>

          {/* Card 2: Premium Breakdown & Buy Now (Right Card in screenshot) */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 sm:p-4 bg-white dark:bg-[#0f1d38] flex flex-col justify-between space-y-3.5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0f2874] dark:text-blue-400 block mb-2.5">
                {language === 'en' ? 'PREMIUM BREAKDOWN' : 'প্রিমিয়াম বিবরণী'}
              </span>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between items-center">
                  <span>{language === 'en' ? 'Insurance Base Premium:' : 'মূল বীমা প্রিমিয়াম:'}</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">BDT 60</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{language === 'en' ? 'VAT (15%):' : 'ভ্যাট (১৫%):'}</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">BDT 9</span>
                </div>
              </div>

              {/* Grand Total Row matching screenshot prominent layout */}
              <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {language === 'en' ? 'Grand Total Premium' : 'সর্বমোট প্রদেয় প্রিমিয়াম'}
                  </span>
                  <span className="text-[9.5px] text-slate-400">
                    {language === 'en' ? 'Including all taxes' : 'সকল কর ও ভ্যাট অন্তর্ভুক্ত'}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-[#0f2874] dark:text-blue-400">
                  {language === 'en' ? 'BDT 69' : '৳ ৬৯'}
                </div>
              </div>
            </div>

            {/* DELIVERY AND ACCESS - Dark Blue Checkmarks matching screenshot */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0f2874] dark:text-blue-400 block mb-2">
                {language === 'en' ? 'DELIVERY AND ACCESS' : 'ডেলিভারি ও প্রাপ্তি'}
              </span>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0f2874] dark:text-blue-400 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    {language === 'en'
                      ? 'Policy delivers within 3–7 business days after purchase'
                      : 'ক্রয়ের ৩-৭ কার্যদিবসের মধ্যে মূল পলিসি ডেলিভারি'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0f2874] dark:text-blue-400 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    {language === 'en'
                      ? 'Instant digital soft copy emailed immediately'
                      : 'তাৎক্ষণিক ডিজিটাল পলিসি সার্টিফিকেট ইমেইল ও এসএমএসে প্রেরণ'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0f2874] dark:text-blue-400 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>
                    {language === 'en'
                      ? 'Active right after payment approval'
                      : 'পেমেন্ট সফল হওয়ার সাথে সাথেই কভারেজ সক্রিয়'}
                  </span>
                </div>
              </div>
            </div>

            {/* Buy Now Button matching screenshot */}
            <button
              onClick={handleOpenCheckout}
              className="w-full h-12 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center mt-3"
            >
              <span>{language === 'en' ? 'Buy Now' : 'এখনই কিনুন'}</span>
            </button>
          </div>
        </div>

        {/* Checkout Modal Sheet */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-[420px] bg-white dark:bg-[#0c1a33] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-5 overflow-hidden animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    {language === 'en' ? 'PPA Policy Enrollment' : 'পিপিএ পলিসি এনরোলমেন্ট'}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {language === 'en'
                      ? 'Total payable: BDT 69 (1 Year Cover)'
                      : 'মোট প্রদেয়: ৬৯ টাকা (১ বছর মেয়াদ)'}
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
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'en' ? 'Insured Name *' : 'বীমা গ্রাহকের নাম *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                  />
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
                      {language === 'en' ? 'National ID (NID) *' : 'জাতীয় পরিচয়পত্র নম্বর *'}
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

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Nominee Name *' : 'নমিনীর নাম *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={nomineeName}
                      onChange={(e) => setNomineeName(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Relation *' : 'সম্পর্ক *'}
                    </label>
                    <select
                      value={nomineeRelation}
                      onChange={(e) => setNomineeRelation(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    >
                      <option value="Spouse">{language === 'en' ? 'Spouse' : 'স্বামী/স্ত্রী'}</option>
                      <option value="Father">{language === 'en' ? 'Father' : 'পিতা'}</option>
                      <option value="Mother">{language === 'en' ? 'Mother' : 'মাতা'}</option>
                      <option value="Son">{language === 'en' ? 'Son' : 'পুত্র'}</option>
                      <option value="Daughter">{language === 'en' ? 'Daughter' : 'কন্যা'}</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-3"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {language === 'en'
                      ? 'Pay BDT 69 & Issue Cover'
                      : '৬৯ টাকা প্রদান ও কভারেজ চালু করুন'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Confirmation Modal */}
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-[380px] bg-white dark:bg-[#0c1a33] rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-blue-900 text-center space-y-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {language === 'en' ? 'PPA Policy Active!' : 'পিপিএ পলিসি সক্রিয় হয়েছে!'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'en' ? 'Certificate ' : 'সার্টিফিকেট নম্বর '}
                  <strong className="text-[#0f2874] dark:text-blue-300 font-mono">{policyId}</strong>{' '}
                  {language === 'en' ? `issued for ${applicantName}.` : `গ্রাহক ${applicantName}-এর নামে ইস্যু করা হয়েছে।`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Sum Insured:' : 'বীমা অঙ্ক:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">BDT 100,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Premium Paid:' : 'পরিশোধিত প্রিমিয়াম:'}</span>
                  <span className="font-bold text-emerald-600 font-mono">BDT 69 (incl. VAT)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Nominee:' : 'নমিনী:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {nomineeName} ({nomineeRelation})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Coverage Scope:' : 'কভারেজ পরিধি:'}</span>
                  <span className="font-bold text-[#0f2874] dark:text-blue-300">
                    {language === 'en' ? '24/7 Worldwide Accidental' : '২৪/৭ বিশ্বব্যাপী দুর্ঘটনা'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full h-10 rounded-xl bg-[#0f2874] text-white font-bold text-xs shadow-md transition active:scale-98 flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'en' ? 'Download Digital Policy Note' : 'ডিজিটাল পলিসি নোট ডাউনলোড'}</span>
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
          ? 'Green Delta Peoples Personal Accident • Approved by IDRA Bangladesh'
          : 'গ্রিন ডেল্টা পিপলস পার্সোনাল অ্যাক্সিডেন্ট • আইডিআরএ বাংলাদেশ কর্তৃক অনুমোদিত'}
      </div>
    </div>
  );
};
