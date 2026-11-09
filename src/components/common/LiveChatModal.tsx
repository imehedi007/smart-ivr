'use client';

import React, { useState } from 'react';
import { X, Send, Bot, User, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';
import { Language } from '../../types/ivr';

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  time: string;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [stage, setStage] = useState<'form' | 'chat'>('form');
  const [formData, setFormData] = useState({
    name: 'Md Mehedi Hasan',
    email: 'mehedi@example.com',
    contactNumber: '01711234567',
    service: 'Motor & Vehicle Insurance'
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    setStage('chat');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 'msg-1',
        sender: 'bot',
        text:
          language === 'en'
            ? `Hello ${formData.name}! Welcome to Green Delta Live Assist. How may we assist you regarding ${formData.service} today?`
            : `আসসালামু আলাইকুম ${formData.name}! গ্রিন ডেল্টা লাইভ সাপোর্টে আপনাকে স্বাগতম। ${formData.service} বিষয়ে আপনাকে কীভাবে সহযোগিতা করতে পারি?`,
        time: now
      }
    ]);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      time: now
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulated Intelligent Insurance Bot response
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('motor') || lower.includes('car') || lower.includes('গাড়ি')) {
        reply =
          language === 'en'
            ? 'Green Delta Motor Insurance offers comprehensive collision coverage, cashless garage repairs across 64 districts, and instant digital e-certificates. Press 6 on the keypad for an instant quote!'
            : 'গ্রিন ডেল্টা মোটর বীমায় রয়েছে দুর্ঘটনাজনিত ক্ষতিপূরণ, ক্যাশলেস গ্যারেজ মেরামত এবং ৫ মিনিটে ডিজিটাল সার্টিফিকেট। প্রিমিয়াম হিসাব দেখতে কিপ্যাডে ৬ চাপুন।';
      } else if (lower.includes('claim') || lower.includes('ক্লেইম') || lower.includes('ক্ষতি')) {
        reply =
          language === 'en'
            ? 'For rapid claim intimation, our surveyor network operates 24/7. You can intimate claims directly via hotline 16457 or email claims@green-delta.com with your policy number.'
            : 'দ্রুত বীমা দাবি নিষ্পত্তির জন্য আমাদের ২৪/৭ সার্ভেয়ার টিম প্রস্তুত। আপনার পলিসি নম্বরসহ ১৬৪৫৭ নম্বরে যোগাযোগ করুন অথবা claims@green-delta.com এ মেইল করুন।';
      } else if (lower.includes('nibedita') || lower.includes('নিবেদিতা') || lower.includes('নারী')) {
        reply =
          language === 'en'
            ? 'Nibedita is Bangladesh’s premier women’s protection plan covering cancer, trauma, accidental injury, and providing 24/7 legal aid from just BDT 580/year.'
            : 'নিবেদিতা হলো নারীদের জন্য বিশেষ আর্থিক সুরক্ষা স্কিম—ক্যান্সার, ট্রমা ও আইনি সহায়তাসহ মাত্র বাৎসরিক ৫৮০ টাকা থেকে শুরু।';
      } else if (lower.includes('branch') || lower.includes('শাখা') || lower.includes('office')) {
        reply =
          language === 'en'
            ? 'Green Delta has 37 branches nationwide with our Head Office at Green Delta AIMS Tower, Mohakhali, Dhaka. Select option 3 in the main menu to view your nearest branch.'
            : 'সারাদেশে গ্রিন ডেল্টার ৩৭টি শাখা রয়েছে, প্রধান কার্যালয় মহাখালী এইমস টাওয়ারে। নিকটস্থ শাখা দেখতে ৩ নম্বর অপশনে যান।';
      } else {
        reply =
          language === 'en'
            ? `Thank you for reaching out regarding ${formData.service}. A Green Delta senior customer care specialist is ready to assist you. You can also dial our 24/7 hotline at 16457.`
            : `আপনার বার্তার জন্য ধন্যবাদ। গ্রিন ডেল্টা কাস্টমার কেয়ার প্রতিনিধি আপনার সাথে যুক্ত আছেন। যেকোনো জরুরি প্রয়োজনে আমাদের হটলাইন ১৬৪৫৭ এ সরাসরি কল করতে পারেন।`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  const quickPrompts = [
    language === 'en' ? 'Motor Insurance Quote' : 'মোটর বীমার প্রিমিয়াম',
    language === 'en' ? 'How to intimate a claim?' : 'ক্লেইম করার নিয়ম',
    language === 'en' ? 'Nibedita Women Scheme' : 'নিবেদিতা নারী সুরক্ষা'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-[420px] bg-white dark:bg-[#0c1a33] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-blue-900/40 flex flex-col h-[600px] max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-[#16325B] text-white p-4 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-amber-300 border border-amber-400/40">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#16325B]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{language === 'en' ? 'Green Delta Live Assist' : 'গ্রিন ডেল্টা লাইভ অ্যাসিস্ট'}</span>
                <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold uppercase">
                  Online
                </span>
              </h3>
              <p className="text-[10px] text-blue-200">
                {language === 'en' ? 'Virtual Assistant & Agent Desk' : '২৪/৭ গ্রাহক সেবা ও ক্লেইম ডেস্ক'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-blue-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage 1: Info Form */}
        {stage === 'form' ? (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-between">
            <form onSubmit={handleStartChat} className="space-y-3.5">
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#16325B] dark:text-amber-300 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-full mb-1 border border-blue-200 dark:border-blue-900">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Instant Agent Assistance</span>
                </div>
                <h4 className="text-sm font-black text-slate-800 dark:text-white">
                  {language === 'en' ? 'Connect with Green Delta' : 'গ্রিন ডেল্টা প্রতিনিধির সাথে যুক্ত হন'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {language === 'en' ? 'Please verify your contact details' : 'অনুগ্রহ করে যোগাযোগের তথ্য প্রদান করুন'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'en' ? 'Full Name' : 'পূর্ণ নাম'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-blue-900/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#16325B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'en' ? 'Mobile Number' : 'মোবাইল নম্বর'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-blue-900/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#16325B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'en' ? 'Inquiry Category' : 'সেবার বিষয়'}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-blue-900/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#16325B]"
                >
                  <option value="Motor & Vehicle Insurance">Motor & Vehicle Insurance</option>
                  <option value="Health & Hospitalization">Health & Hospitalization</option>
                  <option value="Nibedita Women Scheme">Nibedita Women Scheme</option>
                  <option value="Fire & Property Protection">Fire & Property Protection</option>
                  <option value="Claim Settlement & Status">Claim Settlement & Status</option>
                  <option value="Bancassurance Inquiries">Bancassurance Inquiries</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#F59E0B] hover:bg-[#EAB308] text-slate-950 font-bold text-xs shadow-md transition active:scale-98 flex items-center justify-center gap-2 mt-4"
              >
                <span>{language === 'en' ? 'Start Live Consultation' : 'লাইভ চ্যাট শুরু করুন'}</span>
              </button>
            </form>

            <div className="pt-3 border-t border-slate-100 dark:border-blue-900/30 text-center text-[10px] text-slate-400">
              Hotline: 16457 • Green Delta Insurance Company
            </div>
          </div>
        ) : (
          /* Stage 2: Interactive Chat Messages */
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender !== 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[#16325B] text-amber-300 flex items-center justify-center text-xs flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#16325B] text-white rounded-tr-xs'
                        : 'bg-white dark:bg-[#0f1a30] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-blue-900/40 rounded-tl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs pl-9">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px]">Agent typing...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-t border-slate-200/70 dark:border-blue-900/30 bg-white dark:bg-[#0c1a33] flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 hover:bg-amber-100 hover:text-amber-900 dark:hover:bg-amber-950/60 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 transition"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white dark:bg-[#0c1a33] border-t border-slate-200 dark:border-blue-900/40 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder={language === 'en' ? 'Type your message...' : 'বার্তা লিখুন...'}
                className="flex-1 h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#16325B] dark:focus:ring-amber-400/50"
              />
              <button
                onClick={() => handleSendMessage()}
                className="w-10 h-10 rounded-xl bg-[#16325B] text-amber-300 hover:bg-[#1E3A8A] flex items-center justify-center transition active:scale-95 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
