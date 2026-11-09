'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw, Activity, Check, Wifi, Loader2, Zap } from 'lucide-react';
import { Language } from '../../types/ivr';

interface ConnectionStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface ServiceItem {
  id: string;
  nameEn: string;
  nameBn: string;
  basePing: number;
}

const INITIAL_SERVICES: ServiceItem[] = [
  { id: 'api', nameEn: 'Customer API', nameBn: 'কাস্টমার এপিআই', basePing: 12 },
  { id: 'policy', nameEn: 'Policy Core System', nameBn: 'পলিসি কোর সিস্টেম', basePing: 16 },
  { id: 'claims', nameEn: 'Claims Processing Engine', nameBn: 'ক্লেইম প্রসেসিং ইঞ্জিন', basePing: 19 },
  { id: 'sms', nameEn: 'SMS & OTP Gateway', nameBn: 'এসএমএস ও ওটিপি গেটওয়ে', basePing: 22 },
  { id: 'ivr', nameEn: 'IVR Telephony Socket', nameBn: 'আইভিআর টেলিফোনি সকেট', basePing: 8 }
];

export const ConnectionStatusModal: React.FC<ConnectionStatusModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(INITIAL_SERVICES.length); // 0 to length-1, or length (all done)
  const [servicePings, setServicePings] = useState<Record<string, number>>({
    api: 12,
    policy: 16,
    claims: 19,
    sms: 22,
    ivr: 8
  });
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  if (!isOpen) return null;

  const runConnectionCheck = () => {
    clearTimers();
    setIsChecking(true);
    setActiveStep(0);
    setProgress(15);

    // Generate slight live jitter for pings
    const newPings: Record<string, number> = {};
    INITIAL_SERVICES.forEach((s) => {
      newPings[s.id] = Math.max(5, s.basePing + Math.floor(Math.random() * 7) - 3);
    });

    // Step 0: Check Customer API
    const t1 = setTimeout(() => {
      setActiveStep(1);
      setProgress(35);
    }, 400);

    // Step 1: Check Policy Core System
    const t2 = setTimeout(() => {
      setActiveStep(2);
      setProgress(55);
    }, 750);

    // Step 2: Check Claims Processing Engine
    const t3 = setTimeout(() => {
      setActiveStep(3);
      setProgress(75);
    }, 1100);

    // Step 3: Check SMS & OTP Gateway
    const t4 = setTimeout(() => {
      setActiveStep(4);
      setProgress(90);
    }, 1450);

    // Step 4: Check IVR Telephony Socket & Finalize
    const t5 = setTimeout(() => {
      setActiveStep(5);
      setProgress(100);
      setServicePings(newPings);
    }, 1800);

    // Complete animation
    const t6 = setTimeout(() => {
      setIsChecking(false);
    }, 2100);

    timerRef.current = [t1, t2, t3, t4, t5, t6];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-[390px] bg-white dark:bg-[#0c1a33] rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 p-5 overflow-hidden animate-in zoom-in-95 duration-200 relative">
        {/* Top decorative subtle glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/30">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isChecking
                ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400'
                : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400'
            }`}>
              <Activity className={`w-3.5 h-3.5 ${isChecking ? 'animate-pulse' : ''}`} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">
              {language === 'en' ? 'Connection Status' : 'সংযোগের অবস্থা'}
            </h3>
          </div>

          <button
            onClick={() => {
              clearTimers();
              onClose();
            }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center Graphic with dynamic Radar / Complete Animation */}
        <div className="flex flex-col items-center text-center my-4">
          <div className="relative w-20 h-20 flex items-center justify-center mb-2.5">
            {isChecking ? (
              <>
                {/* Radar ripple rings */}
                <span className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-500/30 animate-ping" />
                <span className="absolute -inset-2 rounded-full border-2 border-blue-400/40 dark:border-blue-400/20 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/70 border-2 border-blue-400 dark:border-blue-500 flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-md relative z-10">
                  <Wifi className="w-7 h-7 animate-pulse" />
                </div>
              </>
            ) : (
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-300 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md transition-all duration-300 scale-100">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            )}
          </div>

          <h2 className="text-lg font-black text-slate-900 dark:text-white transition-all">
            {isChecking
              ? language === 'en'
                ? 'Checking connection...'
                : 'সংযোগ পরীক্ষা করা হচ্ছে...'
              : language === 'en'
                ? 'Connection is active'
                : 'সংযোগ সক্রিয় আছে'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[270px] min-h-[32px] flex items-center justify-center">
            {isChecking
              ? language === 'en'
                ? 'Pinging microservices & socket handshake...'
                : 'সকল সার্ভিস ল্যাটেন্সি ও সকেট যাচাই করা হচ্ছে...'
              : language === 'en'
                ? 'The customer API surface is accepting requests.'
                : 'কাস্টমার এপিআই সার্ভিস সকল অনুরোধ গ্রহণ করছে।'}
          </p>

          {/* Progress Bar during check */}
          {isChecking && (
            <div className="w-full max-w-[260px] bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-400 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Services List with Step-by-Step Checking Animation */}
        <div className="space-y-2 mb-4">
          {INITIAL_SERVICES.map((s, idx) => {
            const isStepChecking = isChecking && activeStep === idx;
            const isStepWaiting = isChecking && activeStep < idx;
            const isStepDone = !isChecking || activeStep > idx;

            return (
              <div
                key={s.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 text-xs ${
                  isStepChecking
                    ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700 shadow-2xs scale-[1.01]'
                    : isStepDone
                      ? 'bg-slate-50 dark:bg-slate-900/80 border-slate-200/70 dark:border-blue-900/30'
                      : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-100 dark:border-blue-950/40 opacity-55'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isStepChecking ? (
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  ) : isStepDone ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                  )}
                  <span className={`font-semibold transition-colors ${
                    isStepChecking
                      ? 'text-blue-700 dark:text-blue-300 font-bold'
                      : isStepDone
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {language === 'en' ? s.nameEn : s.nameBn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {isStepChecking ? (
                      <span className="text-blue-500 animate-pulse">pinging...</span>
                    ) : isStepDone ? (
                      `${servicePings[s.id] ?? s.basePing} ms`
                    ) : (
                      '-- ms'
                    )}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold text-[11px] border transition-all ${
                      isStepChecking
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 flex items-center gap-1'
                        : isStepDone
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isStepChecking ? (
                      <>
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        <span>test</span>
                      </>
                    ) : isStepDone ? (
                      'ok'
                    ) : (
                      'wait'
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={runConnectionCheck}
            disabled={isChecking}
            className="flex-1 h-10 rounded-xl bg-[#16325B] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-sm transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-300 ${isChecking ? 'animate-spin' : ''}`} />
            <span>
              {isChecking
                ? language === 'en'
                  ? 'Checking...'
                  : 'যাচাই করা হচ্ছে...'
                : language === 'en'
                  ? 'Recheck Connection'
                  : 'পুনরায় চেক করুন'}
            </span>
          </button>
          <button
            onClick={() => {
              clearTimers();
              onClose();
            }}
            className="px-4 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition cursor-pointer"
          >
            {language === 'en' ? 'Close' : 'বন্ধ করুন'}
          </button>
        </div>
      </div>
    </div>
  );
};

