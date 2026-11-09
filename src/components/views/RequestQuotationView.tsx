'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calculator,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Sparkles,
  Download,
  PhoneCall,
  Clock,
  FileText,
  Flame,
  Ship,
  HeartPulse,
  Lock,
  Wheat,
  Laptop,
  Layers,
  ChevronRight,
  Send,
  User,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react';
import { Language } from '../../types/ivr';
import { INSURANCE_PRODUCTS_DATA, BRANCHES_DATA } from '../../data/ivr-data';
import { playSuccessChime } from '../../lib/audio';

interface RequestQuotationViewProps {
  initialProductId?: string;
  language: Language;
  onGoBack: () => void;
  onReturnHome: () => void;
  onNavigateToDirectPurchase?: (productId: string) => void;
}

export const RequestQuotationView: React.FC<RequestQuotationViewProps> = ({
  initialProductId = 'fire-insurance',
  language,
  onGoBack,
  onReturnHome,
  onNavigateToDirectPurchase
}) => {
  // Strictly lock to the specific selected product - no other product should be shown
  const currentProduct =
    INSURANCE_PRODUCTS_DATA.find((p) => p.id === initialProductId) || INSURANCE_PRODUCTS_DATA[0];

  // Form Fields State
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('01712345678');
  const [email, setEmail] = useState('customer@example.com');
  const [division, setDivision] = useState('Dhaka');
  const [selectedBranch, setSelectedBranch] = useState('Dilkusha Head Office');
  const [sumInsured, setSumInsured] = useState<number>(2500000);
  const [customSumInput, setCustomSumInput] = useState('2,500,000');
  const [riskClassification, setRiskClassification] = useState('');
  const [commencementDate, setCommencementDate] = useState('2026-11-10');
  const [specialRemarks, setSpecialRemarks] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rfqNumber, setRfqNumber] = useState('');
  const [submissionTime, setSubmissionTime] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Set default risk classification when product changes
  useEffect(() => {
    switch (currentProduct.id) {
      case 'fire-insurance':
        setRiskClassification('Industrial Factory & Machinery');
        break;
      case 'marine-insurance':
        setRiskClassification('Sea Freight Import (Clause A)');
        break;
      case 'health-insurance':
        setRiskClassification('Executive Corporate Group Plan');
        break;
      case 'burglary-insurance':
        setRiskClassification('Commercial Warehouse & Stock');
        break;
      case 'agricultural-insurance':
        setRiskClassification('Satellite Weather Index Crop Cover');
        break;
      case 'all-risk-insurance':
        setRiskClassification('Enterprise Laptops & Server Gear');
        break;
      default:
        setRiskClassification('Corporate Cyber Security Liability');
        break;
    }
  }, [currentProduct.id]);

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'fire-insurance':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'marine-insurance':
        return <Ship className="w-4 h-4 text-cyan-600" />;
      case 'health-insurance':
        return <HeartPulse className="w-4 h-4 text-emerald-500" />;
      case 'burglary-insurance':
        return <Lock className="w-4 h-4 text-indigo-500" />;
      case 'agricultural-insurance':
        return <Wheat className="w-4 h-4 text-emerald-600" />;
      case 'all-risk-insurance':
        return <Laptop className="w-4 h-4 text-blue-600" />;
      default:
        return <Layers className="w-4 h-4 text-amber-500" />;
    }
  };

  const getRiskOptionsForProduct = (id: string) => {
    switch (id) {
      case 'fire-insurance':
        return [
          'Industrial Factory & Machinery',
          'Commercial Warehouse / Godown',
          'Office & Shopping Complex',
          'Residential Apartment & Contents'
        ];
      case 'marine-insurance':
        return [
          'Sea Freight Import (Clause A)',
          'Air Cargo Consignment',
          'Inland Waterways / Transit',
          'Customs Duty & Port Storage'
        ];
      case 'health-insurance':
        return [
          'Executive Corporate Group Plan',
          'Comprehensive Family Health Scheme',
          'Critical Illness Add-on Shield',
          'Senior Citizen Special Health'
        ];
      case 'burglary-insurance':
        return [
          'Commercial Warehouse & Stock',
          'Retail Showroom & Premises',
          'Cash in Safe & Transit',
          'Jewelry & High-Value Inventory'
        ];
      case 'agricultural-insurance':
        return [
          'Satellite Weather Index Crop Cover',
          'Commercial Dairy Cattle Mortality',
          'Poultry Farm Scheme',
          'Aquaculture & Fishery Shield'
        ];
      case 'all-risk-insurance':
        return [
          'Enterprise Laptops & Server Gear',
          'Broadcasting & Camera Equipment',
          'Smart Devices & Diagnostics',
          'Medical & Precision Machinery'
        ];
      default:
        return [
          'Corporate Cyber Security Liability',
          'Directors & Officers (D&O) Liability',
          'Contractor All Risk (CAR)',
          'Erection All Risk (EAR)'
        ];
    }
  };

  const handleSumChipSelect = (val: number, label: string) => {
    setSumInsured(val);
    setCustomSumInput(label);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRfq = `GDIC-RFQ-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const now = new Date();
      const timeStr = `${now.toLocaleDateString('en-GB')} at ${now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}`;

      setRfqNumber(generatedRfq);
      setSubmissionTime(timeStr);
      setIsSubmitting(false);
      setIsSuccess(true);
      playSuccessChime();
    }, 600);
  };

  const handleCopyRfq = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rfqNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/70 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Product Badge */}
        <div className="flex items-center justify-end mb-1 px-1">
          <span className="text-[10px] font-bold text-[#0f2874] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900 flex items-center gap-1">
            {getProductIcon(currentProduct.id)}
            <span>{language === 'en' ? `${currentProduct.nameEn} RFQ` : `${currentProduct.nameBn} কোটেশন`}</span>
          </span>
        </div>

        {/* View Header */}
        {!isSuccess && (
          <div className="text-center my-2.5 px-2">
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {language === 'en' ? (
                <>
                  {currentProduct.nameEn}{' '}
                  <span className="text-[#0f2874] dark:text-blue-400">Quotation</span>
                </>
              ) : (
                <>
                  {currentProduct.nameBn}{' '}
                  <span className="text-[#0f2874] dark:text-blue-400">কোটেশন রিকোয়েস্ট</span>
                </>
              )}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-[340px] mx-auto leading-snug">
              {language === 'en'
                ? `Fill up your ${currentProduct.nameEn.toLowerCase()} risk particulars. Green Delta underwriters will evaluate your proposal and issue a formal quote within 24 hours.`
                : `আপনার ${currentProduct.nameBn}-এর বীমা ঝুঁকির বিবরণ প্রদান করুন। গ্রিন ডেল্টার আন্ডাররাইটিং টিম ২৪ ঘণ্টার মধ্যে আপনার জন্য অফিশিয়াল কোটেশন প্রদান করবে।`}
            </p>
          </div>
        )}

        {/* ===================== SUCCESS SCREEN ===================== */}
        {isSuccess ? (
          <div className="space-y-3.5 animate-in zoom-in-95 duration-200 py-1">
            <div className="rounded-3xl bg-white dark:bg-[#0f1d38] p-5 border-2 border-emerald-500/80 shadow-lg text-center space-y-3 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {language === 'en' ? 'Quotation Request Registered' : 'কোটেশন রিকোয়েস্ট জমা হয়েছে'}
                </span>
                <h2 className="text-base font-black text-slate-900 dark:text-white mt-1.5">
                  {language === 'en' ? 'Quotation Request Submitted!' : 'কোটেশন রিকোয়েস্ট সফলভাবে গৃহীত!'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[280px] mx-auto">
                  {language === 'en'
                    ? `Thank you ${applicantName || 'Valued Customer'}. Your inquiry has been dispatched to Green Delta Underwriting Desk.`
                    : `ধন্যবাদ ${applicantName || 'সম্মানিত গ্রাহক'}। আপনার কোটেশন রিকোয়েস্টটি আন্ডাররাইটিং বিভাগে প্রেরণ করা হয়েছে।`}
                </p>
              </div>

              {/* RFQ Reference Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-left space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'en' ? 'Quotation Ref ID' : 'কোটেশন রেফারেন্স আইডি'}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRfq}
                    className="text-[10.5px] font-bold text-[#0f2874] dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : null}
                    <span>{isCopied ? (language === 'en' ? 'Copied' : 'কপি হয়েছে') : (language === 'en' ? 'Copy ID' : 'কপি করুন')}</span>
                  </button>
                </div>

                <div className="text-base font-black text-[#0f2874] dark:text-blue-300 font-mono tracking-wide">
                  {rfqNumber}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[9.5px]">
                      {language === 'en' ? 'Product:' : 'প্রোডাক্ট:'}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {language === 'en' ? currentProduct.nameEn : currentProduct.nameBn}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[9.5px]">
                      {language === 'en' ? 'Sum Insured:' : 'বীমা অঙ্ক:'}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                      BDT {sumInsured.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[9.5px]">
                      {language === 'en' ? 'Branch Desk:' : 'সার্ভিস ব্রাঞ্চ:'}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedBranch}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[9.5px]">
                      {language === 'en' ? 'Submitted On:' : 'তারিখ:'}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {submissionTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* 24H SLA Banner */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-left">
                <Clock className="w-4 h-4 text-[#0f2874] dark:text-blue-400 shrink-0" />
                <p className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-snug">
                  <strong className="text-[#0f2874] dark:text-blue-300">
                    {language === 'en' ? '24-Hour Underwriting SLA:' : '২৪ ঘণ্টা আন্ডাররাইটিং এসএলএ:'}
                  </strong>{' '}
                  {language === 'en'
                    ? `An underwriter will review risk parameters and deliver the formal proposal to ${phone} and ${email}.`
                    : `একজন আন্ডাররাইটার ঝুঁকি পর্যালোচনা করে আপনার ফোন ও ইমেইলে অফিশিয়াল প্রস্তাবনা পাঠাবেন।`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const blob = new Blob(
                      [
                        `GREEN DELTA INSURANCE PLC\nQUOTATION REQUEST SLIP\nRef: ${rfqNumber}\nProduct: ${currentProduct.nameEn}\nApplicant: ${applicantName}\nPhone: ${phone}\nSum Insured: BDT ${sumInsured}\nBranch: ${selectedBranch}\nTimestamp: ${submissionTime}`
                      ],
                      { type: 'text/plain' }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${rfqNumber}.txt`;
                    a.click();
                  }}
                  className="w-full h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>{language === 'en' ? 'Download RFQ Summary Slip' : 'কোটেশন স্লিপ ডাউনলোড করুন'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setApplicantName('');
                      setSpecialRemarks('');
                    }}
                    className="h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center"
                  >
                    <span>{language === 'en' ? 'New RFQ' : 'নতুন কোটেশন'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onReturnHome}
                    className="h-10 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold transition flex items-center justify-center"
                  >
                    <span>{language === 'en' ? 'Main Menu' : 'মেইন মেনু'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ===================== FORM VIEW ===================== */
          <form onSubmit={handleSubmit} className="space-y-3 pb-3">
            {/* Dedicated Product Overview Card - STRICTLY ONLY this product */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f1d38] border border-slate-200/90 dark:border-blue-900/40 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0f2874] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Green Delta Non-Life Policy
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {language === 'en' ? currentProduct.startingPriceEn : currentProduct.startingPriceBn}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-0.5">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/40 shrink-0">
                  {getProductIcon(currentProduct.id)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                    {language === 'en' ? currentProduct.nameEn : currentProduct.nameBn}
                  </h3>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'en' ? currentProduct.subtitleEn : currentProduct.subtitleBn}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Applicant Contact Information Card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f1d38] border border-slate-200/90 dark:border-blue-900/40 shadow-xs space-y-3">
              <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                <User className="w-3.5 h-3.5 text-[#0f2874] dark:text-blue-400" />
                <span>{language === 'en' ? '1. Proposer / Applicant Details' : '১. আবেদনকারীর তথ্য'}</span>
              </h4>

              <div className="space-y-2.5">
                <div>
                  <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {language === 'en' ? 'Full Name / Enterprise Name *' : 'পূর্ণ নাম অথবা প্রতিষ্ঠানের নাম *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder={language === 'en' ? 'e.g. Tanvir Ahmed / Apex Trading' : 'উদাঃ তানভীর আহমেদ / ট্রেডিং'}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      {language === 'en' ? 'Mobile Number *' : 'মোবাইল নম্বর *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      {language === 'en' ? 'Email Address *' : 'ইমেইল অ্যাড্রেস *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@mail.com"
                      className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      {language === 'en' ? 'Division / Region' : 'বিভাগ'}
                    </label>
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full h-10 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Dhaka">Dhaka (ঢাকা)</option>
                      <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                      <option value="Sylhet">Sylhet (সিলেট)</option>
                      <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                      <option value="Khulna">Khulna (খুলনা)</option>
                      <option value="Barishal">Barishal (বরিশাল)</option>
                      <option value="Rangpur">Rangpur (রংপুর)</option>
                      <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      {language === 'en' ? 'Servicing Branch' : 'সার্ভিস ব্রাঞ্চ'}
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full h-10 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    >
                      <option value="Dilkusha Head Office">Dilkusha Head Office</option>
                      <option value="Gulshan Corporate">Gulshan Corporate</option>
                      <option value="Banani Branch">Banani Branch</option>
                      <option value="Motijheel Branch">Motijheel Branch</option>
                      <option value="Agrabad Branch (Ctg)">Agrabad Branch (Ctg)</option>
                      <option value="Sylhet Main Branch">Sylhet Main Branch</option>
                      <option value="Bogra Branch">Bogra Branch</option>
                      <option value="Khulna Branch">Khulna Branch</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Risk Scope & Sum Insured Card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f1d38] border border-slate-200/90 dark:border-blue-900/40 shadow-xs space-y-3">
              <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{language === 'en' ? '2. Risk Scope & Sum Insured' : '২. বীমা ঝুঁকি ও অঙ্কের বিবরণ'}</span>
              </h4>

              <div className="space-y-2.5">
                {/* Sum Insured / Asset Value */}
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300">
                      {language === 'en' ? 'Estimated Asset Value / Sum Insured *' : 'সম্ভাব্য সম্পদের মূল্য বা বীমা অঙ্ক *'}
                    </label>
                    <span className="text-xs font-black text-[#0f2874] dark:text-blue-300 font-mono">
                      BDT {sumInsured.toLocaleString()}
                    </span>
                  </div>

                  {/* Quick Value Chips */}
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    {[
                      { val: 1000000, label: '10 Lac' },
                      { val: 2500000, label: '25 Lac' },
                      { val: 5000000, label: '50 Lac' },
                      { val: 10000000, label: '1 Crore' }
                    ].map((chip) => (
                      <button
                        key={chip.val}
                        type="button"
                        onClick={() => handleSumChipSelect(chip.val, chip.label)}
                        className={`py-1 rounded-lg text-[10.5px] font-bold font-mono transition-all ${
                          sumInsured === chip.val
                            ? 'bg-[#0f2874] text-white shadow-2xs'
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Slider control */}
                  <input
                    type="range"
                    min={500000}
                    max={20000000}
                    step={250000}
                    value={sumInsured}
                    onChange={(e) => setSumInsured(Number(e.target.value))}
                    className="w-full accent-[#0f2874] dark:accent-blue-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>BDT 5 Lac</span>
                    <span>BDT 1 Crore</span>
                    <span>BDT 2 Crore+</span>
                  </div>
                </div>

                {/* Specific Risk Classification */}
                <div>
                  <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {language === 'en' ? 'Risk Classification / Asset Nature' : 'ঝুঁকির ধরণ বা সম্পদের শ্রেণি'}
                  </label>
                  <select
                    value={riskClassification}
                    onChange={(e) => setRiskClassification(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    {getRiskOptionsForProduct(currentProduct.id).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Inception Date */}
                <div>
                  <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {language === 'en' ? 'Preferred Policy Commencement Date' : 'পলিসি কার্যকরের প্রত্যাশিত তারিখ'}
                  </label>
                  <input
                    type="date"
                    value={commencementDate}
                    onChange={(e) => setCommencementDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                {/* Special Instructions / Notes */}
                <div>
                  <label className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {language === 'en' ? 'Specific Requirements / Remarks (Optional)' : 'বিশেষ কোনো রিকোয়ারমেন্ট বা মন্তব্য (ঐচ্ছিক)'}
                  </label>
                  <textarea
                    rows={2}
                    value={specialRemarks}
                    onChange={(e) => setSpecialRemarks(e.target.value)}
                    placeholder={
                      language === 'en'
                        ? 'e.g. L/C Bank name, warehouse fire extinguisher count, surveyor request...'
                        : 'যেমনঃ ব্যাংক এলসি নং, গুদামের নিরাপত্তা ব্যবস্থা, ইত্যাদি...'
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 4. Underwriter Commitment Callout */}
            <div className="rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40 p-3 text-[11px] text-slate-600 dark:text-slate-300 space-y-1 shadow-2xs">
              <div className="font-bold text-[#0f2874] dark:text-blue-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  {language === 'en'
                    ? 'Green Delta Underwriting Guarantee'
                    : 'গ্রিন ডেল্টা আন্ডাররাইটিং প্রতিশ্রুতি'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                {language === 'en'
                  ? 'All non-life corporate quotes are governed by IDRA tariff regulations and underwritten with Swiss Re/Munich Re treaty reinsurance standards.'
                  : 'সকল নন-লাইফ বাণিজ্যিক কোটেশন আইডিআরএ ট্যারিফ নির্দেশিকা অনুযায়ী এবং সুইস রি/মিউনিক রি পুনর্বীমা মানের অধীনে মূল্যায়িত হয়।'}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{language === 'en' ? 'Submitting Quotation Request...' : 'জমা হচ্ছে...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>
                    {language === 'en'
                      ? `Submit ${currentProduct.nameEn} Quotation Request`
                      : `${currentProduct.nameBn} কোটেশন রিকোয়েস্ট পাঠান`}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="pt-2 text-center text-[9.5px] text-slate-400 font-medium">
        {language === 'en'
          ? 'Underwritten by Green Delta Insurance PLC • Rated AAA by CRAB'
          : 'গ্রিন ডেল্টা ইন্স্যুরেন্স পিএলসি • সিআরএবি কর্তৃক ট্রিপল-এ রেটিংপ্রাপ্ত'}
      </div>
    </div>
  );
};
