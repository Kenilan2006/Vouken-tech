type Item = { id: string; slug: string; title: string; summary: string; updatedAt: string }
type Store = Record<string, Item[]>
type Context = { kv?: { get: (key: string) => Promise<unknown>; set: (key: string, value: unknown) => Promise<void> } }
type RequestPayload = { body?: string }
type Payload = { name: string; email: string; subject?: string; message: string }
type FunctionResponse = { statusCode: number; headers?: Record<string, string>; body: unknown }

const storageKey = 'vouken-admin-content-v2'
const legacyStorageKey = 'vouken-admin-content-v1'
const emailPattern = /^\S+@\S+\.\S+$/
const jsonHeaders = { 'content-type': 'application/json' }

function parseBody(req: RequestPayload): Payload {
  try {
    const body = JSON.parse(req.body || '{}') as Partial<Payload>
    if (!body || typeof body !== 'object') throw new Error()
    return body as Payload
  } catch { throw new Error('A valid enquiry is required.') }
}
function parseStore(raw: unknown): Store {
  if (!raw) return {}
  if (typeof raw === 'string') { try { const parsed = JSON.parse(raw) as unknown; return parsed && typeof parsed === 'object' ? parsed as Store : {} } catch { return {} } }
  return typeof raw === 'object' ? raw as Store : {}
}
function slugify(input: string) { return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'enquiry' }
async function loadStore(ctx: Context) {
  if (!ctx.kv) throw new Error('Secure enquiry storage is not configured.')
  const current = parseStore(await ctx.kv.get(storageKey))
  return Object.values(current).some((items) => Array.isArray(items) && items.length > 0) ? current : parseStore(await ctx.kv.get(legacyStorageKey))
}

export default async function enquiryIntake(req: RequestPayload, ctx: Context): Promise<FunctionResponse> {
  try {
    if (!ctx.kv) throw new Error('Secure enquiry storage is not configured.')
    const payload = parseBody(req); const name = payload.name?.trim() || ''; const email = payload.email?.trim() || ''; const subject = payload.subject?.trim() || 'General enquiry'; const message = payload.message?.trim() || ''
    if (name.length < 1 || name.length > 200) throw new Error('A valid name is required.')
    if (!emailPattern.test(email)) throw new Error('A valid email is required.')
    if (subject.length > 500) throw new Error('Subject must be 500 characters or fewer.')
    if (message.length < 1 || message.length > 5000) throw new Error('A valid message is required.')
    const store = await loadStore(ctx); const current = Array.isArray(store.Enquiries) ? store.Enquiries : []; const updatedAt = new Date().toISOString()
    const item: Item = { id: crypto.randomUUID(), slug: `${slugify(subject)}-${Date.now()}`, title: `${name} — ${subject}`, summary: `${email}\n\n${message}`, updatedAt }
    store.Enquiries = [item, ...current].slice(0, 250); await ctx.kv.set(storageKey, store)
    return { statusCode: 200, headers: jsonHeaders, body: { item: { id: item.id, updatedAt: item.updatedAt } } }
  } catch (error) {
    return { statusCode: 400, headers: jsonHeaders, body: { error: error instanceof Error ? error.message : 'The enquiry could not be saved.' } }
  }
}
