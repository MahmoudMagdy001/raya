import { describe, it, expect } from 'vitest'
import { sanitizeHtml } from './sanitizeHtml'

describe('HTML Sanitizer for TipTap Rich-Text (XSS Prevention)', () => {
  it('strips dangerous <script> elements and inline executable code', () => {
    const maliciousInput = '<p>مرحباً</p><script>alert("hacked")</script>'
    const sanitized = sanitizeHtml(maliciousInput)
    expect(sanitized).not.toContain('<script>')
    expect(sanitized).not.toContain('alert(')
    expect(sanitized).toContain('<p>مرحباً</p>')
  })

  it('strips <iframe> and <object> embed elements', () => {
    const maliciousInput = '<div>محتوى آمن<iframe src="https://attacker.com"></iframe></div>'
    const sanitized = sanitizeHtml(maliciousInput)
    expect(sanitized).not.toContain('<iframe')
    expect(sanitized).toContain('محتوى آمن')
  })

  it('strips inline event handlers like onerror and onclick', () => {
    const maliciousInput = '<img src="https://example.com/pic.jpg" onerror="alert(1)" onclick="stealCookies()" />'
    const sanitized = sanitizeHtml(maliciousInput)
    expect(sanitized).not.toContain('onerror')
    expect(sanitized).not.toContain('onclick')
    expect(sanitized).toContain('src="https://example.com/pic.jpg"')
  })

  it('strips javascript: pseudo-protocols from href and src', () => {
    const maliciousInput = '<a href="javascript:alert(1)">اضغط هنا</a>'
    const sanitized = sanitizeHtml(maliciousInput)
    expect(sanitized).not.toContain('javascript:')
    expect(sanitized).toContain('اضغط هنا')
  })

  it('preserves legitimate rich-text formatting tags and attributes', () => {
    const legitimateInput = '<h2>عنوان المقال</h2><p>نص تجريبي مع <strong>خط عريض</strong> ورابط <a href="https://raya.sa">الموقع</a>.</p>'
    const sanitized = sanitizeHtml(legitimateInput)
    expect(sanitized).toContain('<h2>عنوان المقال</h2>')
    expect(sanitized).toContain('<strong>خط عريض</strong>')
    expect(sanitized).toContain('<a href="https://raya.sa">')
  })

  it('handles empty, null, or malformed input gracefully', () => {
    expect(sanitizeHtml('')).toBe('')
    // @ts-expect-error Testing invalid runtime input
    expect(sanitizeHtml(null)).toBe('')
    // @ts-expect-error Testing invalid runtime input
    expect(sanitizeHtml(undefined)).toBe('')
  })
})
