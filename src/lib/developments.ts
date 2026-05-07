import 'server-only';
import {
  APP_IDS,
  dateValue,
  getChoiceLabelMap,
  linkedIds,
  listRecords,
  resolveStatusLabel,
  type SmartSuiteRecord,
} from './smartsuite';
import { developments as developmentsContent } from './mock-data';
import type { Development, DevelopmentStatus } from './types';

interface DevRecord extends SmartSuiteRecord {
  title?: string;
  s6641c96d0?: string; // Marketing Name
  s04ee57df9?: { value?: string }; // Status
  s81eb9aabf?: number; // Number of Homes (formula)
  seuf0pl7?: number; // Number of Sold Homes (formula)
}

interface BlockRecord extends SmartSuiteRecord {
  sc14604eb6?: string[]; // Linked Developments
  sa379ef41f?: { date?: string }; // Build Completion
  s73012ba10?: { date?: string }; // Original Completion Date
}

function matchSmartSuite(slug: string, ssDevs: DevRecord[]): DevRecord | undefined {
  // Special-case Summit Views — both SmartSuite records share Marketing Name "Summit Views",
  // so disambiguate by autonumber (OW51 = stage 1, OW52 = stage 2).
  if (slug === 'summit-views') return ssDevs.find((d) => d.title === 'OW51');
  if (slug === 'summit-views-stage-2') return ssDevs.find((d) => d.title === 'OW52');

  const slugified = (s: string) =>
    s
      .toLowerCase()
      .replace(/ō/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  return ssDevs.find((d) => slugified(d.s6641c96d0 ?? '') === slug);
}

function deriveStatus(
  contentStatus: DevelopmentStatus,
  buildPhase: string | undefined,
  total: number | undefined,
  sold: number | undefined,
): { status: DevelopmentStatus; statusLabel?: string } {
  if (buildPhase === 'Completed') return { status: 'Completed' };
  if (typeof total === 'number' && total > 0 && typeof sold === 'number') {
    if (sold >= total) return { status: 'Sold Out' };
    if (sold > 0) {
      const pct = Math.round((sold / total) * 100);
      return { status: 'Available', statusLabel: pct >= 25 ? `${pct}% Sold` : undefined };
    }
    return { status: 'Available' };
  }
  return { status: contentStatus };
}

function mapBuildPhase(label: string | undefined): string | undefined {
  if (!label) return undefined;
  switch (label) {
    case 'Design':
    case 'Await Civil Works Start':
    case 'Civil Works':
      return 'Pre-Construction';
    case 'Await Build Start':
      return 'Awaiting Build Start';
    case 'Build':
      return 'Under Construction';
    case 'Completed':
      return 'Completed';
    default:
      return label;
  }
}

function formatCompletionDate(iso: string | undefined): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleString('en-NZ', { month: 'long', year: 'numeric' });
}

interface EnrichedData {
  ssDevs: DevRecord[];
  ssBlocks: BlockRecord[];
  statusLabels: Map<string, string>;
}

let cache: { data: EnrichedData; expires: number } | null = null;

async function loadEnriched(): Promise<EnrichedData> {
  if (cache && cache.expires > Date.now()) return cache.data;
  const [ssDevs, ssBlocks, statusLabels] = await Promise.all([
    listRecords<DevRecord>(APP_IDS.developments),
    listRecords<BlockRecord>(APP_IDS.blocks),
    getChoiceLabelMap(APP_IDS.developments, 's04ee57df9'),
  ]);
  const data = { ssDevs, ssBlocks, statusLabels };
  cache = { data, expires: Date.now() + 5 * 60 * 1000 };
  return data;
}

function mergeDevelopment(
  content: Development,
  ss: DevRecord,
  blocksForDev: BlockRecord[],
  statusLabels: Map<string, string>,
): Development {
  const buildPhaseLabel = resolveStatusLabel(ss.s04ee57df9, statusLabels);
  const buildPhase = mapBuildPhase(buildPhaseLabel) ?? content.buildPhase;
  const total = typeof ss.s81eb9aabf === 'number' ? ss.s81eb9aabf : content.totalHomes;
  const sold = typeof ss.seuf0pl7 === 'number' ? ss.seuf0pl7 : undefined;
  const { status, statusLabel } = deriveStatus(content.status, buildPhaseLabel, total, sold);

  let completionEstimate = content.completionEstimate;
  let actualCompletion = content.actualCompletion;
  const blockDates = blocksForDev
    .map((b) => dateValue(b.sa379ef41f))
    .filter((x): x is string => Boolean(x))
    .sort();
  if (blockDates.length) {
    const latest = blockDates[blockDates.length - 1];
    const formatted = formatCompletionDate(latest);
    if (formatted) {
      if (status === 'Completed') {
        actualCompletion = formatted;
      } else {
        completionEstimate = formatted;
      }
    }
  }

  return {
    ...content,
    status,
    statusLabel: statusLabel ?? content.statusLabel,
    buildPhase,
    totalHomes: total,
    completionEstimate,
    actualCompletion,
  };
}

export async function getDevelopments(): Promise<Development[]> {
  try {
    const { ssDevs, ssBlocks, statusLabels } = await loadEnriched();
    return developmentsContent.map((content) => {
      const ss = matchSmartSuite(content.slug, ssDevs);
      if (!ss) return content;
      const blocksForDev = ssBlocks.filter((b) => linkedIds(b.sc14604eb6).includes(ss.id));
      return mergeDevelopment(content, ss, blocksForDev, statusLabels);
    });
  } catch (err) {
    console.error('[developments] SmartSuite fetch failed, using static content:', err);
    return developmentsContent;
  }
}

export async function getDevelopment(slug: string): Promise<Development | undefined> {
  const all = await getDevelopments();
  return all.find((d) => d.slug === slug);
}

export async function activeDevelopments(): Promise<Development[]> {
  return (await getDevelopments()).filter((d) => d.status !== 'Completed');
}

export async function completedDevelopments(): Promise<Development[]> {
  return (await getDevelopments()).filter((d) => d.status === 'Completed');
}

export async function featuredDevelopments(): Promise<Development[]> {
  return (await getDevelopments())
    .filter((d) => d.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getDevelopmentSmartSuiteId(slug: string): Promise<string | undefined> {
  const { ssDevs } = await loadEnriched();
  return matchSmartSuite(slug, ssDevs)?.id;
}
