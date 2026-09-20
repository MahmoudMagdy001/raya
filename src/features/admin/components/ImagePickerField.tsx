import React, { useState, useRef } from 'react'
import { Upload, Library, X, Image as ImageIcon, Check, Loader2 } from 'lucide-react'
import { uploadMediaFile, createMediaItem, getMediaItems } from '../../../lib/supabase'
import { MediaItem } from '../../../lib/types'

interface ImagePickerFieldProps {
  label: string
  value: string
  onChange: (url: string) => void
  hint?: string
  accept?: string // e.g. 'image/*'
  required?: boolean
}

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label,
  value,
  onChange,
  hint,
  accept = 'image/*',
  required = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // 1. Upload the file and get the URL
      const { url, name, type, size } = await uploadMediaFile(file)

      // 2. Save to media_library automatically
      await createMediaItem({
        name,
        file_url: url,
        file_type: type,
        file_size: size,
        folder: 'uploads',
        alt_text: name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      })

      // 3. Set the URL in the form
      onChange(url)
      setUploadSuccess(true)
      setTimeout(() => setUploadSuccess(false), 2500)
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleOpenLibrary = async () => {
    setLibraryOpen(true)
    setLoadingLibrary(true)
    const items = await getMediaItems()
    setMediaItems(items.filter(i => i.file_type === 'image'))
    setLoadingLibrary(false)
  }

  const handlePickFromLibrary = (item: MediaItem) => {
    onChange(item.file_url)
    setLibraryOpen(false)
  }

  const handleClear = () => onChange('')

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-xs font-bold text-[#12372A]">
        {label}
        {required && <span className="text-rose-500 mr-1">*</span>}
      </label>

      {/* Preview + actions row */}
      <div className="flex gap-3 items-start">
        {/* Image preview */}
        <div className="w-20 h-20 rounded-xl border-2 border-dashed border-[#E5DFD3] bg-[#FAF7F2] overflow-hidden shrink-0 flex items-center justify-center relative group">
          {value ? (
            <>
              <img
                src={value}
                alt="معاينة"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '' }}
              />
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                title="حذف الصورة"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </>
          ) : (
            <ImageIcon className="w-7 h-7 text-[#C5A880]" />
          )}
        </div>

        {/* Right side: buttons + URL input */}
        <div className="flex-1 space-y-2">
          {/* Two action buttons */}
          <div className="flex gap-2">
            {/* Upload from device */}
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                uploadSuccess
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  : 'bg-[#12372A] text-[#F3D7A4] border-[#12372A] hover:bg-[#205341]'
              } disabled:opacity-60`}
            >
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : uploadSuccess ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{uploading ? 'جاري الرفع...' : uploadSuccess ? 'تم الرفع!' : 'رفع من الجهاز'}</span>
            </button>

            {/* Pick from media library */}
            <button
              type="button"
              onClick={handleOpenLibrary}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[#E5DFD3] bg-white text-[#12372A] hover:border-[#12372A] transition-all cursor-pointer"
            >
              <Library className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>مكتبة الوسائط</span>
            </button>
          </div>

          {/* Manual URL input */}
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="أو الصق رابط الصورة مباشرةً..."
            dir="ltr"
            className="w-full px-3 py-2 rounded-xl border border-[#E5DFD3] text-xs text-left font-mono focus:border-[#12372A] focus:outline-none bg-white placeholder:text-slate-400"
          />

          {hint && (
            <p className="text-[10px] text-[#6b7f74]">{hint}</p>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Media Library Drawer */}
      {libraryOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setLibraryOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden m-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DFD3] shrink-0">
              <div className="flex items-center gap-2">
                <Library className="w-5 h-5 text-[#C5A880]" />
                <h3 className="text-base font-black text-[#12372A]">مكتبة الوسائط — اختر صورة</h3>
              </div>
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="p-2 rounded-xl hover:bg-[#FAF7F2] text-[#6b7f74] hover:text-[#12372A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {loadingLibrary ? (
                <div className="flex items-center justify-center h-40 gap-2 text-[#6b7f74]">
                  <Loader2 className="w-6 h-6 animate-spin text-[#C5A880]" />
                  <span className="text-sm">جاري تحميل المكتبة...</span>
                </div>
              ) : mediaItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2 text-[#6b7f74]">
                  <ImageIcon className="w-10 h-10 text-[#C5A880]" />
                  <p className="text-sm font-bold">لا توجد صور في المكتبة بعد</p>
                  <p className="text-xs">ارفع صوراً عبر زر "رفع من الجهاز" أو من مكتبة الوسائط</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {mediaItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePickFromLibrary(item)}
                      className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-105 ${
                        value === item.file_url
                          ? 'border-[#12372A] shadow-lg'
                          : 'border-transparent hover:border-[#12372A]/40'
                      }`}
                    >
                      <img
                        src={item.file_url}
                        alt={item.alt_text || item.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Selected indicator */}
                      {value === item.file_url && (
                        <div className="absolute inset-0 bg-[#12372A]/20 flex items-center justify-center">
                          <Check className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                      )}
                      {/* Hover overlay with name */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[10px] text-white font-medium truncate">{item.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-6 py-3 border-t border-[#E5DFD3] bg-[#FAF7F2] shrink-0">
              <p className="text-xs text-[#6b7f74]">
                لإضافة صور جديدة للمكتبة، اذهب إلى <strong>مكتبة الوسائط</strong> في القائمة الجانبية.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
