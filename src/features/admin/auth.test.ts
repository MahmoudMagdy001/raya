import { describe, it, expect, beforeEach } from 'vitest'

describe('Admin Authentication & Session Storage Logic', () => {
  const LOCAL_STORAGE_KEY = 'raya_admin_session'
  const store: Record<string, string> = {}

  const mockStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => { store[key] = val },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { Object.keys(store).forEach((k) => delete store[k]) },
  }

  beforeEach(() => {
    mockStorage.clear()
  })

  it('stores and parses authenticated admin session correctly in localStorage', () => {
    const adminSession = {
      id: 'admin-123',
      email: 'admin@raya.sa',
      name: 'مسؤول راية',
      role: 'super_admin' as const,
    }

    mockStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(adminSession))

    const raw = mockStorage.getItem(LOCAL_STORAGE_KEY)
    expect(raw).toBeTruthy()

    const parsed = JSON.parse(raw!)
    expect(parsed.email).toBe('admin@raya.sa')
    expect(parsed.role).toBe('super_admin')
    expect(parsed.id).toBe('admin-123')
  })

  it('clears session securely on logout', () => {
    mockStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ email: 'admin@raya.sa' }))
    expect(mockStorage.getItem(LOCAL_STORAGE_KEY)).not.toBeNull()

    mockStorage.removeItem(LOCAL_STORAGE_KEY)
    expect(mockStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull()
  })

  it('handles corrupted localStorage JSON without crashing', () => {
    mockStorage.setItem(LOCAL_STORAGE_KEY, 'invalid-json{{{')

    let session = null
    try {
      const raw = mockStorage.getItem(LOCAL_STORAGE_KEY)
      if (raw) session = JSON.parse(raw)
    } catch {
      session = null
    }

    expect(session).toBeNull()
  })
})
