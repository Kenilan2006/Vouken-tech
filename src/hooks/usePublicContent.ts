import { useCallback, useEffect, useState } from 'react'
import type { AdminCollection, PublicContentItem } from '../data/content'
import { getErrorMessage } from '../lib/utils'

export function usePublicContent<T extends PublicContentItem>(collection: AdminCollection, fallback: T[] = []) {
  const [items, setItems] = useState<T[]>(fallback)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [version, setVersion] = useState(0)

  const retry = useCallback(() => setVersion((current) => current + 1), [])

  useEffect(() => {
    let active = true
    const load = async () => {
      if (!window.genmb?.fn) {
        setItems(fallback)
        return
      }
      setLoading(true)
      setError('')
      try {
        const response = await window.genmb.fn.invoke('publicContent', { collection })
        const data = response as { items?: T[] }
        if (!active) return
        const remoteItems = Array.isArray(data.items) ? data.items : []
        setItems(remoteItems.length > 0 ? remoteItems : fallback)
      } catch (caught) {
        if (!active) return
        setItems(fallback)
        setError(getErrorMessage(caught))
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => { active = false }
  }, [collection, version])

  return { items, loading, error, retry }
}
