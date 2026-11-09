'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Headphones
} from 'lucide-react';
import { Language } from '../../types/ivr';
import { playSuccessChime } from '../../lib/audio';

interface SupportViewProps {
  language: Language;
  onGoBack: () => void;
  onOpenLiveChat: () => void;
}

export const SupportView: React.FC<SupportViewProps> = ({
  language,
  onGoBack,
  onOpenLiveChat
}) => {
  const [name, setName] = useState('Md Mehedi Hasan');
  const [phone, setPhone] = useState('01711234567');
  const [assistanceNote, setAssistanceNote] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState(false);
  const [email, setEmail] = useState('mehedi@example.com');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !assistanceNote.trim()) return;

    const generatedId = `GDIC-SR-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    playSuccessChime();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setAssistanceNote('');
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 bg-slate-50/70 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Category Badge */}
        <div className="flex items-center justify-end mb-2.5 px-1">
          <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900 flex items-center gap-1">
            <Headphones className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>{language === 'en' ? '24/7 Priority Support' : '২৪/৭ সার্বক্ষণিক সহায়তা'}</span>
          </span>
        </div>

        {/* Submitted Success Confirmation Screen */}
        {isSubmitted ? (
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/40 shadow-sm text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {language === 'en' ? 'Callback Request Received' : 'কলব্যাক অনুরোধ গৃহীত হয়েছে'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[280px] mx-auto">
                {language === 'en'
                  ? `An authorized Green Delta support officer will call you at ${phone} within 15 minutes.`
                  : `একজন দায়িত্বশীল গ্রিন ডেল্টা প্রতিনিধি আগামী ১৫ মিনিটের মধ্যে ${phone} নম্বরে যোগাযোগ করবেন।`}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-left space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span>{language === 'en' ? 'Reference Ticket:' : 'রেফারেন্স ট্র্যাকিং:'}</span>
                <span className="font-mono font-bold text-[#16325B] dark:text-amber-300">
                  {ticketId}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>{language === 'en' ? 'Requester:' : 'আবেদনকারী:'}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{name}</span>
              </div>
              {emailConfirmation && (
                <div className="flex justify-between items-center text-slate-500">
                  <span>{language === 'en' ? 'Email Copy:' : 'ইমেইল কপি:'}</span>
                  <span className="text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
                    {email}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs shadow-sm transition active:scale-98"
              >
                {language === 'en' ? 'Submit Another Request' : 'নতুন অনুরোধ পাঠান'}
              </button>
              <button
                onClick={onGoBack}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition active:scale-98"
              >
                {language === 'en' ? 'Return to Main Menu' : 'মেইন মেনুতে ফিরে যান'}
              </button>
            </div>
          </div>
        ) : (
          /* Form matching customer-support.png */
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300 px-1 font-medium">
              {language === 'en'
                ? 'An agent calls you back on the number below.'
                : 'আমাদের একজন প্রতিনিধি নিচের নম্বরে দ্রুত কল করবেন।'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Your name * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 px-1">
                  {language === 'en' ? 'Your name *' : 'আপনার নাম *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'en' ? 'e.g. Md Mehedi Hasan' : 'যেমন: মো: মেহেদী হাসান'}
                  className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/50 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16325B] dark:focus:ring-amber-400/50 shadow-2xs"
                />
              </div>

              {/* Contact number * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 px-1">
                  {language === 'en' ? 'Contact number *' : 'মোবাইল নম্বর *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/50 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16325B] dark:focus:ring-amber-400/50 shadow-2xs font-mono"
                />
              </div>

              {/* How may we assist you? * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 px-1">
                  {language === 'en' ? 'How may we assist you? *' : 'আমরা কীভাবে সাহায্য করতে পারি? *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={assistanceNote}
                  onChange={(e) => setAssistanceNote(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'Tell us briefly what you need help with'
                      : 'আপনার প্রয়োজন বা সমস্যা সম্পর্কে সংক্ষেপে লিখুন'
                  }
                  className="w-full p-3.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/50 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16325B] dark:focus:ring-amber-400/50 shadow-2xs resize-none"
                />
              </div>

              {/* Also email me a confirmation */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer select-none px-1">
                  <input
                    type="checkbox"
                    checked={emailConfirmation}
                    onChange={(e) => setEmailConfirmation(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#16325B] focus:ring-[#16325B] dark:border-slate-700 dark:bg-slate-900"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {language === 'en' ? 'Also email me a confirmation' : 'ইমেইলে নিশ্চিতকরণ কপি পাঠান'}
                  </span>
                </label>

                {emailConfirmation && (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200 dark:border-blue-900/50 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#16325B] shadow-2xs"
                  />
                )}
              </div>

              {/* Yellow Submit request Button matching customer-support.png */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#F59E0B] hover:bg-[#EAB308] text-slate-950 font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-4"
              >
                <span>{language === 'en' ? 'Submit request' : 'অনুরোধ জমা দিন'}</span>
              </button>
            </form>
          </div>
        )}

        {/* 24/7 Green Delta Hotline & Emergency Card */}
        <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-[#16325B] to-[#1E3A8A] text-white shadow-sm border border-blue-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-amber-300 font-bold tracking-wider uppercase">
                {language === 'en' ? '24/7 Dedicated Hotline' : '২৪/৭ হটলাইন'}
              </div>
              <div className="text-sm font-black tracking-tight text-white">16457</div>
            </div>
          </div>

          <a
            href="tel:16457"
            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition active:scale-95 shadow-sm"
          >
            {language === 'en' ? 'Call Now' : 'কল করুন'}
          </a>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center pt-3 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
        Green Delta Customer Care • Head Office, Mohakhali, Dhaka
      </div>
    </div>
  );
};
