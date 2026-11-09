'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileText, Download, AlertCircle, RefreshCw, Car, Heart, HeartPulse } from 'lucide-react';
import { Language, PolicyRecord } from '../../types/ivr';
import { DEMO_POLICY_DATA } from '../../data/ivr-data';
import { formatCurrency } from '../../lib/utils';
import { playSuccessChime } from '../../lib/audio';

interface MyPolicyViewProps {
  language: Language;
  onGoBack: () => void;
  onIntimateClaim: () => void;
}

export const MyPolicyView: React.FC<MyPolicyViewProps> = ({
  language,
  onGoBack,
  onIntimateClaim
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phone, setPhone] = useState('01711234567');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    setOtpCode('164570');
    playSuccessChime();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      setIsAuthenticated(true);
      playSuccessChime();
    }
  };

  const handleQuickDemo = () => {
    setOtpCode('164570');
    setIsAuthenticated(true);
    playSuccessChime();
  };

  const handleDownload = (policyNumber: string) => {
    setDownloadNotice(`Certificate downloaded for ${policyNumber}`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/60 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Product Category Capsule */}
        <div className="flex items-center justify-end mb-2.5 px-1">
          <span className="text-[10px] font-bold text-[#0f2874] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900 flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#0f2874] dark:text-blue-400" />
            <span>{language === 'en' ? 'Secure Policy Portal' : 'নিরাপদ পলিসি পোর্টাল'}</span>
          </span>
        </div>

        {downloadNotice && (
          <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* STAGE 1: OTP VERIFY (Matches my-policy-otp-verify-page.png) */}
        {!isAuthenticated ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/40 shadow-xs space-y-3.5">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'en'
                  ? "We'll send a 6-digit code to your registered mobile number."
                  : 'আপনার নিবন্ধিত মোবাইল নম্বরে ৬-সংখ্যার ওটিপি কোড পাঠানো হবে।'}
              </p>

              {!otpSent ? (
                <form onSubmit={handleSendCode} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'en' ? 'Registered mobile number' : 'নিবন্ধিত মোবাইল নম্বর'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#16325B]"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>

                  {/* Golden Yellow Send Code Button matching screenshot */}
                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-[#16325B] font-black text-xs uppercase tracking-wider shadow-md transition active:scale-98"
                  >
                    {language === 'en' ? 'Send code' : 'কোড পাঠান'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {language === 'en' ? 'Enter 6-digit OTP' : '৬-সংখ্যার কোড লিখুন'}
                      </label>
                      <span className="text-[11px] font-mono text-amber-600 font-bold">164570</span>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full h-11 text-center text-base font-mono font-bold tracking-widest rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16325B]"
                      placeholder="------"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-[#16325B] hover:bg-[#1f4277] border-b-2 border-amber-400 text-amber-300 font-black text-xs uppercase tracking-wider shadow-md transition active:scale-98"
                  >
                    {language === 'en' ? 'Verify & View Policies' : 'যাচাই করে পলিসি দেখুন'}
                  </button>
                </form>
              )}

              {/* Caption from screenshot */}
              <div className="text-[10.5px] text-slate-400 text-center pt-1 border-t border-slate-100 dark:border-slate-800">
                {language === 'en'
                  ? 'My Policy is protected. One verification covers it for this session.'
                  : 'পলিসি তথ্য সুরক্ষিত। একবার ভেরিফিকেশন চলতি সেশনের জন্য প্রযোজ্য।'}
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleQuickDemo}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                ⚡ {language === 'en' ? 'Quick Demo Login (One-Tap Access)' : 'তাৎক্ষণিক ডেমো লগইন'}
              </button>
            </div>
          </div>
        ) : (
          /* STAGE 2: AUTHENTICATED POLICY DASHBOARD */
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {language === 'en' ? 'Your Active Policies (3)' : 'আপনার সক্রিয় পলিসিসমূহ (৩)'}
              </span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-[10px] text-slate-400 hover:text-red-500 font-semibold"
              >
                Log Out
              </button>
            </div>

            {DEMO_POLICY_DATA.map((pol) => (
              <div
                key={pol.policyNumber}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/40 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? pol.policyTypeEn : pol.policyTypeBn}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      pol.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {pol.status}
                  </span>
                </div>

                <div className="text-[10.5px] text-slate-500 font-mono">
                  No: {pol.policyNumber}
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <strong>Insured:</strong> {pol.insuredItem}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[9.5px]">Sum Insured</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {formatCurrency(pol.sumInsured)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9.5px]">Expiry Date</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {pol.expiryDate}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleDownload(pol.policyNumber)}
                    className="flex-1 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10.5px] font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>e-Certificate</span>
                  </button>

                  <button
                    onClick={onIntimateClaim}
                    className="flex-1 h-8 rounded-lg bg-[#16325B] hover:bg-[#1f4277] border-b border-amber-400 text-amber-300 text-[10.5px] font-bold flex items-center justify-center transition"
                  >
                    Claim / Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2 text-center text-[9.5px] text-slate-400">
        🔒 Green Delta Encrypted Policy Gateway • ISO 9001:2015 Certified
      </div>
    </div>
  );
};
