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
  const [currentRoute, setCurrentRoute] = useState<Route>('main-menu');
  const [routeHistory, setRouteHistory] = useState<Route[]>([]);
  const [rfqInitialProductId, setRfqInitialProductId] = useState<string>('fire-insurance');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [callDuration, setCallDuration] = useState(194); // Start at simulated ~3 minutes
  const [isCallActive, setIsCallActive] = useState(true);

  // Audio Voice State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Modal States
  const [isDialpadOpen, setIsDialpadOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isEndCallOpen, setIsEndCallOpen] = useState(false);

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

  // Navigate to new route with history tracking
  const navigateTo = (route: Route) => {
    if (route === currentRoute) return;
    setRouteHistory((prev) => [...prev, currentRoute]);
    setCurrentRoute(route);
    stopSpeech();
    setIsAudioPlaying(false);
  };

  // Back button handler
  const handleGoBack = () => {
    if (routeHistory.length > 0) {
      const prev = routeHistory[routeHistory.length - 1];
      setRouteHistory((h) => h.slice(0, -1));
      setCurrentRoute(prev);
    } else {
      setCurrentRoute('main-menu');
    }
    stopSpeech();
    setIsAudioPlaying(false);
  };

  // Home button handler
  const handleGoHome = () => {
    if (currentRoute !== 'main-menu') {
      setRouteHistory([]);
      setCurrentRoute('main-menu');
      stopSpeech();
      setIsAudioPlaying(false);
    }
  };

  // Language toggle
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
    stopSpeech();
    setIsAudioPlaying(false);
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

  // Audio Speech Narrator for current view
  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      stopSpeech();
      setIsAudioPlaying(false);
      return;
    }

    let speechText = '';
    if (currentRoute === 'main-menu') {
      speechText =
        language === 'en'
          ? 'Welcome to Green Delta Smart IVR. For Product and Service, press 1. For Bancassurance, press 2. For Branch Location, press 3. For New Campaign, press 4. For My Policy, press 5. For Quotation Request, press 6. For Customer Support and Callback, press 7. You can also press 0 to reach our 24/7 hotline 16457.'
          : 'গ্রিন ডেল্টা ইন্স্যুরেন্স স্মার্ট আইভিআরে স্বাগতম। সাধারণ বীমা প্রোডাক্ট ও সেবাসমূহের জন্য ১ চাপুন। ব্যাংকাসুরেন্সের জন্য ২। শাখা লোকেশনের জন্য ৩। নতুন ক্যাম্পেইনের জন্য ৪। পলিসি তথ্যের জন্য ৫। তাৎক্ষণিক প্রিমিয়াম কোটেশনের জন্য ৬। গ্রাহক সহায়তার জন্য ৭ চাপুন। সরাসরি প্রতিনিধির জন্য হটলাইন ১৬৪৫৭ এ যোগাযোগ করুন।';
    } else if (currentRoute === 'product-service') {
      speechText =
        language === 'en'
          ? 'Green Delta Products and Services. We provide Fire, Motor, Marine, Health, Burglary, Nibedita, Travel, and Agricultural Insurance.'
          : 'গ্রিন ডেল্টা বীমা সেবাসমূহ। অগ্নি, মোটর, নৌ, স্বাস্থ্য, চুরি ও ডাকাতি, নিবেদিতা এবং ভ্রমণ বীমার তথ্য দেখতে সেবাটি নির্বাচন করুন।';
    } else if (currentRoute === 'bancassurance') {
      speechText =
        language === 'en'
          ? 'Bancassurance Partnerships. Green Delta policies are available directly through Eastern Bank, Mutual Trust Bank, and BRAC Bank branches.'
          : 'ব্যাংকাসুরেন্স সেবা। ইস্টার্ন ব্যাংক, মিউচুয়াল ট্রাস্ট ব্যাংক এবং ব্র্যাক ব্যাংকের যেকোনো শাখা থেকে সরাসরি গ্রিন ডেল্টা বীমা গ্রহণ করতে পারবেন।';
    } else if (currentRoute === 'branch-locations') {
      speechText =
        language === 'en'
          ? 'Branch Locations. Green Delta has 37 branches across 9 regions in Bangladesh. Tap find my nearest branch to locate the closest branch using GPS.'
          : 'গ্রিন ডেল্টা শাখা নেটওয়ার্ক। সারাদেশে ৩৭টি শাখা ও ৯টি রিজিওনাল অফিস। নিকটস্থ শাখা খুঁজতে জিপিএস লোকেশন বাটন ব্যবহার করুন।';
    } else if (currentRoute === 'campaign') {
      speechText =
        language === 'en'
          ? 'Nibedita Campaign 2026. Special protection package for women including cancer cover, trauma assistance, and 24/7 legal aid.'
          : 'নিবেদিতা ক্যাম্পেইন ২০২৬। নারীদের ক্যান্সার ও ট্রমা কভারেজ এবং ২৪/৭ আইনি সহায়তাসহ বিশেষ প্রিমিয়াম অফার।';
    } else if (currentRoute === 'my-policy') {
      speechText =
        language === 'en'
          ? 'My Policy self-service. Please verify your registered mobile number with OTP to view active policies and claim status.'
          : 'আমার পলিসি সেবা। আপনার পলিসির বিবরণ ও ক্লেইম স্ট্যাটাস দেখতে ওটিপি দিয়ে ভেরিফাই করুন।';
    } else if (currentRoute === 'quotation') {
      speechText =
        language === 'en'
          ? 'Instant Insurance Quotation Calculator. Calculate Motor and Health insurance premiums with real-time tax and surcharge breakdown.'
          : 'তাৎক্ষণিক বীমা প্রিমিয়াম ক্যালকুলেটর। মোটর ও স্বাস্থ্য বীমার মান বসিয়ে রিয়েলটাইমে প্রিমিয়াম হিসাব করুন।';
    } else if (currentRoute === 'support') {
      speechText =
        language === 'en'
          ? 'Green Delta Customer Support. Request an agent callback or call our 24/7 hotline directly at 16457.'
          : 'গ্রিন ডেল্টা গ্রাহক সহায়তা। কলব্যাকের অনুরোধ জানান অথবা সরাসরি ১৬৪৫৭ হটলাইনে কল করুন।';
    } else if (currentRoute === 'ppa') {
      speechText =
        language === 'en'
          ? 'Peoples Personal Accident PPA. BDT 100,000 maximum accidental cover for only BDT 69 per year. Worldwide protection for Bangladeshi citizens.'
          : 'জনগণের ব্যক্তিগত দুর্ঘটনা বীমা পিপিএ। মাত্র ৬৯ টাকায় ১ লাখ টাকার সার্বক্ষণিক বিশ্বব্যাপী দুর্ঘটনা সুরক্ষা।';
    } else if (currentRoute === 'nibedita') {
      speechText =
        language === 'en'
          ? 'Nibedita Comprehensive Women Protection Insurance. Choose your coverage tier from Nibedita Eco, Plus, or Regular starting from only BDT 54.50 including Stamp and VAT.'
          : 'নিবেদিতা নারী সুরক্ষা বীমা। নিবেদিতা ইকো, প্লাস অথবা রেগুলার প্ল্যান নির্বাচন করুন। স্ট্যাম্প ফি ও ভ্যাটসহ সর্বমোট মাত্র ৫৪ টাকা ৫০ পয়সা থেকে শুরু।';
    } else if (currentRoute === 'pet-insurance') {
      speechText =
        language === 'en'
          ? 'Green Delta Pet Care Insurance for cats and dogs. Choose from Plan A, Plan B Best Value, or Plan C with coverage up to BDT 80,000 and 10-minute instant digital certificate e-delivery.'
          : 'বিড়াল ও কুকুরের জন্য গ্রিন ডেল্টা পেট কেয়ার বীমা। প্ল্যান এ, বেস্ট ভ্যালু প্ল্যান বি অথবা প্ল্যান সি নির্বাচন করুন। ১০ মিনিটে ডিজিটাল সার্টিফিকেট সরবরাহ।';
    } else if (currentRoute === 'travel-insurance') {
      speechText =
        language === 'en'
          ? 'Green Delta Overseas Travel Insurance. Choose your coverage type from Business & Holidays, Corporate Travel, or Employment & Studies. 100% Embassy and Schengen compliant.'
          : 'গ্রিন ডেল্টা ওভারসিজ ট্রাভেল ইন্স্যুরেন্স। ব্যবসা ও অবকাশযাপন, করপোরেট অথবা উচ্চশিক্ষা ক্যাটাগরি বেছে নিন। শতভাগ দূতাবাস ও শেঙ্গেন ভিসা উপযোগী।';
    } else if (currentRoute === 'request-quotation') {
      speechText =
        language === 'en'
          ? 'Green Delta Request for Quotation. Fill up your risk particulars for Fire, Marine, Health, or specialty non-life policies.'
          : 'গ্রিন ডেল্টা কোটেশন রিকোয়েস্ট। অগ্নি, নৌ, স্বাস্থ্য বা বিশেষ বাণিজ্যিক বীমার বিস্তারিত তথ্য প্রদান করুন।';
    } else {
      speechText =
        language === 'en'
          ? 'You are viewing Green Delta Smart IVR visual self-service.'
          : 'আপনি গ্রিন ডেল্টা স্মার্ট আইভিআর ডিজিটাল সেবা দেখছেন।';
    }

    setIsAudioPlaying(true);
    speakSpeech(
      speechText,
      language,
      () => setIsAudioPlaying(true),
      () => setIsAudioPlaying(false)
    );
  };

  const handleEndCall = () => {
    setIsEndCallOpen(true);
  };

  const handleConfirmEnd = () => {
    setIsEndCallOpen(false);
    setIsCallActive(false);
    stopSpeech();
    setCurrentRoute('landing');
  };

  const handleStartFromLanding = (lang: Language) => {
    setLanguage(lang);
    setIsCallActive(true);
    setCallDuration(0);
    setCurrentRoute('main-menu');
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
          canGoBack={routeHistory.length > 0 || currentRoute !== 'main-menu'}
          onGoBack={handleGoBack}
          onGoHome={handleGoHome}
          onOpenDialpad={() => setIsDialpadOpen(true)}
          isAudioPlaying={isAudioPlaying}
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
        onReplayPrompt={handleToggleAudio}
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
    </MobileFrame>
  );
}
