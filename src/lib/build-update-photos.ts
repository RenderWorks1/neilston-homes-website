/**
 * Code-managed photo sets per development. Used by the build-updates feed —
 * SmartSuite drives text, dates, and which months exist; photos come from here.
 * To add new photos, drop them into /public/images/<slug>/ and append to the array.
 */
export const buildUpdatePhotos: Record<string, string[]> = {
  'the-balfron': [
    '/images/the-balfron/7.png',
    '/images/the-balfron/8.png',
    '/images/the-balfron/9.png',
    '/images/the-balfron/10.png',
    '/images/the-balfron/11.png',
    '/images/the-balfron/12.png',
    '/images/the-balfron/13.png',
    '/images/the-balfron/14.png',
  ],
  'molley-green-edge': [
    '/images/molly-green-edge/STREETVIEW.jpg',
    '/images/molly-green-edge/DRONE.jpg',
    '/images/molly-green-edge/EXT%202.jpg',
    '/images/molly-green-edge/LIVING%20ROOM%20UNIT%202.jpg',
    '/images/molly-green-edge/KITCHEN%20UNIT%202.jpg',
    '/images/molly-green-edge/BEDROOM.jpg',
    '/images/molly-green-edge/PARK%20VIEW.jpg',
  ],
  'dunkirk-terraces': [
    '/images/dunkirk-terraces/1.png',
    '/images/dunkirk-terraces/2.png',
    '/images/dunkirk-terraces/3.png',
    '/images/dunkirk-terraces/4.png',
    '/images/dunkirk-terraces/5.png',
    '/images/dunkirk-terraces/6.png',
  ],
  'summit-views': [
    '/images/summit-views-stage1/15.png',
    '/images/summit-views-stage1/16.png',
    '/images/summit-views-stage1/17.png',
    '/images/summit-views-stage1/18.png',
    '/images/summit-views-stage1/19.png',
    '/images/summit-views-stage1/20.png',
    '/images/summit-views-stage1/21.png',
  ],
  'summit-views-stage-2': [
    '/images/summit-views-stage2/1.jpg',
    '/images/summit-views-stage2/2.jpg',
    '/images/summit-views-stage2/3.jpg',
    '/images/summit-views-stage2/4.jpg',
    '/images/summit-views-stage2/5.jpg',
    '/images/summit-views-stage2/6.jpg',
    '/images/summit-views-stage2/7.jpg',
    '/images/summit-views-stage2/8.jpg',
    '/images/summit-views-stage2/9.jpg',
    '/images/summit-views-stage2/10.jpg',
  ],
};

export function photosForDevelopment(slug: string): string[] {
  return buildUpdatePhotos[slug] ?? [];
}
