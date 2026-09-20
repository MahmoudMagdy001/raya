import React, { useState, useEffect } from 'react'
import { getClients, createClientRecord, updateClientRecord, deleteClientRecord } from '../../../lib/supabase'
import { Client } from '../../../lib/types'
import { INITIAL_CLIENTS } from '../../../data/initialData'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Building2, 
  ExternalLink, 
  ArrowRight
} from 'lucide-react'
import { ImagePickerField } from '../components/ImagePickerField'

export const AdminClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    en_name: '',
    logo_url: '',
    website_url: '',
    display_order: 1,
    status: 'published'
  })

  const loadData = async () => {
    const data = await getClients()
    if (data) setClients(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenAdd = () => {
    setEditingClient(null)
    setFormData({
      name: '',
      en_name: '',
      logo_url: '',
      website_url: '',
      display_order: clients.length + 1,
      status: 'published'
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      ...client,
      name: client.name || '',
      en_name: client.en_name || '',
      logo_url: client.logo_url || '',
      website_url: client.website_url || '',
      display_order: client.display_order || 1,
      status: client.status || 'published'
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name?.trim()) return

    if (editingClient) {
      await updateClientRecord(editingClient.id, {
        name: formData.name,
        en_name: formData.en_name,
        logo_url: formData.logo_url,
        website_url: formData.website_url,
        display_order: formData.display_order || 1,
        status: formData.status || 'published'
      })
    } else {
      await createClientRecord({
        name: formData.name,
        en_name: formData.en_name,
        logo_url: formData.logo_url,
        website_url: formData.website_url,
        display_order: formData.display_order || clients.length + 1,
        status: formData.status || 'published'
      })
    }

    setModalOpen(false)
    await loadData()
  }

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف العميل «${name}»؟`)) {
      await deleteClientRecord(id)
      await loadData()
    }
  }

  const toggleStatus = async (client: Client) => {
    const newStatus = client.status === 'published' ? 'draft' : 'published'
    await updateClientRecord(client.id, { status: newStatus })
    await loadData()
  }

  return (
    <div className="space-y-6">
      {!modalOpen ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-[#12372A]/10 text-[#12372A]">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-[#12372A]">
              إدارة العملاء وشركاء النجاح
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7f74]">
            التحكم في شعارات العلامات التجارية والجهات الحكومية المعروضة في شريط الشركاء بالصفحة الرئيسية.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#12372A] hover:bg-[#205341] text-[#F4EFE6] text-sm font-bold shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>إضافة عميل / شريك جديد</span>
        </button>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="group bg-white p-5 rounded-3xl border border-[#E5DFD3] hover:border-[#C5A880] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden"
          >
            {/* Golden top accent */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Top Status & Order */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono font-bold text-[#8C6D46]">
                #{client.display_order}
              </span>
              <button
                onClick={() => toggleStatus(client)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                  client.status === 'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {client.status === 'published' ? 'معروض' : 'مخفي'}
              </button>
            </div>

            {/* Logo Emblem or Image */}
            <div className="flex justify-center my-3">
              {client.logo_url ? (
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] p-2 border border-[#E5DFD3] flex items-center justify-center overflow-hidden">
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] group-hover:bg-[#12372A] text-[#12372A] group-hover:text-[#F3D7A4] flex items-center justify-center transition-all duration-300 shadow-xs">
                  <Building2 className="w-8 h-8" />
                </div>
              )}
            </div>

            {/* Brand Typography */}
            <div className="my-2">
              <h4 className="text-sm font-black text-[#12372A] truncate">
                {client.name}
              </h4>
              {client.en_name && (
                <span className="text-[10px] font-bold text-[#C5A880] tracking-wider uppercase block truncate mt-0.5">
                  {client.en_name}
                </span>
              )}
            </div>

            {/* Card Actions */}
            <div className="pt-3 mt-2 border-t border-[#E5DFD3] flex items-center justify-center gap-2">
              {client.website_url && (
                <a
                  href={client.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-colors"
                  title="موقع العميل"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => handleOpenEdit(client)}
                className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-colors cursor-pointer"
                title="تعديل بيانات العميل"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(client.id, client.name)}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 transition-colors cursor-pointer"
                title="حذف العميل"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      {/* In-Place Header with Back Button */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setModalOpen(false)}
            className="p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD3] hover:bg-[#12372A] hover:text-[#F3D7A4] text-[#12372A] transition-all cursor-pointer shadow-xs"
            title="الرجوع لقائمة الشركاء والعملاء"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium">
              <span>شركاء النجاح</span>
              <span>/</span>
              <span className="text-[#12372A] font-bold">
                {editingClient ? `تعديل: ${editingClient.name}` : 'إضافة شريك جديد'}
              </span>
            </div>
            <h2 className="text-xl font-black text-[#12372A]">
              {editingClient ? 'تعديل بيانات الشريك / العميل' : 'إضافة شريك نجاح جديد'}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="px-5 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#12372A] hover:bg-black/5 cursor-pointer transition-colors"
        >
          إلغاء والرجوع
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-[#E5DFD3] shadow-xs overflow-hidden max-w-2xl">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">
                  اسم العميل أو الجهة (بالعربي) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: هيئة الترفيه"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">
                  الاسم بالإنجليزي / الشعار اللفظي
                </label>
                <input
                  type="text"
                  value={formData.en_name}
                  onChange={(e) => setFormData({ ...formData, en_name: e.target.value })}
                  placeholder="مثال: GEA • SAUDI"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left"
                  dir="ltr"
                />
              </div>

              <ImagePickerField
                label="شعار العميل (Logo)"
                value={formData.logo_url || ''}
                onChange={(url) => setFormData({ ...formData, logo_url: url })}
                hint="إذا لم يتم إدخال شعار، سيتم استخدام أيقونة رمزية تلقائياً. PNG شفاف أفضل."
              />

              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-1">
                  رابط الموقع الإلكتروني (اختياري)
                </label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://client-website.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none text-left"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    ترتيب الظهور
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#12372A] mb-1">
                    الحالة
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD3] text-sm focus:border-[#12372A] focus:outline-none bg-white"
                  >
                    <option value="published">منشور بالرئيسية</option>
                    <option value="draft">مسودة / معطل</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E5DFD3] text-xs font-bold text-[#12372A] hover:bg-black/5 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F3D7A4] text-xs font-black shadow-md cursor-pointer transition-all"
                >
                  {editingClient ? 'حفظ التعديلات' : 'إضافة الشريك الآن'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
