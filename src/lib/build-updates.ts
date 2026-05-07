import 'server-only';
import {
  APP_IDS,
  dateValue,
  linkedIds,
  listRecords,
  type SmartSuiteRecord,
} from './smartsuite';
import { developments as developmentsContent } from './mock-data';
import { photosForDevelopment } from './build-update-photos';
import type { BuildUpdate, MonthlyUpdate } from './types';

interface UpdateRecord extends SmartSuiteRecord {
  s1b6b55323?: string; // Update from the month (textarea)
  s906c9a677?: boolean; // Make Public
  s1d9ec2161?: { date?: string }; // Date Update Received
  se77066cd1?: string[]; // Linked block ids
}

interface BlockRecord extends SmartSuiteRecord {
  sc14604eb6?: string[]; // Linked development ids
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

function devIdToSlugMap(ssDevs: DevRecord[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const d of ssDevs) {
    if (d.title === 'OW51') map.set(d.id, 'summit-views');
    else if (d.title === 'OW52') map.set(d.id, 'summit-views-stage-2');
    else if (d.s6641c96d0) {
      const candidate = slugify(d.s6641c96d0);
      // Only map if the slug exists in our content
      if (developmentsContent.some((c) => c.slug === candidate)) {
        map.set(d.id, candidate);
      }
    }
  }
  return map;
}

function monthLabel(iso: string | undefined): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleString('en-NZ', { month: 'long', year: 'numeric' });
}

function monthSortKey(iso: string | undefined): number {
  if (!iso) return 0;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? 0 : d.getFullYear() * 100 + d.getMonth();
}

function splitWorkLines(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

let cache: { data: Map<string, BuildUpdate>; expires: number } | null = null;

async function loadAll(): Promise<Map<string, BuildUpdate>> {
  if (cache && cache.expires > Date.now()) return cache.data;

  const [ssUpdates, ssBlocks, ssDevs] = await Promise.all([
    listRecords<UpdateRecord>(APP_IDS.updates),
    listRecords<BlockRecord>(APP_IDS.blocks),
    listRecords<DevRecord>(APP_IDS.developments),
  ]);

  const blockToDev = new Map<string, string>();
  for (const b of ssBlocks) {
    const devs = linkedIds(b.sc14604eb6);
    if (devs.length) blockToDev.set(b.id, devs[0]);
  }
  const devToSlug = devIdToSlugMap(ssDevs);

  // Group: slug -> monthLabel -> { workCompleted: string[], sortKey: number }
  type Grouped = Map<string, { sortKey: number; workCompleted: string[] }>;
  const bySlug = new Map<string, Grouped>();

  for (const u of ssUpdates) {
    if (!u.s906c9a677) continue;
    const blockIds = linkedIds(u.se77066cd1);
    const devId = blockIds.map((b) => blockToDev.get(b)).find(Boolean);
    if (!devId) continue;
    const slug = devToSlug.get(devId);
    if (!slug) continue;

    const iso = dateValue(u.s1d9ec2161);
    const month = monthLabel(iso);
    if (!month) continue;
    const sortKey = monthSortKey(iso);
    const lines = splitWorkLines(u.s1b6b55323);
    if (!lines.length) continue;

    let monthsForSlug = bySlug.get(slug);
    if (!monthsForSlug) {
      monthsForSlug = new Map();
      bySlug.set(slug, monthsForSlug);
    }
    const existing = monthsForSlug.get(month);
    if (existing) {
      for (const line of lines) {
        if (!existing.workCompleted.includes(line)) existing.workCompleted.push(line);
      }
    } else {
      monthsForSlug.set(month, { sortKey, workCompleted: [...lines] });
    }
  }

  const result = new Map<string, BuildUpdate>();
  for (const [slug, monthsMap] of bySlug) {
    const photos = photosForDevelopment(slug);
    const updates: MonthlyUpdate[] = [...monthsMap.entries()]
      .sort((a, b) => b[1].sortKey - a[1].sortKey)
      .map(([month, value]) => ({
        month,
        photos,
        workCompleted: value.workCompleted,
      }));
    result.set(slug, { slug, developmentSlug: slug, updates });
  }

  cache = { data: result, expires: Date.now() + 5 * 60 * 1000 };
  return result;
}

export async function getBuildUpdates(): Promise<BuildUpdate[]> {
  try {
    const map = await loadAll();
    return [...map.values()];
  } catch (err) {
    console.error('[build-updates] SmartSuite fetch failed:', err);
    return [];
  }
}

export async function getBuildUpdate(slug: string): Promise<BuildUpdate | undefined> {
  try {
    const map = await loadAll();
    return map.get(slug);
  } catch (err) {
    console.error('[build-updates] SmartSuite fetch failed:', err);
    return undefined;
  }
}
