'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, RefreshCw, ShieldCheck, Server, Radio, Smartphone, Activity, Check } from 'lucide-react';
import { Language } from '../../types/ivr';

interface ConnectionStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ConnectionStatusModal: React.FC<ConnectionStatusModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const services = [
    {
      nameEn: 'Customer API',
      nameBn: 'কাস্টমার এপিআই',
      status: 'ok',
      ping: '12 ms'
    },
    {
      nameEn: 'Policy Core System',
      nameBn: 'পলিসি কোর সিস্টেম',
      status: 'ok',
      ping: '16 ms'
    },
    {
      nameEn: 'Claims Processing Engine',
      nameBn: 'ক্লেইম প্রসেসিং ইঞ্জিন',
      status: 'ok',
      ping: '19 ms'
    },
    {
      nameEn: 'SMS & OTP Gateway',
      nameBn: 'এসএমএস ও ওটিপি গেটওয়ে',
      status: 'ok',
      ping: '22 ms'
    },
    {
      nameEn: 'IVR Telephony Socket',
      nameBn: 'আইভিআর টেলিফোনি সকেট',
      status: 'ok',
      ping: '8 ms'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-[390px] bg-white dark:bg-[#0c1a33] rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-5 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">
              {language === 'en' ? 'Connection Status' : 'সংযোগের অবস্থা'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Graphic matching connection-status-page.png */}
        <div className="flex flex-col items-center text-center my-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 shadow-md">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            {language === 'en' ? 'Connection is active' : 'সংযোগ সক্রিয় আছে'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[260px]">
            {language === 'en'
              ? 'The customer API surface is accepting requests.'
              : 'কাস্টমার এপিআই সার্ভিস সকল অনুরোধ গ্রহণ করছে।'}
          </p>
        </div>

        {/* Services List matching connection-status-page.png */}
        <div className="space-y-2 mb-4">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/70 dark:border-blue-900/30 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {language === 'en' ? s.nameEn : s.nameBn}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-mono">{s.ping}</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800">
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Re-check Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-1 h-10 rounded-xl bg-[#16325B] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-300 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{language === 'en' ? 'Recheck Connection' : 'পুনরায় চেক করুন'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition"
          >
            {language === 'en' ? 'Close' : 'বন্ধ করুন'}
          </button>
        </div>
      </div>
    </div>
  );
};
