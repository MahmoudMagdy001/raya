/**
 * Lightweight, in-flight deduplicating cache for async queries
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
}

const cacheStore = new Map<string, CacheEntry<unknown>>()
const inFlightPromises = new Map<string, Promise<unknown>>()

const DEFAULT_TTL_MS = 60 * 1000 // 60 seconds

export async function fetchWithDedupAndCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = DEFAULT_TTL_MS,
  forceRefresh = false
): Promise<T> {
  const now = Date.now()

  // 1. Check valid cache if not forcing refresh
  if (!forceRefresh) {
    const cached = cacheStore.get(key) as CacheEntry<T> | undefined
    if (cached && now - cached.timestamp < ttlMs) {
      return cached.data
    }
  }

  // 2. Check in-flight promise to deduplicate concurrent requests
  if (inFlightPromises.has(key)) {
    return inFlightPromises.get(key) as Promise<T>
  }

  // 3. Initiate fetch and register in-flight promise
  const promise = (async () => {
    try {
      const data = await fetcher()
      if (data !== undefined && data !== null && ttlMs > 0) {
        cacheStore.set(key, { data, timestamp: Date.now() })
      }
      return data
    } finally {
      inFlightPromises.delete(key)
    }
  })()

  inFlightPromises.set(key, promise)
  return promise
}

export function invalidateCache(keyPrefix?: string): void {
  if (!keyPrefix) {
    cacheStore.clear()
    return
  }
  for (const key of cacheStore.keys()) {
    if (key.startsWith(keyPrefix)) {
      cacheStore.delete(key)
    }
  }
}

export function clearAllCaches(): void {
  cacheStore.clear()
  inFlightPromises.clear()
}
