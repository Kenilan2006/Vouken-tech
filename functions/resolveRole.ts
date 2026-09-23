type Item = { id: string; slug?: string; title: string; summary?: string; updatedAt?: string }
type Store = Record<string, Item[]>
type Context = { user?: { id: string; email?: string; isOwner?: boolean }; kv?: { get: (key: string) => Promise<unknown> } }
type RequestPayload = { body?: string }
type FunctionResponse = { statusCode: number; headers?: Record<string, string>; body: unknown }

const storageKey = 'vouken-admin-content-v2'
const legacyStorageKey = 'vouken-admin-content-v1'
const jsonHeaders = { 'content-type': 'application/json' }

function parseStore(raw: unknown): Store {
  if (!raw) return {}
  if (typeof raw === 'string') { try { const parsed = JSON.parse(raw) as unknown; return parsed && typeof parsed === 'object' ? parsed as Store : {} } catch { return {} } }
  return typeof raw === 'object' ? raw as Store : {}
}
async function loadStore(ctx: Context) {
  if (!ctx.kv) return {}
  const current = parseStore(await ctx.kv.get(storageKey))
  return Array.isArray(current.Administrators) && current.Administrators.length > 0 ? current : parseStore(await ctx.kv.get(legacyStorageKey))
}

export default async function resolveRole(_req: RequestPayload, ctx: Context): Promise<FunctionResponse> {
  try {
    if (!ctx.user) return { statusCode: 200, headers: jsonHeaders, body: { role: 'denied' } }
    if (ctx.user.isOwner) return { statusCode: 200, headers: jsonHeaders, body: { role: 'owner' } }
    const email = ctx.user.email?.trim().toLowerCase()
    if (!email) return { statusCode: 200, headers: jsonHeaders, body: { role: 'denied' } }
    const store = await loadStore(ctx); const administrators = Array.isArray(store.Administrators) ? store.Administrators : []
    return { statusCode: 200, headers: jsonHeaders, body: { role: administrators.some((item) => item.title.trim().toLowerCase() === email) ? 'admin' : 'denied' } }
  } catch (error) {
    return { statusCode: 500, headers: jsonHeaders, body: { error: error instanceof Error ? error.message : 'Role resolution failed.' } }
  }
}
