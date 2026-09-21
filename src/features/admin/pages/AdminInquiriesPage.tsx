import React, { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { ProjectInquiry } from '../../../lib/types'
import { AdminTableSkeleton } from '../../../components/ui/skeleton'
import { 
  Phone, 
  Mail, 
  Clock, 
  DollarSign, 
  User, 
  Inbox, 
  RefreshCw, 
  Trash2, 
  Building2,
  Calendar
} from 'lucide-react'

export const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('project_inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setInquiries(data as ProjectInquiry[])
      }
    } catch (err) {
      console.warn('Error loading inquiries:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadInquiries()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    loadInquiries()
  }

  const handleToggleStatus = async (inq: ProjectInquiry) => {
    const nextStatus = inq.status === 'new' ? 'contacted' : inq.status === 'contacted' ? 'in_progress' : 'new'
    if (inq.id) {
      await supabase.from('project_inquiries').update({ status: nextStatus }).eq('id', inq.id)
    }
    setInquiries(prev => prev.map(item => item.id === inq.id ? { ...item, status: nextStatus } : item))
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟')) {
      await supabase.from('project_inquiries').delete().eq('id', id)
      setInquiries(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#12372A]/10 text-[#12372A]">
              <Inbox className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-[#12372A]">
              صندوق طلبات المشاريع والبريف (Inquiries Inbox)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            استعراض طلبات المشاريع واستفسارات العملاء الواردة من نموذج التواصل بالموقع العام مباشرة من قاعدة البيانات.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5DFD3] bg-[#FAF7F2] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'جاري التحديث...' : 'تحديث الطلبات'}</span>
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <AdminTableSkeleton rows={4} hasThumbnail={false} />
      ) : inquiries.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border-2 border-dashed border-[#E5DFD3] p-12 sm:p-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] flex items-center justify-center mx-auto text-[#C5A880]">
            <Inbox className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#12372A] mb-1">
              صندوق طلبات المشاريع فارغ حالياً
            </h3>
            <p className="text-xs sm:text-sm text-[#6b7f74] max-w-md mx-auto leading-relaxed">
              لم تصل أي طلبات مشاريع بعد في قاعدة البيانات. بمجرد أن يقوم أحد العملاء بتعبئة نموذج بدء المشروع أو التواصل من الصفحة الرئيسية، ستظهر تفاصيل طلبه هنا فوراً.
            </p>
          </div>
        </div>
      ) : (
        /* Inquiries List */
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id || inq.phone}
              className="bg-white p-6 rounded-3xl border border-[#E5DFD3] hover:border-[#C5A880] transition-colors shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EBE1]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#12372A] text-[#F3D7A4] flex items-center justify-center font-black text-sm shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#12372A] text-base">
                        {inq.client_name}
                      </h3>
                      {inq.created_at && (
                        <span className="text-[10px] text-[#8C6D46] flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(inq.created_at).toLocaleDateString('ar-SA')}</span>
                        </span>
                      )}
                    </div>
                    {inq.company_name && (
                      <span className="text-xs text-[#6b7f74] flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-[#C5A880]" />
                        <span>{inq.company_name}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(inq)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      inq.status === 'new'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                        : inq.status === 'contacted'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                    }`}
                  >
                    {inq.status === 'new' ? 'طلب جديد' : inq.status === 'contacted' ? 'تم التواصل' : 'قيد التنفيذ'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(inq.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                    title="حذف الطلب"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Inquiries Details */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DFD3]/60">
                <span className="text-[10px] font-bold text-[#8C6D46] uppercase tracking-wider block mb-1">
                  تفاصيل المشروع والبريف:
                </span>
                <p className="text-xs sm:text-sm text-[#12372A] leading-relaxed whitespace-pre-wrap">
                  {inq.project_details}
                </p>
              </div>

              {/* Meta info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1 text-xs text-[#6b7f74]">
                <div className="flex items-center gap-2 bg-[#FAF7F2]/50 p-2 rounded-xl border border-[#E5DFD3]/40">
                  <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <a href={`tel:${inq.phone}`} dir="ltr" className="hover:text-[#12372A] font-mono">
                    {inq.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF7F2]/50 p-2 rounded-xl border border-[#E5DFD3]/40">
                  <Mail className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <a href={`mailto:${inq.email}`} className="truncate hover:text-[#12372A]">
                    {inq.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF7F2]/50 p-2 rounded-xl border border-[#E5DFD3]/40">
                  <DollarSign className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{inq.estimated_budget || 'غير محدد'}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF7F2]/50 p-2 rounded-xl border border-[#E5DFD3]/40">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{inq.deadline || 'مرن'}</span>
                </div>
              </div>

              {/* Services Requested */}
              {inq.services_requested && inq.services_requested.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-[#F0EBE1]">
                  <span className="text-[10px] font-bold text-[#8C6D46] ml-1">الخدمات المطلوبة:</span>
                  {inq.services_requested.map((srv) => (
                    <span key={srv} className="px-2.5 py-0.5 rounded-lg bg-[#12372A]/8 text-[#12372A] text-[11px] font-bold">
                      {srv}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
