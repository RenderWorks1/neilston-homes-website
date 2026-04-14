export type DevelopmentStatus = 'Available' | 'Under Offer' | 'Sold' | 'Completed';

export interface FloorPlan {
  label: string;
  image: string;
  pdf?: string;
}

export interface Development {
  slug: string;
  name: string;
  status: DevelopmentStatus;
  featured?: boolean;
  address: string;
  suburb: string;
  totalHomes: number;
  homeType: string;
  bedrooms: string;
  bathrooms: string;
  carParks: string;
  completionEstimate: string;
  actualCompletion?: string;
  heroImage: string;
  gallery: string[];
  floorPlans: FloorPlan[];
  description: string[];
  sellingPoints: string[];
  location: { lat: number; lng: number };
  suburbHighlights: string[];
  order?: number;
}

export interface MonthlyUpdate {
  month: string;
  photos: string[];
  workCompleted: string[];
}

export interface BuildUpdate {
  slug: string;
  developmentSlug: string;
  updates: MonthlyUpdate[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  order: number;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  placeholderBg?: string;
  publishedAt: string;
  categories: string[];
  body: string[];
}

export interface TrustSignal {
  icon: 'shield' | 'map-pin' | 'home' | 'hammer';
  title: string;
  description: string;
}

export interface HomePageContent {
  heroImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  homesDelivered: number;
  underConstruction: number;
  trustSignals: TrustSignal[];
  aboutText: string[];
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: { facebook?: string; instagram?: string; linkedin?: string };
  footerText: string;
}
