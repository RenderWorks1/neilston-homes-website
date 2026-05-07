import 'server-only';
import {
  APP_IDS,
  dateValue,
  linkedIds,
  listRecords,
  type SmartSuiteRecord,
} from './smartsuite';
import { developments as developmentsContent } from './mock-data';
import type { Home, HomeStatus } from './types';

interface HomeRecord extends SmartSuiteRecord {
  title?: string;
  s2c0548ce2?: string; // Lot
  scbc2zhg?: string; // Address
  s3r7ac4b?: string; // Carpark
  spj4gork?: string; // Land Size
  s6e674f68d?: string; // Home Size
  sbc04882df?: number; // Price
  sf95733dd7?: number; // Beds
  s595c6e11c?: number; // Bathrooms
  sa80e8b0b0?: { date?: string }; // Unconditional Date
  s53cfee1f3?: { date?: string }; // Handover Date
  s3aee952b1?: string[]; // Linked Block ids
}

interface BlockRecord extends SmartSuiteRecord {
  sc14604eb6?: string[]; // Linked Development ids
}

interface DevRecord extends SmartSuiteRecord {
  title?: string;
  s6641c96d0?: string; // Marketing Name
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/ō/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function devIdToSlug(ssDevs: DevRecord[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const d of ssDevs) {
    if (d.title === 'OW51') map.set(d.id, 'summit-views');
    else if (d.title === 'OW52') map.set(d.id, 'summit-views-stage-2');
    else if (d.s6641c96d0) {
      const candidate = slugify(d.s6641c96d0);
      if (developmentsContent.some((c) => c.slug === candidate)) {
        map.set(d.id, candidate);
      }
    }
  }
  return map;
}

function deriveStatus(record: HomeRecord): HomeStatus {
  return dateValue(record.sa80e8b0b0) ? 'Sold' : 'Available';
}

function toHome(record: HomeRecord, developmentSlug: string): Home {
  return {
    id: record.id,
    developmentSlug,
    lot: record.s2c0548ce2 ?? record.title ?? '',
    address: record.scbc2zhg ?? '',
    bedrooms: typeof record.sf95733dd7 === 'number' ? record.sf95733dd7 : undefined,
    bathrooms: typeof record.s595c6e11c === 'number' ? record.s595c6e11c : undefined,
    carparks: record.s3r7ac4b || undefined,
    landSize: record.spj4gork || undefined,
    homeSize: record.s6e674f68d || undefined,
    price: typeof record.sbc04882df === 'number' ? record.sbc04882df : undefined,
    status: deriveStatus(record),
    unconditionalDate: dateValue(record.sa80e8b0b0),
    handoverDate: dateValue(record.s53cfee1f3),
  };
}

let cache: { data: Map<string, Home[]>; expires: number } | null = null;

async function loadAll(): Promise<Map<string, Home[]>> {
  if (cache && cache.expires > Date.now()) return cache.data;

  const [ssHomes, ssBlocks, ssDevs] = await Promise.all([
    listRecords<HomeRecord>(APP_IDS.homes),
    listRecords<BlockRecord>(APP_IDS.blocks),
    listRecords<DevRecord>(APP_IDS.developments),
  ]);

  const blockToDev = new Map<string, string>();
  for (const b of ssBlocks) {
    const devs = linkedIds(b.sc14604eb6);
    if (devs.length) blockToDev.set(b.id, devs[0]);
  }
  const devToSlug = devIdToSlug(ssDevs);

  const result = new Map<string, Home[]>();
  for (const h of ssHomes) {
    const blockIds = linkedIds(h.s3aee952b1);
    const devId = blockIds.map((b) => blockToDev.get(b)).find(Boolean);
    if (!devId) continue;
    const slug = devToSlug.get(devId);
    if (!slug) continue;
    const home = toHome(h, slug);
    const arr = result.get(slug) ?? [];
    arr.push(home);
    result.set(slug, arr);
  }

  for (const arr of result.values()) {
    arr.sort((a, b) => a.lot.localeCompare(b.lot, undefined, { numeric: true }));
  }

  cache = { data: result, expires: Date.now() + 5 * 60 * 1000 };
  return result;
}

export async function getHomesForDevelopment(slug: string): Promise<Home[]> {
  try {
    const map = await loadAll();
    return map.get(slug) ?? [];
  } catch (err) {
    console.error('[homes] SmartSuite fetch failed:', err);
    return [];
  }
}

export async function getAvailableHomesForDevelopment(slug: string): Promise<Home[]> {
  return (await getHomesForDevelopment(slug)).filter((h) => h.status === 'Available');
}
