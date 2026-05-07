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
  contactEmail: 'OwnYourFuture@neilston.co.nz',
  contactPhone: '0800 144 448',
  address: 'Auckland, New Zealand',
  socialLinks: {
    facebook: 'https://www.facebook.com/neilstonhomes',
    instagram: 'https://www.instagram.com/neilstonhomes/',
  },
  footerText: '© Neilston Homes. Proudly building homes for Kiwis.',
};

export const homePage: HomePageContent = {
  heroImage: '/images/exterior1.png',
  heroVideo: '/neilston-hero-vid.mp4',
  heroHeadline: 'Own Your Future',
  heroSubheadline: "There's a new home waiting for incredible Kiwis like you",
  homesDelivered: 100,
  underConstruction: 23,
  trustSignals: [
    {
      icon: 'map-pin',
      title: 'Local Auckland Team',
      description: 'An experienced Auckland-based team that lives and breathes the local market.',
    },
    {
      icon: 'home',
      title: '100+ Homes Delivered',
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
    slug: 'albert-collective',
    name: 'Albert Collective',
    status: 'Available',
    statusLabel: 'Over 60% Sold',
    buildPhase: 'Under Construction',
    featured: true,
    order: 1,
    address: '145 Richardson Road, Mount Albert',
    suburb: 'Mount Albert',
    totalHomes: 8,
    homeType: 'Townhouses',
    bedrooms: '2 & 3',
    bathrooms: '2',
    carParks: '1',
    completionEstimate: 'Q3 2026',
    heroImage: '/images/exterior1.png',
    gallery: ['/images/exterior1.png', '/images/exterior2.png', '/images/landscape1.png', '/images/detail1.png'],
    floorPlans: [
      { label: 'Type A — 2 Bedroom', image: '/images/detail1.png' },
      { label: 'Type B — 3 Bedroom', image: '/images/detail2.png' },
    ],
    description: [
      'This boutique development comprises eight thoughtfully designed townhouses, offering a mix of two- and three-bedroom homes, each with two bathrooms. Designed around practical, functional living, every home has been carefully planned to maximise comfort, usability, and lifestyle. The result is a high-quality multi-unit development that feels smart, considered, and easy to live in.',
    ],
    sellingPoints: [
      'Zoned for Mount Albert Grammar',
      'Excellent access to CBD, transport, and major arterials',
      'Close to cafés, eateries, supermarkets, and Westfield St Lukes',
      'Seamless indoor-outdoor flow with sunny outdoor areas',
      'Freehold title with allocated off-street parking',
    ],
    location: { lat: -36.888, lng: 174.712 },
    suburbHighlights: [
      'Perfectly positioned in sought-after Mt Albert, near the base of Ōwairaka, these homes offer the best of central Auckland living. Enjoy easy access to Mt Albert Grammar, local cafés, shops, parks, walking trails, motorways, public transport, and the Mt Albert train station. All while being part of a connected, community-focused neighbourhood.',
    ],
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
    order: 2,
  },
  {
    slug: 'summit-views-stage-2',
    name: 'Summit Views — Stage 2',
    status: 'Completed',
    address: '137-141 Richardson Road, Mount Albert',
    suburb: 'Mount Albert',
    totalHomes: 10,
    homeType: 'Terrace Homes',
    bedrooms: '2 & 3',
    bathrooms: '2',
    carParks: '1 Allocated',
    completionEstimate: 'December 2025',
    actualCompletion: 'September 2025',
    heroImage: '/images/summit-views/22.png',
    gallery: [
      '/images/summit-views/22.png',
      '/images/summit-views/23.png',
      '/images/summit-views/24.png',
      '/images/summit-views/25.png',
      '/images/summit-views/26.png',
      '/images/summit-views/27.png',
      '/images/summit-views/28.png',
    ],
    floorPlans: [
      { label: 'Type A — 2 Bedroom', image: '/images/summit-views/26.png' },
      { label: 'Type B — 3 Bedroom', image: '/images/summit-views/27.png' },
    ],
    description: [
      'Summit Views Stage 2 delivered ten contemporary terrace homes on Richardson Road, Mount Albert — building on the success of Stage 1 with refined plans and finishes, and handed over three months ahead of schedule.',
    ],
    sellingPoints: [
      'Inner-west Mount Albert location',
      'Master Build 10-year structural warranty',
      'Delivered ahead of schedule',
    ],
    location: { lat: -36.886, lng: 174.717 },
    suburbHighlights: [
      'Mount Albert combines leafy streets with strong school zones and an easy commute to the city.',
    ],
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
    slug: 'summit-views',
    name: 'Summit Views — Stage 1',
    status: 'Completed',
    address: '129 Richardson Road, Mount Albert',
    suburb: 'Mount Albert',
    totalHomes: 6,
    homeType: 'Terrace Homes',
    bedrooms: '2 & 3',
    bathrooms: '2 - 2.5',
    carParks: '1 Allocated',
    completionEstimate: 'September 2025',
    actualCompletion: 'May 2025',
    heroImage: '/images/summit-views/20.png',
    gallery: [
      '/images/summit-views/15.png',
      '/images/summit-views/16.png',
      '/images/summit-views/17.png',
      '/images/summit-views/18.png',
      '/images/summit-views/19.png',
      '/images/summit-views/20.png',
      '/images/summit-views/21.png',
    ],
    floorPlans: [
      { label: 'Type A — 2 Bedroom', image: '/images/summit-views/19.png' },
      { label: 'Type B — 3 Bedroom', image: '/images/summit-views/20.png' },
    ],
    description: [
      'Summit Views Stage 1 delivered six contemporary terrace homes on Richardson Road, Mount Albert — handed over four months ahead of schedule.',
    ],
    sellingPoints: [
      'Inner-west Mount Albert location',
      'Master Build 10-year structural warranty',
      'Delivered ahead of schedule',
    ],
    location: { lat: -36.886, lng: 174.717 },
    suburbHighlights: [
      'Mount Albert combines leafy streets with strong school zones and an easy commute to the city.',
    ],
    order: 5,
  },
  {
    slug: 'molley-green-edge',
    name: 'Molley Green Edge',
    status: 'Sold Out',
    buildPhase: 'Under Construction',
    featured: true,
    address: '11 Molley Green Place, Mount Roskill',
    suburb: 'Mount Roskill',
    totalHomes: 15,
    homeType: 'Terrace Homes',
    bedrooms: '2 & 3',
    bathrooms: '1.5 - 2',
    carParks: '1 - 2 Allocated',
    completionEstimate: 'May 2026',
    heroImage: '/images/molly-green-edge/STREETVIEW.jpg',
    gallery: [
      '/images/molly-green-edge/STREETVIEW.jpg',
      '/images/molly-green-edge/DRONE.jpg',
      '/images/molly-green-edge/EXT%202.jpg',
      '/images/molly-green-edge/LIVING%20ROOM%20UNIT%202.jpg',
      '/images/molly-green-edge/KITCHEN%20UNIT%202.jpg',
      '/images/molly-green-edge/BEDROOM.jpg',
      '/images/molly-green-edge/PARK%20VIEW.jpg',
      '/images/molly-green-edge/molly-green-illustration.webp',
    ],
    floorPlans: [
      { label: 'Type A — 2 Bedroom Terrace', image: '/images/molly-green-edge/molly-green-illustration.webp' },
      { label: 'Type B — 3 Bedroom Terrace', image: '/images/molly-green-edge/LIVING%20ROOM%20UNIT%202.jpg' },
    ],
    description: [
      'Molley Green Edge is a fifteen-home community bordering a generous green reserve in Mount Roskill. Designed for young families and downsizers alike, the homes balance contemporary architecture with practical, enduring layouts. Now sold out — register your interest for our next Mount Roskill release.',
    ],
    sellingPoints: [
      'Direct access to reserve and walking trails',
      'Double glazing throughout',
      'Heat pump heating/cooling',
      'Master Build 10-year structural warranty',
    ],
    location: { lat: -36.907, lng: 174.683 },
    suburbHighlights: [
      'Mount Roskill is one of Auckland\'s most established residential suburbs, with abundant parks, schools, and direct motorway access into the CBD.',
    ],
    order: 2,
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
    order: 7,
  },
  {
    slug: 'the-balfron',
    name: 'The Balfron',
    status: 'Completed',
    address: '12 Balfron Avenue, Mount Roskill',
    suburb: 'Mount Roskill',
    totalHomes: 20,
    homeType: 'Terrace Homes',
    bedrooms: '3',
    bathrooms: '1.5 - 2',
    carParks: '1 Allocated',
    completionEstimate: 'June 2024',
    actualCompletion: 'July 2024',
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
      { label: 'Type A — 3 Bedroom', image: '/images/the-balfron/13.png' },
      { label: 'Type B — 3 Bedroom', image: '/images/the-balfron/14.png' },
    ],
    description: [
      'The Balfron delivered a community of twenty terrace homes on Balfron Avenue, Mount Roskill. Warm materials, generous natural light and considered landscaping make each home feel like a quiet retreat — minutes from the city.',
    ],
    sellingPoints: [
      'Mount Roskill location',
      'Master Build 10-year structural warranty',
      'North-facing living areas',
      'High-performance thermal envelope',
    ],
    location: { lat: -36.911, lng: 174.738 },
    suburbHighlights: [
      'Mount Roskill is one of Auckland\'s most established residential suburbs, with abundant parks, schools, and direct motorway access into the CBD.',
    ],
    order: 8,
  },
  {
    slug: 'dunkirk-terraces',
    name: 'Dunkirk Terraces',
    status: 'Completed',
    address: '8-36 Dunkirk Terrace, Mount Roskill',
    suburb: 'Mount Roskill',
    totalHomes: 23,
    homeType: 'Terrace Homes',
    bedrooms: '3',
    bathrooms: '1.5 - 2',
    carParks: '1 Allocated',
    completionEstimate: 'June 2024',
    actualCompletion: 'April 2024',
    heroImage: '/images/dunkirk-terraces/1.png',
    gallery: [
      '/images/dunkirk-terraces/1.png',
      '/images/dunkirk-terraces/2.png',
      '/images/dunkirk-terraces/3.png',
      '/images/dunkirk-terraces/4.png',
      '/images/dunkirk-terraces/5.png',
      '/images/dunkirk-terraces/6.png',
    ],
    floorPlans: [
      { label: 'Type A — 3 Bedroom', image: '/images/dunkirk-terraces/5.png' },
      { label: 'Type B — 3 Bedroom', image: '/images/dunkirk-terraces/6.png' },
    ],
    description: [
      'Dunkirk Terraces delivered twenty-three contemporary terrace homes on Dunkirk Terrace, Mount Roskill — handed over two months ahead of schedule.',
    ],
    sellingPoints: [
      'Mount Roskill location',
      'Delivered ahead of schedule',
      'Master Build 10-year structural warranty',
    ],
    location: { lat: -36.92, lng: 174.74 },
    suburbHighlights: [
      'Mount Roskill is one of Auckland\'s most established residential suburbs, with abundant parks, schools, and direct motorway access into the CBD.',
    ],
    order: 9,
  },
  {
    slug: 'mountain-view',
    name: 'Mountain View',
    status: 'Completed',
    address: 'Cnr Balfron Avenue, Freeland Avenue & Huakaroro Road, Mount Roskill',
    suburb: 'Mount Roskill',
    totalHomes: 25,
    homeType: 'Terrace Homes',
    bedrooms: '3',
    bathrooms: '1 - 2',
    carParks: '1 Allocated',
    completionEstimate: 'September 2023',
    actualCompletion: 'August 2023',
    heroImage: '/images/exterior1.png',
    gallery: ['/images/exterior1.png', '/images/exterior2.png', '/images/landscape1.png', '/images/detail1.png', '/images/detail2.png'],
    floorPlans: [{ label: '3 Bedroom Terrace', image: '/images/detail1.png' }],
    description: [
      'Mountain View was a flagship Mount Roskill development — twenty-five terrace homes spanning the corners of Balfron Avenue, Freeland Avenue and Huakaroro Road, delivered one month ahead of schedule.',
    ],
    sellingPoints: [
      'Mount Roskill location with park outlooks',
      'Delivered ahead of schedule',
      'Master Build 10-year structural warranty',
    ],
    location: { lat: -36.911, lng: 174.738 },
    suburbHighlights: [
      'Mount Roskill is one of Auckland\'s most established residential suburbs, with abundant parks, schools, and direct motorway access into the CBD.',
    ],
    order: 10,
  },
  {
    slug: 'owairaka-range',
    name: 'Ōwairaka Range',
    status: 'Completed',
    address: '5-7 Range View Road, Mount Albert',
    suburb: 'Mount Albert',
    totalHomes: 8,
    homeType: 'Terrace Homes',
    bedrooms: '3',
    bathrooms: '1.5',
    carParks: '1 Allocated',
    completionEstimate: 'July 2023',
    actualCompletion: 'June 2023',
    heroImage: '/images/exterior2.png',
    gallery: ['/images/exterior2.png', '/images/landscape2.png', '/images/detail3.png', '/images/detail4.png'],
    floorPlans: [{ label: '3 Bedroom Terrace', image: '/images/detail3.png' }],
    description: [
      'Ōwairaka Range delivered eight terrace homes on Range View Road, Mount Albert — handed over one month ahead of schedule.',
    ],
    sellingPoints: [
      'Inner-west Mount Albert location',
      'Delivered ahead of schedule',
      'Master Build 10-year structural warranty',
    ],
    location: { lat: -36.886, lng: 174.717 },
    suburbHighlights: [
      'Mount Albert combines leafy streets with strong school zones and an easy commute to the city.',
    ],
    order: 11,
  },
  {
    slug: 'on-the-park',
    name: 'On The Park',
    status: 'Completed',
    address: '47 Freeland Avenue, Mount Roskill',
    suburb: 'Mount Roskill',
    totalHomes: 9,
    homeType: 'Terrace Homes',
    bedrooms: '3',
    bathrooms: '1.5',
    carParks: '1 Allocated',
    completionEstimate: 'October 2022',
    actualCompletion: 'December 2022',
    heroImage: '/images/landscape1.png',
    gallery: ['/images/landscape1.png', '/images/exterior2.png', '/images/detail5.png', '/images/detail6.png'],
    floorPlans: [{ label: '3 Bedroom Terrace', image: '/images/detail5.png' }],
    description: [
      'On The Park delivered nine terrace homes overlooking parkland on Freeland Avenue, Mount Roskill.',
    ],
    sellingPoints: [
      'Park outlooks',
      'Mount Roskill location',
      'Master Build 10-year structural warranty',
    ],
    location: { lat: -36.911, lng: 174.738 },
    suburbHighlights: [
      'Mount Roskill is one of Auckland\'s most established residential suburbs, with abundant parks, schools, and direct motorway access into the CBD.',
    ],
    order: 12,
  },
  {
    slug: 'the-gallery',
    name: 'The Gallery',
    status: 'Completed',
    address: '2-20 Kaiwawao Lane, Hobsonville',
    suburb: 'Hobsonville',
    totalHomes: 10,
    homeType: 'Terrace Homes',
    bedrooms: '3',
    bathrooms: '1.5',
    carParks: '1 Allocated',
    completionEstimate: 'September 2022',
    actualCompletion: 'December 2022',
    heroImage: '/images/exterior3.png',
    gallery: ['/images/exterior3.png', '/images/landscape2.png', '/images/detail7.png', '/images/detail8.png'],
    floorPlans: [{ label: '3 Bedroom Terrace', image: '/images/detail7.png' }],
    description: [
      'The Gallery delivered ten terrace homes on Kaiwawao Lane, Hobsonville — part of Auckland\'s premier upper-harbour master-planned community.',
    ],
    sellingPoints: [
      'Hobsonville Point lifestyle',
      'Master-planned community',
      'Master Build 10-year structural warranty',
    ],
    location: { lat: -36.79, lng: 174.665 },
    suburbHighlights: [
      'Hobsonville is one of Auckland\'s premier master-planned communities, with strong schools, ferry connections to the CBD, and a thriving food and retail scene.',
    ],
    order: 13,
  },
  {
    slug: 'parkside',
    name: 'ParkSide',
    status: 'Completed',
    address: '1-9 Kotero Road, Mount Roskill',
    suburb: 'Mount Roskill',
    totalHomes: 5,
    homeType: 'Terrace Homes',
    bedrooms: '3',
    bathrooms: '1.5',
    carParks: '1 Allocated',
    completionEstimate: 'August 2022',
    actualCompletion: 'November 2022',
    heroImage: '/images/landscape2.png',
    gallery: ['/images/landscape2.png', '/images/exterior1.png', '/images/detail1.png', '/images/detail2.png'],
    floorPlans: [{ label: '3 Bedroom Terrace', image: '/images/detail1.png' }],
    description: [
      'ParkSide was an early Neilston Homes project — five terrace homes on Kotero Road, Mount Roskill.',
    ],
    sellingPoints: [
      'Mount Roskill location',
      'Master Build 10-year structural warranty',
    ],
    location: { lat: -36.911, lng: 174.738 },
    suburbHighlights: [
      'Mount Roskill is one of Auckland\'s most established residential suburbs, with abundant parks, schools, and direct motorway access into the CBD.',
    ],
    order: 14,
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
        photos: [
          '/images/molly-green-edge/STREETVIEW.jpg',
          '/images/molly-green-edge/DRONE.jpg',
          '/images/molly-green-edge/EXT%202.jpg',
          '/images/molly-green-edge/LIVING%20ROOM%20UNIT%202.jpg',
        ],
        workCompleted: ['Earthworks complete', 'Foundations commenced on block 1'],
      },
    ],
  },
  {
    slug: 'dunkirk-terraces',
    developmentSlug: 'dunkirk-terraces',
    updates: [
      {
        month: 'February 2026',
        photos: [
          '/images/dunkirk-terraces/1.png',
          '/images/dunkirk-terraces/2.png',
          '/images/dunkirk-terraces/3.png',
          '/images/dunkirk-terraces/4.png',
        ],
        workCompleted: [
          'Site set-out and retaining wall construction underway',
          'Drainage and services rough-in progressing',
        ],
      },
    ],
  },
  {
    slug: 'summit-views',
    developmentSlug: 'summit-views',
    updates: [
      {
        month: 'February 2026',
        photos: [
          '/images/summit-views/18.png',
          '/images/summit-views/19.png',
          '/images/summit-views/20.png',
          '/images/summit-views/21.png',
        ],
        workCompleted: [
          'Structural steel installed on stage 1',
          'Upper-level framing underway with weatherproofing scheduled',
        ],
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
  { name: 'Tony Houston', role: 'Founder and Director', bio: '', photo: '/images/teampics/TonyHouston.jpg', order: 1 },
  { name: 'Gerard Costello', role: 'Director and General Manager', bio: '', photo: '/images/teampics/GerardCostello.jpg', order: 2 },
  { name: 'Sara Daji', role: 'Operations Manager', bio: '', photo: '/images/teampics/SaraDaji.jpg', order: 3 },
  { name: 'Matt Wootton', role: 'Construction Manager', bio: '', photo: '/images/teampics/MattWootton.jpg', order: 4 },
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
  return developments
    .filter((d) => d.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}
