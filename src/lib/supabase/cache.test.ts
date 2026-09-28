import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchWithDedupAndCache, invalidateCache, clearAllCaches } from './cache'

describe('Supabase In-Flight Deduplication & Memory Cache', () => {
  beforeEach(() => {
    clearAllCaches()
  })

  it('deduplicates concurrent in-flight requests with identical keys', async () => {
    let callCount = 0
    const mockFetcher = vi.fn(async () => {
      callCount++
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 50))
      return { data: 'test-result', count: callCount }
    })

    // Fire 3 simultaneous concurrent calls
    const [res1, res2, res3] = await Promise.all([
      fetchWithDedupAndCache('concurrent_test_key', mockFetcher, 1000),
      fetchWithDedupAndCache('concurrent_test_key', mockFetcher, 1000),
      fetchWithDedupAndCache('concurrent_test_key', mockFetcher, 1000),
    ])

    // Fetcher must be called exactly once
    expect(mockFetcher).toHaveBeenCalledTimes(1)
    expect(res1).toEqual({ data: 'test-result', count: 1 })
    expect(res2).toEqual({ data: 'test-result', count: 1 })
    expect(res3).toEqual({ data: 'test-result', count: 1 })
  })

  it('serves cached data within the TTL window without refetching', async () => {
    const mockFetcher = vi.fn(async () => 'fresh-data')

    // First call fetches from source
    const res1 = await fetchWithDedupAndCache('ttl_test_key', mockFetcher, 500)
    expect(res1).toBe('fresh-data')
    expect(mockFetcher).toHaveBeenCalledTimes(1)

    // Second immediate call must hit cache
    const res2 = await fetchWithDedupAndCache('ttl_test_key', mockFetcher, 500)
    expect(res2).toBe('fresh-data')
    expect(mockFetcher).toHaveBeenCalledTimes(1) // Still 1!
  })

  it('evicts cache entries matching prefix when invalidateCache is called', async () => {
    let version = 1
    const mockFetcher = vi.fn(async () => `version-${version}`)

    await fetchWithDedupAndCache('list_projects_all', mockFetcher, 5000)
    expect(mockFetcher).toHaveBeenCalledTimes(1)

    // Bump version and invalidate cache
    version = 2
    invalidateCache('list_projects')

    // Subsequent call must fetch fresh data
    const res2 = await fetchWithDedupAndCache('list_projects_all', mockFetcher, 5000)
    expect(res2).toBe('version-2')
    expect(mockFetcher).toHaveBeenCalledTimes(2)
  })

  it('respects zero TTL and does not cache', async () => {
    let counter = 0
    const mockFetcher = vi.fn(async () => ++counter)

    const res1 = await fetchWithDedupAndCache('no_cache_key', mockFetcher, 0)
    const res2 = await fetchWithDedupAndCache('no_cache_key', mockFetcher, 0)

    expect(res1).toBe(1)
    expect(res2).toBe(2)
    expect(mockFetcher).toHaveBeenCalledTimes(2)
  })
})
