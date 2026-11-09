'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Calculator,
  Sparkles,
  Flame,
  Car,
  Ship,
  HeartPulse,
  Lock,
  UserCheck,
  Heart,
  Plane,
  Wheat,
  Laptop,
  Layers,
  PhoneCall,
  CheckCircle2,
  Cat,
  LayoutGrid,
  ListFilter
} from 'lucide-react';
import gsap from 'gsap';
import { Language, InsuranceProduct } from '../../types/ivr';
import { INSURANCE_PRODUCTS_DATA } from '../../data/ivr-data';
import { playSuccessChime } from '../../lib/audio';
import { PpaPurchaseJourney } from './PpaPurchaseJourney';
import { NibeditaPurchaseJourney } from './NibeditaPurchaseJourney';
import { PetPurchaseJourney } from './PetPurchaseJourney';
import { TravelPurchaseJourney } from './TravelPurchaseJourney';
import { RequestQuotationView } from './RequestQuotationView';

interface ProductServicesViewProps {
  language: Language;
  onGoBack: () => void;
  onNavigateToQuotation: () => void;
  onNavigateToPpa?: () => void;
  onNavigateToNibedita?: () => void;
  onNavigateToPet?: () => void;
  onNavigateToTravel?: () => void;
  onNavigateToRequestQuotation?: (productId: string) => void;
}

export const ProductServicesView: React.FC<ProductServicesViewProps> = ({
  language,
  onGoBack,
  onNavigateToQuotation,
  onNavigateToPpa,
  onNavigateToNibedita,
  onNavigateToPet,
  onNavigateToTravel,
  onNavigateToRequestQuotation
}) => {
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);
  const [inquirySuccessProduct, setInquirySuccessProduct] = useState<string | null>(null);
  const [isRequestingQuotation, setIsRequestingQuotation] = useState(false);
  const [quotationProductId, setQuotationProductId] = useState<string>('fire-insurance');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current.children,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          stagger: 0.02,
          ease: 'power2.out'
        }
      );
    }
  }, [layoutMode]);

  const handleOpenQuotation = (productId: string) => {
    if (onNavigateToRequestQuotation) {
      onNavigateToRequestQuotation(productId);
    } else {
      setQuotationProductId(productId);
      setIsRequestingQuotation(true);
    }
  };

  // If user opened Request for Quotation journey
  if (isRequestingQuotation) {
    return (
      <RequestQuotationView
        initialProductId={quotationProductId}
        language={language}
        onGoBack={() => setIsRequestingQuotation(false)}
        onReturnHome={onGoBack}
      />
    );
  }

  // If user selected PPA, directly render the full PPA Purchase Journey
  if (selectedProduct?.id === 'personal-accident') {
    return (
      <PpaPurchaseJourney
        language={language}
        onGoBack={() => setSelectedProduct(null)}
        onReturnHome={onGoBack}
      />
    );
  }

  // If user selected Nibedita, directly render the full Nibedita Purchase Journey
  if (selectedProduct?.id === 'nibedita') {
    return (
      <NibeditaPurchaseJourney
        language={language}
        onGoBack={() => setSelectedProduct(null)}
        onReturnHome={onGoBack}
      />
    );
  }

  // If user selected Pet Insurance, directly render the full Pet Purchase Journey
  if (selectedProduct?.id === 'pet-insurance') {
    return (
      <PetPurchaseJourney
        language={language}
        onGoBack={() => setSelectedProduct(null)}
        onReturnHome={onGoBack}
      />
    );
  }

  // If user selected Travel Insurance, directly render the full Travel Purchase Journey
  if (selectedProduct?.id === 'travel-insurance') {
    return (
      <TravelPurchaseJourney
        language={language}
        onGoBack={() => setSelectedProduct(null)}
        onReturnHome={onGoBack}
      />
    );
  }

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'fire-insurance':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'motor-insurance':
        return <Car className="w-5 h-5 text-[#0f2874] dark:text-blue-400" />;
      case 'marine-insurance':
        return <Ship className="w-5 h-5 text-cyan-600" />;
      case 'health-insurance':
        return <HeartPulse className="w-5 h-5 text-emerald-500" />;
      case 'burglary-insurance':
        return <Lock className="w-5 h-5 text-indigo-500" />;
      case 'personal-accident':
        return <UserCheck className="w-5 h-5 text-amber-600" />;
      case 'nibedita':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'pet-insurance':
        return <Cat className="w-5 h-5 text-amber-600" />;
      case 'travel-insurance':
        return <Plane className="w-5 h-5 text-sky-500" />;
      case 'agricultural-insurance':
        return <Wheat className="w-5 h-5 text-emerald-600" />;
      case 'all-risk-insurance':
        return <Laptop className="w-5 h-5 text-blue-600" />;
      default:
        return <Layers className="w-5 h-5 text-amber-500" />;
    }
  };

  const renderGridProductIcon = (productId: string) => {
    switch (productId) {
      case 'fire-insurance':
        return <Flame className="w-5 h-5 text-amber-300" />;
      case 'motor-insurance':
        return <Car className="w-5 h-5 text-amber-300" />;
      case 'marine-insurance':
        return <Ship className="w-5 h-5 text-amber-300" />;
      case 'health-insurance':
        return <HeartPulse className="w-5 h-5 text-amber-300" />;
      case 'burglary-insurance':
        return <Lock className="w-5 h-5 text-amber-300" />;
      case 'personal-accident':
        return <UserCheck className="w-5 h-5 text-amber-300" />;
      case 'nibedita':
        return <Heart className="w-5 h-5 text-rose-300 fill-rose-300/40" />;
      case 'pet-insurance':
        return <Cat className="w-5 h-5 text-amber-300" />;
      case 'travel-insurance':
        return <Plane className="w-5 h-5 text-amber-300" />;
      case 'agricultural-insurance':
        return <Wheat className="w-5 h-5 text-amber-300" />;
      case 'all-risk-insurance':
        return <Laptop className="w-5 h-5 text-amber-300" />;
      default:
        return <Layers className="w-5 h-5 text-amber-300" />;
    }
  };

  const handleProductSelect = (prod: InsuranceProduct) => {
    const isDirectPurchase = [
      'motor-insurance',
      'personal-accident',
      'nibedita',
      'pet-insurance',
      'travel-insurance'
    ].includes(prod.id);

    if (prod.id === 'pet-insurance' && onNavigateToPet) {
      onNavigateToPet();
    } else if (prod.id === 'personal-accident' && onNavigateToPpa) {
      onNavigateToPpa();
    } else if (prod.id === 'nibedita' && onNavigateToNibedita) {
      onNavigateToNibedita();
    } else if (prod.id === 'travel-insurance' && onNavigateToTravel) {
      onNavigateToTravel();
    } else if (prod.id === 'motor-insurance' && onNavigateToQuotation) {
      onNavigateToQuotation();
    } else if (!isDirectPurchase && onNavigateToRequestQuotation) {
      onNavigateToRequestQuotation(prod.id);
    } else {
      setSelectedProduct(prod);
    }
  };

  const handleRequestInquiry = (productName: string) => {
    playSuccessChime();
    setInquirySuccessProduct(productName);
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-3 bg-slate-50/70 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Top Product Count & Category Indicator with Grid / List Toggle */}
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
              {selectedProduct
                ? language === 'en'
                  ? selectedProduct.nameEn
                  : selectedProduct.nameBn
                : language === 'en'
                ? 'Select an Insurance Policy'
                : 'একটি বীমা সেবা নির্বাচন করুন'}
            </span>
            <span className="text-[9.5px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              {selectedProduct
                ? selectedProduct.nameEn
                : `${INSURANCE_PRODUCTS_DATA.length} Lines`}
            </span>
          </div>

          {!selectedProduct && (
            <div className="flex items-center bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-slate-600 dark:text-slate-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`p-1 rounded-md transition ${
                  layoutMode === 'grid'
                    ? 'bg-white dark:bg-[#16325B] text-amber-500 shadow-2xs font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Grid View (Icons)"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('list')}
                className={`p-1 rounded-md transition ${
                  layoutMode === 'list'
                    ? 'bg-white dark:bg-[#16325B] text-amber-500 shadow-2xs font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="List View"
                aria-label="List View"
              >
                <ListFilter className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Product List matching product-service-page.png */}
        {!selectedProduct ? (
          <div className="space-y-2 animate-in fade-in duration-200">
            {/* Quick Request for Quotation Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#0f2874] via-[#16325B] to-[#1e3a8a] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">
                    {language === 'en' ? 'Request for Quotation' : 'কোটেশন রিকোয়েস্ট'}
                  </h4>
                  <p className="text-[10px] text-blue-200/80">
                    {language === 'en' ? 'Fire, Marine, Health & Commercial Lines' : 'অগ্নি, নৌ, স্বাস্থ্য ও বাণিজ্যিক বীমা'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenQuotation('fire-insurance')}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-[10.5px] font-black shrink-0 transition active:scale-95 shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'en' ? 'Request' : 'অনুরোধ'}</span>
                <span>→</span>
              </button>
            </div>

            {/* Layout Switch: Grid View (with icons like home page) vs List View */}
            {layoutMode === 'grid' ? (
              <div ref={cardsContainerRef} className="grid grid-cols-2 gap-2 animate-in fade-in duration-200">
                {INSURANCE_PRODUCTS_DATA.map((prod) => {
                  const isDirectPurchase = [
                    'motor-insurance',
                    'personal-accident',
                    'nibedita',
                    'pet-insurance',
                    'travel-insurance'
                  ].includes(prod.id);

                  return (
                    <button
                      key={prod.id}
                      onClick={() => handleProductSelect(prod)}
                      className="group relative flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200/80 dark:border-blue-900/30 shadow-2xs hover:shadow-xs hover:border-amber-400/60 transition-all text-center min-h-[105px] active:scale-96 cursor-pointer"
                    >
                      {/* Number Badge (1, 2, 3...) in corner */}
                      <span className="absolute top-2 left-2 w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[10px] font-black text-[#16325B] dark:text-amber-300 flex items-center justify-center group-hover:bg-[#16325B] group-hover:text-amber-300 transition-colors border border-blue-100 dark:border-blue-900/40">
                        {prod.code}
                      </span>

                      {/* Tag Badge in top-right */}
                      {prod.id === 'nibedita' ? (
                        <span className="absolute top-2 right-2 text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                          Special
                        </span>
                      ) : !isDirectPurchase ? (
                        <span className="absolute top-2 right-2 text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
                          RFQ
                        </span>
                      ) : null}

                      {/* Centered Icon Container with GDIC Blue Gradient and Yellow Accent Icon */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16325B] to-[#1E3A8A] text-amber-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform mb-1.5 mt-2 border border-blue-900/40">
                        {renderGridProductIcon(prod.id)}
                      </div>

                      {/* Product Title */}
                      <h3 className="text-[11.5px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#16325B] dark:group-hover:text-amber-300 transition-colors leading-tight line-clamp-1 w-full px-1">
                        {language === 'en' ? prod.nameEn : prod.nameBn}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-[9.5px] text-slate-400 dark:text-slate-400 mt-0.5 line-clamp-1 w-full px-1">
                        {language === 'en' ? prod.subtitleEn : prod.subtitleBn}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div ref={cardsContainerRef} className="space-y-1.5 animate-in fade-in duration-200">
                {INSURANCE_PRODUCTS_DATA.map((prod) => {
                  const isDirectPurchase = [
                    'motor-insurance',
                    'personal-accident',
                    'nibedita',
                    'pet-insurance',
                    'travel-insurance'
                  ].includes(prod.id);

                  return (
                    <button
                      key={prod.id}
                      onClick={() => handleProductSelect(prod)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#0f1a30] border border-slate-200/80 dark:border-blue-900/30 shadow-2xs hover:shadow-xs hover:border-amber-400/50 transition-all active:scale-98 group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Number Badge (1-12) */}
                        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#0f2874] dark:text-blue-300 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900/40 group-hover:bg-[#0f2874] group-hover:text-amber-300 transition-colors">
                          {prod.code}
                        </div>

                        <div>
                          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0f2874] dark:group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                            <span>{language === 'en' ? prod.nameEn : prod.nameBn}</span>
                            {prod.id === 'nibedita' ? (
                              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                                Special
                              </span>
                            ) : !isDirectPurchase ? (
                              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
                                RFQ
                              </span>
                            ) : null}
                          </h3>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {language === 'en' ? prod.subtitleEn : prod.subtitleBn}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Individual Product Page - STRICTLY ONLY showcases this specific product's details */
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Inquiry Success Notice */}
            {inquirySuccessProduct && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  {inquirySuccessProduct} Consultation Requested!
                </h4>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  A Green Delta underwriter will review your request and contact you within 24 hours.
                </p>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1a30] border border-slate-200/90 dark:border-blue-900/40 shadow-xs space-y-3">
              {/* Product Header */}
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0f2874] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Green Delta Non-Life Policy
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">
                  {language === 'en' ? selectedProduct.startingPriceEn : selectedProduct.startingPriceBn}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/40">
                  {getProductIcon(selectedProduct.id)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                    {language === 'en' ? selectedProduct.nameEn : selectedProduct.nameBn}
                  </h3>
                  <span className="text-[10.5px] text-slate-500 font-medium">
                    {language === 'en' ? selectedProduct.subtitleEn : selectedProduct.subtitleBn}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800">
                {language === 'en' ? selectedProduct.descriptionEn : selectedProduct.descriptionBn}
              </p>

              {/* Coverage Points */}
              <div className="pt-1">
                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white mb-1.5 uppercase tracking-wide">
                  {language === 'en' ? 'Coverage Scope:' : 'কভারেজ সুবিধাসমূহ:'}
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {(language === 'en' ? selectedProduct.coverageEn : selectedProduct.coverageBn).map(
                    (c, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white mb-1.5 uppercase tracking-wide">
                  {language === 'en' ? 'Key Privileges:' : 'বিশেষ সুবিধা:'}
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {(language === 'en' ? selectedProduct.benefitsEn : selectedProduct.benefitsBn).map(
                    (b, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Specific Product Action */}
              <div className="pt-2">
                {selectedProduct.id === 'motor-insurance' ? (
                  /* Motor Insurance -> Direct to Motor Purchase Journey */
                  <button
                    onClick={onNavigateToQuotation}
                    className="w-full h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                  >
                    <Car className="w-4 h-4 text-amber-300" />
                    <span>
                      {language === 'en'
                        ? 'Calculate & Buy Motor Insurance'
                        : 'মোটর পলিসি হিসাব ও ক্রয় করুন'}
                    </span>
                    <span className="text-sm">→</span>
                  </button>
                ) : (
                  /* Other Individual Products -> Request for Quotation Journey with this specific product selected */
                  <button
                    onClick={() => handleOpenQuotation(selectedProduct.id)}
                    className="w-full h-11 rounded-xl bg-[#0f2874] hover:bg-[#163796] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-98 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-amber-300" />
                    <span>
                      {language === 'en'
                        ? `Request for Quotation (${selectedProduct.nameEn})`
                        : `${selectedProduct.nameBn} কোটেশন রিকোয়েস্ট করুন`}
                    </span>
                    <span className="text-sm font-bold">→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
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
