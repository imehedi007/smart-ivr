'use client';

import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Shield,
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
  HelpCircle
} from 'lucide-react';
import { Language } from '../../types/ivr';
import { playSuccessChime } from '../../lib/audio';

interface NibeditaPurchaseJourneyProps {
  language: Language;
  onGoBack: () => void;
  onReturnHome?: () => void;
}

type NibeditaPlan = 'eco' | 'plus' | 'regular';

export const NibeditaPurchaseJourney: React.FC<NibeditaPurchaseJourneyProps> = ({
  language,
  onGoBack,
  onReturnHome
}) => {
  // Plan selection: 'eco' (Nibedita Eco), 'plus' (Nibedita Plus), 'regular' (Nibedita Regular)
  const [selectedPlan, setSelectedPlan] = useState<NibeditaPlan>('eco');

  // Form State matching Screenshot 1
  const [sumInsured, setSumInsured] = useState<number>(50000);
  const [dob, setDob] = useState<string>('01/11/2001');

  // Flow State: false = Form Input (Screenshot 1), true = Quotation Summary (Screenshot 2)
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isFormExpanded, setIsFormExpanded] = useState<boolean>(false);

  // Checkout & Enrollment Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [policyId, setPolicyId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');

  // Applicant details
  const [insuredName, setInsuredName] = useState('Fatima Tuz Zohra');
  const [mobileNumber, setMobileNumber] = useState('01711234567');
  const [nidNumber, setNidNumber] = useState('19982692518000499');
  const [nomineeName, setNomineeName] = useState('Md Mehedi Hasan');
  const [nomineeRelation, setNomineeRelation] = useState('Spouse');

  // Plan metadata & Sum Insured options
  const planConfig: Record<
    NibeditaPlan,
    {
      nameEn: string;
      nameBn: string;
      tagEn: string;
      defaultSum: number;
      sumOptions: number[];
      baseRates: Record<number, number>;
    }
  > = {
    eco: {
      nameEn: 'Nibedita Eco',
      nameBn: 'নিবেদিতা ইকো',
      tagEn: 'NIBEDITA ECO',
      defaultSum: 50000,
      sumOptions: [50000, 100000],
      baseRates: {
        50000: 30.0,
        100000: 60.0
      }
    },
    plus: {
      nameEn: 'Nibedita Plus',
      nameBn: 'নিবেদিতা প্লাস',
      tagEn: 'NIBEDITA PLUS',
      defaultSum: 100000,
      sumOptions: [100000, 250000],
      baseRates: {
        100000: 120.0,
        250000: 300.0
      }
    },
    regular: {
      nameEn: 'Nibedita Regular',
      nameBn: 'নিবেদিতা রেগুলার',
      tagEn: 'NIBEDITA REGULAR',
      defaultSum: 250000,
      sumOptions: [250000, 500000],
      baseRates: {
        250000: 280.0,
        500000: 560.0
      }
    }
  };

  // Switch plan handler
  const handleSelectPlan = (plan: NibeditaPlan) => {
    setSelectedPlan(plan);
    setSumInsured(planConfig[plan].defaultSum);
  };

  // Calculate pricing
  const calculatePricing = () => {
    const currentConfig = planConfig[selectedPlan];
    const base: number = currentConfig.baseRates[sumInsured] ?? 30.0;
    const vat: number = base * 0.15;
    const stamp: number = 20.0;
    const total: number = base + vat + stamp;

    return {
      base: base.toFixed(2),
      vat: vat.toFixed(2),
      stamp: stamp.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const pricing = calculatePricing();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    setHasCalculated(true);
    setIsFormExpanded(false);
  };

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `GDIC-NBD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setPolicyId(generatedId);
    playSuccessChime();
    setIsCheckoutOpen(false);
    setIsSuccess(true);
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/70 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Product Category Capsule */}
        <div className="flex items-center justify-end mb-2.5 px-1">
          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900 flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>{language === 'en' ? 'Women Comprehensive' : 'নারী সুরক্ষা বীমা'}</span>
          </span>
        </div>

        {/* Screen Header matching screenshot */}
        <div className="text-center my-3 px-2">
          <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
            {language === 'en' ? (
              <>
                Choose Coverage <span className="text-[#0f2874] dark:text-blue-400">Type</span>
              </>
            ) : (
              <>
                কভারেজ ধরন <span className="text-[#0f2874] dark:text-blue-400">নির্বাচন করুন</span>
              </>
            )}
          </h1>
        </div>

        {/* Tab Selector matching Screenshot (Segmented control container) */}
        <div className="rounded-2xl bg-slate-100/90 dark:bg-slate-900 p-1.5 flex items-center justify-between border border-slate-200/60 dark:border-slate-800 shadow-2xs mb-3.5">
          {(['eco', 'plus', 'regular'] as NibeditaPlan[]).map((plan) => {
            const isActive = selectedPlan === plan;
            return (
              <button
                key={plan}
                type="button"
                onClick={() => handleSelectPlan(plan)}
                className={`flex-1 py-2 px-2 text-xs font-bold rounded-xl transition-all text-center ${
                  isActive
                    ? 'bg-white dark:bg-[#16325B] text-[#0f2874] dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                {language === 'en' ? planConfig[plan].nameEn : planConfig[plan].nameBn}
              </button>
            );
          })}
        </div>

        {/* SCREENSHOT 1 STATE: Input Form Card (When not calculated, or when expanded) */}
        {(!hasCalculated || isFormExpanded) && (
          <form
            onSubmit={handleCalculate}
            className="rounded-2xl border border-slate-200/90 dark:border-blue-900/40 p-4 sm:p-5 bg-white dark:bg-[#0f1d38] space-y-4 shadow-xs animate-in fade-in duration-200 mb-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Field 1: Sum Insured * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  {language === 'en' ? 'Sum Insured' : 'বীমা অঙ্ক'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={sumInsured}
                    onChange={(e) => setSumInsured(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0f2874] appearance-none"
                  >
                    {planConfig[selectedPlan].sumOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Field 2: Date Of Birth * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  {language === 'en' ? 'Date Of Birth' : 'জন্ম তারিখ'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="DD / MM / YYYY"
                    className="w-full h-11 px-3.5 pr-10 rounded-xl border-2 border-[#0f2874] dark:border-blue-500 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Calculate Button matching Screenshot 1 */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>{language === 'en' ? 'Calculate Premium' : 'প্রিমিয়াম হিসাব করুন'}</span>
              </button>
            </div>
          </form>
        )}

        {/* SCREENSHOT 2 STATE: Results View (Collapsed Edit Card + Quotation Summary) */}
        {hasCalculated && (
          <div className="space-y-3.5 animate-in fade-in duration-200 mb-3">
            {/* 1. Edit Policy Details & Recalculate Card matching Screenshot 2 */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-blue-900/40 p-3 sm:p-3.5 bg-white dark:bg-[#0f1d38] flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/40 text-[#0f2874] dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {language === 'en' ? 'Edit Policy Details & Recalculate' : 'পলিসির তথ্য পরিবর্তন ও পুনঃগণনা'}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {language === 'en' ? 'Click to expand policy form' : 'ফর্ম বিস্তারিত দেখতে ক্লিক করুন'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFormExpanded(!isFormExpanded)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-[#0f2874] dark:text-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 transition"
              >
                <span>{language === 'en' ? 'Edit Details' : 'তথ্য পরিবর্তন'}</span>
                {isFormExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* 2. Quotation Summary Card matching Screenshot 2 */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-blue-900/40 p-4 sm:p-5 bg-white dark:bg-[#0f1d38] space-y-3.5 shadow-xs">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0f2874] dark:text-blue-400">
                  {language === 'en' ? 'QUOTATION SUMMARY' : 'কোটেশন সারাংশ'}
                </span>
                <button
                  type="button"
                  onClick={() => setHasCalculated(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                  title="Close Summary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Product and Sum Insured Info Box */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">{language === 'en' ? 'Product:' : 'প্রোডাক্ট:'}</span>
                  <span className="font-black text-slate-900 dark:text-white uppercase">
                    {planConfig[selectedPlan].tagEn}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">{language === 'en' ? 'Sum Insured:' : 'বীমা অঙ্ক:'}</span>
                  <span className="font-black text-slate-900 dark:text-white font-mono">
                    BDT {sumInsured.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Cost Breakdown Rows */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <div className="flex justify-between items-center">
                  <span>{language === 'en' ? 'Insurance Base Premium:' : 'মূল বীমা প্রিমিয়াম:'}</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    BDT {pricing.base}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{language === 'en' ? 'VAT (15%):' : 'ভ্যাট (১৫%):'}</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    BDT {pricing.vat}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{language === 'en' ? 'Revenue Stamp Fee:' : 'রেভিনিউ স্ট্যাম্প ফি:'}</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    BDT {pricing.stamp}
                  </span>
                </div>
              </div>

              {/* Divider and Total Premium Row matching screenshot */}
              <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {language === 'en' ? 'Total Premium' : 'সর্বমোট প্রিমিয়াম'}
                  </span>
                  <span className="text-[9.5px] text-slate-400">
                    {language === 'en' ? 'Including all taxes' : 'সকল কর ও ভ্যাট অন্তর্ভুক্ত'}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-[#0f2874] dark:text-blue-400">
                  BDT {pricing.total}
                </div>
              </div>

              {/* Buy Now Button matching screenshot */}
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full h-12 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center mt-3"
              >
                <span>{language === 'en' ? 'Buy Now' : 'এখনই কিনুন'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Nibedita Special Privileges Note Card */}
        <div className="rounded-2xl border border-rose-100 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20 p-3 text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5">
          <div className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>{language === 'en' ? 'Nibedita Exclusive Privileges' : 'নিবেদিতা বিশেষ সুবিধাসমূহ'}</span>
          </div>
          <p className="leading-snug text-slate-500 dark:text-slate-400">
            {language === 'en'
              ? 'Includes 24/7 legal aid assistance, trauma counseling, and wellness discount cards at over 120 partner clinics across Bangladesh.'
              : '২৪/৭ আইনি সহায়তা, ট্রমা কাউন্সিলিং এবং সারাদেশের ১২০টিরও বেশি পার্টনার ক্লিনিকে বিশেষ স্বাস্থ্য পরীক্ষা ছাড় অন্তর্ভুক্ত।'}
          </p>
        </div>

        {/* Enrollment Checkout Modal Sheet */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-[420px] bg-white dark:bg-[#0c1a33] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-5 overflow-hidden animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    {language === 'en' ? 'Nibedita Policy Issuance' : 'নিবেদিতা পলিসি আবেদন'}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {planConfig[selectedPlan].nameEn} • Total: BDT {pricing.total}
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
                    {language === 'en' ? 'Insured Female Name *' : 'বীমা গ্রহীতার নাম *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={insuredName}
                    onChange={(e) => setInsuredName(e.target.value)}
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
                      {language === 'en' ? 'National ID (NID) *' : 'এনআইডি নম্বর *'}
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
                      <option value="Spouse">{language === 'en' ? 'Spouse' : 'স্বামী'}</option>
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
                      ? `Pay BDT ${pricing.total} & Issue Cover`
                      : `BDT ${pricing.total} প্রদান ও কভার সক্রিয় করুন`}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-[380px] bg-white dark:bg-[#0c1a33] rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-blue-900 text-center space-y-3.5">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {language === 'en' ? 'Nibedita Policy Issued!' : 'নিবেদিতা পলিসি সফলভাবে সক্রিয় হয়েছে!'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'en' ? 'Certificate ' : 'সার্টিফিকেট নম্বর '}
                  <strong className="text-[#0f2874] dark:text-blue-300 font-mono">{policyId}</strong>{' '}
                  {language === 'en' ? `issued for ${insuredName}.` : `${insuredName}-এর নামে ইস্যু করা হয়েছে।`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Plan Tier:' : 'প্ল্যান ধরণ:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {planConfig[selectedPlan].nameEn}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Sum Insured:' : 'বীমা অঙ্ক:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                    BDT {sumInsured.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Premium Paid:' : 'পরিশোধিত প্রিমিয়াম:'}</span>
                  <span className="font-bold text-emerald-600 font-mono">BDT {pricing.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Nominee:' : 'নমিনী:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {nomineeName} ({nomineeRelation})
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full h-10 rounded-xl bg-[#0f2874] text-white font-bold text-xs shadow-md transition active:scale-98 flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'en' ? 'Download Digital Certificate' : 'ডিজিটাল সার্টিফিকেট ডাউনলোড'}</span>
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
          ? 'Green Delta Nibedita Comprehensive Insurance • Approved by IDRA'
          : 'গ্রিন ডেল্টা নিবেদিতা নারী সুরক্ষা পলিসি • আইডিআরএ কর্তৃক অনুমোদিত'}
      </div>
    </div>
  );
};
