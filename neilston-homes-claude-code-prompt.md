# CLAUDE.md — Neilston Homes Website Build

## Project Overview

Build a complete property development website for **Neilston Homes**, an Auckland-based residential developer. The site showcases current and completed developments, drives buyer enquiries, provides build progress transparency, and positions the brand as a credible, design-forward player in the NZ property market.

**Reference site:** [tuakiriproperty.co.nz](https://tuakiriproperty.co.nz) — match or exceed this quality.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3.4+ |
| Animation | Framer Motion |
| CMS | Sanity v3 (headless, Studio embedded at `/studio`) |
| CRM | SmartSuite API (enquiry form sync) |
| Hosting | Vercel |
| Maps | Google Maps Embed or Mapbox |
| Forms | React Hook Form + Zod validation |
| Email | Resend or Nodemailer (fallback notification on form submit) |

---

## Brand System (from XD Mockups)

### Colour Palette

```css
:root {
  /* Primary */
  --copper:        #C47A2A;    /* Headings, accent text, CTAs, "Enquire Now" borders */
  --copper-dark:   #A8651F;    /* Hover states */
  --copper-light:  #D49A54;    /* Subtle accents */

  /* Neutrals */
  --charcoal:      #4A4A4A;    /* Body text */
  --grey-dark:     #333333;    /* Heavy text */
  --grey-mid:      #808080;    /* Nav bar background */
  --grey-light:    #F5F5F5;    /* Page backgrounds, card backgrounds */
  --white:         #FFFFFF;    /* Content areas, card surfaces */
  --border-grey:   #D9D9D9;    /* Card borders, dividers */

  /* Status badges */
  --status-available:   #4CAF50;
  --status-under-offer: #FF9800;
  --status-sold:        #F44336;
  --red-placeholder:    #E53935;  /* Placeholder tile backgrounds (Tips & Resources) */
}
```

### Typography

```
Headings (Page titles):
  Font: Serif / Italic — appears to be a serif italic like "Playfair Display Italic" or "Cormorant Garamond Italic"
  Weight: 400 (Regular Italic)
  Colour: var(--copper) #C47A2A
  Size scale:
    H1 (page titles): clamp(2.5rem, 5vw, 4rem)
    H2 (section titles): clamp(2rem, 4vw, 3rem)
    H3 (card titles): clamp(1.5rem, 3vw, 2.25rem)

Body / UI:
  Font: Sans-serif — appears to be a clean sans like "Inter", "DM Sans", or system sans
  Weight: 400 (body), 500 (medium labels), 600 (bold UI elements like "Learn More")
  Colour: var(--charcoal) #4A4A4A
  Size: 16px base, 18px large body

Nav items:
  Font: Sans-serif
  Weight: 400
  Colour: #FFFFFF on grey nav bar
  Letter-spacing: 0.02em

"Contact Us" button in nav:
  Border: 1px solid white
  Background: transparent
  Text: white
  Hover: background white, text var(--grey-mid)

NOTE: Check the /public/fonts/ folder for any custom font files. If custom fonts exist (e.g. .woff2, .otf, .ttf), use them via @font-face in the global CSS. If no serif italic font is found locally, use Google Fonts "Cormorant Garamond" italic as the heading font.
```

### Layout Patterns from XD

```
Navigation bar:
  - Full width, background: var(--grey-mid) ~#808080
  - Height: ~80px
  - Logo: left-aligned, white Neilston Homes wordmark + icon
  - Nav links: horizontally spaced, white text, no underline
  - "Contact Us": right-aligned, white border button, transparent bg
  - Active page: link text slightly dimmed/muted vs other links
  - Sticky on scroll

Content container:
  - Max width: 1400px, centered
  - Horizontal padding: 80px desktop, 40px tablet, 20px mobile

Cards (Homes for Sale, Completed Homes, Build Updates):
  - White background
  - Light border or subtle shadow
  - Full-bleed image at top (aspect ratio ~3:2)
  - Below image: development name in copper serif italic
  - Address in charcoal
  - Specs line (e.g. "15 Homes; 2 & 3 Bedrooms") in charcoal
  - "Learn More" button: full-width, border: 1px solid var(--border-grey), text centered, font-weight 600
  - Grid: 2-col when 2 items, 3-col when 3+ items
  - Gap: 40px

Footer:
  - Contact details, social links, quick navigation
  - Dark background (charcoal or grey-dark)
```

---

## Workspace Structure

```
neilston-homes/
├── public/
│   ├── fonts/           ← Custom font files (check & use if present)
│   ├── images/          ← Photography, renders, hero images
│   └── logos/           ← Neilston Homes logo files (white, dark variants)
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← Root layout with nav + footer
│   │   ├── page.tsx                    ← Home page
│   │   ├── homes-for-sale/
│   │   │   ├── page.tsx                ← Listing grid (dynamic 2-col/3-col)
│   │   │   └── [slug]/
│   │   │       └── page.tsx            ← Development Detail Page (template)
│   │   ├── completed-homes/
│   │   │   └── page.tsx                ← Completed developments archive
│   │   ├── build-updates/
│   │   │   ├── page.tsx                ← Build Updates hub
│   │   │   └── [slug]/
│   │   │       └── page.tsx            ← Per-project update page
│   │   ├── about/
│   │   │   └── page.tsx                ← About Us
│   │   ├── tips-and-resources/
│   │   │   ├── page.tsx                ← Article listing hub
│   │   │   └── [slug]/
│   │   │       └── page.tsx            ← Individual article
│   │   ├── contact/
│   │   │   └── page.tsx                ← Contact Us form
│   │   ├── studio/
│   │   │   └── [[...index]]/
│   │   │       └── page.tsx            ← Sanity Studio
│   │   └── api/
│   │       ├── enquiry/
│   │       │   └── route.ts            ← Form submission → SmartSuite + email
│   │       ├── revalidate/
│   │       │   └── route.ts            ← Sanity webhook → ISR revalidation
│   │       └── draft/
│   │           └── route.ts            ← Sanity preview mode
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedDevelopments.tsx
│   │   │   ├── WhyNeilston.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   └── SecondaryNav.tsx
│   │   ├── developments/
│   │   │   ├── DevelopmentCard.tsx
│   │   │   ├── DevelopmentGrid.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── KeyFactsBar.tsx
│   │   │   ├── PhotoCarousel.tsx
│   │   │   ├── FloorPlans.tsx
│   │   │   ├── BuildProgressIndicator.tsx
│   │   │   ├── LocationMap.tsx
│   │   │   └── EnquiryForm.tsx
│   │   ├── build-updates/
│   │   │   ├── UpdateCard.tsx
│   │   │   ├── MonthlyUpdate.tsx
│   │   │   ├── UpdateCarousel.tsx
│   │   │   └── CompletionDates.tsx
│   │   ├── about/
│   │   │   ├── BrandStory.tsx
│   │   │   ├── TeamProfiles.tsx
│   │   │   └── CompanyValues.tsx
│   │   ├── tips/
│   │   │   ├── ArticleCard.tsx
│   │   │   └── ArticleGrid.tsx
│   │   ├── contact/
│   │   │   └── ContactForm.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── Container.tsx
│   │       └── ImageWithLoader.tsx
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── schemas/
│   │   │       ├── index.ts
│   │   │       ├── development.ts
│   │   │       ├── buildUpdate.ts
│   │   │       ├── teamMember.ts
│   │   │       ├── article.ts
│   │   │       ├── homePage.ts
│   │   │       └── siteSettings.ts
│   │   ├── smartsuite.ts
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
├── sanity.config.ts
├── sanity.cli.ts
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## Page-by-Page Build Spec

### 1. Home Page (`/`)

**XD Reference: Screen 1**

**Layout (top to bottom):**

1. **Hero Section** — Full-viewport-height hero image (from `/public/images/`), overlaid with:
   - Headline: *"Own Your Future"* — large copper serif italic, top-left positioned
   - Subheadline: *"There's a new home waiting for incredible Kiwis like you"* — white sans-serif, below headline
   - CTA button: **"View Homes for Sale"** — prominent, copper background, white text, links to `/homes-for-sale`
   - The hero image should be a high-quality property exterior photo

2. **Secondary Navigation Strip** — horizontal bar below hero with quick links:
   - "Build Updates" → `/build-updates`
   - "About Us" → `/about`
   - Styled as a subtle accent band

3. **Featured Developments** — 2–3 development cards pulled from Sanity (flagged as `featured: true`)
   - Uses `<DevelopmentCard />` component
   - Same card pattern as Homes for Sale page

4. **"Why Neilston Homes" Trust Block** — 3–4 icon + text cards:
   - 10-Year Master Build Warranty
   - Local Auckland Team
   - XX+ Homes Delivered
   - Transparent Build Updates
   - Icons: use Lucide React or custom SVG icons in copper colour

5. **Stats Bar** — full-width accent strip:
   - "XX Homes Delivered" | "XX Currently Under Construction"
   - CMS-editable numbers
   - Background: var(--copper) or var(--grey-dark), white text

6. **Footer**

### 2. Homes for Sale (`/homes-for-sale`)

**XD Reference: Screen 2 (2 developments) & Screen 3 (3+ developments)**

- Page title: *"Homes for Sale"* — copper serif italic
- Dynamic grid of `<DevelopmentCard />` components
- **Grid logic:**
  - 2 items → 2-column layout (larger cards, like Screen 2)
  - 3+ items → 3-column grid (like Screen 3)
  - 1 item → single centred card
- Each card shows:
  - Hero image (3:2 aspect)
  - Development name (copper serif italic)
  - Address (charcoal)
  - Specs: "XX Homes; X & X Bedrooms"
  - Status badge overlay on image (Available / Under Offer / Sold)
  - "Learn More" button → links to `/homes-for-sale/[slug]`
- Grid auto-scales as CMS content changes — no rebuild needed

### 3. Development Detail Page (`/homes-for-sale/[slug]`)

**XD Reference: Screen 4 (Molley Green Edge template)**

**This is the most important page on the site.** Section order follows buyer psychology:

1. **Hero split layout:**
   - Left panel (white bg): Development name in copper serif italic, address, key facts with icons:
     - Number of homes (house icon)
     - Bedrooms (bed icon)
     - Bathrooms (bath icon)
     - Car parks (car icon)
     - Completion estimate
   - Right panel: Large hero render/photo
   - "Enquire Now" button overlaid on the image (white border, copper text — matches XD Screen 4)
   - Icons: copper-coloured line icons (~40px), matching the XD style

2. **Description & Selling Points** — rich text from Sanity, marketing copy

3. **Photo Gallery / Render Carousel** — `<PhotoCarousel />`:
   - Horizontal carousel with navigation arrows
   - Lightbox on click
   - Supports mix of photos and renders

4. **Floor Plans** — `<FloorPlans />`:
   - Displayed as image thumbnails
   - "Download PDF" button per plan
   - PDFs uploaded via Sanity

5. **Build Progress Indicator** — `<BuildProgressIndicator />`:
   - Visual timeline or progress bar
   - Auto-linked to Build Update entries in Sanity
   - **Critical:** This data is entered once in Sanity under Build Updates and reflected here automatically. Do NOT create separate fields.

6. **Location Map & Suburb Highlights** — `<LocationMap />`:
   - Embedded Google Map with pin
   - Below: suburb highlights text (CMS-editable)

7. **Enquiry Form** — `<EnquiryForm />`:
   - Fields: Name, Phone, Email, Message
   - Development name auto-filled (hidden field)
   - Submits to `/api/enquiry` → SmartSuite CRM + email notification
   - Success/error states with animation

### 4. Completed Homes (`/completed-homes`)

**XD Reference: Screen 5**

- Page title: *"Completed Homes"* — copper serif italic
- 3-column grid of completed development cards
- Each card shows:
  - Photo
  - Development name (copper serif italic)
  - Address
  - Specs
  - **Estimated Completion: XXX**
  - **Actual Completion: XXX**
  - "Learn More" button → links to that project's Build Update page (`/build-updates/[slug]`)

### 5. Build Updates Hub (`/build-updates`)

**XD Reference: Screen 6**

- Page title: *"Build Updates"* — copper serif italic
- 3-column grid of project update cards
- Shows BOTH active and completed projects
- **Filter bar** at top: All | Active | Completed
- Each card:
  - Hero image
  - Development name (copper serif italic)
  - Address
  - "Learn More" → `/build-updates/[slug]`

### 6. Build Update Per Project (`/build-updates/[slug]`)

**XD Reference: Screen 7**

- Development name in copper serif italic at top
- Subtitle: "BUILD UPDATE" in caps, sans-serif bold
- Address below in grey
- Copper horizontal rule divider

- **Completion banner (completed projects only):**
  - "Expected Completion: [date]" | "Actual Completion: [date]"
  - Displayed prominently at top — trust signal for prospective buyers

- **Monthly entries** — reverse chronological:
  - Month/Year heading (e.g. "FEBRUARY 2026") — bold sans-serif, caps
  - Photo carousel — horizontal scroll, 4 visible at desktop, nav arrows left/right
  - "Work completed in the month:" heading
  - Bullet point list of work items

- All entries managed in Sanity as an array of monthly updates within the project document

### 7. About Us (`/about`)

**XD Reference: Screen 8**

- Page title: *"About Us"* — copper serif italic
- **Split layout:**
  - Left: Brand story text (CMS rich text)
  - Right: Team photo (large, from XD — shows team around a table)
- Below: Team member profiles grid (CMS-managed):
  - Photo, name, role, short bio
- Company values section
- Key stats

**Existing copy from current site:**
> "Neilston Homes is built on the idea that all New Zealanders should have a chance to connect with a little piece of our beautiful country. A place to raise a family and call their own. That's why our homes are built to be modern, affordable, sustainable and to a quality Kiwi's expect."

### 8. Tips and Resources (`/tips-and-resources`)

**XD Reference: Screen 9**

- Page title: *"Tips and Resources"* — copper serif italic
- 3-column grid of article cards
- Each card:
  - Featured image (or coloured placeholder as in XD — red bg with white text)
  - Article title (white text on image, or below)
  - Links to `/tips-and-resources/[slug]`

- **Individual article page (`/tips-and-resources/[slug]`):**
  - Title, featured image, publication date, category tags
  - Rich text body (Sanity Portable Text)
  - Related articles at bottom

- **Initial seed articles:**
  - "Neilston Homes Process"
  - "First Home Buyers Guide"
  - "Understanding the Build Process"
  - "What to Look for in a New Build"
  - "KiwiSaver & HomeStart Grants Explained"
  - "FAQ"

### 9. Contact Us (`/contact`)

- Page title: *"Contact Us"* — copper serif italic
- **Conversion-focused form:**
  - Name (required)
  - Phone (required)
  - Email (required)
  - Development of Interest (dropdown — populated dynamically from Sanity active developments)
  - Message (textarea)
- Submit → `/api/enquiry`:
  1. POST to SmartSuite CRM API
  2. Send email notification to Neilston Homes team
  3. Return success/error to client
- Below form: direct contact details (phone, email), office address, social links

---

## Sanity CMS Schema

### `development.ts`
```ts
{
  name: 'development',
  title: 'Development',
  type: 'document',
  fields: [
    { name: 'name', title: 'Development Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'status', title: 'Status', type: 'string',
      options: { list: ['Available', 'Under Offer', 'Sold', 'Completed'] } },
    { name: 'featured', title: 'Featured on Homepage', type: 'boolean' },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'suburb', title: 'Suburb', type: 'string' },
    { name: 'totalHomes', title: 'Total Homes', type: 'number' },
    { name: 'homeType', title: 'Home Type', type: 'string' },  // e.g. "Terrace Homes"
    { name: 'bedrooms', title: 'Bedrooms', type: 'string' },   // e.g. "2 & 3"
    { name: 'bathrooms', title: 'Bathrooms', type: 'string' },  // e.g. "1.5 - 2"
    { name: 'carParks', title: 'Allocated Parks', type: 'string' },
    { name: 'completionEstimate', title: 'Expected Completion', type: 'string' },
    { name: 'actualCompletion', title: 'Actual Completion', type: 'string' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Photo Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'floorPlans', title: 'Floor Plans', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'image', type: 'image' },
        { name: 'pdf', type: 'file' }
      ]}]
    },
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'sellingPoints', title: 'Selling Points', type: 'array', of: [{ type: 'string' }] },
    { name: 'location', title: 'Map Location', type: 'geopoint' },
    { name: 'suburbHighlights', title: 'Suburb Highlights', type: 'array', of: [{ type: 'block' }] },
    { name: 'order', title: 'Display Order', type: 'number' },
  ]
}
```

### `buildUpdate.ts`
```ts
{
  name: 'buildUpdate',
  title: 'Build Update',
  type: 'document',
  fields: [
    { name: 'development', title: 'Development', type: 'reference', to: [{ type: 'development' }] },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: (doc) => doc.development?.name } },
    { name: 'updates', title: 'Monthly Updates', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'month', title: 'Month', type: 'string' },  // e.g. "February 2026"
          { name: 'photos', title: 'Photos', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
          { name: 'workCompleted', title: 'Work Completed', type: 'array', of: [{ type: 'string' }] },
        ]
      }]
    },
  ]
}
```

### `teamMember.ts`
```ts
{
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'bio', type: 'text' },
    { name: 'photo', type: 'image', options: { hotspot: true } },
    { name: 'order', type: 'number' },
  ]
}
```

### `article.ts`
```ts
{
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'featuredImage', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'categories', type: 'array', of: [{ type: 'string' }],
      options: { list: ['First Home Buyers', 'Build Process', 'Finance', 'FAQ', 'News'] } },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ]
}
```

### `homePage.ts`
```ts
{
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    { name: 'heroImage', type: 'image', options: { hotspot: true } },
    { name: 'heroHeadline', type: 'string' },
    { name: 'heroSubheadline', type: 'string' },
    { name: 'homesDelivered', title: 'Homes Delivered (stat)', type: 'number' },
    { name: 'underConstruction', title: 'Currently Under Construction (stat)', type: 'number' },
    { name: 'trustSignals', type: 'array', of: [{
      type: 'object', fields: [
        { name: 'icon', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
      ]
    }] },
    { name: 'aboutText', type: 'array', of: [{ type: 'block' }] },
  ]
}
```

### `siteSettings.ts`
```ts
{
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteName', type: 'string' },
    { name: 'contactEmail', type: 'string' },
    { name: 'contactPhone', type: 'string' },
    { name: 'address', type: 'string' },
    { name: 'socialLinks', type: 'object', fields: [
      { name: 'facebook', type: 'url' },
      { name: 'instagram', type: 'url' },
      { name: 'linkedin', type: 'url' },
    ]},
    { name: 'footerText', type: 'string' },
  ]
}
```

---

## Tailwind Config

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        copper: {
          DEFAULT: '#C47A2A',
          dark: '#A8651F',
          light: '#D49A54',
        },
        charcoal: '#4A4A4A',
        'grey-dark': '#333333',
        'grey-mid': '#808080',
        'grey-light': '#F5F5F5',
        'border-grey': '#D9D9D9',
        status: {
          available: '#4CAF50',
          'under-offer': '#FF9800',
          sold: '#F44336',
        },
      },
      fontFamily: {
        serif: ['var(--font-heading)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Global CSS

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* If custom fonts exist in /public/fonts/, register them here:
@font-face {
  font-family: 'NeilstonHeading';
  src: url('/fonts/[heading-font].woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'NeilstonBody';
  src: url('/fonts/[body-font].woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
*/

/* Page title pattern — copper serif italic */
.page-title {
  @apply font-serif italic text-copper;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
}

/* Card title pattern */
.card-title {
  @apply font-serif italic text-copper;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1.2;
}

/* Learn More button pattern */
.btn-learn-more {
  @apply w-full py-3 text-center border border-border-grey text-charcoal font-semibold
         transition-colors hover:bg-grey-light;
}

/* Primary CTA */
.btn-primary {
  @apply bg-copper text-white px-8 py-4 font-semibold text-lg
         transition-colors hover:bg-copper-dark;
}

/* Enquire Now (outline on image) */
.btn-enquire {
  @apply border-2 border-copper text-copper px-8 py-3 font-serif italic text-2xl
         transition-all hover:bg-copper hover:text-white;
}
```

---

## API Routes

### `/api/enquiry/route.ts`

```ts
// Handles form submissions from Contact page + Development Detail enquiry forms
// 1. Validate with Zod
// 2. POST to SmartSuite API (map fields: name, phone, email, message, developmentOfInterest)
// 3. Send email notification via Resend/Nodemailer as fallback
// 4. Return JSON response

// SmartSuite field mapping — confirm exact API endpoints + field IDs at kickoff:
// name        → SmartSuite "Name" field
// phone       → SmartSuite "Phone" field
// email       → SmartSuite "Email" field
// message     → SmartSuite "Message" field
// development → SmartSuite "Development" field (dropdown)

// Environment variables needed:
// SMARTSUITE_API_KEY
// SMARTSUITE_WORKSPACE_ID
// SMARTSUITE_TABLE_ID
// RESEND_API_KEY (or SMTP config)
// NOTIFICATION_EMAIL
```

### `/api/revalidate/route.ts`

```ts
// Sanity webhook handler for on-demand ISR
// Validates webhook signature
// Revalidates relevant paths based on document type:
//   development → /homes-for-sale, /homes-for-sale/[slug], /completed-homes, /
//   buildUpdate → /build-updates, /build-updates/[slug], /homes-for-sale/[slug]
//   article     → /tips-and-resources, /tips-and-resources/[slug]
//   homePage    → /
//   teamMember  → /about
```

---

## Component Design Notes

### `<Navbar />`
- Sticky top, z-50
- Grey-mid background
- Logo (white) links to `/`
- Nav items: Homes for Sale, Completed Homes, Build Updates, About Us, Tips and Resources
- "Contact Us" — white border button, right-aligned
- Mobile: hamburger → slide-out drawer
- Active link has slightly muted text (reduced opacity)

### `<DevelopmentCard />`
- Reusable across Homes for Sale, Completed Homes, Build Updates
- Props: `image`, `name`, `address`, `specs`, `status?`, `completionDates?`, `href`
- Status badge: positioned overlay top-right of image
- Hover: subtle image zoom (scale-105, overflow-hidden on container)

### `<StatusBadge />`
- `Available` → green bg, white text
- `Under Offer` → orange bg, white text
- `Sold` → red bg, white text
- Rounded pill, uppercase, small text, font-semibold

### `<PhotoCarousel />`
- Horizontal scroll with left/right arrow navigation
- 4 images visible at desktop (matches XD Screen 7)
- 2 visible on tablet, 1 on mobile
- Click → lightbox
- Framer Motion for transitions

### `<BuildProgressIndicator />`
- Visual timeline showing monthly milestones
- Pulls data from the linked Build Update document in Sanity
- Shows latest status and links to full update page
- **Single source of truth** — update once in Sanity, reflects on both the Development Detail page and the Build Update page

### `<EnquiryForm />`
- React Hook Form + Zod
- Fields: Name, Phone, Email, Message
- Hidden field: developmentSlug (auto-populated)
- Loading spinner on submit
- Success: green confirmation message with animation
- Error: red alert with retry option

---

## SEO Configuration

```ts
// Per-page metadata via generateMetadata() in each page.tsx
// Pull title, description, and OG image from Sanity where applicable

// Layout metadata defaults:
export const metadata: Metadata = {
  title: {
    default: 'Neilston Homes — Own Your Future',
    template: '%s | Neilston Homes',
  },
  description: 'Modern, affordable homes for New Zealanders. Explore our developments in Auckland.',
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://neilstonhomes.co.nz',
    siteName: 'Neilston Homes',
  },
}

// Generate sitemap.ts in app root
// robots.ts in app root
```

---

## Performance Targets

- Lighthouse Performance: 90+
- LCP: < 2.5s
- CLS: < 0.1
- FID/INP: < 200ms
- Use `next/image` with priority on hero images
- Lazy load below-fold images
- Preload heading font

---

## Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_WEBHOOK_SECRET=

# SmartSuite CRM
SMARTSUITE_API_KEY=
SMARTSUITE_WORKSPACE_ID=
SMARTSUITE_TABLE_ID=

# Email
RESEND_API_KEY=
NOTIFICATION_EMAIL=team@neilston.co.nz

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://neilstonhomes.co.nz
```

---

## Build Order

**Phase 1 — Foundation**
1. Scaffold Next.js 14 project with App Router
2. Install dependencies: `tailwindcss`, `framer-motion`, `sanity`, `next-sanity`, `@sanity/image-url`, `react-hook-form`, `zod`, `lucide-react`
3. Configure Tailwind with brand colours and fonts
4. Set up global CSS with font-face declarations
5. Check `/public/fonts/` — if custom fonts exist, register them; otherwise configure Google Fonts (Cormorant Garamond italic + Inter)
6. Check `/public/logos/` — use actual logo files for Navbar
7. Build `<Navbar />` and `<Footer />` in root layout
8. Build shared UI components: Button, Container, SectionHeading

**Phase 2 — Sanity CMS**
1. Initialize Sanity project and configure Studio at `/studio`
2. Create all schemas (development, buildUpdate, teamMember, article, homePage, siteSettings)
3. Set up Sanity client and GROQ queries
4. Seed initial content for testing

**Phase 3 — Pages (in priority order)**
1. Home Page — hero, featured developments, trust block, stats
2. Development Detail Page (template) — the most critical page
3. Homes for Sale listing
4. Build Updates hub + per-project pages
5. Completed Homes
6. About Us
7. Tips and Resources (hub + article pages)
8. Contact Us

**Phase 4 — Integration & Polish**
1. SmartSuite CRM API integration
2. Email notification on form submit
3. Sanity webhook for ISR revalidation
4. SEO: meta tags, OG tags, sitemap, robots.txt
5. Mobile responsive testing (all breakpoints)
6. Performance optimization (image optimization, font loading, code splitting)
7. Cross-browser testing
8. Final QA pass

---

## Key Reminders

- **Fonts first:** Check `/public/fonts/` before importing from Google Fonts. The XD designs use a distinctive serif italic for headings — if the font file is there, use it.
- **Images:** Use actual images from `/public/images/` for hero shots, development photos etc. Fall back to placeholder gradients only where no image exists.
- **Logos:** Use the actual logo files from `/public/logos/` — white variant for the navbar (grey background), dark variant for any light backgrounds.
- **Single source of truth for build progress:** The BuildProgressIndicator on the Development Detail page and the Build Update page must both read from the same Sanity document. No duplicate content entry.
- **Status badges drive layout:** The `status` field on each development controls visibility — "Available" and "Under Offer" appear on Homes for Sale, "Completed" appears on Completed Homes.
- **Dynamic grid:** The Homes for Sale grid must adapt from 2-col to 3-col automatically based on the number of developments. No code changes needed when adding new developments.
- **Contact form dropdown:** The "Development of Interest" dropdown on the Contact page must be dynamically populated from active Sanity developments.
- **Copper is the brand colour.** Every page title, card title, and accent element uses `#C47A2A`. The grey navbar (`#808080`) is the secondary anchor. White and light grey backgrounds keep it clean.
