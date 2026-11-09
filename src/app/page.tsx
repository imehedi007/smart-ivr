'use client';

import React, { useState, useEffect } from 'react';
import { MobileFrame } from '../components/common/MobileFrame';
import { IvrHeader } from '../components/common/IvrHeader';
import { IvrBottomNav } from '../components/common/IvrBottomNav';
import { LandingView } from '../components/views/LandingView';
import { MainMenuView } from '../components/views/MainMenuView';
import { ProductServicesView } from '../components/views/ProductServicesView';
import { BancassuranceView } from '../components/views/BancassuranceView';
import { BranchLocatorView } from '../components/views/BranchLocatorView';
import { CampaignView } from '../components/views/CampaignView';
import { MyPolicyView } from '../components/views/MyPolicyView';
import { QuotationView } from '../components/views/QuotationView';
import { SupportView } from '../components/views/SupportView';
import { PpaPurchaseJourney } from '../components/views/PpaPurchaseJourney';
import { NibeditaPurchaseJourney } from '../components/views/NibeditaPurchaseJourney';
import { PetPurchaseJourney } from '../components/views/PetPurchaseJourney';
import { TravelPurchaseJourney } from '../components/views/TravelPurchaseJourney';
import { RequestQuotationView } from '../components/views/RequestQuotationView';
import { DialpadModal } from '../components/common/DialpadModal';
import { LiveChatModal } from '../components/common/LiveChatModal';
import { SearchModal } from '../components/common/SearchModal';
import { ConnectionStatusModal } from '../components/common/ConnectionStatusModal';
import { EndCallModal } from '../components/common/EndCallModal';
import { HotlineModal } from '../components/common/HotlineModal';
import { Language, MenuItem } from '../types/ivr';
import { MAIN_MENU_ITEMS } from '../data/ivr-data';
import { speakSpeech, stopSpeech, playDtmfTone } from '../lib/audio';

type Route =
  | 'landing'
  | 'main-menu'
  | 'product-service'
  | 'bancassurance'
  | 'branch-locations'
  | 'campaign'
  | 'my-policy'
  | 'quotation'
  | 'support'
  | 'ppa'
  | 'nibedita'
  | 'pet-insurance'
  | 'travel-insurance'
  | 'request-quotation';

export default function SmartIvrApp() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentRoute, setCurrentRoute] = useState<Route>('landing');
  const [routeHistory, setRouteHistory] = useState<Route[]>([]);
  const [rfqInitialProductId, setRfqInitialProductId] = useState<string>('fire-insurance');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);

  // Audio Voice State - Muted by default (user can unmute on demand)
  const [isMuted, setIsMuted] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Modal States
  const [isDialpadOpen, setIsDialpadOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isEndCallOpen, setIsEndCallOpen] = useState(false);
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);

  // Audio Gist Generator for each route (Concise, welcoming ~30s gist, strictly NO press 1/2 instructions)
  const getRouteGistSpeech = (route: Route, lang: Language): string => {
    if (route === 'main-menu') {
      return lang === 'en'
        ? 'Welcome to Green Delta Insurance Smart IVR. Through this visual self-service portal, you can explore our non-life insurance solutions including motor, health, travel, pet care, nibedita women protection, fire, and marine coverage. You can calculate instant premiums, submit quotation requests, find your nearest branch, access Bancassurance, review your active policies, and connect with customer care. Simply tap any option on your screen to proceed.'
        : 'গ্রিন ডেল্টা ইন্স্যুরেন্সের স্মার্ট আইভিআরে আপনাকে স্বাগতম। এই আধুনিক ডিজিটাল সেবার মাধ্যমে আপনি খুব সহজেই অগ্নি, মোটর, নৌ, স্বাস্থ্য, ভ্রমণ, নিবেদিতা নারী সুরক্ষা ও পেট ইন্স্যুরেন্স সহ সকল সাধারণ বীমার পলিসি দেখতে পারেন, তাৎক্ষণিক কোটেশন বা প্রিমিয়াম হিসাব করতে পারেন, অথবা সরাসরি রিকোয়েস্ট ফর কোটেশন জমা দিতে পারেন। এছাড়াও রয়েছে ব্যাংকাসুরেন্স পার্টনারশিপ, নিকটস্থ শাখা লোকেশন, সক্রিয় পলিসি যাচাই ও সার্বক্ষণিক ক্লেইম সহায়তা। আপনার প্রয়োজনীয় সেবাটি বেছে নিতে স্ক্রিনে স্পর্শ করুন।';
    } else if (route === 'product-service') {
      return lang === 'en'
        ? 'Green Delta Products and Services. Explore direct purchase policies such as Motor, Health, Personal Accident, Nibedita, and Travel, or submit a quotation request for Fire and Marine coverage. Tap any product to continue.'
        : 'গ্রিন ডেল্টা ইন্স্যুরেন্সের পলিসি ও সেবাসমূহ। এখানে আপনি মোটর, স্বাস্থ্য, ব্যক্তিগত দুর্ঘটনা, নিবেদিতা ও ভ্রমণ বীমার মতো সরাসরি ডিজিটাল পারচেজ প্রোডাক্ট পাবেন, অথবা অগ্নি ও নৌ বীমার জন্য রিকোয়েস্ট ফর কোটেশন জমা দিতে পারবেন। বিস্তারিত জানতে পছন্দের পণ্যটি নির্বাচন করুন।';
    } else if (route === 'bancassurance') {
      return lang === 'en'
        ? 'Green Delta Bancassurance. Access our insurance solutions directly through our partner branch networks at Eastern Bank, Mutual Trust Bank, and BRAC Bank.'
        : 'গ্রিন ডেল্টা ব্যাংকাসুরেন্স সেবা। আমাদের অংশীদার ইস্টার্ন ব্যাংক, মিউচুয়াল ট্রাস্ট ব্যাংক এবং ব্র্যাক ব্যাংকের যেকোনো অনুমোদিত শাখা থেকে সরাসরি গ্রিন ডেল্টা সাধারণ বীমা সুবিধা গ্রহণ করতে পারবেন।';
    } else if (route === 'branch-locations') {
      return lang === 'en'
        ? 'Green Delta Branch Network. We operate over 37 branches across Bangladesh. Use the GPS locator or search by division to find your nearest branch.'
        : 'গ্রিন ডেল্টা শাখা নেটওয়ার্ক। সারাদেশে আমাদের ৩৭টিরও বেশি শাখা ও ৯টি রিজিওনাল অফিস রয়েছে। আপনার নিকটস্থ অফিস ও প্রতিনিধির তথ্য জানতে জিপিএস লোকেশন বাটন ব্যবহার করুন।';
    } else if (route === 'campaign') {
      return lang === 'en'
        ? 'Green Delta Special Campaigns. Explore our Nibedita women protection packages and seasonal digital premium offers.'
        : 'গ্রিন ডেল্টা বিশেষ ক্যাম্পেইন। নারীদের সুরক্ষা ও স্বাস্থ্যের জন্য নিবেদিতা প্যাকেজ এবং আকর্ষণীয় ডিজিটাল প্রিমিয়াম ডিসকাউন্ট অফার সম্পর্কে জানুন।';
    } else if (route === 'my-policy') {
      return lang === 'en'
        ? 'My Policy Self-Service. Verify your registered mobile number with an OTP to instantly check active policies, renewal dates, and claim statuses.'
        : 'আমার পলিসি ডিজিটাল সেলফ-সার্ভিস। আপনার নিবন্ধিত মোবাইল নম্বরে ওটিপি কোড ব্যবহার করে সক্রিয় পলিসির মেয়াদ, কভারেজ ও ক্লেইম স্ট্যাটাস তাৎক্ষণিকভাবে যাচাই করুন।';
    } else if (route === 'quotation') {
      return lang === 'en'
        ? 'Instant Premium Calculator. Calculate accurate motor and health insurance premiums with real-time tax and surcharge breakdowns.'
        : 'তাৎক্ষণিক বীমা প্রিমিয়াম ক্যালকুলেটর। মোটর ও স্বাস্থ্য বীমার প্রয়োজনীয় তথ্য প্রদান করে রিয়াল-টাইমে ভ্যাট ও ট্যাক্সসহ সঠিক প্রিমিয়াম জেনে নিন।';
    } else if (route === 'support') {
      return lang === 'en'
        ? 'Green Delta Customer Care. Request an immediate callback, chat live with our support team, or dial our 24/7 hotline at 16457.'
        : 'গ্রিন ডেল্টা কাস্টমার কেয়ার। আমাদের প্রতিনিধির কলব্যাকের জন্য অনুরোধ পাঠাতে পারেন, লাইভ চ্যাটে যুক্ত হতে পারেন, অথবা সরাসরি আমাদের ২৪/৭ হটলাইন ১৬৪৫৭ এ কল করতে পারেন।';
    } else if (route === 'ppa') {
      return lang === 'en'
        ? 'Peoples Personal Accident Insurance. 100,000 Taka worldwide accidental coverage for just 69 Taka per year. Instant 10-minute digital issuance.'
        : 'জনগণের ব্যক্তিগত দুর্ঘটনা বীমা পিপিএ। মাত্র ৬৯ টাকায় ১ লাখ টাকার সার্বক্ষণিক বিশ্বব্যাপী দুর্ঘটনা সুরক্ষা। ১০ মিনিটে ডিজিটাল সার্টিফিকেট গ্রহণ করুন।';
    } else if (route === 'nibedita') {
      return lang === 'en'
        ? 'Nibedita Comprehensive Women Protection. Tailored health, trauma, and legal coverage for women starting from 54 Taka and 50 Paisa.'
        : 'নিবেদিতা নারী সুরক্ষা বীমা। নারীদের জন্য বিশেষায়িত চিকিৎসা, ট্রমা কভারেজ ও আইনি সহায়তাসহ সর্বমোট মাত্র ৫৪ টাকা ৫০ পয়সা থেকে পলিসি শুরু।';
    } else if (route === 'pet-insurance') {
      return lang === 'en'
        ? 'Green Delta Pet Care Insurance for cats and dogs. Comprehensive veterinary and accidental coverage up to 80,000 Taka.'
        : 'গ্রিন ডেল্টা পেট কেয়ার ইন্স্যুরেন্স। আপনার প্রিয় বিড়াল ও কুকুরের দুর্ঘটনা ও অসুস্থতার চিকিৎসায় ৮০ হাজার টাকা পর্যন্ত সুরক্ষা কভারেজ।';
    } else if (route === 'travel-insurance') {
      return lang === 'en'
        ? 'Green Delta Overseas Travel Insurance. 100% Embassy and Schengen compliant medical, cancellation, and baggage protection worldwide.'
        : 'গ্রিন ডেল্টা ওভারসিজ ট্রাভেল ইন্স্যুরেন্স। আন্তর্জাতিক ভ্রমণ, ব্যবসা, বা উচ্চশিক্ষার জন্য শতভাগ দূতাবাস ও শেঙ্গেন ভিসা স্বীকৃত জরুরি স্বাস্থ্য ও লাগেজ সুরক্ষা।';
    } else if (route === 'request-quotation') {
      return lang === 'en'
        ? 'Green Delta Request for Quotation. Submit your risk particulars for fire, marine, or specialized corporate policies to receive a customized quote.'
        : 'গ্রিন ডেল্টা রিকোয়েস্ট ফর কোটেশন। অগ্নি, নৌ, বা যেকোনো বাণিজ্যিক ঝুঁকি বীমার বিবরণ পূরণ করুন, আমাদের বিশেষজ্ঞ প্রতিনিধি দ্রুত যোগাযোগ করবেন।';
    }
    return lang === 'en'
      ? 'Green Delta Smart IVR visual self-service.'
      : 'গ্রিন ডেল্টা স্মার্ট আইভিআর ডিজিটাল সেবা।';
  };

  // Helper to speak gist if not muted (force=true bypasses isMuted check)
  const playVoiceGist = (route: Route, lang: Language, force = false) => {
    if (isMuted && !force) return;
    stopSpeech();
    const text = getRouteGistSpeech(route, lang);
    setIsAudioPlaying(true);
    speakSpeech(
      text,
      lang,
      () => setIsAudioPlaying(true),
      () => setIsAudioPlaying(false)
    );
  };

  // Call timer interval
  useEffect(() => {
    if (!isCallActive || currentRoute === 'landing') return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCallActive, currentRoute]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto-play voice on initial mount if starting on an active route
  useEffect(() => {
    if (currentRoute !== 'landing' && !isMuted) {
      const timer = setTimeout(() => {
        playVoiceGist(currentRoute, language);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Navigate to new route with history tracking and auto-voice
  const navigateTo = (route: Route) => {
    if (route === currentRoute) return;
    setRouteHistory((prev) => [...prev, currentRoute]);
    setCurrentRoute(route);
    if (!isMuted) {
      playVoiceGist(route, language);
    } else {
      stopSpeech();
      setIsAudioPlaying(false);
    }
  };

  // Back button handler
  const handleGoBack = () => {
    let nextRoute: Route = 'main-menu';
    if (routeHistory.length > 0) {
      nextRoute = routeHistory[routeHistory.length - 1];
      setRouteHistory((h) => h.slice(0, -1));
    } else {
      nextRoute = 'main-menu';
    }
    setCurrentRoute(nextRoute);
    if (!isMuted) {
      playVoiceGist(nextRoute, language);
    } else {
      stopSpeech();
      setIsAudioPlaying(false);
    }
  };

  // Home button handler
  const handleGoHome = () => {
    if (currentRoute !== 'main-menu') {
      setRouteHistory([]);
      setCurrentRoute('main-menu');
      if (!isMuted) {
        playVoiceGist('main-menu', language);
      } else {
        stopSpeech();
        setIsAudioPlaying(false);
      }
    }
  };

  // Language toggle
  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
    if (!isMuted && currentRoute !== 'landing') {
      playVoiceGist(currentRoute, nextLang);
    } else {
      stopSpeech();
      setIsAudioPlaying(false);
    }
  };

  // Dialpad option routing
  const handleSelectOptionByCode = (code: string) => {
    if (code === 'home' || code === '#') {
      handleGoHome();
      return;
    }
    if (code === '0') {
      navigateTo('support');
      return;
    }
    const item = MAIN_MENU_ITEMS.find((m) => m.code === code);
    if (item) {
      navigateTo(item.route as Route);
    }
  };

  // Voice Narrator Toggle: Play / Mute
  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      // Currently active -> user wants to mute/stop
      setIsMuted(true);
      stopSpeech();
      setIsAudioPlaying(false);
    } else {
      // Currently silent or muted -> user clicked voice to hear audio!
      setIsMuted(false);
      playVoiceGist(currentRoute, language, true);
    }
  };

  const handleEndCall = () => {
    setIsEndCallOpen(true);
  };

  const handleConfirmEnd = () => {
    setIsEndCallOpen(false);
    setIsCallActive(false);
    stopSpeech();
    setIsAudioPlaying(false);
    setCurrentRoute('landing');
  };

  const handleStartFromLanding = (lang: Language) => {
    setLanguage(lang);
    setIsCallActive(true);
    setCallDuration(0);
    setCurrentRoute('main-menu');
    setIsMuted(true);
    stopSpeech();
    setIsAudioPlaying(false);
  };

  return (
    <MobileFrame
      isCallActive={isCallActive && currentRoute !== 'landing'}
      callDurationSeconds={callDuration}
      isDarkMode={isDarkMode}
    >
      {/* App Header (shown on all screens except landing) */}
      {currentRoute !== 'landing' && (
        <IvrHeader
          language={language}
          onToggleLanguage={handleToggleLanguage}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenStatus={() => setIsStatusOpen(true)}
          onOpenDialpad={() => setIsDialpadOpen(true)}
          onOpenHotlineModal={() => setIsHotlineOpen(true)}
          onGoHome={handleGoHome}
          onGoBack={handleGoBack}
          canGoBack={routeHistory.length > 0 || currentRoute !== 'main-menu'}
          currentRoute={currentRoute}
          callDurationSeconds={callDuration}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {currentRoute === 'landing' && (
          <LandingView
            language={language}
            onSelectLanguageAndStart={handleStartFromLanding}
            onOpenStatus={() => setIsStatusOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        )}

        {currentRoute === 'main-menu' && (
          <MainMenuView
            language={language}
            onSelectMenu={(item) => navigateTo(item.route as Route)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenStatus={() => setIsStatusOpen(true)}
            onEndCall={handleEndCall}
          />
        )}

        {currentRoute === 'product-service' && (
          <ProductServicesView
            language={language}
            onGoBack={handleGoBack}
            onNavigateToQuotation={() => navigateTo('quotation')}
            onNavigateToPpa={() => navigateTo('ppa')}
            onNavigateToNibedita={() => navigateTo('nibedita')}
            onNavigateToPet={() => navigateTo('pet-insurance')}
            onNavigateToTravel={() => navigateTo('travel-insurance')}
            onNavigateToRequestQuotation={(prodId) => {
              setRfqInitialProductId(prodId);
              navigateTo('request-quotation');
            }}
          />
        )}

        {currentRoute === 'bancassurance' && (
          <BancassuranceView
            language={language}
            onGoBack={handleGoBack}
          />
        )}

        {currentRoute === 'branch-locations' && (
          <BranchLocatorView
            language={language}
            onGoBack={handleGoBack}
          />
        )}

        {currentRoute === 'campaign' && (
          <CampaignView
            language={language}
            onGoBack={handleGoBack}
            onNavigateToQuotation={() => navigateTo('quotation')}
            onNavigateToNibedita={() => navigateTo('nibedita')}
          />
        )}

        {currentRoute === 'my-policy' && (
          <MyPolicyView
            language={language}
            onGoBack={handleGoBack}
            onIntimateClaim={() => navigateTo('support')}
          />
        )}

        {currentRoute === 'quotation' && (
          <QuotationView
            language={language}
            onGoBack={handleGoBack}
            onNavigateToBranches={() => navigateTo('branch-locations')}
            onNavigateToRequestQuotation={(prodId) => {
              setRfqInitialProductId(prodId);
              navigateTo('request-quotation');
            }}
          />
        )}

        {currentRoute === 'support' && (
          <SupportView
            language={language}
            onGoBack={handleGoBack}
            onOpenLiveChat={() => setIsLiveChatOpen(true)}
          />
        )}

        {currentRoute === 'ppa' && (
          <PpaPurchaseJourney
            language={language}
            onGoBack={handleGoBack}
            onReturnHome={handleGoHome}
          />
        )}

        {currentRoute === 'nibedita' && (
          <NibeditaPurchaseJourney
            language={language}
            onGoBack={handleGoBack}
            onReturnHome={handleGoHome}
          />
        )}

        {currentRoute === 'pet-insurance' && (
          <PetPurchaseJourney
            language={language}
            onGoBack={handleGoBack}
            onReturnHome={handleGoHome}
          />
        )}

        {currentRoute === 'travel-insurance' && (
          <TravelPurchaseJourney
            language={language}
            onGoBack={handleGoBack}
            onReturnHome={handleGoHome}
          />
        )}

        {currentRoute === 'request-quotation' && (
          <RequestQuotationView
            initialProductId={rfqInitialProductId}
            language={language}
            onGoBack={handleGoBack}
            onReturnHome={handleGoHome}
            onNavigateToDirectPurchase={(prodId) => {
              if (prodId === 'motor-insurance') navigateTo('quotation');
              else if (prodId === 'personal-accident') navigateTo('ppa');
              else if (prodId === 'nibedita') navigateTo('nibedita');
              else if (prodId === 'pet-insurance') navigateTo('pet-insurance');
              else if (prodId === 'travel-insurance') navigateTo('travel-insurance');
            }}
          />
        )}
      </main>

      {/* Bottom Navigation (shown on all active IVR screens except landing) */}
      {currentRoute !== 'landing' && (
        <IvrBottomNav
          language={language}
          onGoHome={handleGoHome}
          isAudioPlaying={isAudioPlaying}
          isMuted={isMuted}
          onToggleAudio={handleToggleAudio}
          onEndCall={handleEndCall}
          onOpenLiveChat={() => setIsLiveChatOpen(true)}
          currentRoute={currentRoute}
        />
      )}

      {/* DTMF Keypad Modal */}
      <DialpadModal
        isOpen={isDialpadOpen}
        onClose={() => setIsDialpadOpen(false)}
        language={language}
        onSelectOptionByCode={handleSelectOptionByCode}
        onReplayPrompt={() => {
          setIsMuted(false);
          playVoiceGist(currentRoute, language);
        }}
      />

      {/* Live Agent / AI Chat Drawer */}
      <LiveChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        language={language}
      />

      {/* Unified Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        onNavigate={(route) => navigateTo(route as Route)}
      />

      {/* Telephony & API Status Modal */}
      <ConnectionStatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        language={language}
      />

      {/* End Call / Disconnect Confirmation Modal */}
      <EndCallModal
        isOpen={isEndCallOpen}
        onClose={() => setIsEndCallOpen(false)}
        onConfirmEnd={handleConfirmEnd}
        language={language}
        callDurationSeconds={callDuration}
      />

      {/* Direct Hotline 16457 Call Modal */}
      <HotlineModal
        isOpen={isHotlineOpen}
        onClose={() => setIsHotlineOpen(false)}
        language={language}
        onOpenSupport={() => navigateTo('support')}
      />
    </MobileFrame>
  );
}
