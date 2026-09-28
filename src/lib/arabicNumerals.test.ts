import { describe, it, expect } from 'vitest'
import { toArabicNumerals } from './arabicNumerals'

describe('Arabic Eastern Numerals Conversion Engine', () => {
  it('converts single digits correctly from 0-9 to ٠-٩', () => {
    expect(toArabicNumerals(0)).toBe('٠')
    expect(toArabicNumerals(1)).toBe('١')
    expect(toArabicNumerals(2)).toBe('٢')
    expect(toArabicNumerals(3)).toBe('٣')
    expect(toArabicNumerals(4)).toBe('٤')
    expect(toArabicNumerals(5)).toBe('٥')
    expect(toArabicNumerals(6)).toBe('٦')
    expect(toArabicNumerals(7)).toBe('٧')
    expect(toArabicNumerals(8)).toBe('٨')
    expect(toArabicNumerals(9)).toBe('٩')
  })

  it('converts multi-digit integers and floats in numbers and strings', () => {
    expect(toArabicNumerals(2026)).toBe('٢٠٢٦')
    expect(toArabicNumerals('عام 2026 تم إنجاز 150 مشروع')).toBe('عام ٢٠٢٦ تم إنجاز ١٥٠ مشروع')
    expect(toArabicNumerals('النسبة: 99.9%')).toBe('النسبة: ٩٩.٩%')
  })

  it('handles phone numbers without altering formatting characters', () => {
    expect(toArabicNumerals('+966 50 123 4567')).toBe('+٩٦٦ ٥٠ ١٢٣ ٤٥٦٧')
  })

  it('handles null, undefined, or empty values safely', () => {
    expect(toArabicNumerals(null)).toBe('')
    expect(toArabicNumerals(undefined)).toBe('')
    expect(toArabicNumerals('')).toBe('')
  })

  it('leaves purely alphabetic strings unaffected', () => {
    expect(toArabicNumerals('وكالة راية للإنتاج والتسويق')).toBe('وكالة راية للإنتاج والتسويق')
    expect(toArabicNumerals('Raya Creative Agency')).toBe('Raya Creative Agency')
  })
})
