import type {
  Article,
  BuildUpdate,
  Development,
  HomePageContent,
  SiteSettings,
  TeamMember,
} from './types';

export const siteSettings: SiteSettings = {
  siteName: 'Neilston Homes',
  contactEmail: 'team@neilston.co.nz',
  contactPhone: '+64 9 000 0000',
  address: 'Auckland, New Zealand',
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
  footerText: '© Neilston Homes. Proudly building homes for Kiwis.',
};

export const homePage: HomePageContent = {
  heroImage: '/images/exterior1.png',
  heroHeadline: 'Own Your Future',
  heroSubheadline: "There's a new home waiting for incredible Kiwis like you",
  homesDelivered: 42,
  underConstruction: 18,
  trustSignals: [
    {
      icon: 'shield',
      title: '10-Year Master Build Warranty',
      description: 'Every Neilston home is backed by a 10-year Master Build guarantee for lasting peace of mind.',
    },
    {
      icon: 'map-pin',
      title: 'Local Auckland Team',
      description: 'An experienced Auckland-based team that lives and breathes the local market.',
    },
    {
      icon: 'home',
      title: '40+ Homes Delivered',
      description: 'A proven track record of modern, affordable homes handed over across Auckland.',
    },
    {
      icon: 'hammer',
      title: 'Transparent Build Updates',
      description: 'Monthly photo updates so you can see your new home take shape — every step of the way.',
    },
  ],
  aboutText: [
    'Neilston Homes is built on the idea that all New Zealanders should have a chance to connect with a little piece of our beautiful country. A place to raise a family and call their own. That\'s why our homes are built to be modern, affordable, sustainable and to a quality Kiwi\'s expect.',
  ],
};

export const developments: Development[] = [
  {
    slug: 'the-balfron',
    name: 'The Balfron',
    status: 'Available',
    featured: true,
    address: '12 Balfron Road, Mount Albert',
    suburb: 'Mount Albert',
    totalHomes: 15,
    homeType: 'Terrace Homes',
    bedrooms: '2 & 3',
    bathrooms: '1.5 - 2',
    carParks: '1 - 2 Allocated',
    completionEstimate: 'Q3 2026',
    heroImage: '/images/the-balfron/7.png',
    gallery: [
      '/images/the-balfron/7.png',
      '/images/the-balfron/8.png',
      '/images/the-balfron/9.png',
      '/images/the-balfron/10.png',
      '/images/the-balfron/11.png',
      '/images/the-balfron/12.png',
      '/images/the-balfron/13.png',
      '/images/the-balfron/14.png',
    ],
    floorPlans: [
      { label: 'Type A — 2 Bedroom', image: '/images/the-balfron/13.png' },
      { label: 'Type B — 3 Bedroom', image: '/images/the-balfron/14.png' },
    ],
    description: [
      'The Balfron is a boutique collection of fifteen architecturally-designed terrace homes in the heart of Mount Albert. Warm materials, generous natural light and considered landscaping make each home feel like a quiet retreat — minutes from the city.',
      'Every home has been designed with modern Kiwi family life in mind: open-plan living, private outdoor areas, and thoughtful storage throughout.',
    ],
    sellingPoints: [
      'Walkable to Mount Albert train station',
      'Zoned for Mount Albert Grammar',
      'Master Build 10-year structural warranty',
      'North-facing living areas',
      'High-performance thermal envelope',
    ],
    location: { lat: -36.888, lng: 174.712 },
    suburbHighlights: [
      'Mount Albert is a leafy inner-western Auckland suburb with a thriving village centre, strong schools and excellent public transport links into the CBD.',
      'The neighbourhood mixes heritage character homes with contemporary developments, and is close to Western Springs, MOTAT and the Auckland Zoo.',
    ],
    order: 1,
  },
  {
    slug: 'molley-green-edge',
    name: 'Molley Green Edge',
    status: 'Available',
    featured: true,
    address: '48 Molley Road, New Lynn',
    suburb: 'New Lynn',
    totalHomes: 22,
    homeType: 'Terrace Homes',
    bedrooms: '2 & 3',
    bathrooms: '1.5 - 2.5',
    carParks: '1 Allocated',
    completionEstimate: 'Q1 2027',
    heroImage: '/images/exterior2.png',
    gallery: [
      '/images/exterior2.png',
      '/images/landscape1.png',
      '/images/detail1.png',
      '/images/detail2.png',
      '/images/detail3.png',
      '/images/detail4.png',
    ],
    floorPlans: [
      { label: 'Type A — 2 Bedroom Terrace', image: '/images/detail5.png' },
      { label: 'Type B — 3 Bedroom Terrace', image: '/images/detail6.png' },
    ],
    description: [
      'Molley Green Edge is a twenty-two home community bordering a generous green reserve in New Lynn. Designed for young families and downsizers alike, the homes balance contemporary architecture with practical, enduring layouts.',
    ],
    sellingPoints: [
      'Direct access to reserve and walking trails',
      'Close to New Lynn transport hub',
      'Double glazing throughout',
      'Heat pump heating/cooling',
      'Fibre-ready',
    ],
    location: { lat: -36.907, lng: 174.683 },
    suburbHighlights: [
      'New Lynn is one of West Auckland\'s fastest-growing centres — a major rail and bus interchange with a redeveloped town centre, library, and supermarkets all within a short walk.',
    ],
    order: 2,
  },
  {
    slug: 'parnell-terraces',
    name: 'Parnell Terraces',
    status: 'Under Offer',
    address: '3 Stanley Street, Parnell',
    suburb: 'Parnell',
    totalHomes: 6,
    homeType: 'Premium Terrace Homes',
    bedrooms: '3',
    bathrooms: '2.5',
    carParks: '2 Allocated',
    completionEstimate: 'Q4 2026',
    heroImage: '/images/exterior3.png',
    gallery: ['/images/exterior3.png', '/images/landscape2.png', '/images/detail7.png', '/images/detail8.png'],
    floorPlans: [{ label: '3 Bedroom Terrace', image: '/images/detail7.png' }],
    description: [
      'Six premium terrace homes in Auckland\'s most storied inner-city suburb. Each residence has been individually considered, with high ceilings, premium appliances and private courtyards.',
    ],
    sellingPoints: ['Parnell village at your doorstep', 'Zoned for Auckland Grammar', 'Premium European appliances'],
    location: { lat: -36.852, lng: 174.78 },
    suburbHighlights: ['Parnell is Auckland\'s oldest suburb and one of its most desirable — a mix of heritage villas, boutique shopping, and leafy streets minutes from the CBD and waterfront.'],
    order: 3,
  },
  {
    slug: 'onehunga-rise',
    name: 'Onehunga Rise',
    status: 'Completed',
    address: '210 Church Street, Onehunga',
    suburb: 'Onehunga',
    totalHomes: 12,
    homeType: 'Terrace Homes',
    bedrooms: '2 & 3',
    bathrooms: '1.5 - 2',
    carParks: '1 Allocated',
    completionEstimate: 'Q2 2025',
    actualCompletion: 'June 2025',
    heroImage: '/images/landscape1.png',
    gallery: ['/images/landscape1.png', '/images/detail1.png', '/images/detail2.png'],
    floorPlans: [{ label: '3 Bedroom Terrace', image: '/images/detail2.png' }],
    description: ['A completed collection of twelve modern terrace homes in Onehunga — delivered on time and to a standard we\'re proud to stand behind.'],
    sellingPoints: ['Walkable to Onehunga Mall', 'Master Build warranty'],
    location: { lat: -36.923, lng: 174.786 },
    suburbHighlights: ['Onehunga is a working Auckland suburb with a strong community feel, great cafés, and excellent transport links.'],
    order: 4,
  },
  {
    slug: 'epsom-court',
    name: 'Epsom Court',
    status: 'Completed',
    address: '55 Manukau Road, Epsom',
    suburb: 'Epsom',
    totalHomes: 9,
    homeType: 'Terrace Homes',
    bedrooms: '3 & 4',
    bathrooms: '2 - 2.5',
    carParks: '2 Allocated',
    completionEstimate: 'Q4 2024',
    actualCompletion: 'November 2024',
    heroImage: '/images/landscape2.png',
    gallery: ['/images/landscape2.png', '/images/detail3.png', '/images/detail4.png'],
    floorPlans: [{ label: '4 Bedroom', image: '/images/detail4.png' }],
    description: ['Nine family-sized homes in double grammar zone.'],
    sellingPoints: ['Double grammar zone', 'Family-sized layouts'],
    location: { lat: -36.887, lng: 174.774 },
    suburbHighlights: ['Epsom is an established, family-focused suburb renowned for its schooling options.'],
    order: 5,
  },
];

export const buildUpdates: BuildUpdate[] = [
  {
    slug: 'the-balfron',
    developmentSlug: 'the-balfron',
    updates: [
      {
        month: 'February 2026',
        photos: ['/images/the-balfron/7.png', '/images/the-balfron/8.png', '/images/the-balfron/9.png', '/images/the-balfron/10.png'],
        workCompleted: [
          'Roof framing complete across blocks A and B',
          'External cladding installation commenced on block A',
          'Internal plumbing rough-in completed',
          'Window joinery delivered to site',
        ],
      },
      {
        month: 'January 2026',
        photos: ['/images/the-balfron/11.png', '/images/the-balfron/12.png', '/images/the-balfron/13.png', '/images/the-balfron/14.png'],
        workCompleted: [
          'First floor framing complete',
          'Pre-line electrical inspection passed',
          'Driveway sub-base laid',
        ],
      },
      {
        month: 'December 2025',
        photos: ['/images/detail1.png', '/images/detail2.png', '/images/detail3.png', '/images/detail4.png'],
        workCompleted: ['Ground floor slab poured', 'Concrete block boundary walls erected'],
      },
    ],
  },
  {
    slug: 'molley-green-edge',
    developmentSlug: 'molley-green-edge',
    updates: [
      {
        month: 'February 2026',
        photos: ['/images/exterior2.png', '/images/landscape1.png', '/images/detail1.png', '/images/detail2.png'],
        workCompleted: ['Earthworks complete', 'Foundations commenced on block 1'],
      },
    ],
  },
  {
    slug: 'onehunga-rise',
    developmentSlug: 'onehunga-rise',
    updates: [
      {
        month: 'June 2025',
        photos: ['/images/landscape1.png', '/images/detail1.png', '/images/detail2.png'],
        workCompleted: ['Final landscaping complete', 'CCC issued', 'All homes handed over to owners'],
      },
    ],
  },
];

export const teamMembers: TeamMember[] = [
  { name: 'Sam Neilston', role: 'Founder & Director', bio: 'Twenty years of residential development across Auckland.', order: 1 },
  { name: 'Rachel Chen', role: 'Head of Sales', bio: 'Guides buyers from first enquiry through to handover.', order: 2 },
  { name: 'Tom Walters', role: 'Construction Manager', bio: 'Keeps every project on programme and on budget.', order: 3 },
  { name: 'Priya Patel', role: 'Design Lead', bio: 'Leads architectural and interiors direction.', order: 4 },
];

export const articles: Article[] = [
  {
    slug: 'neilston-homes-process',
    title: 'The Neilston Homes Process',
    excerpt: 'From first enquiry to handover — what to expect when you buy a new home with us.',
    publishedAt: '2026-02-10',
    categories: ['First Home Buyers', 'Build Process'],
    placeholderBg: '#E53935',
    body: [
      'Buying a new home is one of the biggest decisions you\'ll make. Our process is designed to be transparent and stress-free from start to finish.',
      'Step 1 — Enquire. Tell us which development interests you and our team will be in touch within one business day.',
      'Step 2 — Review. We walk you through the floor plans, specifications, and build timeline for your chosen home.',
      'Step 3 — Reserve. A small refundable deposit holds your preferred home while your paperwork is prepared.',
      'Step 4 — Build. Watch your home take shape through monthly photo updates.',
      'Step 5 — Handover. Final inspection, key handover, and the start of your next chapter.',
    ],
  },
  {
    slug: 'first-home-buyers-guide',
    title: 'First Home Buyers Guide',
    excerpt: 'Everything you need to know as a first home buyer in Auckland — KiwiSaver, grants and more.',
    publishedAt: '2026-01-22',
    categories: ['First Home Buyers', 'Finance'],
    placeholderBg: '#C47A2A',
    body: [
      'Buying your first home in Auckland is absolutely achievable — with the right plan.',
      'This guide covers the KiwiSaver first-home withdrawal, First Home Grant eligibility, deposit strategies, and the conditional offer process.',
    ],
  },
  {
    slug: 'understanding-the-build-process',
    title: 'Understanding the Build Process',
    excerpt: 'A plain-English walkthrough of every stage of a residential build.',
    publishedAt: '2026-01-10',
    categories: ['Build Process'],
    placeholderBg: '#4A4A4A',
    body: ['From earthworks to handover, here\'s what each stage of your home\'s build actually involves.'],
  },
  {
    slug: 'what-to-look-for-in-a-new-build',
    title: 'What to Look for in a New Build',
    excerpt: 'The ten things every buyer should check when considering a new-build home.',
    publishedAt: '2025-12-14',
    categories: ['First Home Buyers'],
    placeholderBg: '#A8651F',
    body: ['Warranty, build quality, specification sheet, and more — here\'s the checklist.'],
  },
  {
    slug: 'kiwisaver-and-homestart-grants-explained',
    title: 'KiwiSaver & HomeStart Grants Explained',
    excerpt: 'Clear answers on what grants you may be eligible for, and how to use them.',
    publishedAt: '2025-11-30',
    categories: ['Finance'],
    placeholderBg: '#808080',
    body: ['A practical breakdown of the grant and withdrawal options available to first home buyers in New Zealand.'],
  },
  {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    excerpt: 'Answers to the questions our team hears most from prospective buyers.',
    publishedAt: '2025-11-01',
    categories: ['FAQ'],
    placeholderBg: '#D49A54',
    body: ['Have a question that\'s not covered? Get in touch via the contact page.'],
  },
];

export function getDevelopment(slug: string) {
  return developments.find((d) => d.slug === slug);
}

export function getBuildUpdate(slug: string) {
  return buildUpdates.find((b) => b.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function activeDevelopments() {
  return developments.filter((d) => d.status !== 'Completed');
}

export function completedDevelopments() {
  return developments.filter((d) => d.status === 'Completed');
}

export function featuredDevelopments() {
  return developments.filter((d) => d.featured);
}
