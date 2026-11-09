'use client';

import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Plane,
  ShieldCheck,
  Check,
  CheckCircle2,
  X,
  CreditCard,
  Smartphone,
  Download,
  Lock,
  Sparkles,
  Globe2,
  Users,
  FileCheck
} from 'lucide-react';
import { Language } from '../../types/ivr';
import { playSuccessChime } from '../../lib/audio';

interface TravelPurchaseJourneyProps {
  language: Language;
  onGoBack: () => void;
  onReturnHome?: () => void;
}

type TravelType = 'holiday' | 'corporate' | 'study';

export const TravelPurchaseJourney: React.FC<TravelPurchaseJourneyProps> = ({
  language,
  onGoBack,
  onReturnHome
}) => {
  // Top Tab selection matching screenshot: 'Business & Holidays' | 'Corporate Travel' | 'Employment & Studies'
  const [travelType, setTravelType] = useState<TravelType>('holiday');

  // Form State matching Screenshot 1
  const [travellerCount, setTravellerCount] = useState<number>(1);
  const [country, setCountry] = useState<string>('France (Schengen Area)');
  const [departureDate, setDepartureDate] = useState<string>('15/12/2026');
  const [coveragePeriod, setCoveragePeriod] = useState<string>('30 Days');
  const [dob, setDob] = useState<string>('24/08/1995');

  // State: false = Input Form (Screenshot 1), true = Quotation Summary (Screenshot 2)
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isFormExpanded, setIsFormExpanded] = useState<boolean>(false);

  // Checkout & Enrollment Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [policyId, setPolicyId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');

  // Traveller Form State
  const [travellerName, setTravellerName] = useState('Md Mehedi Hasan');
  const [passportNumber, setPassportNumber] = useState('A01948572');
  const [mobileNumber, setMobileNumber] = useState('01711234567');
  const [emergencyContact, setEmergencyContact] = useState('Nusrat Jahan');
  const [emergencyPhone, setEmergencyPhone] = useState('01811234567');

  const travelTypeConfig = {
    holiday: {
      nameEn: 'Business & Holidays',
      nameBn: 'ব্যবসা ও অবকাশযাপন',
      productLabelEn: 'Travel Insurance - Business & Holidays',
      productLabelBn: 'ভ্রমণ বীমা - ব্যবসা ও অবকাশযাপন',
      baseRates: {
        '7 Days': 1150.0,
        '15 Days': 1850.0,
        '30 Days': 2553.0, // Matches exact Screenshot 2
        '60 Days': 4200.0,
        '90 Days': 5800.0,
        '180 Days': 8500.0,
        '1 Year': 14000.0
      }
    },
    corporate: {
      nameEn: 'Corporate Travel',
      nameBn: 'করপোরেট বিজনেস ভ্রমণ',
      productLabelEn: 'Travel Insurance - Corporate Travel',
      productLabelBn: 'ভ্রমণ বীমা - করপোরেট বিজনেস',
      baseRates: {
        '7 Days': 1400.0,
        '15 Days': 2200.0,
        '30 Days': 2950.0,
        '60 Days': 4800.0,
        '90 Days': 6500.0,
        '180 Days': 9800.0,
        '1 Year': 16500.0
      }
    },
    study: {
      nameEn: 'Employment & Studies',
      nameBn: 'কর্মসংস্থান ও উচ্চশিক্ষা',
      productLabelEn: 'Travel Insurance - Employment & Studies',
      productLabelBn: 'ভ্রমণ বীমা - কর্মসংস্থান ও উচ্চশিক্ষা',
      baseRates: {
        '7 Days': 1200.0,
        '15 Days': 1900.0,
        '30 Days': 2600.0,
        '60 Days': 4300.0,
        '90 Days': 5900.0,
        '180 Days': 8800.0,
        '1 Year': 14500.0
      }
    }
  };

  // Calculate pricing
  const calculatePricing = () => {
    const currentConfig = travelTypeConfig[travelType];
    const rateMap = currentConfig.baseRates as Record<string, number>;
    const singleBase = rateMap[coveragePeriod] ?? 2553.0;
    const base = singleBase * travellerCount;
    const vat = base * 0.15;
    const stamp = 20.0;
    const total = base + vat + stamp;

    return {
      base: base.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      vat: vat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      stamp: stamp.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      total: total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
    const generatedId = `GDIC-TRV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
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
          <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/70 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-900 flex items-center gap-1">
            <Plane className="w-3 h-3 text-sky-600" />
            <span>{language === 'en' ? 'Schengen & Worldwide' : 'শেঙ্গেন ও বিশ্বব্যাপী'}</span>
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
          {(['holiday', 'corporate', 'study'] as TravelType[]).map((tab) => {
            const isActive = travelType === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setTravelType(tab)}
                className={`flex-1 py-2 px-1 sm:px-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all text-center truncate ${
                  isActive
                    ? 'bg-white dark:bg-[#16325B] text-[#0f2874] dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                {language === 'en' ? travelTypeConfig[tab].nameEn : travelTypeConfig[tab].nameBn}
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
            {/* Header row inside form: TRAVELLER DETAILS + 1 Traveller dropdown button */}
            <div className="flex items-center justify-between pb-1">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0f2874] dark:text-blue-400 block">
                  {language === 'en' ? 'TRAVELLER DETAILS' : 'ভ্রমণকারীর তথ্য'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {language === 'en' ? 'Provide destination & travel details' : 'গন্তব্য ও ভ্রমণের তথ্য প্রদান করুন'}
                </span>
              </div>

              {/* 1 Traveller selector dropdown button matching screenshot */}
              <div className="relative">
                <select
                  value={travellerCount}
                  onChange={(e) => setTravellerCount(Number(e.target.value))}
                  className="h-8 px-3 pr-7 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white text-xs font-bold appearance-none cursor-pointer focus:outline-none"
                >
                  <option value={1} className="bg-white text-slate-900">
                    1 Traveller
                  </option>
                  <option value={2} className="bg-white text-slate-900">
                    2 Travellers
                  </option>
                  <option value={3} className="bg-white text-slate-900">
                    3 Travellers
                  </option>
                  <option value={4} className="bg-white text-slate-900">
                    4 Travellers
                  </option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Form Fields: 2x2 grid matching Screenshot 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Field 1: Travelling Country * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  {language === 'en' ? 'Travelling Country' : 'ভ্রমণকারী দেশ'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0f2874] appearance-none"
                  >
                    <option value="France (Schengen Area)">France (Schengen Area)</option>
                    <option value="Germany (Schengen Area)">Germany (Schengen Area)</option>
                    <option value="Italy (Schengen Area)">Italy (Schengen Area)</option>
                    <option value="Switzerland (Schengen Area)">Switzerland (Schengen Area)</option>
                    <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                    <option value="United States (USA)">United States (USA)</option>
                    <option value="Canada">Canada</option>
                    <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="India">India</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Field 2: Departure Date * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  {language === 'en' ? 'Departure Date' : 'যাত্রার তারিখ'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    placeholder="dd / mm / yyyy"
                    className="w-full h-11 px-3.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 3: Coverage Period * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  {language === 'en' ? 'Coverage Period' : 'কভারেজ মেয়াদ'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={coveragePeriod}
                    onChange={(e) => setCoveragePeriod(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0f2874] appearance-none"
                  >
                    <option value="7 Days">7 Days</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="90 Days">90 Days</option>
                    <option value="180 Days">180 Days</option>
                    <option value="1 Year">1 Year (Multi-Trip)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Field 4: Date Of Birth * */}
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
                    placeholder="dd / mm / yyyy"
                    className="w-full h-11 px-3.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Calculate Button matching Screenshot 1 */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="w-full sm:w-auto px-7 h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>{language === 'en' ? 'Calculate Premium' : 'প্রিমিয়াম হিসাব করুন'}</span>
              </button>
            </div>
          </form>
        )}

        {/* SCREENSHOT 2 STATE: Results View (Collapsed Edit Card + Quotation Summary) */}
        {hasCalculated && (
          <div className="space-y-3.5 animate-in fade-in duration-200 mb-3">
            {/* 1. Edit Traveller Details & Recalculate Card matching Screenshot 2 */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-blue-900/40 p-3 sm:p-3.5 bg-white dark:bg-[#0f1d38] flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/40 text-[#0f2874] dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {language === 'en' ? 'Edit Traveller Details & Recalculate' : 'ভ্রমণকারীর তথ্য পরিবর্তন ও পুনঃগণনা'}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {language === 'en' ? 'Click to expand traveller form' : 'ফর্ম বিস্তারিত দেখতে ক্লিক করুন'}
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

              {/* Product and Travellers Info Box */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 p-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">{language === 'en' ? 'Product:' : 'প্রোডাক্ট:'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {language === 'en'
                      ? travelTypeConfig[travelType].productLabelEn
                      : travelTypeConfig[travelType].productLabelBn}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">{language === 'en' ? 'Total Travellers:' : 'মোট ভ্রমণকারী:'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {travellerCount} {travellerCount === 1 ? 'Traveller' : 'Travellers'}
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

        {/* Embassy & Schengen Compliance Assurance Card */}
        <div className="rounded-2xl border border-sky-100 dark:border-sky-950/60 bg-sky-50/50 dark:bg-sky-950/20 p-3 text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5">
          <div className="font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>
              {language === 'en'
                ? '100% Embassy & Schengen Visa Compliant'
                : '১০০% দূতাবাস ও শেঙ্গেন ভিসা উপযোগী'}
            </span>
          </div>
          <p className="leading-snug text-slate-500 dark:text-slate-400">
            {language === 'en'
              ? 'Meets mandatory €30,000 / $50,000 medical emergency cover with digital QR code verification, 24/7 global cashless assistance, and flight delay support.'
              : 'ন্যূনতম ৩০,০০০ ইউরো সমপরিমাণ জরুরি চিকিৎসা সহায়তা, কিউআর কোডসহ তাৎক্ষণিক কভার নোট এবং আন্তর্জাতিক ক্যাশলেস হাসপাতাল নেটওয়ার্ক।'}
          </p>
        </div>

        {/* Enrollment Checkout Modal Sheet */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-[420px] bg-white dark:bg-[#0c1a33] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-5 overflow-hidden animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    {language === 'en' ? 'Travel Policy Issuance' : 'ভ্রমণ পলিসি ইস্যু'}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {country} • {coveragePeriod} • BDT {pricing.total}
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
                      {language === 'en' ? 'Traveller Full Name *' : 'ভ্রমণকারীর নাম *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={travellerName}
                      onChange={(e) => setTravellerName(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Passport Number *' : 'পাসপোর্ট নম্বর *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
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
                      {language === 'en' ? 'Emergency Contact *' : 'জরুরি যোগাযোগ *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0f2874]"
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
                      ? `Pay BDT ${pricing.total} & Issue Cover Note`
                      : `BDT ${pricing.total} প্রদান ও কভার নোট ইস্যু`}
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
              <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto border border-sky-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {language === 'en' ? 'Travel Policy Issued!' : 'ভ্রমণ পলিসি সফলভাবে সক্রিয় হয়েছে!'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'en' ? 'Certificate ' : 'সার্টিফিকেট নম্বর '}
                  <strong className="text-[#0f2874] dark:text-blue-300 font-mono">{policyId}</strong>{' '}
                  {language === 'en' ? `issued for ${travellerName} (Passport ${passportNumber}).` : `গ্রাহক ${travellerName}-এর নামে ইস্যু করা হয়েছে।`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Destination:' : 'গন্তব্য:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Coverage Period:' : 'মেয়াদ:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{coveragePeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Premium Paid:' : 'পরিশোধিত প্রিমিয়াম:'}</span>
                  <span className="font-bold text-emerald-600 font-mono">BDT {pricing.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'en' ? 'Visa Validity:' : 'ভিসা বৈধতা:'}</span>
                  <span className="font-bold text-[#0f2874] dark:text-blue-300">100% Embassy / Schengen Accepted</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full h-10 rounded-xl bg-[#0f2874] text-white font-bold text-xs shadow-md transition active:scale-98 flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'en' ? 'Download Embassy Cover Note' : 'দূতাবাস কভার নোট ডাউনলোড'}</span>
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
          ? 'Green Delta Overseas Travel Protection • Approved by IDRA & Schengen Embassies'
          : 'গ্রিন ডেল্টা ওভারসিজ ট্রাভেল প্রটেকশন • আইডিআরএ ও শেঙ্গেন দূতাবাস অনুমোদিত'}
      </div>
    </div>
  );
};
