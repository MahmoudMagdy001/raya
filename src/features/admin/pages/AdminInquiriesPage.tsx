import React, { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { ProjectInquiry } from '../../../lib/types'
import { Phone, Mail, Clock, DollarSign, User } from 'lucide-react'

export const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([
    {
      id: 'inq-1',
      client_name: 'عبدالله القحطاني',
      company_name: 'شركة نجد للاستثمار العقاري',
      phone: '+966 55 987 6543',
      email: 'a.qahtani@najd.sa',
      services_requested: ['إنتاج المقاطع القصيرة', 'تغطية المعارض والمؤتمرات'],
      estimated_budget: '25,000 - 50,000 ريال',
      deadline: 'خلال 3 أسابيع',
      project_details: 'نرغب في إنتاج سلسلة من 6 مقاطع ريلز لتوثيق افتتاح مجمعنا السكني الجديد شمال الرياض مع تغطية سينمائية للحدث.',
      status: 'new',
      created_at: '2026-03-15'
    },
    {
      id: 'inq-2',
      client_name: 'سارة الدوسري',
      company_name: 'متجر عبق للعطور الفاخرة',
      phone: '+966 50 444 3322',
      email: 'sara@abaq.sa',
      services_requested: ['إنتاج المقاطع القصيرة', 'إنشاء المواقع الإلكترونية'],
      estimated_budget: '10,000 - 25,000 ريال',
      deadline: 'قبل موسم رمضان',
      project_details: 'إطلاق خط عطور جديد بمناسبة شهر رمضان المبارك مع صفحة هبوط ترويجية لشراء العينات.',
      status: 'contacted',
      created_at: '2026-03-12'
    }
  ])

  useEffect(() => {
    async function loadInquiries() {
      try {
        const { data, error } = await supabase
          .from('project_inquiries')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
          setInquiries(data as ProjectInquiry[])
        }
      } catch {
        // Fallback to sample inquiries
      }
    }
    loadInquiries()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#12372A]">
          صندوق طلبات المشاريع والبريف (Inquiries Inbox)
        </h2>
        <p className="text-xs sm:text-sm text-[#6b7f74]">
          استعراض الطلبات والرسائل الواردة من نموذج الموقع العام.
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div
            key={inq.id || inq.phone}
            className="bg-white p-6 rounded-2xl border border-[#E5DFD3] shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#12372A] text-[#C5A880] flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#12372A] text-base">
                    {inq.client_name}
                  </h3>
                  {inq.company_name && (
                    <span className="text-xs text-[#6b7f74]">{inq.company_name}</span>
                  )}
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                inq.status === 'new'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-[#205341]/10 text-[#205341]'
              }`}>
                {inq.status === 'new' ? 'طلب جديد' : 'تم التواصل'}
              </span>
            </div>

            {/* Inquiries Details */}
            <p className="text-sm text-[#335948] bg-[#FAF7F2] p-4 rounded-xl border border-[#E5DFD3]/60 leading-relaxed">
              {inq.project_details}
            </p>

            {/* Meta info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs text-[#6b7f74]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span dir="ltr">{inq.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{inq.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{inq.estimated_budget || 'غير محدد'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{inq.deadline || 'مرن'}</span>
              </div>
            </div>

            {/* Services Requested */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {inq.services_requested.map((srv) => (
                <span key={srv} className="px-2.5 py-0.5 rounded-md bg-[#12372A]/8 text-[#12372A] text-[11px] font-bold">
                  {srv}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
