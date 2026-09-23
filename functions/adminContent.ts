type Item = { id: string; slug: string; title: string; summary?: string; updatedAt: string }
type Store = Record<string, Item[]>
type Role = 'owner' | 'admin'
type Context = {
  user?: { id: string; email?: string; isOwner?: boolean }
  kv?: { get: (key: string) => Promise<unknown>; set: (key: string, value: unknown) => Promise<void> }
}
type RequestPayload = { body?: string }
type Payload = { action: 'list' | 'create' | 'update' | 'delete'; collection: string; item?: Partial<Item> }
type FunctionResponse = { statusCode: number; headers?: Record<string, string>; body: unknown }

const storageKey = 'vouken-admin-content-v2'
const legacyStorageKey = 'vouken-admin-content-v1'
const collections = ['Services', 'Projects', 'Products', 'Innovation & R&D', 'Articles', 'Team', 'Enquiries', 'Media', 'Website Settings', 'Administrators']
const emailPattern = /^\S+@\S+\.\S+$/
const jsonHeaders = { 'content-type': 'application/json' }

function parseBody(req: RequestPayload): Payload {
  try {
    const body = JSON.parse(req.body || '{}') as Partial<Payload>
    if (!body || typeof body !== 'object' || typeof body.action !== 'string' || typeof body.collection !== 'string') throw new Error()
    return body as Payload
  } catch {
    throw new Error('A valid administration request is required.')
  }
}

function parseStore(raw: unknown): Store {
  if (!raw) return {}
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as unknown
      return parsed && typeof parsed === 'object' ? normalizeStore(parsed as Store) : {}
    } catch { return {} }
  }
  return typeof raw === 'object' ? normalizeStore(raw as Store) : {}
}

function normalizeStore(input: Store): Store {
  const output: Store = {}
  for (const collection of collections) {
    const items = Array.isArray(input[collection]) ? input[collection] : []
    output[collection] = items.filter((item) => item && typeof item.title === 'string' && typeof item.id === 'string').map((item) => ({
      id: item.id, slug: item.slug || slugify(item.title), title: item.title,
      summary: typeof item.summary === 'string' ? item.summary : '', updatedAt: item.updatedAt || new Date(0).toISOString(),
    }))
  }
  return output
}

function ensureCollection(collection: string) { if (!collections.includes(collection)) throw new Error('Unknown administration collection.') }
function slugify(input: string) { return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'entry' }
function uniqueSlug(title: string, current: Item[], id?: string) {
  const base = slugify(title); const existing = new Set(current.filter((item) => item.id !== id).map((item) => item.slug)); let slug = base; let suffix = 2
  while (existing.has(slug)) { slug = `${base}-${suffix}`; suffix += 1 }
  return slug
}
async function loadStore(ctx: Context) {
  if (!ctx.kv) throw new Error('Secure content storage is not configured.')
  const current = parseStore(await ctx.kv.get(storageKey))
  return Object.values(current).some((items) => items.length > 0) ? current : parseStore(await ctx.kv.get(legacyStorageKey))
}
function resolveRole(ctx: Context, store: Store): Role | null {
  if (ctx.user?.isOwner) return 'owner'
  const email = ctx.user?.email?.trim().toLowerCase()
  return email && (store.Administrators ?? []).some((item) => item.title.trim().toLowerCase() === email) ? 'admin' : null
}
function assertAuthorized(role: Role | null, collection: string) {
  if (!role) throw new Error('Administrative access is required.')
  if (collection === 'Administrators' && role !== 'owner') throw new Error('Only the app owner can manage administrator access.')
}

export default async function adminContent(req: RequestPayload, ctx: Context): Promise<FunctionResponse> {
  try {
    if (!ctx.user) throw new Error('Sign in is required.')
    const payload = parseBody(req)
    if (!['list', 'create', 'update', 'delete'].includes(payload.action)) throw new Error('Unknown administration action.')
    ensureCollection(payload.collection)
    const store = await loadStore(ctx); const role = resolveRole(ctx, store); assertAuthorized(role, payload.collection)
    const current = store[payload.collection] ?? []
    if (payload.action === 'list') return { statusCode: 200, headers: jsonHeaders, body: { items: current, role } }
    if (payload.action === 'create') {
      const title = payload.item?.title?.trim() || ''
      if (!title) throw new Error('A title is required.')
      if (payload.collection === 'Administrators' && !emailPattern.test(title)) throw new Error('Use a valid administrator email address as the title.')
      const item: Item = { id: crypto.randomUUID(), slug: uniqueSlug(title, current), title, summary: payload.item?.summary?.trim() || '', updatedAt: new Date().toISOString() }
      store[payload.collection] = [item, ...current]; await ctx.kv!.set(storageKey, store)
      return { statusCode: 200, headers: jsonHeaders, body: { item, role } }
    }
    if (payload.action === 'update') {
      const title = payload.item?.title?.trim() || ''
      if (!payload.item?.id || !title) throw new Error('An entry id and title are required.')
      if (payload.collection === 'Administrators' && !emailPattern.test(title)) throw new Error('Use a valid administrator email address as the title.')
      const index = current.findIndex((item) => item.id === payload.item?.id)
      if (index < 0) throw new Error('The selected entry no longer exists.')
      const item: Item = { ...current[index], slug: uniqueSlug(title, current, payload.item.id), title, summary: payload.item.summary?.trim() || '', updatedAt: new Date().toISOString() }
      store[payload.collection] = current.map((existing) => existing.id === item.id ? item : existing); await ctx.kv!.set(storageKey, store)
      return { statusCode: 200, headers: jsonHeaders, body: { item, role } }
    }
    if (!payload.item?.id) throw new Error('An entry id is required.')
    store[payload.collection] = current.filter((item) => item.id !== payload.item?.id); await ctx.kv!.set(storageKey, store)
    return { statusCode: 200, headers: jsonHeaders, body: { deleted: true, role } }
  } catch (error) {
    return { statusCode: 400, headers: jsonHeaders, body: { error: error instanceof Error ? error.message : 'The request could not be completed.' } }
  }
}
