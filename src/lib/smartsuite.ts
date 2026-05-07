import 'server-only';

const BASE_URL = 'https://app.smartsuite.com/api/v1';

const TOKEN = process.env.SMARTSUITE_API_TOKEN;
const ACCOUNT_ID = process.env.SMARTSUITE_ACCOUNT_ID;

export const APP_IDS = {
  developments: process.env.SMARTSUITE_APP_DEVELOPMENTS!,
  blocks: process.env.SMARTSUITE_APP_BLOCKS!,
  homes: process.env.SMARTSUITE_APP_HOMES!,
  updates: process.env.SMARTSUITE_APP_UPDATES!,
} as const;

const REVALIDATE_SECONDS = 300;

function assertCreds() {
  if (!TOKEN || !ACCOUNT_ID) {
    throw new Error(
      'SmartSuite credentials missing. Set SMARTSUITE_API_TOKEN and SMARTSUITE_ACCOUNT_ID.',
    );
  }
}

async function smartsuiteFetch<T>(
  path: string,
  init: RequestInit = {},
  revalidate: number | false = REVALIDATE_SECONDS,
): Promise<T> {
  assertCreds();
  const headers = {
    Authorization: `Token ${TOKEN}`,
    'ACCOUNT-ID': ACCOUNT_ID!,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(init.headers ?? {}),
  };

  let attempt = 0;
  while (true) {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers,
      next: revalidate === false ? { revalidate: 0 } : { revalidate },
    });
    if (res.ok) return res.json() as Promise<T>;
    if (res.status === 429 && attempt < 8) {
      const retryAfter = Number(res.headers.get('retry-after'));
      const baseDelay = retryAfter ? retryAfter : Math.min(30, Math.pow(2, attempt));
      const jitter = Math.random() * 0.5 + 0.75;
      await new Promise((r) => setTimeout(r, baseDelay * 1000 * jitter));
      attempt += 1;
      continue;
    }
    const body = await res.text().catch(() => '');
    throw new Error(`SmartSuite ${res.status} ${res.statusText} on ${path}: ${body.slice(0, 300)}`);
  }
}

export interface SmartSuiteListResponse<T = SmartSuiteRecord> {
  total: number;
  offset: number;
  limit: number;
  items: T[];
}

export type SmartSuiteRecord = Record<string, unknown> & { id: string };

interface ListOptions {
  filter?: unknown;
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
  limit?: number;
}

async function listRecordsRaw<T>(appId: string): Promise<T[]> {
  const limit = 200;
  let offset = 0;
  const all: T[] = [];
  while (true) {
    const data = await smartsuiteFetch<SmartSuiteListResponse<T>>(
      `/applications/${appId}/records/list/?offset=${offset}&limit=${limit}`,
      { method: 'POST', body: JSON.stringify({}) },
    );
    all.push(...data.items);
    if (all.length >= data.total || data.items.length === 0) break;
    offset += data.items.length;
    if (offset > 5000) break;
  }
  return all;
}

const recordsCache = new Map<string, { promise: Promise<unknown[]>; expires: number }>();

export function listRecords<T = SmartSuiteRecord>(
  appId: string,
  _options: ListOptions = {},
): Promise<T[]> {
  const now = Date.now();
  const existing = recordsCache.get(appId);
  if (existing && existing.expires > now) return existing.promise as Promise<T[]>;
  const promise = listRecordsRaw<T>(appId).catch((err) => {
    recordsCache.delete(appId);
    throw err;
  });
  recordsCache.set(appId, {
    promise: promise as Promise<unknown[]>,
    expires: now + REVALIDATE_SECONDS * 1000,
  });
  return promise;
}

interface SchemaField {
  slug: string;
  label: string;
  field_type: string;
  params?: { choices?: Array<{ value: string; label: string }> };
}

interface ApplicationSchema {
  id: string;
  name: string;
  structure: SchemaField[];
}

const schemaCache = new Map<string, { promise: Promise<ApplicationSchema>; expires: number }>();

export function getSchema(appId: string): Promise<ApplicationSchema> {
  const now = Date.now();
  const existing = schemaCache.get(appId);
  if (existing && existing.expires > now) return existing.promise;
  const promise = smartsuiteFetch<ApplicationSchema>(
    `/applications/${appId}/`,
    {},
    REVALIDATE_SECONDS,
  ).catch((err) => {
    schemaCache.delete(appId);
    throw err;
  });
  schemaCache.set(appId, { promise, expires: now + REVALIDATE_SECONDS * 1000 });
  return promise;
}

export async function getChoiceLabelMap(
  appId: string,
  fieldSlug: string,
): Promise<Map<string, string>> {
  const schema = await getSchema(appId);
  const field = schema.structure.find((f) => f.slug === fieldSlug);
  const map = new Map<string, string>();
  for (const c of field?.params?.choices ?? []) {
    map.set(c.value, c.label);
  }
  return map;
}

export function resolveStatusLabel(
  raw: unknown,
  labels: Map<string, string>,
): string | undefined {
  if (!raw) return undefined;
  const value = typeof raw === 'string' ? raw : (raw as { value?: string }).value;
  if (!value) return undefined;
  return labels.get(value);
}

export function richTextToPlain(raw: unknown): string {
  if (!raw) return '';
  const r = raw as { preview?: string; html?: string };
  return (r.preview ?? '').trim();
}

export function dateValue(raw: unknown): string | undefined {
  if (!raw) return undefined;
  const d = (raw as { date?: string }).date;
  return d ?? undefined;
}

export function linkedIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((x): x is string => typeof x === 'string');
}
