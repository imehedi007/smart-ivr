export type Language = 'en' | 'bn';

export interface MenuItem {
  id: string;
  code: string; // Dialpad number, e.g. "1", "2"
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  icon: string;
  badgeEn?: string;
  badgeBn?: string;
  badgeType?: 'locked' | 'popular' | 'new';
  route: string;
  speechEn: string;
  speechBn: string;
}

export interface InsuranceProduct {
  id: string;
  code: string;
  nameEn: string;
  nameBn: string;
  subtitleEn: string;
  subtitleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  coverageEn: string[];
  coverageBn: string[];
  benefitsEn: string[];
  benefitsBn: string[];
  startingPriceEn: string;
  startingPriceBn: string;
}

export interface PolicyRecord {
  policyNumber: string;
  policyTypeEn: string;
  policyTypeBn: string;
  policyHolder: string;
  insuredItem: string;
  sumInsured: number;
  premiumAmount: number;
  expiryDate: string;
  status: 'Active' | 'Renewal Due' | 'Expired';
}

export interface BancassurancePartner {
  id: string;
  code: string;
  name: string;
  fullNameEn: string;
  fullNameBn: string;
  logoText: string;
  descriptionEn: string;
  descriptionBn: string;
  products: string[];
  hotline: string;
}

export interface Branch {
  id: string;
  nameEn: string;
  nameBn: string;
  division: string;
  addressEn: string;
  addressBn: string;
  phone: string;
  email: string;
  distanceKm?: number;
}
