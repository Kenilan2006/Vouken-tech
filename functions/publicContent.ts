type Item = { id: string; slug?: string; title: string; summary?: string; updatedAt?: string }
type Store = Record<string, Item[]>
type Context = { kv?: { get: (key: string) => Promise<unknown> } }
type RequestPayload = { body?: string }
type Payload = { collection: string }
type FunctionResponse = { statusCode: number; headers?: Record<string, string>; body: unknown }

const storageKey = 'vouken-admin-content-v2'
const legacyStorageKey = 'vouken-admin-content-v1'
const publicCollections = ['Services', 'Projects', 'Products', 'Innovation & R&D', 'Articles', 'Team', 'Media']
const jsonHeaders = { 'content-type': 'application/json' }

function parseBody(req: RequestPayload): Payload {
  try {
    const body = JSON.parse(req.body || '{}') as Partial<Payload>
    if (!body || typeof body.collection !== 'string') throw new Error()
    return body as Payload
  } catch { throw new Error('A content collection is required.') }
}
function parseStore(raw: unknown): Store {
  if (!raw) return {}
  if (typeof raw === 'string') { try { const parsed = JSON.parse(raw) as unknown; return parsed && typeof parsed === 'object' ? parsed as Store : {} } catch { return {} } }
  return typeof raw === 'object' ? raw as Store : {}
}
async function loadStore(ctx: Context) {
  if (!ctx.kv) return {}
  const current = parseStore(await ctx.kv.get(storageKey))
  return Object.values(current).some((items) => Array.isArray(items) && items.length > 0) ? current : parseStore(await ctx.kv.get(legacyStorageKey))
}

export default async function publicContent(req: RequestPayload, ctx: Context): Promise<FunctionResponse> {
  try {
    const payload = parseBody(req)
    if (!publicCollections.includes(payload.collection)) throw new Error('This content collection is not public.')
    const store = await loadStore(ctx); const items = Array.isArray(store[payload.collection]) ? store[payload.collection] : []
    return { statusCode: 200, headers: jsonHeaders, body: { items: items.map((item) => ({ id: item.id, slug: item.slug || item.id, title: item.title, summary: item.summary || '', updatedAt: item.updatedAt || '' })) } }
  } catch (error) {
    return { statusCode: 400, headers: jsonHeaders, body: { error: error instanceof Error ? error.message : 'Content could not be loaded.' } }
  }
}
