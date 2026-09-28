import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitProjectInquiry } from '../../lib/supabase'
import { supabase } from '../../lib/supabase'
import { ProjectInquiry } from '../../lib/types'

describe('Project Inquiry Submission Flow & Resilience', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('submits valid project inquiry payload with status "new"', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ error: null })
    vi.spyOn(supabase, 'from').mockReturnValue({
      insert: mockInsert,
    } as any)

    const inquiry: ProjectInquiry = {
      client_name: 'محمد عبدالله',
      company_name: 'شركة النماء',
      phone: '0501234567',
      email: 'mohammed@example.com',
      services_requested: ['إنتاج المقاطع القصيرة (Reels & Shorts)'],
      estimated_budget: '١٥,٠٠٠ - ٣٠,٠٠٠ ريال',
      deadline: 'خلال شهر',
      project_details: 'نود تدشين حملة تسويقية متكاملة على منصات التواصل',
    }

    const res = await submitProjectInquiry(inquiry)

    expect(res.success).toBe(true)
    expect(res.message).toContain('تم استلام طلبك بنجاح')
    expect(supabase.from).toHaveBeenCalledWith('project_inquiries')
    expect(mockInsert).toHaveBeenCalledWith([
      expect.objectContaining({
        client_name: 'محمد عبدالله',
        company_name: 'شركة النماء',
        phone: '0501234567',
        email: 'mohammed@example.com',
        status: 'new',
      }),
    ])
  })

  it('handles database network failure gracefully with fallback acknowledgment', async () => {
    vi.spyOn(supabase, 'from').mockReturnValue({
      insert: vi.fn().mockRejectedValue(new Error('Network error')),
    } as any)

    const inquiry: ProjectInquiry = {
      client_name: 'سارة خالد',
      phone: '0555555555',
      email: 'sara@example.com',
      services_requested: ['إنشاء المواقع الإلكترونية'],
      project_details: 'تصميم موقع تعريفي',
    }

    const res = await submitProjectInquiry(inquiry)

    // User experience must never be broken with a cryptic exception
    expect(res.success).toBe(true)
    expect(res.message).toContain('تم استلام تفاصيل مشروعك')
  })
})
