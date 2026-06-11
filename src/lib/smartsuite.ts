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

/**
 * Coerce a SmartSuite numeric value to a number. SmartSuite returns ALL numeric field
 * types (number, currency, formula, count, percent) as strings — e.g. "3", "815000",
 * "1.5" — so a `typeof === 'number'` guard silently drops every value. Returns undefined
 * for empty/unparseable input.
 */
export function toNumber(raw: unknown): number | undefined {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : undefined;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return undefined;
    const n = Number(trimmed.replace(/[^0-9.\-]/g, ''));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export interface SmartSuiteFile {
  handle: string;
  file_type?: string;
  metadata?: { filename?: string; mimetype?: string; size?: number };
}

export function fileList(raw: unknown): SmartSuiteFile[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((f): f is SmartSuiteFile => Boolean(f && typeof (f as SmartSuiteFile).handle === 'string'));
}

interface SharedFile {
  handle: string;
  security?: { policy?: string; signature?: string };
}

// Resolved signed CDN URLs are cached far longer than record data: the bytes for a
// handle are immutable and the signature stays valid for months, so we only pay the
// per-file lookup once (cold start / when a new handle first appears).
const FILE_URL_TTL = 6 * 60 * 60 * 1000;
const fileUrlCache = new Map<string, { url: string; expires: number }>();

async function resolveFileUrl(handle: string): Promise<string | undefined> {
  const cached = fileUrlCache.get(handle);
  if (cached && cached.expires > Date.now()) return cached.url;
  try {
    const file = await smartsuiteFetch<SharedFile>(`/shared-files/${handle}/`, {}, false);
    const policy = file.security?.policy;
    const signature = file.security?.signature;
    if (!policy || !signature) return undefined;
    const url = `https://cdn.filestackcontent.com/security=p:${policy},s:${signature}/${handle}`;
    fileUrlCache.set(handle, { url, expires: Date.now() + FILE_URL_TTL });
    return url;
  } catch (err) {
    console.error(`[smartsuite] failed to resolve file ${handle}:`, err);
    return undefined;
  }
}

/** Resolve many file handles to signed CDN URLs with bounded concurrency. */
export async function resolveFileUrls(handles: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(handles)];
  const result = new Map<string, string>();
  const CONCURRENCY = 8;
  for (let i = 0; i < unique.length; i += CONCURRENCY) {
    const batch = unique.slice(i, i + CONCURRENCY);
    const urls = await Promise.all(batch.map((h) => resolveFileUrl(h)));
    batch.forEach((h, j) => {
      const url = urls[j];
      if (url) result.set(h, url);
    });
  }
  return result;
}
