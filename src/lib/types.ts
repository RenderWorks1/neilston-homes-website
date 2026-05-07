export type DevelopmentStatus = 'Available' | 'Under Offer' | 'Sold' | 'Sold Out' | 'Completed';

export interface FloorPlan {
  label: string;
  image: string;
  pdf?: string;
}

export interface Development {
  slug: string;
  name: string;
  status: DevelopmentStatus;
  /** Overrides badge text (e.g. "Over 60% Sold") while `status` still drives the badge colour. */
  statusLabel?: string;
  /** Construction phase shown alongside the sales status (e.g. "Under Construction"). */
  buildPhase?: string;
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
  /** Background MP4 (e.g. /neilston-hero-vid.mp4). `heroImage` is used as poster and reduced-motion fallback. */
  heroVideo?: string;
  heroHeadline: string;
  heroSubheadline: string;
  homesDelivered: number;
  underConstruction: number;
  trustSignals: TrustSignal[];
  aboutText: string[];
}

export type HomeStatus = 'Available' | 'Sold';

export interface Home {
  id: string;
  developmentSlug: string;
  lot: string;
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  carparks?: string;
  landSize?: string;
  homeSize?: string;
  price?: number;
  status: HomeStatus;
  unconditionalDate?: string;
  handoverDate?: string;
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: { facebook?: string; instagram?: string; linkedin?: string };
  footerText: string;
}
